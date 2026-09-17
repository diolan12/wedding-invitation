<script setup>
import { WEDDING } from '../config/wedding.js'
</script>

<template>
  <section id="closing" class="section closing">
    <div class="closing-glow" aria-hidden="true"></div>

    <div class="container container-narrow">
      <div class="closing-content" v-reveal>
        <div class="closing-ornament" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="54" stroke="currentColor" stroke-width="0.4" opacity="0.35" />
            <circle cx="60" cy="60" r="44" stroke="currentColor" stroke-width="0.4" opacity="0.25" />
            <circle cx="60" cy="60" r="34" stroke="currentColor" stroke-width="0.4" opacity="0.18" />
            <path
              d="M60 8 L65 27 L84 22 L74 41 L93 51 L74 61 L84 80 L65 75 L60 94 L55 75 L36 80 L46 61 L27 51 L46 41 L36 22 L55 27 Z"
              stroke="currentColor" stroke-width="0.4" fill="none" opacity="0.2" />
          </svg>
        </div>

        <p class="section-eyebrow">Terima Kasih</p>

        <p class="closing-text">
          Atas kehadiran, doa, dan restu yang diberikan kepada kami, kami ucapkan
          terima kasih. Semoga Allah SWT senantiasa memberikan keberkahan dalam
          setiap langkah kita.
        </p>

        <p class="closing-arabic" lang="ar">
          رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ
          وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا
        </p>
        <p class="closing-arabic-note">
          "Ya Tuhan kami, anugerahkanlah kepada kami pasangan kami dan keturunan
          kami sebagai penyejuk mata (kami), dan jadikanlah kami pemimpin bagi
          orang-orang yang bertakwa."
        </p>
        <p class="closing-arabic-source">— QS. Al-Furqan: 74</p>

        <p class="closing-salam">Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>

        <p class="closing-names">
          <span>{{ WEDDING.groomShort }}</span>
          <span class="amp">&amp;</span>
          <span>{{ WEDDING.brideShort }}</span>
        </p>

        <RouterLink v-if="false" class="generator-link" to="/generator">
          Generator Link Undangan →
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.closing {
  background: radial-gradient(120% 100% at 50% 0%, var(--navy-800) 0%, var(--navy-900) 48%, var(--navy-950) 100%);
  text-align: center;
  overflow: hidden;
}

.closing-glow {
  position: absolute;
  left: 50%;
  bottom: -18rem;
  transform: translateX(-50%);
  width: 40rem;
  height: 22rem;
  background: radial-gradient(50% 50% at 50% 50%, rgba(22, 61, 115, 0.55), transparent 70%);
  pointer-events: none;
}

.closing-content {
  position: relative;
}

.closing-ornament {
  color: var(--gold);
  width: 8rem;
  margin: 0 auto 2rem;
}

.closing-text {
  max-width: 34rem;
  margin: 1.6rem auto 0;
  color: var(--text-soft);
  font-weight: 300;
}

.closing-arabic {
  direction: rtl;
  unicode-bidi: bidi-override;
  font-family: var(--font-arabic);
  font-size: clamp(1.1rem, 4vw, 1.4rem);
  line-height: 2.1;
  color: var(--gold-light);
  margin: 2.4rem 0 0.8rem;
}

.closing-arabic-note {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.98rem;
  color: var(--text-soft);
  max-width: 34rem;
  margin-inline: auto;
}

.closing-arabic-source {
  margin-top: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.26em;
  font-size: 0.68rem;
  color: var(--gold);
}

.closing-salam {
  margin-top: 2.6rem;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.closing-names {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  margin-top: 1rem;
  font-family: var(--font-serif);
  font-size: clamp(2.4rem, 10vw, 4rem);
  font-weight: 400;
  color: var(--text-strong);
  line-height: 1;
}

.closing-names .amp {
  font-style: italic;
  font-size: 0.6em;
  color: var(--gold);
  transform: translateY(-0.05em);
}

.generator-link {
  display: inline-block;
  margin-top: 2.2rem;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  border-bottom: 1px solid rgba(201, 173, 112, 0.35);
  padding-bottom: 0.3rem;
  transition: color 0.25s var(--ease), border-color 0.25s var(--ease);
}

.generator-link:hover {
  color: var(--gold-light);
  border-color: var(--gold);
}
</style>