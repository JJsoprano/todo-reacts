import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/todo-reacts/',  // ✅ important for GitHub Pages
  build: {
    sourcemap: true,
  },
})
