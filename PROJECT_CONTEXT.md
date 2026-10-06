# Project Context

## Project Name
yamak-dashboard

## Project Purpose
Vue admin dashboard for Yamak operators and managers.

## Tech Stack
Vue 3.5, Vuetify 4.2, Vite 8.3, Pinia 4, Vuex 4, Axios 1, Vue i18n 11, CASL 7, ApexCharts 7, and npm 12.2.0.

## Authentication & Authorization
- CASL reads rules from `localStorage.userAbility`, falling back to the existing initial rules.
- Use `createMongoAbility` to retain condition and field matching when using CASL 7; the `Ability` constructor no longer supplies these defaults.

## Important Decisions
- npm and `package-lock.json` are the dependency installation reference; the former Yarn lockfile was removed.
- ESLint 10 uses `eslint.config.mjs`. Existing formatting rules use `@stylistic`; import rules retain the `import` namespace through `eslint-plugin-import-x`. The regex plugin uses ESLint's compatibility adapter.
- Stylelint 17 uses logical CSS and stylistic plugins. The existing idiomatic ordering configuration overrides its old `stylelint-order` dependency with compatible version 8.1.1.
- Vite configuration uses `vite.config.mjs`. Charts import official ApexCharts directly; the old Clevision fork alias was removed.
- Iconify tools and utilities load through dynamic ESM imports in the existing CommonJS icon builder. Build failures return a nonzero exit status.
- Datepicker 14 uses `formats.input`; Monday remains the first weekday through explicit `week-start` props. API-bound date models remain unchanged.
- FullCalendar 7 consolidates standard view plugins under `@fullcalendar/vue3/*` and requires `temporal-polyfill`. No FullCalendar imports were found in current application source.
- Unused Antfu/Airbnb lint presets, the i18n build plugin, and `yarn-upgrade-all` were removed. The layout plugin was already removed during the initial compatibility fix.
- npm 12 install scripts are allowed only for the reviewed, pinned Vue Demi, Parcel watcher, and UnRS resolver versions in `package.json`.

## Known Issues / Blockers
- Source lint/style violations remain; the upgrade does not apply project-wide automatic formatting.
- The 2026-10-05 audit reports zero production vulnerabilities and 15 high-severity development-tool findings, rooted in the current Braces/Micromatch dependency chain. Latest direct dependency versions do not eliminate these findings; do not resolve them by automatic breaking downgrades.
- An existing Vite server from before the upgrade needs restarting before UI validation. Windows retains locked old native binaries under the ignored `node_modules/.before-upgrade` folder; remove that folder after stopping the server, or let the next `npm ci` recreate dependencies.

## Setup Commands
- Use Node.js `^22.22.2 || ^24.15.0 || >=26` and npm 12.2.0.
- `npm ci` installs the locked dependency tree and runs Iconify bundle generation.
- `npm run dev` starts Vite; `npm run build` builds production assets.
- `npm run lint:check` checks source without edits; `npm run lint` applies automatic fixes.
- `npm run lint:styles` checks Vue, SCSS, and CSS styling without edits.

## Latest Changes
- 2026-10-05: Added versioned onboarding management. Introduced `src/store/onboardingActions.js` (flat Vuex actions against `api/dashboard/v1/onboardings`, including `publish`/`activate`/`disable` and `DELETE`), `src/views/onboardings/{Index,Create,Update,View}.vue` with the `useOnboardings` composable, `/onboardings` and `/onboardings/:id` routes, an `Onboarding` CASL subject, a vertical-nav entry after Ads, and onboarding labels in both locale files. Create/edit are dialogs from the list; the detail route is read-only. Draft rows expose Edit/Publish/Delete, published rows expose View plus Activate or Disable, mirroring the backend rule that published versions are immutable. The admin never enters a version number: the backend allocates it, and activation is a lifecycle action rather than a boolean toggle. Each slide's image is bound as a Cloudinary `secure_url` string, and the update payload omits `image` entirely when it is unchanged because the backend reads an explicit null as "delete image". `useUtils().t` resolves only through the active setup instance, so runtime messages are translated once into a `messages` object instead of inside rules and handlers. Production build passes; ESLint stays at the pre-existing baseline plus four `vue/custom-event-name-casing` errors that match the `v-model:is-open-*-dialog` convention already used by the advertisements dialogs. Backend CRUD runtime verification remains blocked on local database safety.
- 2026-10-05: Upgraded direct dependencies to latest stable registry releases. Changed the package manifest/lockfile, ESLint/Stylelint/Vite configuration, npm setup documentation and editor settings, CASL ability creation, Iconify builder, datepicker bindings, stable Vuetify datepicker import/update event, and the obsolete Vue lint suppression. Regenerated auto-import declarations. Clean npm 12 installation with strict peer checks, production build, targeted CASL checks, and date-input compilation passed. ESLint/Stylelint execute without configuration or parsing errors but report source violations. Development-only audit findings remain; browser and backend behavior require manual verification.
- 2026-10-05: Aligned ESLint and Stylelint dependencies in `package.json` and `yarn.lock`, selected SonarJS's legacy preset in `.eslintrc.js`, and removed the unused incompatible layout plugin to address npm peer dependency conflicts after major package upgrades. Yarn installation, npm install dry run, ESLint configuration loading, and Iconify generation succeeded. ESLint 8 is deprecated; a future upgrade requires a coordinated lint configuration migration.
