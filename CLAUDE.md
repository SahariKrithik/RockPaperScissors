# Rock Paper Scissors - Project Orientation

A small two-part web game: static frontend (`frontend/`) + Node.js/Express backend (`backend/`). The player battles the computer, builds a win streak, and dead streaks go onto a top 10 leaderboard (MongoDB, with an in-memory fallback when no `MONGODB_URI` is set).

## Current state

v1 complete. Local play works with `npm install` + `npm start` at http://localhost:3000 (the backend serves the frontend statically in local dev). Deployment targets: Vercel (frontend), Render (backend), MongoDB Atlas (database) - checklist in README.md. Not yet deployed.

## Critical working agreements

1. NEVER commit without an explicit ask. No AI attribution in commit messages.
2. No AI-looking comments. No em dashes anywhere - use regular dashes.
3. Keep code simple - this is a fun toy project, no premature abstractions, no build tooling for the frontend.
4. The backend URL for the frontend lives in ONE place: `frontend/config.js`. Don't scatter it.
5. Validate only at system boundaries (HTTP request bodies); trust internal code.

## Where things live

- `docs/HANDOFF.md` - working journal, read this first each session
- `docs/PROJECT_STATUS.md` - phase/milestone state
- `docs/DECISIONS.md` - ADR log for the choices made
- `README.md` - user-facing quickstart + numbered deploy checklist
