import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import styleImport from 'vite-plugin-style-import';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
  server: {
    host: '0.0.0.0', 
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
