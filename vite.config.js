import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  esbuild: { jsx: 'automatic' },
  build: {
    assetsDir: 'build',
    target: 'es2022',
  },
});
