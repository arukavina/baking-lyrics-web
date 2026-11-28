# baking-lyrics-web

Web front end for Baking-Lyrics, an engine that generates song lyrics in the style of an artist from a few seed words.

It is a React 19 single page app built with Vite, using react-router 7 and Redux Toolkit. It talks to the [Baking-Lyrics backend](https://github.com/arukavina/baking-lyrics) (Flask, routes under `/api/v1`).

## Prerequisites

- Node.js 26 LTS (npm comes with it), the same version CI and the Vercel deploy use.
- A running Baking-Lyrics backend for anything beyond the static pages.

## Install

```bash
npm ci
```

## Run the backend first

Set up and start the backend as described in its [README](https://github.com/arukavina/baking-lyrics#readme), then start the API on port 9090:

```bash
uv run flask --app baking.manage run --port 9090
```

Without the optional ML models the backend answers 503 to generation requests, and the app shows a friendly "generator is offline" message instead of lyrics.

## Development server

```bash
npm run dev
```

The app runs at http://localhost:3000. Requests to `/api` are proxied to http://localhost:9090 (see `vite.config.js`), so no CORS setup is needed in development.

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_URL` | `/api/v1` | Base URL of the backend API. |
| `VITE_COMMIT_SHA`, `VITE_COMMIT_DATE` | read from git | Commit shown in the footer as `(front)`; set them when building without git history. |

The default is same origin, which the dev proxy serves. In production `VITE_API_URL` is the backend's AWS Lambda Function URL plus `/api/v1`, set as a Production environment variable on the Vercel project and read at build time; the backend allows the site's origins through CORS (`ALLOWED_ORIGINS`). See `.env.example`; put local overrides in `.env.local`.

## Tests and lint

```bash
npm test
npm run lint
```

Tests use Vitest, jsdom and Testing Library, with the backend mocked at the fetch level. Lint uses ESLint 9 with a flat config (`eslint.config.js`).

## Build

```bash
npm run build
npm run preview
```

`npm run build` writes the production bundle to `dist/`. `npm run preview` serves that bundle locally to check it.

## Deployment

The app is hosted on Vercel (project `baking-lyrics-web`). Every push to `master` runs `.github/workflows/deploy.yml`: it runs the same lint, tests and build as CI, then builds with the Vercel CLI and deploys to production. Pull requests only run CI.

Repository secrets used by the deploy:

- `VERCEL_TOKEN`: a Vercel access token for the team that owns the project.
- `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`: from `.vercel/project.json`, created locally by `vercel link`.

To redeploy without a new commit, run the Deploy workflow manually from the Actions tab (`gh workflow run deploy.yml`).

`vercel.json` serves `index.html` for every path except `/api/` and `/assets/` so client side routes such as `/about-us` load directly while missing API routes and assets return a real 404, and caches the hashed files in `/assets` for a year. The backend runs on AWS Lambda and is called directly through `VITE_API_URL`, so `vercel.json` has no API rewrite; changing `VITE_API_URL` on Vercel needs a redeploy (run the Deploy workflow) because it is baked in at build time.
