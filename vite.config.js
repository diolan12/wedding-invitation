import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ------------------------------------------------------------------
// GitHub Pages base path
// Change `base` below to match your repository name, for example:
//   repo:  https://github.com/username/wedding-invitation
//   site:  https://username.github.io/wedding-invitation/
//   base:  '/wedding-invitation/'
// ------------------------------------------------------------------
const REPOSITORY_NAME = 'wedding-invitation'

export default defineConfig({
  plugins: [vue()],
  base: `/${REPOSITORY_NAME}/`
})