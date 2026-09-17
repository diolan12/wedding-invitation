<script setup>
import { ref } from 'vue'
import OpeningOverlay from '../components/OpeningOverlay.vue'
import HeroSection from '../components/HeroSection.vue'
import CoupleSection from '../components/CoupleSection.vue'
import QuoteSection from '../components/QuoteSection.vue'
import EventSection from '../components/EventSection.vue'
import LocationSection from '../components/LocationSection.vue'
import CountdownSection from '../components/CountdownSection.vue'
import GuestSection from '../components/GuestSection.vue'
import ClosingSection from '../components/ClosingSection.vue'

// The invitation starts behind the "Buka Undangan" cover (with the
// envelope animation). `opened` only lives for the current session.
const opened = ref(false)

function openInvitation() {
  opened.value = true
}
</script>

<template>
  <OpeningOverlay v-if="!opened" @open="openInvitation" />
  <main v-else>
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