import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))

// Output of a git command, or the fallback when git or the repo is missing
function git(args, fallback) {
  try {
    return execSync(`git ${args}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || fallback
  } catch {
    return fallback
  }
}

export default defineConfig(({ mode }) => {
  // CI and deploys without .git set VITE_COMMIT_SHA / VITE_COMMIT_DATE
  const env = { ...loadEnv(mode, process.cwd(), 'VITE_'), ...process.env }
  const commitSha = env.VITE_COMMIT_SHA || git('rev-parse HEAD', 'dev')
  const commitDate = env.VITE_COMMIT_DATE || git('log -1 --format=%cI', '')

  return {
    plugins: [react()],
    // Front build info shown in the footer (see src/component/shared/Footer)
    define: {
      __APP_VERSION__: JSON.stringify(version),
      __COMMIT_SHA__: JSON.stringify(commitSha),
      __COMMIT_DATE__: JSON.stringify(commitDate),
    },
    server: {
      port: 3000,
      // The backend has no CORS support: proxy API calls to it in development
      proxy: {
        '/api': {
          target: 'http://localhost:9090',
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'dist',
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.js'],
      restoreMocks: true,
      unstubGlobals: true,
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{js,jsx}'],
        exclude: ['src/test/**', 'src/**/*.test.{js,jsx}'],
        reporter: ['text-summary', 'lcov'],
      },
    },
  }
})
