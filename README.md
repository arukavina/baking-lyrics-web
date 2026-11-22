# baking-lyrics-web

Web front end for Baking-Lyrics, an engine that generates song lyrics in the style of an artist from a few seed words.

It is a React 19 single page app built with Vite, using react-router 7 and Redux Toolkit. It talks to the [Baking-Lyrics backend](https://github.com/arukavina/baking-lyrics) (Flask, routes under `/api/v1`).

## Prerequisites

- Node.js 22 or newer (npm comes with it).
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

The default is same origin. The backend has no CORS support, so in production the web server that serves the app must reverse proxy `/api` to the backend; pointing `VITE_API_URL` at another host will be blocked by the browser. See `.env.example`; put local overrides in `.env.local`.

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
