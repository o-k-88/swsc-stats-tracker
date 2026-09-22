# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) then production build
- `npm run lint` — run ESLint over the project
- `npm run preview` — serve the production build locally

There is no test suite configured in this project.

## Architecture

This is a static stats-tracking site for two youth soccer teams (U11 NYCFC, U13 EA), built with React 19 + TypeScript + Vite + react-router-dom. There is no backend — all data is bundled JSON, and the site is a read-only viewer over it.

**Data layer** (`src/data/`):
- `types.ts` defines the shape of the data: `Team`, `TeamRecord`, `Player`, `TeamEvent`. `Team.record` is optional; `TeamRecord` requires `goalsFor`/`goalsAgainst` alongside `wins`/`losses`/`draws`/`total`.
- `teams/*.json` holds one file per team, each matching the `Team` shape. Adding a team means adding a new JSON file here — nothing else needs to change, since `loadTeams.ts` discovers files automatically.
- `loadTeams.ts` uses `import.meta.glob("./teams/*.json", { eager: true })` to load every team file at build time and exposes `teams` (sorted by name), plus `getTeam`, `getPlayer`, `topScorers`, `topAssisters`. All pages and components read team/player data exclusively through this module rather than importing JSON directly.

**Routing** (`src/App.tsx`): four routes — `/` (Home), `/teams/:teamId` (TeamPage), `/teams/:teamId/players/:playerId` (PlayerPage), `/privacy-policy`. `TeamPage` and `PlayerPage` look up their data via `useParams` + `getTeam`/`getPlayer` and `<Navigate to="/" replace />` if the id doesn't resolve.

**Important routing gotcha**: `TeamPage` and `PlayerPage` are mounted once per route pattern, not once per team/player — react-router does not remount the component when only the `:teamId`/`:playerId` param changes (e.g. clicking between teams in the header nav). Any local `useState` that should be scoped to "the current team/player" (such as `TeamPage`'s roster search/filter state) must be explicitly reset on param change, or it will silently carry over from the previously viewed team/player.

**Components** (`src/components/`): `Header` renders nav links generated from `teams`; `Avatar` renders initials colored by player position; `ShareChart` is a small bar-chart component used on `PlayerPage` to show a player's share of team totals; `Footer` is static.

**Styling**: a single global stylesheet (`src/index.css`) with BEM-ish class names (e.g. `team-card__stats`, `leaderboard__player`); no CSS modules or CSS-in-JS.
