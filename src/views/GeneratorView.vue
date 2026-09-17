<script setup>
import { computed, ref } from 'vue'

// The generator builds the guest link from VITE_BASE_URL (the public origin
// the invitation will be shared from) + Vite's BASE_URL path prefix, so it
// works identically locally and on GitHub Pages, and the origin can be
// overridden via `.env` without touching code.
// Result:  {VITE_BASE_URL}/wedding-invitation/?to=Andi%20Pratama
const guestName = ref('')
const copied = ref(false)
let copyTimer = null

// VITE_BASE_URL should be the site ORIGIN (scheme://host[:port]), e.g.
// http://localhost:5173 locally or https://username.github.io in prod.
// Fall back to the current origin so `npm run dev` works with no .env.
const siteOrigin = import.meta.env.VITE_BASE_URL || window.location.origin

const baseUrl = computed(() => {
  const origin = siteOrigin.replace(/\/+$/, '')
  return origin + import.meta.env.BASE_URL
})

const link = computed(() => {
  const name = guestName.value.trim()
  if (!name) return baseUrl.value
  return `${baseUrl.value}?to=${encodeURIComponent(name)}`
})

const previewName = computed(() => guestName.value.trim() || 'Bapak/Ibu/Saudara/i')

async function copyLink() {
  const text = link.value
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    // Clipboard API unavailable — legacy fallback.
    const area = document.createElement('textarea')
    area.value = text
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    area.remove()
  }
  copied.value = true
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => (copied.value = false), 2200)
}
</script>

<template>
  <section class="gen">
    <div class="gen-rings" aria-hidden="true">
      <span class="ring ring-1"></span>
      <span class="ring ring-2"></span>
    </div>

    <div class="gen-card" v-reveal>
      <header class="gen-head">
        <span class="gen-star" aria-hidden="true">✦</span>
        <p class="gen-eyebrow">Dio &amp; Indriyani</p>
        <h1 class="gen-title">Generator Link Undangan</h1>
        <div class="star-divider" aria-hidden="true">✦</div>
      </header>

      <p class="gen-intro">
        Tulis nama tamu, lalu salin tautan undangan yang dipersonalisasi.
        Tamu yang membuka tautan akan disapa dengan nama mereka di dalam undangan.
      </p>

      <label class="gen-label" for="guest-input">Nama Tamu</label>
      <input
        id="guest-input"
        v-model.trim="guestName"
        class="gen-input"
        type="text"
        maxlength="120"
        placeholder="contoh: Andi Pratama"
        autocomplete="off"
      />

      <div class="gen-output">
        <span class="gen-output-label">Tautan yang dihasilkan</span>
        <p class="gen-output-url">{{ link || '…' }}</p>
      </div>

      <p class="gen-preview">
        Tampilan di undangan: <strong>Kepada Yth. {{ previewName }}</strong>
      </p>

      <div class="gen-actions">
        <button class="btn btn-gold gen-btn" type="button" @click="copyLink">
          <span aria-hidden="true">⌖</span> Salin Link
        </button>
        <RouterLink class="btn btn-ghost gen-btn" :to="guestName ? { path: '/', query: { to: guestName } } : '/'">
          Pratinjau Undangan
        </RouterLink>
      </div>

      <p class="gen-note">
        Link dapat dibuka oleh tamu di ponsel atau komputer mana pun — kartu
        undangan akan menampilkan nama mereka secara otomatis.
      </p>

      <p class="gen-back">
        <RouterLink to="/">← Kembali ke undangan</RouterLink>
      </p>
    </div>

    <Transition name="fade">
      <p v-if="copied" class="gen-toast" role="status">Link tersalin</p>
    </Transition>
  </section>
</template>

<style scoped>
.gen {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  display: grid;
  place-items: center;
  padding: 2.5rem 1.25rem;
  background: radial-gradient(120% 90% at 50% 0%, var(--navy-800) 0%, var(--navy-900) 48%, var(--navy-950) 100%);
  color: var(--text-strong);
}

.gen-rings {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.gen-rings .ring {
  position: absolute;
  width: 22rem;
  height: 22rem;
  border: 1px solid rgba(201, 173, 112, 0.14);
  border-radius: 50%;
}

.gen-rings .ring-2 {
  width: 32rem;
  height: 32rem;
  border-color: rgba(201, 173, 112, 0.08);
}

.gen-card {
  position: relative;
  width: min(100%, 30rem);
  background: var(--warm);
  color: var(--navy-800);
  border: 1px solid rgba(201, 173, 112, 0.6);
  border-radius: 8px;
  padding: 2.4rem 1.7rem 1.8rem;
  box-shadow: 0 32px 70px rgba(0, 0, 0, 0.5);
}

.gen-head {
  text-align: center;
}

.gen-star {
  color: var(--gold);
}

.gen-eyebrow {
  margin-top: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.32em;
  font-size: 0.66rem;
  color: var(--gold-deep);
}

.gen-title {
  font-family: var(--font-serif);
  font-weight: 500;
  font-size: clamp(1.7rem, 6vw, 2.2rem);
  line-height: 1.2;
  margin-top: 0.4rem;
}

.gen-intro {
  margin-top: 1.4rem;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--navy-700);
  text-align: center;
}

.gen-label {
  display: block;
  margin: 1.6rem 0 0.45rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.66rem;
  font-weight: 500;
  color: var(--gold-deep);
}

.gen-input {
  width: 100%;
  padding: 0.95rem 1rem;
  border: 1px solid rgba(11, 40, 84, 0.4);
  border-radius: 4px;
  background: var(--ivory);
  color: var(--navy-900);
  font-family: var(--font-sans);
  font-size: 1rem;
  transition: border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
}

.gen-input:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(201, 173, 112, 0.25);
}

.gen-input::placeholder {
  color: rgba(11, 40, 84, 0.4);
}

.gen-output {
  margin-top: 1.1rem;
  background: var(--navy-900);
  color: var(--text-soft);
  border: 1px solid rgba(201, 173, 112, 0.4);
  border-radius: 4px;
  padding: 0.8rem 1rem;
}

.gen-output-label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.58rem;
  color: var(--gold);
}

.gen-output-url {
  margin-top: 0.4rem;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
  word-break: break-all;
}

.gen-preview {
  margin-top: 1rem;
  font-size: 0.88rem;
  color: var(--navy-700);
  text-align: center;
}

.gen-preview strong {
  font-family: var(--font-serif);
  font-weight: 600;
  color: var(--navy-800);
}

.gen-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.gen-btn {
  width: 100%;
  min-height: 3.1rem;
}

.gen-note {
  margin-top: 1.3rem;
  font-size: 0.78rem;
  line-height: 1.6;
  color: var(--navy-700);
  text-align: center;
}

.gen-back {
  margin-top: 1.2rem;
  text-align: center;
  border-top: 1px solid rgba(11, 40, 84, 0.15);
  padding-top: 1.1rem;
}

.gen-back a {
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold-deep);
  transition: color 0.25s var(--ease);
}

.gen-back a:hover {
  color: var(--navy-800);
}

.gen-toast {
  position: fixed;
  bottom: 1.6rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 70;
  background: var(--navy-900);
  color: var(--gold-light);
  border: 1px solid rgba(201, 173, 112, 0.5);
  border-radius: 999px;
  padding: 0.65rem 1.5rem;
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.4);
}

@media (max-width: 380px) {
  .gen-card {
    padding: 2rem 1.2rem 1.5rem;
  }
}
</style>