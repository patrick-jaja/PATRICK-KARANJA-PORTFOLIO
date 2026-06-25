import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: { input: 'index.html' },
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true,
  },
});
