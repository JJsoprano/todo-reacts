import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/todo-reacts/' : '/',  // Use different base for dev vs build
  build: {
    sourcemap: true,
  },
}))
