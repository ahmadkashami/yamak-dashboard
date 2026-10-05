# yamak-dashboard (Admin Dashboard)

Vue 3 + Vuetify 4 admin dashboard for Yamak operators and managers. Connects to the Laravel backend dashboard API area.

- **Framework:** Vue 3
- **UI library:** Vuetify 4
- **Bundler:** Vite 8
- **API target:** `http://127.0.0.1:8000/api/dashboard/v1`

## Setup

Use Node.js 22.22.2+, 24.15.0+, or 26+ and npm 12.2.0. The project uses `package-lock.json` as its dependency lockfile.

```bash
npm ci
```

A `postinstall` script runs automatically to build the Iconify icon bundle.

## Running

```bash
npm run dev      # Vite dev server (hot reload)
npm run build    # Production build → dist/
npm run preview  # Preview production build on port 5050
```

## Code Style

```bash
npm run lint         # ESLint + auto-fix
npm run lint:check   # ESLint without changing source files
npm run lint:styles  # Stylelint without changing source files
```

## Key Features

- **Authentication** — Sanctum bearer tokens; role-based access via CASL (`@casl/vue`)
- **Charts** — ApexCharts + Chart.js
- **Data tables & grids** — Vuetify data tables
- **Date pickers** — Vue Datepicker + Flatpickr
- **Calendar** — FullCalendar (day grid, time grid, list views)
- **Internationalization** — vue-i18n
- **State management** — Pinia
- **HTTP client** — Axios
- **Icons** — MDI + Iconify

## Environment

Create a `.env` file to configure the API base URL and other runtime values. The Vite config exposes env variables to the app via `import.meta.env`.

## Build Output

Production assets are written to `dist/`. The dashboard is a SPA — configure the web server to serve `index.html` for all routes.
