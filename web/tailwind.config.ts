import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ['dark']
}
