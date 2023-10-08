import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  clean: true,
  minify: true,
  splitting: true,
  sourcemap: false,
  format: ['cjs', 'esm'],
  entry: ['src/index.ts'],
});