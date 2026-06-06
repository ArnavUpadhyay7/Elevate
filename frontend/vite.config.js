import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@tabler/icons-react",
      "axios",
      "framer-motion",
      "lenis",
      "lucide-react",
      "react",
      "react-dom",
      "react-hot-toast",
      "react-router-dom",
      "socket.io-client",
      "zustand",
    ],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', '@tabler/icons-react'],
          'auth': ['zustand', 'axios'],
          'components': [
            './src/components/TimelineDemo.jsx'
          ]
        }
      }
    }
  }
})
