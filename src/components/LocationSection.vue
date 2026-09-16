<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { WEDDING } from '../config/wedding.js'

const open = ref(false)

// Build the two map links from the central config.
// - Google Maps prefers the authoritative short link and falls back to a
//   coordinate search URL, so it opens natively on Android when possible.
// - Apple Maps uses the ll/q URL format, so it opens natively on iOS.
const latitude = WEDDING.location.latitude
const longitude = WEDDING.location.longitude
const placeLabel = encodeURIComponent('Sempu, Banyuwangi')

const googleSearchUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
const googleUrl = WEDDING.maps.google || googleSearchUrl
const appleUrl = `https://maps.apple.com/?ll=${latitude},${longitude}&q=${placeLabel}`

function onKeydown(event) {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <section id="location" class="section location">
    <div class="container">
      <div class="location-content" v-reveal>
        <p class="section-eyebrow">Venue</p>
        <h2 class="section-title">Lokasi Acara</h2>
        <div class="star-divider" aria-hidden="true">✦</div>

        <p class="location-name">
          {{ WEDDING.location.name }}, {{ WEDDING.location.region }}
        </p>
        <p class="location-hint">
          Lokasi gedung dapat dilihat melalui peta pada tombol di bawah ini.
        </p>

        <!--
          One primary button opens a compact map chooser so the guest can pick
          the natural app for their device (Google Maps / Apple Maps). Its target
          behaviour also keeps the browser as a reliable fallback on any platform.
        -->
        <button
          class="btn btn-gold location-btn"
          type="button"
          :aria-expanded="open"
          aria-controls="map-choice"
          @click="open = !open"
        >
          <span aria-hidden="true">⌖</span> Lihat Lokasi <span aria-hidden="true">⌖</span>
        </button>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="open" id="map-choice" class="modal">
        <div class="modal-backdrop" @click="open = false"></div>
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="map-modal-title">
          <button class="modal-close" type="button" @click="open = false" aria-label="Tutup">
            ×
          </button>
          <p class="modal-kicker">Buka di aplikasi peta</p>
          <p id="map-modal-title" class="modal-title">
            {{ WEDDING.location.name }}, {{ WEDDING.location.region }}
          </p>

          <div class="modal-actions">
            <a class="btn btn-gold" :href="googleUrl" target="_blank" rel="noopener noreferrer">
              Google Maps
            </a>
            <a class="btn btn-ghost" :href="appleUrl" target="_blank" rel="noopener noreferrer">
              Apple Maps
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.location {
  background: var(--warm);
  color: var(--text-navy);
  text-align: center;
}

.location-content {
  margin: 0 auto;
}

.location-name {
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 6vw, 2.2rem);
  font-weight: 500;
  color: var(--navy-800);
  margin-top: 1.6rem;
}

.location-hint {
  color: var(--navy-700);
  font-size: 0.95rem;
  max-width: 26rem;
  margin: 0.6rem auto 2rem;
}

.location-btn {
  min-height: 3.25rem;
  padding: 0.8rem 2.6rem;
}
</style>