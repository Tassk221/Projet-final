import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const autoBase =
  process.env.GITHUB_ACTIONS === 'true' && repoName ? `/${repoName}/` : '/'
const base = process.env.VITE_BASE_PATH || autoBase

export default defineConfig({
  base,
  plugins: [
    tailwindcss(),
  ],
})
