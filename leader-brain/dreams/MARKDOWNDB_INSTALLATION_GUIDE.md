# MarkdownDB Installation Guide for Quantum Vector Labs
## Next.js App + VPS Backup Strategy

**Last Updated:** March 2026  
**Package:** `mddb` (formerly `@flowershow/markdowndb`)  
**Support:** Node.js 18+ required

---

## 📋 Overview

MarkdownDB (`mddb`) is a lightweight package that converts your Markdown files into a queryable SQLite database. For Quantum Vector Labs:
- **Features:** Parse markdown → extract structured data (frontmatter, tags, links) → store in SQLite
- **Use Case:** Knowledge base, documentation database, content indexing for GenAI apps
- **Limitation in Vercel:** Read-only filesystem means SQLite index must be built locally
- **Solution:** Install locally, commit `markdown.db` to git but `.gitignore` the `/brain` folder contents

---

## 🚀 PART 1: Next.js Installation (Recommended)

### Step 1: Install the Package

Navigate to your Next.js project root and run:

```bash
npm install mddb
```

Or with yarn/pnpm:

```bash
yarn add mddb
# or
pnpm add mddb
```

### Step 2: Create Your Markdown Content Folder

Create a folder to store your markdown files (e.g., `brain` or `content`):

```bash
mkdir -p brain/documents
```

Example markdown file (`brain/documents/product-overview.md`):

```markdown
---
title: Quantum Vector Labs Overview
type: product
tags: [inference, vectordb, genai, cloud]
date: 2026-03-27
author: Quantum Vector Labs
---

# Quantum Vector Labs Overview

We offer:
- Inference APIs
- Vector Database Storage
- Custom GenAI App Development
- Cloud Compute Resources
```

### Step 3: Index Markdown to SQLite Database

Create a script to generate your database. Add to `package.json`:

```json
{
  "scripts": {
    "build": "npm run mddb:index && next build",
    "dev": "npm run mddb:watch & next dev",
    "mddb:index": "mddb brain --output ./lib/markdown.db",
    "mddb:watch": "mddb brain --output ./lib/markdown.db --watch"
  }
}
```

### Step 4: Initialize Database Client

Create `lib/mddb.ts` to establish your database connection:

```typescript
// lib/mddb.ts
import { MarkdownDB } from 'mddb';

const dbPath = './lib/markdown.db';

const client = new MarkdownDB({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
});

let clientPromise: Promise<MarkdownDB>;

if (!clientPromise) {
  clientPromise = client.init();
}

export default clientPromise;
```

### Step 5: Query the Database in Your App

Example API route (`app/api/documents/route.ts`):

```typescript
// app/api/documents/route.ts
import type { NextRequest } from 'next/server';
import clientPromise from '@/lib/mddb';

export async function GET(request: NextRequest) {
  try {
    const mddb = await clientPromise;
    
    // Get all files
    const allFiles = await mddb.getFiles();
    
    // Filter by folder
    const docs = await mddb.getFiles({ folder: 'documents' });
    
    // Filter by tag
    const genAIDocs = docs.filter((doc: any) => 
      doc.metadata?.tags?.includes('genai')
    );
    
    return Response.json({
      total: allFiles.length,
      genAI: genAIDocs.length,
      documents: genAIDocs
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to query markdown database' },
      { status: 500 }
    );
  }
}
```

### Step 6: Configure .gitignore

Protect sensitive content and build outputs:

```gitignore
# MarkdownDB outputs
lib/markdown.db
lib/markdown.db-shm
lib/markdown.db-wal

# Ignore brain folder contents in production
brain/*
!brain/.gitkeep

# Keep config but ignore indexed content
!brain/*.config.*

# Standard Next.js
.next/
node_modules/
*.log
```

### Step 7: Update .gitignore Strategy (if needed)

If you want to commit the brain folder structure but ignore actual content:

```gitignore
# Preserve folder structure, ignore markdown files
brain/**/*.md
brain/**/*.mdx

# But DO commit the database in local dev (optional)
# !lib/markdown.db
```

### Step 8: Development Workflow

```bash
# Terminal 1: Watch markdown files and rebuild database
npm run mddb:watch

# Terminal 2: Run Next.js dev server
npm run dev
```

### Step 9: Production Deployment (Vercel)

Since Vercel's filesystem is read-only:

1. **Pre-build:** The `npm run mddb:index` runs before `next build`
2. **Commit database:** Add `lib/markdown.db` to git (it's small ~100KB for typical content)
3. **Or regenerate:** Add prebuild script:

```json
{
  "scripts": {
    "prebuild": "npm run mddb:index",
    "build": "next build"
  }
}
```

---

## 🖥️ PART 2: VPS Installation (Fallback Option)

If Next.js integration fails, run MarkdownDB as a standalone Node.js service on your VPS.

### Prerequisites

- VPS running Ubuntu/Debian
- Node.js 18+ installed

### Step 1: Set Up VPS Project

```bash
ssh user@your-vps-ip
cd /home/your-user

# Create project directory
mkdir quantum-vector-mddb
cd quantum-vector-mddb

# Initialize Node.js project
npm init -y
npm install mddb sqlite3
```

### Step 2: Create Configuration

Create `markdowndb.config.js`:

```javascript
export default {
  // Include markdown files
  include: ['content/**/*.md'],
  
  // Exclude drafts
  exclude: ['content/drafts/**/*.md'],
  
  // Computed fields for enhanced querying
  computedFields: [
    (fileInfo, ast) => {
      // Extract first H1 as title if not in frontmatter
      const headerNode = ast.children.find((node) => node.type === 'heading' && node.depth === 1);
      if (headerNode && !fileInfo.title) {
        fileInfo.title = headerNode.children
          .map((child) => child.value)
          .join('');
      }
    },
    (fileInfo, ast) => {
      // Add type based on folder
      const path = fileInfo.path;
      if (path.includes('products')) fileInfo.type = 'product';
      if (path.includes('blog')) fileInfo.type = 'blog';
      if (path.includes('docs')) fileInfo.type = 'documentation';
    }
  ]
};
```

### Step 3: Create Query Script

Create `scripts/query.mjs`:

```javascript
import { MarkdownDB } from 'mddb';
import fs from 'fs';
import path from 'path';

const dbPath = './data/markdown.db';

async function main() {
  const client = new MarkdownDB({
    client: 'sqlite3',
    connection: { filename: dbPath },
  });

  const mddb = await client.init();
  
  // Get all files
  const allFiles = await mddb.getFiles();
  console.log(`\n📚 Total Files: ${allFiles.length}\n`);
  
  // Export as JSON
  fs.writeFileSync(
    './exports/documents.json',
    JSON.stringify(allFiles, null, 2)
  );
  
  console.log('✅ Exported to exports/documents.json');
  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
```

### Step 4: Set Up File Structure

```bash
# Create directories
mkdir -p content data exports logs

# Create sample markdown
cat > content/inference-guide.md << 'EOF'
---
title: Inference API Guide
type: documentation
tags: [inference, api, guide]
category: technical
---

# Inference API Guide

Our inference service provides low-latency access to state-of-the-art models.
EOF
```

### Step 5: Generate Initial Database

```bash
npx mddb content --output ./data/markdown.db
ls -lh data/markdown.db
```

### Step 6: Set Up Systemd Service (Auto-restart)

Create `/etc/systemd/system/quantum-mddb.service`:

```ini
[Unit]
Description=Quantum Vector Labs MarkdownDB Indexer
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/home/your-user/quantum-vector-mddb
ExecStart=/usr/bin/node scripts/query.mjs
Restart=on-failure
RestartSec=10
StandardOutput=append:/home/your-user/quantum-vector-mddb/logs/mddb.log
StandardError=append:/home/your-user/quantum-vector-mddb/logs/mddb-error.log

[Install]
WantedBy=multi-user.target
```

### Step 7: Enable and Start Service

```bash
sudo systemctl daemon-reload
sudo systemctl enable quantum-mddb
sudo systemctl start quantum-mddb

# Check status
sudo systemctl status quantum-mddb
```

### Step 8: Create Watch Script for Auto-Indexing

Create `scripts/watch.mjs`:

```javascript
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const contentDir = './content';
const dbPath = './data/markdown.db';

function reindex() {
  console.log(`[${new Date().toISOString()}] Reindexing...`);
  const proc = spawn('npx', ['mddb', contentDir, '--output', dbPath]);
  
  proc.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Reindex complete');
    } else {
      console.error(`❌ Reindex failed with code ${code}`);
    }
  });
}

// Watch for changes
fs.watch(contentDir, { recursive: true }, (eventType, filename) => {
  if (filename && filename.endsWith('.md')) {
    console.log(`📝 Changed: ${filename}`);
    reindex();
  }
});

console.log(`👀 Watching ${contentDir} for changes...`);
reindex(); // Initial index
```

Run with: `node scripts/watch.mjs`

### Step 9: Expose via API (Optional Node Server)

Create `server.mjs`:

```javascript
import http from 'http';
import { MarkdownDB } from 'mddb';

const dbPath = './data/markdown.db';

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const client = new MarkdownDB({
      client: 'sqlite3',
      connection: { filename: dbPath },
    });
    const mddb = await client.init();
    
    if (req.url === '/api/documents') {
      const files = await mddb.getFiles();
      res.writeHead(200);
      res.end(JSON.stringify(files));
    } else if (req.url.startsWith('/api/documents/')) {
      const name = req.url.split('/').pop();
      const files = await mddb.getFiles();
      const doc = files.find((f) => f.name === name);
      res.writeHead(doc ? 200 : 404);
      res.end(JSON.stringify(doc || { error: 'Not found' }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(3001, () => {
  console.log('📡 MarkdownDB API running on http://localhost:3001');
});
```

Run with: `node server.mjs`

### Step 10: Add to package.json Scripts

```json
{
  "scripts": {
    "index": "mddb content --output ./data/markdown.db",
    "watch": "node scripts/watch.mjs",
    "query": "node scripts/query.mjs",
    "serve": "node server.mjs",
    "all": "npm run serve & npm run watch"
  }
}
```

---

## 🎯 Quarterback: Testing Your Installation

### Next.js Testing Checklist

```bash
# 1. Install dependencies
npm install mddb

# 2. Create sample content
mkdir -p brain/docs
echo "---\ntitle: Test\ntags: [test]\n---\n# Test" > brain/docs/test.md

# 3. Index the database
npm run mddb:index

# 4. Verify database created
ls -lh lib/markdown.db

# 5. Test API endpoint
curl http://localhost:3000/api/documents

# 6. Check output
# Should see JSON array of indexed files
```

### VPS Testing Checklist

```bash
# 1. SSH into VPS
ssh user@your-vps-ip

# 2. Navigate to project
cd quantum-vector-mddb

# 3. Create test content
mkdir -p content
echo "---\ntitle: Vector DB\ntags: [vectordb]\n---\n# Vector Database" > content/test.md

# 4. Run indexing
npx mddb content --output ./data/markdown.db

# 5. Verify
sqlite3 ./data/markdown.db "SELECT * FROM files LIMIT 1;"

# 6. Test API (if using server)
curl http://localhost:3001/api/documents

# 7. Monitor logs
tail -f logs/mddb.log
```

---

## 🔧 Advanced Configuration

### Custom Frontmatter Schema

```yaml
---
title: My Document
type: product|blog|documentation
tags: [tag1, tag2]
date: 2026-03-27
authors: [name]
status: draft|published
relatedDocs: [slug1, slug2]
---
```

### Query Examples

```typescript
// Get all published files
const published = await mddb.getFiles().then(files =>
  files.filter(f => f.metadata?.status === 'published')
);

// Get by tag (requires custom query)
const byTag = await mddb.getFiles().then(files =>
  files.filter(f => f.metadata?.tags?.includes('inference'))
);

// SQL query directly
const sqlResults = await mddb.db.query(`
  SELECT files.* FROM files 
  INNER JOIN file_tags ON files._id = file_tags.file 
  WHERE file_tags.tag = 'vectordb'
`);
```

### Performance Tips

1. **Index size:** Use `exclude` patterns to skip drafts/archives
2. **Query caching:** Cache API responses with Next.js `revalidate`
3. **Incremental updates:** Use watch mode to rebuild only when needed
4. **Database location:** Store in `.next/` for Vercel to include in build

---

## 📊 Troubleshooting

| Issue | Solution |
|-------|----------|
| `ENOENT: markdown.db not found` | Run `npm run mddb:index` first |
| `Database locked` error | Stop watch process, retry, or restart service |
| `Vercel build fails` | Add `markdown.db` to `.gitignore`, regenerate at build time |
| `VPS API not accessible` | Check firewall: `sudo ufw allow 3001` |
| `Memory leak in watch mode` | Restart service regularly or use cron job |

---

## 🚀 Next Steps for Quantum Vector Labs

1. **Index product documentation** → Create `/brain/products/*.md`
2. **Build search API** → Query endpoint at `/api/search?q=inference`
3. **Integrate with GenAI** → Pass indexed docs to LLM context
4. **Version control** → Commit `markdown.db` OR regenerate at build time
5. **Monitor indexes** → Log file changes and index updates

---

## 📚 Resources

- **Official Docs:** https://markdowndb.com/
- **GitHub:** https://github.com/flowershow/markdowndb
- **NPM:** https://www.npmjs.com/package/mddb
- **Tutorial:** https://markdowndb.com/blog/basic-tutorial

---

**Created for Quantum Vector Labs**  
Inference | Vector DB | Custom GenAI Apps | Cloud Compute
