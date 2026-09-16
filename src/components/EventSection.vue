<script setup>
import { WEDDING } from '../config/wedding.js'
</script>

<template>
  <section id="event" class="section event">
    <div class="container">
      <div class="event-head" v-reveal>
        <p class="section-eyebrow">Save The Date</p>
        <h2 class="section-title">Akad &amp; Resepsi</h2>
        <div class="star-divider" aria-hidden="true">✦</div>
      </div>

      <div class="event-date" v-reveal="120">
        <div class="event-date-inner">
          <span class="event-weekday">{{ WEDDING.weekday }}</span>
          <span class="event-day">{{ WEDDING.date }}</span>
        </div>
      </div>

      <div class="event-cards" v-reveal="180">
        <!-- Akad -->
        <article class="event-card">
          <div class="event-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M24 6 L28 18 L40 18 L30 26 L34 38 L24 30 L14 38 L18 26 L8 18 L20 18 Z" />
              <circle cx="24" cy="22" r="2.5" />
            </svg>
          </div>
          <h3 class="event-kicker">Akad Nikah</h3>
          <p class="event-time">{{ WEDDING.akad }}</p>
          <p class="event-note">Pelaksanaan akad nikah</p>
        </article>

        <div class="event-flow" aria-hidden="true">
          <span class="event-flow-line"></span>
          <span class="event-flow-mark">✦</span>
          <span class="event-flow-line"></span>
        </div>

        <!-- Reception -->
        <article class="event-card">
          <div class="event-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1">
              <circle cx="24" cy="18" r="7" />
              <path d="M10 42 C10 33 16 28 24 28 C32 28 38 33 38 42" />
              <path d="M17 10 L17 6" />
              <path d="M31 10 L31 6" />
              <path d="M24 8 L24 4" />
            </svg>
          </div>
          <h3 class="event-kicker">Resepsi</h3>
          <p class="event-time">{{ WEDDING.reception }}</p>
          <p class="event-note">Langsung setelah akad, di lokasi yang sama</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.event {
  background: radial-gradient(120% 100% at 50% 0%, var(--navy-800) 0%, var(--navy-900) 60%);
  text-align: center;
}

.event-head {
  margin-bottom: 2.4rem;
}

.event-date {
  display: flex;
  justify-content: center;
  margin-bottom: 2.8rem;
}

.event-date-inner {
  position: relative;
  border: 1px solid rgba(201, 173, 112, 0.55);
  border-radius: 3px;
  padding: 1.6rem 3.4rem 1.7rem;
  background: linear-gradient(160deg, rgba(22, 61, 115, 0.5), rgba(11, 40, 84, 0.35));
}

.event-weekday {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.42em;
  font-size: 0.7rem;
  color: var(--gold);
  margin-bottom: 0.5rem;
}

.event-day {
  display: block;
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 7vw, 2.7rem);
  line-height: 1.1;
  color: var(--text-strong);
}

.event-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 34rem;
  margin: 0 auto;
}

.event-card {
  background: linear-gradient(165deg, var(--navy-700), var(--navy-800));
  border: 1px solid rgba(201, 173, 112, 0.28);
  border-radius: 5px;
  padding: 2.2rem 1.5rem 2rem;
}

.event-icon {
  color: var(--gold);
  width: 2.6rem;
  margin: 0 auto 1.1rem;
}

.event-kicker {
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-soft);
}

.event-time {
  font-family: var(--font-serif);
  font-size: clamp(1.7rem, 6vw, 2.2rem);
  color: var(--text-strong);
  margin: 0.6rem 0 0.4rem;
}

.event-note {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.event-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: var(--gold);
  font-size: 0.85rem;
}

.event-flow-line {
  height: 1px;
  width: 3rem;
  background: linear-gradient(90deg, transparent, rgba(201, 173, 112, 0.6));
}

.event-flow-line:last-child {
  background: linear-gradient(90deg, rgba(201, 173, 112, 0.6), transparent);
}

@media (min-width: 820px) {
  .event-cards {
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 1.4rem;
    max-width: none;
  }

  .event-flow {
    flex-direction: column;
  }

  .event-flow-line {
    width: 1px;
    height: 2.6rem;
    background: linear-gradient(180deg, transparent, rgba(201, 173, 112, 0.6));
  }

  .event-flow-line:last-child {
    background: linear-gradient(180deg, rgba(201, 173, 112, 0.6), transparent);
  }
}
</style>