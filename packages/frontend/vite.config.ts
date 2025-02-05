import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { join } from 'path';

const PACKAGE_ROOT = __dirname;

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': join(PACKAGE_ROOT, 'src'),
    },
  },
  build: {
    outDir: '../backend/dist/webview',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        assetFileNames: 'index.[ext]',
      },
    },
  },
  optimizeDeps: {
    exclude: ['@podman-desktop-mcp/shared'],
  },
}); 