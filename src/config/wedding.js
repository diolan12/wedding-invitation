// ==================================================================
// CENTRAL WEDDING CONFIG — edit everything about the wedding here.
// No need to search through components — update these values only.
// ==================================================================

export const WEDDING = {
  groom: 'Dio Lantief Widoyoko',
  groomParents: 'Edi Cahyono dan Sadpujiastuti',
  bride: 'Indriyani',
  brideParents: 'Irfan Gani dan Linda',
  groomShort: 'Dio',
  brideShort: 'Indriyani',

  // Date / time
  weekday: 'Rabu',
  date: '23 Desember 2026',
  dateDot: '23 · 12 · 2026',
  // Countdown target — keep the +07:00 (WIB / Asia/Jakarta) offset.
  dateISO: '2026-12-23T10:00:00+07:00',
  akad: '10.00 WIB',
  reception: 'Setelah Akad',

  // Venue
  location: {
    name: 'Sempu, Banyuwangi', // short label shown on the site
    region: 'Jawa Timur',
    // Approximate coordinates for the venue (Sempu, Banyuwangi).
    // Update these to the exact venue coordinates if you have them.
    latitude: -8.3275614,
    longitude: 114.1877941
  },

  maps: {
    // Authoritative location link supplied for the venue.
    // The Google Maps button prefers this link when available and
    // falls back to a coordinate search otherwise.
    google: 'https://maps.app.goo.gl/WcazisHVze4PFPLc8?g_st=ac'
  },

  // Photos — put your real photos here:
  //   public/images/groom.jpg
  //   public/images/bride.jpg
  // (the site falls back to a monogram placeholder if the file is missing)
  images: {
    groom: 'images/Gemini_Generated_Image_xzpgsbxzpgsbxzpg.jpeg',
    bride: 'images/Gemini_Generated_Image_ujnpuqujnpuqujnp.jpeg'
  }
}