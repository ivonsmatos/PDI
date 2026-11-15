import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['meu-pdi-icone.png', 'meu-pdi-logo.png', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'Plano de Desenvolvimento Individual',
        short_name: 'Meu PDI',
        description: 'Um PWA para ajudar a estruturar e alcançar seus objetivos com um acompanhamento completo de competências e plano tático.',
        lang: 'pt-BR',
        start_url: '/app',
        background_color: '#ffffff',
        theme_color: '#017AA1',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    include: ['recharts', 'react-is'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/firebase')) return 'vendor-firebase';
          if (id.includes('node_modules/recharts')) return 'vendor-recharts';
        },
      },
    },
  },
})
