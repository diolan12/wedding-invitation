import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// ------------------------------------------------------------------
// Scroll reveal directive
// Usage: <div v-reveal> ... </div>   (optionally: v-reveal="120" for delay ms)
// Adds `.in-view` when the element enters the viewport (runs once).
// ------------------------------------------------------------------
const REDUCED_MOTION =
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

app.directive('reveal', {
  mounted(el, binding) {
    if (REDUCED_MOTION) return

    el.classList.add('reveal')
    const delay = typeof binding.value === 'number' ? binding.value : 0
    if (delay) el.style.transitionDelay = `${delay}ms`

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('in-view')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    )

    io.observe(el)
    el._revealObserver = io
  },
  unmounted(el) {
    if (el._revealObserver) el._revealObserver.disconnect()
  }
})

app.mount('#app')