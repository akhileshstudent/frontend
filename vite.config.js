import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [{
    name: 'filter-react-router-client-directive-warning',
    onLog(level, log) {
      if (level === 'warn' && log.code === 'MODULE_LEVEL_DIRECTIVE'
          && log.message.includes('"use client"') && log.id?.includes('/react-router/dist/development/')) return false;
    }
  }],
  build: {
    sourcemap: false
  },
  server: {
    host: 'localhost',
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true }
    }
  }
});
