// lib/mddb.ts
import { MarkdownDB } from 'mddb';

const dbPath = './lib/markdown.db';

const client = new MarkdownDB({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
});

const clientPromise: Promise<MarkdownDB> = client.init();

export default clientPromise;
