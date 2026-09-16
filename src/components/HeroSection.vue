<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { WEDDING } from '../config/wedding.js'

const canvas = ref(null)
let ctx = null
let width = 0
let height = 0
let particles = []
let rafId = null
let resizeObserver = null

const REDUCED_MOTION =
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function makeParticles() {
  const count = width < 640 ? 45 : 80
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    r: 0.6 + Math.random() * 1.2,
    a: 0.25 + Math.random() * 0.5
  }))
}

function resize() {
  if (!canvas.value) return
  const dpr = window.devicePixelRatio || 1
  width = canvas.value.clientWidth
  height = canvas.value.clientHeight
  canvas.value.width = Math.round(width * dpr)
  canvas.value.height = Math.round(height * dpr)
  ctx = canvas.value.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  makeParticles()
}

function draw() {
  ctx.clearRect(0, 0, width, height)

  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    if (p.x < -10) p.x = width + 10
    if (p.x > width + 10) p.x = -10
    if (p.y < -10) p.y = height + 10
    if (p.y > height + 10) p.y = -10

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(201, 173, 112, ${p.a})`
    ctx.fill()
  }

  // faint connecting lines between nearby particles
  const linkDist = 120
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i]
      const b = particles[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dist = Math.hypot(dx, dy)
      if (dist < linkDist) {
        const alpha = (1 - dist / linkDist) * 0.12
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(201, 173, 112, ${alpha})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }
    }
  }
}

function loop() {
  draw()
  rafId = requestAnimationFrame(loop)
}

onMounted(() => {
  resize()
  if (REDUCED_MOTION) {
    draw() // single static frame
    return
  }
  rafId = requestAnimationFrame(loop)
  resizeObserver = new ResizeObserver(() => resize())
  resizeObserver.observe(canvas.value)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<template>
  <section id="hero" class="hero">
    <canvas ref="canvas" class="hero-canvas" aria-hidden="true"></canvas>
    <div class="hero-vignette" aria-hidden="true"></div>
    <div class="hero-grain" aria-hidden="true"></div>

    <!-- rotating geometric rings -->
    <div class="hero-rings" aria-hidden="true">
      <span class="ring ring-1"></span>
      <span class="ring ring-2"></span>
      <span class="ring ring-3"></span>
      <span class="ring ring-diamond"></span>
    </div>

    <!-- floating ornamental diamonds -->
    <span class="float-orn orn-1" aria-hidden="true"></span>
    <span class="float-orn orn-2" aria-hidden="true"></span>
    <span class="float-orn orn-3" aria-hidden="true"></span>

    <div class="hero-content">
      <p class="hero-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
      <p class="hero-eyebrow">The Wedding Of</p>

      <h1 class="hero-names">
        <span>{{ WEDDING.groomShort }}</span>
        <span class="amp">&amp;</span>
        <span>{{ WEDDING.brideShort }}</span>
      </h1>

      <div class="hero-date">
        <span class="line"></span>
        <span>{{ WEDDING.dateDot }}</span>
        <span class="line"></span>
      </div>

      <p class="hero-invite">
        Dengan memohon rahmat dan ridho Allah SWT, kami mengundang
        Bapak/Ibu/Saudara/i untuk hadir.
      </p>
    </div>

    <!-- scroll indicator -->
    <a class="hero-scroll" href="#couple" aria-label="Gulir ke bawah">
      <span class="hero-scroll-track"><span class="hero-scroll-dot"></span></span>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  place-items: center;
  text-align: center;
  overflow: hidden;
  background: radial-gradient(130% 100% at 50% 0%, var(--navy-700) 0%, var(--navy-900) 48%, var(--navy-950) 100%);
}

.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}

.hero-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(4, 13, 31, 0.55) 100%);
  pointer-events: none;
}

.hero-grain {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
  pointer-events: none;
}

.hero-rings {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(201, 173, 112, 0.22);
  width: 20rem;
  height: 20rem;
  animation: spin 70s linear infinite;
}

.ring-2 {
  width: 30rem;
  height: 30rem;
  border-color: rgba(201, 173, 112, 0.13);
  animation-duration: 100s;
  animation-direction: reverse;
}

.ring-3 {
  width: 41rem;
  height: 41rem;
  border-color: rgba(201, 173, 112, 0.08);
  animation-duration: 130s;
}

.ring-diamond {
  width: 24rem;
  height: 24rem;
  border-radius: 18%;
  border-color: rgba(201, 173, 112, 0.16);
  animation: spinDiamond 90s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes spinDiamond {
  to {
    transform: rotate(360deg) scale(1);
  }
}

.float-orn {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--gold);
  opacity: 0.4;
  transform: rotate(45deg);
  animation: floatOrn 9s ease-in-out infinite alternate;
}

.orn-1 {
  top: 18%;
  left: 12%;
}

.orn-2 {
  bottom: 20%;
  right: 14%;
  width: 7px;
  height: 7px;
  animation-duration: 11s;
}

.orn-3 {
  top: 32%;
  right: 22%;
  width: 5px;
  height: 5px;
  animation-duration: 8s;
}

@keyframes floatOrn {
  from {
    transform: translateY(0) rotate(45deg);
  }
  to {
    transform: translateY(-14px) rotate(70deg);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 4rem 1.5rem;
  max-width: 44rem;
}

.hero-bismillah {
  font-family: var(--font-arabic);
  font-size: clamp(1.4rem, 5vw, 1.8rem);
  color: var(--gold-light);
  margin-bottom: 1.8rem;
}

.hero-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.42em;
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-bottom: 1.4rem;
}

.hero-names {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(3.4rem, 14vw, 6.8rem);
  line-height: 1.02;
  color: var(--text-strong);
}

.hero-names .amp {
  display: inline-block;
  font-style: italic;
  color: var(--gold);
  font-size: 0.72em;
  margin: 0 0.2rem;
  transform: translateY(-0.05em);
}

.hero-date {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.8rem;
  font-family: var(--font-serif);
  font-size: clamp(1.15rem, 4vw, 1.5rem);
  letter-spacing: 0.22em;
  color: var(--text-soft);
}

.hero-date .line {
  width: 3rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold));
  opacity: 0.6;
}

.hero-date .line:last-child {
  background: linear-gradient(90deg, var(--gold), transparent);
}

.hero-invite {
  margin: 1.8rem auto 0;
  max-width: 33rem;
  font-size: clamp(0.95rem, 2.5vw, 1.05rem);
  color: var(--text-soft);
  font-weight: 300;
}

.hero-scroll {
  position: absolute;
  bottom: 2.2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  padding: 0.75rem;
}

.hero-scroll-track {
  display: block;
  width: 1px;
  height: 3.4rem;
  background: rgba(201, 173, 112, 0.3);
  position: relative;
  overflow: hidden;
}

.hero-scroll-dot {
  position: absolute;
  top: 0;
  left: 50%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--gold);
  transform: translateX(-50%);
  animation: scrollDot 2.2s var(--ease) infinite;
}

@keyframes scrollDot {
  0% {
    top: -6px;
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

@media (max-width: 640px) {
  .ring-3 {
    display: none;
  }
}
</style>