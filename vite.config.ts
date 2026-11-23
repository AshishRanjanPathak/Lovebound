/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'LOVEBOUND - Anime Fantasy Action Adventure',
        short_name: 'LOVEBOUND',
        description: 'Anime-inspired 2D side-scrolling fantasy action-adventure game',
        theme_color: '#101323',
        background_color: '#101323',
        display: 'standalone',
        orientation: 'landscape',
        icons: [
          {
            src: '/assets/branding/logo/lovebound-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    host: true
  },
  test: {
    setupFiles: ['./src/__tests__/setup.ts'],
  }
});

