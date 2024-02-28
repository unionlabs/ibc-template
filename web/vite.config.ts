import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
  plugins: [sveltekit()],

  server: {
    port: Number(process.env.PORT || 5173),
    hmr: { overlay: false }
  },
  // Node polyfills
  define: { 'process.env': {} },
  resolve: { alias: { 'node:buffer': 'buffer' } }
})
