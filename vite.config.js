import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // CRITICAL: GitHub Pages deployment base path
  base: '/todo-reacts/', 
  
  // CRITICAL: Explicitly ensure PostCSS/Tailwind is configured for CSS processing
  css: {
    postcss: {
      plugins: [
        // Ensure these are configured if you are running this locally
        // require('tailwindcss'),
        // require('autoprefixer'),
      ],
    },
  },
  
  build:{
    sourcemap: true,
  },
})
