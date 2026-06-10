# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # Production build
npm run lint       # ESLint (js/jsx only, no TypeScript)
npm run preview    # Preview production build
```

No test runner is configured.

## Environment

Copy `.env.example` to `.env` and set:
- `VITE_API_URL` — REST API base URL (e.g. `http://localhost:8000/api/`)
- `VITE_WS_URL` — Socket.IO server URL (e.g. `http://localhost:8000`)
- `VITE_FILE_URL` — Public file/asset base URL (e.g. `http://localhost:8000/public/`)

## Architecture

**Stack:** React 19, Vite, Gravity UI (`@gravity-ui/uikit` + `@gravity-ui/navigation`), TanStack Query v5, React Router v7, Axios, Socket.IO client, SCSS Modules, `dayjs`.

**Path alias:** `@/` maps to `src/`.

**Routing (`src/App.jsx`):**
- `/login` and `/dashboard` are public (no auth wrapper).
- All other routes are wrapped in `PrivateRoutes`, which mounts `AuthContextProvider` + `SideNavigation` around the `<Outlet>`.

**Auth flow:**
- JWT token stored in `localStorage` as `{ token }` under the key `auth`.
- `src/services/api.js` — Axios instance that reads the token from localStorage on every request and redirects to `/login` on 401.
- `AuthContextProvider` (`src/providers/auth/`) fetches user info via `useUserInfoQuery` and exposes `{ user, logOut }` via `AuthContext`.

**Data fetching pattern (`src/services/`):**
Each domain (sale, manager, team, contract, auth) has two files:
- `api.js` — raw Axios calls using the shared `apiClient`.
- `query.js` — TanStack Query hooks (`useQuery` / `useMutation`).

Mutations use `useInfoMutation` (`src/services/query.js`), a shared wrapper that shows a Gravity UI toast on success/error and invalidates query cache by key.

**Real-time (`src/services/socket.js`):**
`useSocket()` is a hook that creates a Socket.IO connection to `VITE_WS_URL`. The dashboard listens for `new-sale` events to play a sound, trigger confetti when 100M is passed, and refresh sale stats.

**UI structure (`src/ui/`):**
- `pages/` — top-level route views, each with `index.jsx` and optional `main.module.scss`.
- `layouts/` — dialog/form compositions used across pages (e.g. `create-sale-dialog`, `side-navigation`).
- `components/` — reusable display components (charts, tables, cards).

**Role-based navigation:** Menu items with `forAdmin: true` are filtered out unless `auth.user.role === 'ADMIN'`. The dashboard page (`/dashboard`) is intentionally public — it is a display-only wall screen.

**UI language:** The application UI is in Uzbek.
