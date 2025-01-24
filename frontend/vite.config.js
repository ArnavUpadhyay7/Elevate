import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', '@tabler/icons-react'],
          'auth': ['zustand', 'axios'],
          'components': [
            './src/components/ThreeDCardDemo.jsx',
            './src/components/GlobeDemo.jsx',
            './src/components/TimelineDemo.jsx'
          ]
        }
      }
    }
  }
})