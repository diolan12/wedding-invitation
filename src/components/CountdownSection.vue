<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { WEDDING } from '../config/wedding.js'

// Countdown target: 10:00 WIB on 23 December 2026 (+07:00 / Asia/Jakarta).
const target = new Date(WEDDING.dateISO).getTime()

const now = ref(Date.now())
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const finished = computed(() => target - now.value <= 0)

const parts = computed(() => {
  const diff = Math.max(0, target - now.value)
  const pad = (n, len) => String(n).padStart(len, '0')
  return {
    days: pad(Math.floor(diff / 86400000), 3),
    hours: pad(Math.floor(diff / 3600000) % 24, 2),
    minutes: pad(Math.floor(diff / 60000) % 60, 2),
    seconds: pad(Math.floor(diff / 1000) % 60, 2)
  }
})

const units = [
  { key: 'days', label: 'Hari' },
  { key: 'hours', label: 'Jam' },
  { key: 'minutes', label: 'Menit' },
  { key: 'seconds', label: 'Detik' }
]
</script>

<template>
  <section id="countdown" class="section countdown">
    <div class="container">
      <div class="countdown-content" v-reveal>
        <p class="section-eyebrow">Menuju Hari Bahagia</p>

        <div v-if="finished" class="countdown-done">
          <span class="countdown-star" aria-hidden="true">✦</span>
          <p>Hari yang dinantikan telah tiba ✦</p>
        </div>

        <div v-else class="countdown-clock">
          <div v-for="(unit, index) in units" :key="unit.key" class="clock-unit">
            <span class="clock-number">{{ parts[unit.key] }}</span>
            <span class="clock-label">{{ unit.label }}</span>
          </div>
          <span
            v-for="index in 3"
            :key="'sep-' + index"
            class="clock-sep"
            aria-hidden="true"
          >
            :
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.countdown {
  background: radial-gradient(120% 100% at 50% 0%, var(--navy-800) 0%, var(--navy-900) 55%);
  text-align: center;
}

.countdown-content {
  padding: 1rem 0;
}

.countdown-clock {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.4rem, 2.4vw, 1rem);
  margin-top: 2rem;
  padding: 2rem 1rem;
  border: 1px solid rgba(201, 173, 112, 0.35);
  border-radius: 6px;
  background: linear-gradient(160deg, rgba(22, 61, 115, 0.35), transparent);
}

.clock-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 3.2rem;
}

.clock-number {
  font-family: var(--font-serif);
  font-size: clamp(2.2rem, 9vw, 3.9rem);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: var(--text-strong);
}

.clock-label {
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.62rem;
  color: var(--gold);
}

.clock-sep {
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 6vw, 2.4rem);
  color: var(--gold);
  opacity: 0.7;
  transform: translateY(-0.45em);
}

.countdown-done {
  font-family: var(--font-serif);
  font-size: clamp(1.4rem, 5vw, 2rem);
  color: var(--text-strong);
  margin-top: 1.4rem;
}

.countdown-star {
  display: block;
  color: var(--gold);
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
}

@media (max-width: 380px) {
  .clock-unit {
    min-width: 2.6rem;
  }
}
</style>