import { createRouter, createWebHistory } from 'vue-router'
import InvitationView from '../views/InvitationView.vue'
import GeneratorView from '../views/GeneratorView.vue'

// History-mode routing → clean URLs, no `#/` in the address bar:
//   /wedding-invitation/            → undangan
//   /wedding-invitation/generator   → generator link
//
// The router base comes straight from Vite's `base` config
// (`vite.config.js` → `/wedding-invitation/`), so it automatically
// matches whatever deploy path the app is published under — the same
// base that Vite uses for the built asset URLs. No duplication, no
// redirect-on-load.
//
// Deep links: GitHub Pages only serves static files, so a hard refresh
// on `/generator` 404s unless you add a `404.html` redirect fallback
// (see README). The always-accessible entrypoint is `/`, which GitHub
// Pages serves as `index.html`.
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: InvitationView },
    { path: '/generator', name: 'generator', component: GeneratorView }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})