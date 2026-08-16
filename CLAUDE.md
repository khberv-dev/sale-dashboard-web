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

**Stack:** React 19, Vite, Gravity UI (`@gravity-ui/uikit`, `@gravity-ui/navigation`, `@gravity-ui/date-components`), TanStack Query v5, React Router v7, Axios, Socket.IO client, `react-hook-form`, Chart.js, SCSS Modules, `dayjs`.

**Path alias:** `@/` maps to `src/`.

**Providers (`src/main.jsx`):** `ToasterProvider` → `QueryClientProvider` → `ThemeProvider` (hardcoded `light`) → `App`. The `Toaster` instance is a module singleton in `src/services/toaster.js`.

**Routing (`src/App.jsx`):**
- `/login` and `/dashboard` are public (no auth wrapper).
- All other routes are wrapped in `PrivateRoutes`, which mounts `AuthContextProvider` + `SideNavigation` around the `<Outlet>`.
- `/dashboard` is a display-only wall screen; it mounts its *own* `AuthContextProvider` internally without the side nav.

**Auth flow:**
- JWT stored in `localStorage` as `{ token }` under the key `auth`.
- `src/services/api.js` — the shared Axios instance. Its request interceptor reads the token from localStorage on every call and hard-redirects to `/login` when absent (except for `auth/sign-in`); the response interceptor redirects on 401.
- `AuthContextProvider` (`src/providers/auth/`) fetches the user via `useUserInfoQuery` and exposes `{ user, logOut }`; children are not rendered until the user query settles, so `auth.user` is safe to read unconditionally in consumers.

**Data fetching (`src/services/<domain>/`):** each domain (`auth`, `sale`, `manager`, `team`, `contract`, `learning`) has two files:
- `api.js` — raw Axios calls via `apiClient`, returning `res.data`.
- `query.js` — TanStack Query hooks. Queries are one-line arrow consts (`export const useXQuery = (...) => useQuery({...})`).

Mutations normally go through `useInfoMutation` (`src/services/query.js`), a wrapper that toasts `data.message` on success / `error.response.data.message` on failure and invalidates a query key. Write a bespoke `useMutation` only when the response needs richer handling — see `useCreateEnrollmentMutation`, which toasts `warning` instead of `success` when `saleRecorded === false`, and `extractErrorMessage` for NestJS validation errors that arrive as a `message` array.

Global query default: `refetchOnWindowFocus: false`.

**Real-time (`src/services/socket.js`):** `useSocket()` creates a Socket.IO connection to `VITE_WS_URL`. It returns `ref.current`, which is `null` on the first render — always guard before subscribing. The dashboard listens for `new-sale` to play `assets/queue.mp3`, fire confetti when `data.is100MPassed`, and invalidate `['sale-stats']`.

**UI structure (`src/ui/`):**
- `pages/` — route views; page-local subcomponents live under `pages/<page>/elements/`.
- `layouts/` — dialogs and form compositions shared across pages (`create-sale-dialog`, `enroll-student-dialog`, `side-navigation`, …).
- `components/` — reusable display components (tables, charts, cards, inputs).

Each folder is `index.jsx` + optional `main.module.scss`, imported as `import st from './main.module.scss'`.

**Role-based navigation:** menu items in `side-navigation/index.jsx` marked `forAdmin: true` are filtered out unless `auth.user.role === 'ADMIN'`. This is presentation-only — the API enforces access.

## Conventions

- **UI language is Uzbek.** All user-visible strings, and the comments in newer code, are written in Uzbek.
- **Forms** use `react-hook-form` `Controller` around Gravity UI inputs, wrapped in `<FormField label={…}>` for the label. Money fields use `NumberInput` + `extractNumber()` on submit; dates use `@gravity-ui/date-components` + `dateTimeParse(...).format('YYYY-MM-DD')`.
- **Loading states** use the named skeletons in `src/ui/components/skeleton/` (`TableSkeleton`, `DashboardSkeleton`, `HomeSkeleton`, `SettingsSkeleton`) rather than spinners.
- **Formatting helpers** live in `src/utils/formatter.js` — `formatNumber` (space-grouped), `formatCompact` (K/M), `formatDuration`/`extractDurationSeconds` for call durations. Avatar URLs come from `getAvatarUrl()` in `src/utils/url-resolver.js`.
- **Style:** 4-space indent, no semicolons, single quotes, and spaces inside JSX expression braces (`{ value }`).
