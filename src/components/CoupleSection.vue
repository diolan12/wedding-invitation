<script setup>
import { WEDDING } from '../config/wedding.js'
import { assetPath } from '../utils/asset.js'

// Primary photo paths — drop `public/images/groom.jpg` and
// `public/images/bride.jpg` and they are used automatically.
const groomSrc = assetPath(WEDDING.images.groom)
const brideSrc = assetPath(WEDDING.images.bride)
const groomFallback = assetPath('images/placeholder-groom.svg')
const brideFallback = assetPath('images/placeholder-bride.svg')

function fallback(event, src) {
  event.target.onerror = null
  event.target.src = src
}
</script>

<template>
  <section id="couple" class="section couple">
    <div class="container container-narrow">
      <div class="couple-head" v-reveal>
        <p class="section-eyebrow">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
        <h2 class="section-title">Undangan Pernikahan</h2>
        <div class="star-divider" aria-hidden="true">✦</div>
      </div>

      <div class="couple-invite" v-reveal="120">
        <p>
          Atas izin Allah SWT, kami bermaksud menyelenggarakan acara pernikahan
          putra-putri kami:
        </p>
        <p class="couple-names-line">
          <span>{{ WEDDING.groomShort }}</span>
          <span class="amp">&amp;</span>
          <span>{{ WEDDING.brideShort }}</span>
        </p>
        <p>
          Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir dan memberikan doa restu.
        </p>
      </div>

      <div class="couple-grid" v-reveal="160">
        <!-- ============ GROOM ============ -->
        <!-- Replace with the real pre-wedding photo: public/images/groom.jpg -->
        <article class="person">
          <figure class="person-photo">
            <img
              :src="groomSrc"
              :alt="`Foto ${WEDDING.groom}`"
              loading="lazy"
              @error="fallback($event, groomFallback)"
            />
          </figure>
          <div class="person-info">
            <p class="person-role">The Groom</p>
            <h3 class="person-name">{{ WEDDING.groom }}</h3>
            <p class="person-parents">
              Putra dari <br />
              {{ WEDDING.groomParents }}
            </p>
          </div>
        </article>

        <!-- ============ BRIDE ============ -->
        <!-- Replace with the real pre-wedding photo: public/images/bride.jpg -->
        <article class="person">
          <figure class="person-photo">
            <img
              :src="brideSrc"
              :alt="`Foto ${WEDDING.bride}`"
              loading="lazy"
              @error="fallback($event, brideFallback)"
            />
          </figure>
          <div class="person-info">
            <p class="person-role">The Bride</p>
            <h3 class="person-name">{{ WEDDING.bride }}</h3>
            <p class="person-parents">
              Putri dari <br />
              {{ WEDDING.brideParents }}
            </p>
          </div>
        </article>

        <span class="amp-badge" aria-hidden="true">&amp;</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.couple {
  background: linear-gradient(180deg, var(--navy-900) 0%, var(--navy-800) 100%);
  text-align: center;
}

.couple-head {
  margin-bottom: 1.8rem;
}

.couple-invite {
  max-width: 36rem;
  margin-inline: auto;
  color: var(--text-soft);
  display: grid;
  gap: 1.1rem;
  font-weight: 300;
}

.couple-names-line {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.8rem;
  font-family: var(--font-serif);
  font-size: clamp(1.9rem, 7vw, 2.7rem);
  font-weight: 400;
  color: var(--text-strong);
  line-height: 1;
}

.couple-names-line .amp {
  font-style: italic;
  font-size: 0.62em;
  color: var(--gold);
}

.couple-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.9rem;
  max-width: 42rem;
  margin: 3rem auto 0;
}

.person-photo {
  margin: 0;
  padding: 10px;
  background: linear-gradient(160deg, var(--navy-700), var(--navy-800));
  border: 1px solid rgba(201, 173, 112, 0.4);
  border-radius: 5px;
}

.person-photo img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 2px;
  filter: saturate(0.9);
}

.person-info {
  padding: 1.4rem 0.4rem 0;
}

.person-role {
  text-transform: uppercase;
  letter-spacing: 0.34em;
  font-size: 0.66rem;
  color: var(--gold);
}

.person-name {
  font-family: var(--font-serif);
  font-weight: 500;
  font-size: clamp(1.55rem, 6vw, 2rem);
  line-height: 1.2;
  margin: 0.4rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 4.6rem;
}

.person-parents {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.9;
}

/* ampersand between the two portraits */
.amp-badge {
  position: absolute;
  left: 50%;
  top: 34%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 2.9rem;
  height: 2.9rem;
  border-radius: 50%;
  background: var(--navy-900);
  border: 1px solid var(--gold);
  color: var(--gold);
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.35rem;
  display: grid;
  place-items: center;
  box-shadow: 0 8px 24px rgba(4, 13, 31, 0.6);
}

@media (max-width: 400px) {
  .amp-badge {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.1rem;
  }
}
</style>