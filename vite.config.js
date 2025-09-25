import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/todo-reacts/',   // 👈 must match your GitHub repo name exactly
  build:{
  sourcemap: true,
 }, // helps bust cache
})
