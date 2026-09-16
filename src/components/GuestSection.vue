<script setup>
import { computed } from 'vue'

// ------------------------------------------------------------------
// Personalized guest name from the URL query parameter.
//
// Examples that work:
//   ?to=Andi%20Pratama
//   ?to=Bapak%20%26%20Ibu%20Santoso
//   ?to=Keluarga%20Widoyoko
//
// The name is rendered through Vue's text interpolation ({{ }}), which
// escapes it as plain text — never treated as HTML. This keeps a
// malicious URL parameter harmless.
// ------------------------------------------------------------------
const guestName = computed(() => {
  const raw = new URLSearchParams(window.location.search).get('to')
  if (!raw) return 'Bapak/Ibu/Saudara/i'
  return raw
    .trim()
    .replace(/[\u0000-\u001f<>]/g, '')
    .slice(0, 120)
})
</script>

<template>
  <section id="guest" class="section guest">
    <div class="container container-narrow">
      <div class="guest-content" v-reveal>
        <p class="guest-kicker">Kepada Yth.</p>
        <p class="guest-name" v-text="guestName"></p>
        <div class="star-divider" aria-hidden="true">✦</div>
        <p class="guest-note">
          Kehadiran serta doa restu Bapak/Ibu/Saudara/i merupakan suatu kehormatan
          dan kebahagiaan bagi kami.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.guest {
  background: linear-gradient(180deg, var(--navy-800), var(--navy-900));
  text-align: center;
}

.guest-content {
  padding: 0.5rem 0;
}

.guest-kicker {
  text-transform: uppercase;
  letter-spacing: 0.34em;
  font-size: 0.7rem;
  color: var(--text-muted);
}

.guest-name {
  font-family: var(--font-serif);
  font-size: clamp(1.9rem, 7.5vw, 2.9rem);
  line-height: 1.25;
  color: var(--text-strong);
  margin: 0.8rem 0 1rem;
  overflow-wrap: anywhere;
}

.guest-note {
  max-width: 30rem;
  margin: 1.4rem auto 0;
  font-size: 0.9rem;
  color: var(--text-soft);
}
</style>