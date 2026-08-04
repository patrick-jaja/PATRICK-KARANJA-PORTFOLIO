import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';

const htmlFiles = readdirSync(__dirname).filter(file => file.endsWith('.html'));
const input = {};
htmlFiles.forEach(file => {
  const name = file.replace('.html', '');
  input[name] = resolve(__dirname, file);
});

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: { input },
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true,
  },
});
