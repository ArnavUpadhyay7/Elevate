import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:4001',
      '/player': 'http://localhost:4001',
      '/coach': 'http://localhost:4001',
      '/payment': 'http://localhost:4001',
      '/message': 'http://localhost:4001',
      '/chat-bot': 'http://localhost:4001',
      '/reviews': 'http://localhost:4001',
      '/health': 'http://localhost:4001',
      '/socket.io': { target: 'http://localhost:4001', ws: true },
    },
  },
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
