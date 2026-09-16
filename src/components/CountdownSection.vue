<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { WEDDING } from '../config/wedding.js'

// Countdown target: 10:00 WIB on 23 December 2026 (+07:00 / Asia/Jakarta).
const target = new Date(WEDDING.dateISO).getTime()

const now = ref(Date.now())
let timer = null
const openModal = ref(false)

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  clearInterval(timer)
  document.removeEventListener('keydown', onKeydown)
})

function onKeydown(event) {
  if (event.key === 'Escape') openModal.value = false
}

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

// --- CALENDAR GENERATORS ---
const eventTitle = encodeURIComponent('Pernikahan Dio & Ayin')
const eventDetails = encodeURIComponent('Acara Pernikahan Dio & Ayin. Terima kasih telah berkenan hadir dan mendoakan kami.')
const eventLocation = encodeURIComponent(`${WEDDING.location.name}, ${WEDDING.location.region}`)

// Dates formatting for Google/Outlook (UTC format: YYYYMMDDTHHMMSSZ)
const startDate = new Date(WEDDING.dateISO)
const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000) // Default 4 jam durasi

const formatIsoUtc = (date) => date.toISOString().replace(/-|:|\.\d+/g, '')

const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${formatIsoUtc(startDate)}/${formatIsoUtc(endDate)}&details=${eventDetails}&location=${eventLocation}`
const outlookCalUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${eventTitle}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${eventDetails}&location=${eventLocation}`

// Generate ICS file download dynamically for Apple Calendar / Native devices
function downloadIcs() {
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    `SUMMARY:Pernikahan Dio & Ayin`,
    `DESCRIPTION:Acara Pernikahan Dio & Ayin.`,
    `LOCATION:${WEDDING.location.name}, ${WEDDING.location.region}`,
    `DTSTART:${formatIsoUtc(startDate)}`,
    `DTEND:${formatIsoUtc(endDate)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.setAttribute('download', 'wedding-dio-ayin.ics')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
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
          <template v-for="(unit, index) in units" :key="unit.key">
            <div class="clock-unit">
              <span class="clock-number">{{ parts[unit.key] }}</span>
              <span class="clock-label">{{ unit.label }}</span>
            </div>

            <span
              v-if="index < units.length - 1"
              class="clock-sep"
              aria-hidden="true"
            >
              :
            </span>
          </template>
        </div>

        <!-- Tombol Tambah ke Kalender -->
        <div class="calendar-action">
          <button
            class="btn btn-gold calendar-btn"
            type="button"
            :aria-expanded="openModal"
            aria-controls="calendar-choice"
            @click="openModal = true"
          >
            <span aria-hidden="true">⌖</span> Simpan Tanggal <span aria-hidden="true">⌖</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Chooser Platform Kalender -->
    <Transition name="fade">
      <div v-if="openModal" id="calendar-choice" class="modal">
        <div class="modal-backdrop" @click="openModal = false"></div>
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="cal-modal-title">
          <button class="modal-close" type="button" @click="openModal = false" aria-label="Tutup">
            ×
          </button>
          <p class="modal-kicker">Ingat Tanggal Acara</p>
          <p id="cal-modal-title" class="modal-title">
            Tambahkan ke Kalender Kamu
          </p>

          <div class="modal-actions-grid">
            <a class="btn btn-gold" :href="googleCalUrl" target="_blank" rel="noopener noreferrer">
              Google Calendar
            </a>
            <a class="btn btn-ghost" :href="outlookCalUrl" target="_blank" rel="noopener noreferrer">
              Outlook / Microsoft
            </a>
            <button class="btn btn-ghost" type="button" @click="downloadIcs">
              Apple Calendar / iCal (.ics)
            </button>
          </div>
        </div>
      </div>
    </Transition>
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
  align-self: flex-start;
  margin-top: 0.2em;
}

.calendar-action {
  margin-top: 1.8rem;
}

.calendar-btn {
  min-height: 3rem;
  padding: 0.7rem 2rem;
}

.modal-actions-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
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