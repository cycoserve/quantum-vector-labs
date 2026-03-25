# QVL Master Leader Brain — File Tree
# AXON-PRIME | Quantum Vector Labs | High Limit Designs

leader_brain/
│
├── brain.json                          ← THE GENOME. Master brain. Read this first.
│
├── dreams/
│   ├── _inbox/                         ← Drop new dreams here
│   │   └── dream_qvl_001_website.md    ← First dream (website build brief)
│   ├── _active/                        ← Pulse moves dreams here while processing
│   └── _archive/                       ← Permanent record. Never deleted.
│
├── colonies/
│   ├── qualifier/                      ← A&R Scout inbox and outputs
│   │   └── outputs/
│   ├── validator/                      ← Research Analyst inbox and outputs
│   │   └── outputs/
│   ├── builder/                        ← Producer/Developer inbox and outputs
│   │   └── outputs/
│   ├── supervisor/                     ← Label Executive inbox and outputs
│   │   └── outputs/
│   ├── promoter/                       ← Marketing Strategist inbox and outputs
│   │   └── outputs/
│   ├── pulse/                          ← Router logs and dispatch records
│   │   └── logs/
│   ├── human/                          ← Owner review queue. High risk or ambiguous.
│   └── final_outputs/                  ← Every completed loop lands here
│       └── manifest.json               ← Index of all completed outputs
│
├── network/
│   ├── nodes/                          ← Spawned client brain instances live here
│   │   └── .gitkeep
│   └── spawn_log.json                  ← Record of every spawn event
│
├── templates/
│   ├── spawn_template.json             ← Base config for spawning new nodes
│   ├── dream_template.md               ← Standard dream frontmatter template
│   └── dispatch_template.md            ← Standard dispatch format for colonies
│
├── api/
│   ├── server.js                       ← VPS API server (Express, minimal)
│   ├── routes/
│   │   ├── dreams.js                   ← POST /dreams, GET /dreams, GET /dreams/:id
│   │   ├── state.js                    ← GET /state
│   │   ├── outputs.js                  ← GET /outputs, GET /outputs/:id
│   │   ├── pulse.js                    ← POST /pulse (manual trigger)
│   │   ├── routing.js                  ← GET /routing-log
│   │   └── patterns.js                 ← GET /patterns
│   └── middleware/
│       └── auth.js                     ← Bearer token validation
│
├── scripts/
│   ├── bootstrap.js                    ← Run once. Builds structure from brain.json
│   ├── pulse.js                        ← The heartbeat. Sense → Classify → Route → Learn
│   ├── spawn.js                        ← Spawn a new client node from master brain
│   └── sync.js                         ← Sync pattern library to all active nodes
│
├── docs/
│   ├── AXON_LeaderBrain_Brief.md       ← Full technical brief for coding agents
│   ├── ARCHITECTURE.md                 ← System architecture overview
│   ├── DREAMS.md                       ← Dream format specification
│   ├── AGENTS.md                       ← Agent definitions and rules
│   ├── API.md                          ← API endpoint documentation
│   └── SPAWN.md                        ← How to spawn and manage client nodes
│
└── .env.example
    BRAIN_API_KEY=
    BRAIN_API_URL=
    ANTHROPIC_API_KEY=
    VULTR_INFERENCE_URL=
    VULTR_INFERENCE_KEY=
    NODE_ENV=production


# ─────────────────────────────────────────────────────────────
# QVL NEXT.JS APP — Connection Points
# ─────────────────────────────────────────────────────────────

qvl-website/
│
├── lib/
│   └── brain.ts                        ← Brain API connection layer
│
├── app/
│   ├── page.tsx                        ← Landing page
│   ├── learn/
│   │   └── page.tsx                    ← Leader Brain + AXON explainer
│   ├── chat/
│   │   └── page.tsx                    ← QVL AI assistant UI
│   ├── pricing/
│   │   └── page.tsx                    ← Pricing (pending)
│   ├── blog/
│   │   └── page.tsx                    ← Coming later
│   └── admin/                          ← Stack Auth protected
│       ├── page.tsx                    ← Dream dashboard
│       ├── dreams/
│       │   └── page.tsx                ← Drop and monitor dreams
│       ├── outputs/
│       │   └── page.tsx                ← Browse final_outputs
│       └── brain/
│           └── page.tsx                ← Live brain.json viewer
│
└── app/api/
    ├── chat/
    │   └── route.ts                    ← Streaming chat → Brain API
    ├── dreams/
    │   └── route.ts                    ← POST dream from admin UI
    └── pulse/
        └── route.ts                    ← Trigger pulse from admin UI


# ─────────────────────────────────────────────────────────────
# SETUP ORDER
# ─────────────────────────────────────────────────────────────

# 1. Clone or create the leader_brain/ folder on your VPS
# 2. Copy brain.json into root
# 3. Run: node scripts/bootstrap.js
# 4. Set your .env values
# 5. Run: node api/server.js
# 6. Confirm API is live at BRAIN_API_URL/state
# 7. Add BRAIN_API_URL and BRAIN_API_KEY to qvl-website/.env.local
# 8. Build /learn page first
# 9. Build /chat page second
# 10. Build /admin dashboard third
