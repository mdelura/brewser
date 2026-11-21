/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: '/brewser/',
    plugins: [
        react(),
        VitePWA({
            // Same filename CRA used, so existing installs pick up the new worker.
            filename: 'service-worker.js',
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'robots.txt', 'bell.mp3'],
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3}'],
            },
            manifest: {
                short_name: 'Brewser',
                name: 'Brewser - Coffee Brewing App',
                icons: [
                    { src: 'favicon.ico', sizes: '64x64 32x32 24x24 16x16', type: 'image/x-icon' },
                    { src: 'logo256.png', type: 'image/png', sizes: '256x256' },
                    { src: 'logo512.png', type: 'image/png', sizes: '512x512' },
                ],
                start_url: '.',
                display: 'standalone',
                theme_color: '#000000',
                background_color: '#ffffff',
            },
        }),
    ],
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
    },
});
