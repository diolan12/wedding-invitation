<script setup>
import { WEDDING } from '../config/wedding.js'

defineEmits(['open'])
</script>

<template>
  <section class="opening" aria-label="Pembuka undangan">
    <div class="opening-rings" aria-hidden="true">
      <span class="ring ring-1"></span>
      <span class="ring ring-2"></span>
      <span class="ring ring-3"></span>
    </div>

    <div class="opening-grain" aria-hidden="true"></div>

    <div class="opening-content">
      <p class="opening-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
      <p class="opening-eyebrow">The Wedding Of</p>

      <h1 class="opening-names">
        <span>{{ WEDDING.groomShort }}</span>
        <span class="amp">&amp;</span>
        <span>{{ WEDDING.brideShort }}</span>
      </h1>

      <p class="opening-date">{{ WEDDING.dateDot }}</p>

      <!-- Entering the invitation is one tap and never blocks scrolling. -->
      <button class="btn btn-gold opening-btn" type="button" @click="$emit('open')">
        Buka Undangan
      </button>
    </div>
  </section>
</template>

<style scoped>
.opening {
  position: fixed;
  inset: 0;
  overflow: hidden;
  display: grid;
  place-items: center;
  text-align: center;
  background: radial-gradient(120% 90% at 50% 0%, var(--navy-800) 0%, var(--navy-900) 46%, var(--navy-950) 100%);
  z-index: 50;
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

.opening-content {
  position: relative;
  padding: 2rem;
  animation: riseIn 1.1s var(--ease) both;
}

.opening-bismillah {
  font-family: var(--font-arabic);
  font-size: clamp(1.3rem, 5vw, 1.7rem);
  color: var(--gold);
  margin-bottom: 1.6rem;
}

.opening-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-bottom: 1.2rem;
}

.opening-names {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(2.9rem, 12vw, 5.5rem);
  line-height: 1.05;
  color: var(--text-strong);
}

.opening-names .amp {
  display: inline-block;
  font-style: italic;
  color: var(--gold);
  font-size: 0.72em;
  margin: 0 0.2em;
  transform: translateY(-0.05em);
}

.opening-date {
  font-family: var(--font-serif);
  font-size: clamp(1.1rem, 4vw, 1.5rem);
  letter-spacing: 0.18em;
  color: var(--text-soft);
  margin: 1.6rem 0 2.4rem;
}

.opening-btn {
  min-height: 3.25rem;
  padding: 0.8rem 2.6rem;
}

@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 480px) {
  .ring-3 {
    display: none;
  }
}
</style>