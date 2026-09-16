<template>
  <section id="quote" class="section quote">
    <!-- decorative background star -->
    <div class="quote-star" aria-hidden="true">
      <svg viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="90" stroke="currentColor" stroke-width="0.6" opacity="0.35" />
        <circle cx="100" cy="100" r="72" stroke="currentColor" stroke-width="0.5" opacity="0.25" />
        <path
          d="M100 18 L106 48 L136 48 L112 66 L118 96 L100 78 L82 96 L88 66 L64 48 L94 48 Z"
          stroke="currentColor"
          stroke-width="0.5"
          fill="none"
          opacity="0.18"
        />
      </svg>
    </div>

    <div class="container container-narrow">
      <div class="quote-wrap" v-reveal>
        <p class="quote-kicker">Al-Qur'an</p>

        <p class="quote-arabic" lang="ar">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا
          إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </p>

        <p class="quote-translation">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
          pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
          dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
          kasih dan sayang."
        </p>

        <p class="quote-source">— QS. Ar-Rum: 21</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quote {
  background: var(--warm);
  color: var(--text-navy);
  text-align: center;
}

.quote-star {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(16rem, 50vw, 26rem);
  color: var(--gold);
  pointer-events: none;
}

.quote-kicker {
  text-transform: uppercase;
  letter-spacing: 0.34em;
  font-size: 0.66rem;
  font-weight: 500;
  color: var(--gold-deep);
}

.quote-arabic {
  font-family: var(--font-arabic);
  direction: rtl;
  unicode-bidi: bidi-override;
  font-size: clamp(1.35rem, 5vw, 1.85rem);
  line-height: 2.15;
  color: var(--navy-800);
  margin: 1.4rem 0;
}

.quote-translation {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.02rem, 3.2vw, 1.2rem);
  line-height: 1.85;
  color: var(--navy-700);
}

.quote-source {
  margin-top: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.28em;
  font-size: 0.72rem;
  color: var(--gold-deep);
}
</style>