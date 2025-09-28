import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 1. Base path for GitHub Pages deployment
  base: '/todo-reacts/', 
  // 2. Comma added here
  build: { 
    sourcemap: true,
  },
})

