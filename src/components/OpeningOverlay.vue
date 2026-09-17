<script setup>
import { onUnmounted, ref } from 'vue'
import { WEDDING } from '../config/wedding.js'

const emit = defineEmits(['open'])

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const phase = ref('idle')
const started = ref(false)
const timers = []

function start() {
  if (started.value) return
  started.value = true

  if (REDUCED_MOTION) {
    emit('open')
    return
  }

  phase.value = 'cover'
  // wait for the text crossfade (meta fades out, envelope fades in) to finish
  timers.push(setTimeout(() => (phase.value = 'open'), 750))
  timers.push(setTimeout(() => (phase.value = 'leave'), 2100))
  // give the zoom + fade-out room to play before revealing the invitation
  timers.push(setTimeout(() => emit('open'), 2750))
}

onUnmounted(() => timers.forEach(clearTimeout))
</script>

<template>
  <section class="opening" :class="`is-${phase}`" aria-label="Pembuka undangan">
    <div class="opening-rings" aria-hidden="true">
      <span class="ring ring-1"></span>
      <span class="ring ring-2"></span>
      <span class="ring ring-3"></span>
    </div>

    <div class="opening-grain" aria-hidden="true"></div>

    <!-- Cover View -->
    <div class="opening-meta">
      <p class="opening-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
      <p class="opening-eyebrow">The Wedding Of</p>

      <h1 class="opening-names">
        <span>{{ WEDDING.groomShort }}</span>
        <span class="amp">&amp;</span>
        <span>{{ WEDDING.brideShort }}</span>
      </h1>

      <p class="opening-date">{{ WEDDING.dateDot }}</p>

      <button class="btn btn-gold opening-btn" type="button" @click="start">
        Buka Undangan
      </button>
    </div>

    <!-- Envelope Animation Stage -->
    <div class="envelope-stage" aria-hidden="true">
      <div class="envelope">
        <!-- Back inside wall -->
        <div class="envelope-back"></div>

        <!-- Sliding Card -->
        <div class="envelope-card-wrapper">
          <div class="envelope-card">
            <span class="card-star">✦</span>
            <p class="card-eyebrow">Undangan Pernikahan</p>
            <p class="card-names">{{ WEDDING.groomShort?.[0] }} &amp; {{ WEDDING.brideShort?.[0] }}</p>
            <div class="card-line"></div>
            <p class="card-date">{{ WEDDING.dateDot }}</p>
          </div>
        </div>

        <!-- Front Pocket (Side & Bottom Folds) -->
        <div class="envelope-front"></div>

        <!-- Animated Top Flap -->
        <div class="envelope-flap"></div>

        <!-- Wax Seal -->
        <div class="envelope-seal">✦</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.opening {
  position: fixed;
  inset: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: radial-gradient(120% 90% at 50% 0%, var(--navy-800, #1e293b) 0%, var(--navy-900, #0f172a) 46%, var(--navy-950, #020617) 100%);
  z-index: 50;
  transform: scale(1);
  transform-origin: center;
  transition: opacity 0.6s ease, transform 0.6s ease, visibility 0.6s ease;
}

.opening.is-leave {
  opacity: 0;
  transform: scale(1.15);
  pointer-events: none;
}

.opening-grain {
  position: absolute;
  inset: 0;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
  pointer-events: none;
}

.opening-rings {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.ring {
  position: absolute;
  width: 19rem;
  height: 19rem;
  border: 1px solid rgba(201, 173, 112, 0.22);
  border-radius: 50%;
}

.ring-2 {
  width: 26rem;
  height: 26rem;
  border-color: rgba(201, 173, 112, 0.15);
}

.ring-3 {
  width: 33rem;
  height: 33rem;
  border-color: rgba(201, 173, 112, 0.1);
}

/* ---------- Cover Content ---------- */
.opening-meta {
  position: relative;
  z-index: 10;
  max-width: 90vw;
  padding: 1.5rem;
  animation: riseIn 1.1s ease both;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.is-cover .opening-meta,
.is-open .opening-meta,
.is-leave .opening-meta {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
  pointer-events: none;
  visibility: hidden;
}

.opening-bismillah {
  font-family: var(--font-arabic, serif);
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  color: var(--gold, #c9ad70);
  margin-bottom: 1.2rem;
}

.opening-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.35em;
  font-size: 0.75rem;
  color: var(--text-muted, #94a3b8);
  margin-bottom: 0.8rem;
}

.opening-names {
  font-family: var(--font-serif, serif);
  font-weight: 400;
  font-size: clamp(2rem, 7vw, 4rem);
  line-height: 1.2;
  color: var(--text-strong, #f8fafc);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
}

.opening-names .amp {
  font-style: italic;
  color: var(--gold, #c9ad70);
  font-size: 0.8em;
}

.opening-date {
  font-family: var(--font-serif, serif);
  font-size: clamp(1rem, 3.5vw, 1.3rem);
  letter-spacing: 0.18em;
  color: var(--text-soft, #cbd5e1);
  margin: 1.2rem 0 2rem;
}

.opening-btn {
  min-height: 3rem;
  padding: 0.75rem 2.2rem;
  border-radius: 9999px;
  background: var(--gold, #c9ad70);
  color: #0f172a;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ---------- Envelope Container ---------- */
.envelope-stage {
  position: absolute;
  inset: 0;
  z-index: 5;
  display: grid;
  place-items: center;
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.45s ease 0.3s, transform 0.5s ease 0.3s;
  pointer-events: none;
}

.is-cover .envelope-stage,
.is-open .envelope-stage {
  opacity: 1;
  transform: scale(1);
}

.is-leave .envelope-stage {
  /* zoom + fade the envelope itself as the whole section zooms out */
  opacity: 0;
  transform: scale(1.2);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.envelope {
  position: relative;
  /* Bigger envelope */
  width: min(92vw, 460px);
  height: 300px;
  perspective: 1000px;
  transform: rotate(-3deg);
  transition: transform 0.55s ease;
  margin-top: 50px;
  /* Offset space so card doesn't clip screen top when sliding out */
}

.is-cover .envelope,
.is-open .envelope {
  transform: rotate(0deg);
}

.envelope-back {
  position: absolute;
  inset: 0;
  border-radius: 10px;
  background: #0f172a;
  border: 1px solid rgba(201, 173, 112, 0.4);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.5);
}

/* Card Slot (overflow visible so card can rise out) */
.envelope-card-wrapper {
  position: absolute;
  inset: 0;
  overflow: visible;
  border-radius: 10px;
  z-index: 2;
}

.envelope-card {
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: 8%;
  height: 84%;
  background: linear-gradient(170deg, #fefae0, #f8f5d7);
  color: #1e293b;
  border: 1px solid rgba(201, 173, 112, 0.6);
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.75rem;
  transform: translateY(0%);
  transition: transform 0.85s cubic-bezier(0.4, 0, 0.2, 1);
}

.is-open .envelope-card {
  transform: translateY(-55%);
}

.card-star {
  color: #b45309;
  font-size: 1.1rem;
}

.card-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 0.7rem;
  color: #b45309;
}

.card-names {
  font-family: var(--font-serif, serif);
  font-size: 2rem;
  font-weight: 600;
  color: #0f172a;
}

.card-line {
  width: 2.75rem;
  height: 1px;
  background: rgba(180, 83, 9, 0.4);
}

.card-date {
  font-family: var(--font-serif, serif);
  font-size: 1rem;
  letter-spacing: 0.15em;
  color: #334155;
}

/* Opaque Front Pocket */
.envelope-front {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

.envelope-front::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 10px;
  background: #0f172a;
  /* Fully opaque background */
  clip-path: polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%);
  border: 1px solid rgba(201, 173, 112, 0.3);
}

/* Top Flap */
.envelope-flap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 55%;
  background: #1e293b;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top center;
  transform: rotateX(0deg);
  z-index: 4;
  transition: transform 0.6s ease;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.is-open .envelope-flap {
  transform: rotateX(180deg);
  z-index: 1;
}

/* Wax Seal */
.envelope-seal {
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #78350f;
  border: 1px solid #f59e0b;
  color: #fbbf24;
  font-size: 1rem;
  display: grid;
  place-items: center;
  transition: opacity 0.3s ease;
}

.is-open .envelope-seal {
  opacity: 0;
}
</style>