<script setup>
import { ref } from 'vue'
import OpeningOverlay from './components/OpeningOverlay.vue'
import HeroSection from './components/HeroSection.vue'
import CoupleSection from './components/CoupleSection.vue'
import QuoteSection from './components/QuoteSection.vue'
import EventSection from './components/EventSection.vue'
import LocationSection from './components/LocationSection.vue'
import CountdownSection from './components/CountdownSection.vue'
import GuestSection from './components/GuestSection.vue'
import ClosingSection from './components/ClosingSection.vue'

// The invitation starts behind a lightweight "Buka Undangan" cover.
// `opened` only lives for the current session — no persistence, no wait.
const opened = ref(false)

function openInvitation() {
  opened.value = true
}
</script>

<template>
  <Transition name="envelope">
    <OpeningOverlay v-if="!opened" @open="openInvitation" />
  </Transition>
  <main v-if="opened" class="main-content">
    <HeroSection />
    <CoupleSection />
    <QuoteSection />
    <EventSection />
    <LocationSection />
    <CountdownSection />
    <GuestSection />
    <ClosingSection />
  </main>
</template>

<style scoped>
.envelope-leave-active {
  transition: transform 1.2s cubic-bezier(0.8, 0, 0.2, 1), opacity 1.2s ease;
  z-index: 60;
}
.envelope-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.main-content {
  animation: fadeIn 1s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>