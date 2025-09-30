import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // CRITICAL: GitHub Pages deployment base path
  base: '/todo-reacts/', 
  
  // Explicitly ensure PostCSS/Tailwind is configured for CSS processing
  // NOTE: This block is usually only needed if you do NOT have a separate postcss.config.js file.
  css: {
    postcss: {
      plugins: [
        // Ensure these are configured if you are running this locally.
        // If your build fails here, ensure you have a separate postcss.config.js
        // require('tailwindcss'),
        // require('autoprefixer'),
      ],
    },
  },
  
  build:{
    sourcemap: true,
  },
})
