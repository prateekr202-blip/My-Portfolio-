import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    allowedHosts: [
      'exam-bureau-terminal-chevy.trycloudflare.com',
      'current-laboratory-trusts-poetry.trycloudflare.com'
    ]
  }
})
