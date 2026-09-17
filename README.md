# Wedding Invitation — Dio & Indriyani

Undangan pernikahan online yang elegan, dibuat dengan **Vue 3 + Vite** (JavaScript murni), siap di-deploy ke **GitHub Pages** via `gh-pages`.

### Built with

![Antigravity](https://img.shields.io/badge/Antigravity-1188ff)
![Big Pickle](https://img.shields.io/badge/Big%20Pickle-7c3aed)
![ChatGPT](https://img.shields.io/badge/ChatGPT-10a37f)
![Claude](https://img.shields.io/badge/Claude-d97757)

![Vue 3](https://img.shields.io/badge/Vue%203-4FC08D?style=flat&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat&logo=github&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat&logo=github)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg?style=flat&logo=github)
![Maintained](https://img.shields.io/badge/maintained-yes-green.svg?style=flat&logo=github)
![Fork](https://img.shields.io/badge/fork-yes-blue.svg?style=flat&logo=github)
![Star](https://img.shields.io/badge/star-yes-yellow.svg?style=flat&logo=github)
![Forked](https://img.shields.io/badge/forked-yes-green.svg?style=flat&logo=github)
![Contribute](https://img.shields.io/badge/contribute-yes-green.svg?style=flat&logo=github)


```
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── groom.jpg              ← ganti dengan foto asli
│       ├── bride.jpg              ← ganti dengan foto asli
│       └── placeholder-*.svg      ← fallback otomatis jika foto belum ada
├── src/
│   ├── components/                ← 1 komponen per bagian
│   ├── views/
│   │   ├── InvitationView.vue     ← undangan (route `/`)
│   │   └── GeneratorView.vue      ← generator link tamu (route `/generator`)
│   ├── router/index.js            ← routing history (clean URLs)
│   ├── config/wedding.js          ← SEMUA data pernikahan ada di sini
│   ├── utils/asset.js
│   ├── App.vue
│   ├── main.js
│   └── style.css                  ← design system global
├── index.html
├── package.json
└── vite.config.js                 ← base path GitHub Pages
```

---

## 1. Persiapan

Prasyarat: **Node.js 18+** dan **npm** sudah terpasang.

```bash
npm install
```

## 2. Menjalankan di lokal

```bash
npm run dev
```

Buka `http://localhost:5173` di browser. Perubahan kode langsung terlihat (hot reload).

## 3. Mengganti foto

Letakkan foto pasangan pada:

```text
public/images/groom.jpg
public/images/bride.jpg
```

Rasio yang disarankan **4 : 5** (portrait). Jika file belum ada, situs otomatis menampilkan placeholder monogram elegan. Format **WebP/JPEG** yang teroptimasi lebih disukai untuk kecepatan.

## 4. Mengedit data pernikahan

Semua data terpusat di **`src/config/wedding.js`**:

```js
export const WEDDING = {
  groom: 'Dio Lantief Widoyoko',
  groomParents: 'Edi Cahyono dan Sadpujiastuti',
  bride: 'Indriyani',
  brideParents: 'Irfan Gani dan Linda',
  dateISO: '2026-12-23T10:00:00+07:00', // target countdown (WIB)
  akad: '10.00 WIB',
  location: {
    name: 'Sempu, Banyuwangi',
    latitude: -8.3275614,
    longitude: 114.1877941
  },
  maps: { google: 'https://maps.app.goo.gl/...' },
  images: { groom: 'images/groom.jpg', bride: 'images/bride.jpg' }
}
```

Yang bisa diubah tanpa menyentuh komponen: nama, nama orang tua, tanggal, waktu akad, lokasi, koordinat peta, foto, dan warna (di `src/style.css` / `:root`).

## 5. Mengubah nama repository GitHub Pages

`vite.config.js` memakai base path sesuai nama repository:

```js
const REPOSITORY_NAME = 'wedding-invitation'
```

Jika repository-mu bernama lain, **wajib** disesuaikan. Contoh:

```text
repo:  https://github.com/username/my-wedding
base:  '/my-wedding/'
```

## 6. Build produksi

```bash
npm run build
```

Hasil build ada di folder `dist/` dan dapat dicek dengan:

```bash
npm run preview
```

## 7. Deploy ke GitHub Pages

```bash
npm run deploy
```

Script ini menjalankan `vite build`, kemudian mem-publish isi `dist/` ke branch **`gh-pages`** via package `gh-pages`.

Pengaturan repository (sekali saja):

1. Buka **Settings → Pages** di repository GitHub.
2. **Source** pilih **Deploy from a branch**.
3. **Branch** pilih **`gh-pages`** dan folder **`/ (root)`**, lalu **Save**.

Situs akan tersedia di:

```text
https://username.github.io/wedding-invitation/
```

## 8. Link undangan personal (untuk tamu)

Tambahkan parameter `?to=` pada URL. Parameter dibaca dengan
`new URLSearchParams(window.location.search)` dan dirender sebagai teks polos
(aman — tidak diinterpretasikan sebagai HTML).

```text
https://username.github.io/wedding-invitation/?to=Andi%20Pratama
https://username.github.io/wedding-invitation/?to=Bapak%20%26%20Ibu%20Santoso
https://username.github.io/wedding-invitation/?to=Keluarga%20Widoyoko
```

Tanpa parameter `to`, situs menampilkan **"Bapak/Ibu/Saudara/i"**.

Catatan: karena `npm run dev` memakai base `/wedding-invitation/`, saat menjalankan
di lokal cukup buka `http://localhost:5173/?to=Andi%20Pratama` — Vue membaca
`window.location.search` sehingga tetap berfungsi.

## 9. Generator link undangan

Ada halaman generator untuk membuat tautan tamu tanpa menyusun URL secara manual.
Buka:

```text
http://localhost:5173/generator                     (lokal)
https://username.github.io/wedding-invitation/generator   (produksi)
```

Di halaman tersebut: ketik nama tamu → tautan langsung dibuat → klik **Salin Link**
→ bagikan. Tautan dibangun otomatis dari `VITE_BASE_URL` (origin) + base path
Vite (`import.meta.env.BASE_URL`) + parameter `?to=`, sehingga selalu benar baik
di lokal maupun di GitHub Pages.

> Routing memakai **history mode** (`createWebHistory`) sehingga URL bersih tanpa
> `#/`. Base router diambil dari `import.meta.env.BASE_URL` (Vite) — tak ada
> hash yang ditambahkan otomatis pada pemuatan awal, dan link tamu `?to=` tetap
> berfungsi karena dibaca dari `window.location.search`.
>
> **Catatan GitHub Pages:** history mode butuh *server rewrite* untuk deep link
> langsung (mis. buka `/generator` lalu *refresh*) karena GitHub Pages hanya
> menyajikan file statis. Karena itu dibutuhkan file `404.html` di root yang
> me-redirect ke `index.html` (lihat bagian _Deploy_ di atas).

---

### Struktur komponen

| Bagian            | Komponen                |
| ----------------- | ----------------------- |
| Pembuka           | `OpeningOverlay.vue`    |
| Hero              | `HeroSection.vue`       |
| Undangan/Mempelai | `CoupleSection.vue`     |
| Ayat Al-Qur'an    | `QuoteSection.vue`      |
| Acara             | `EventSection.vue`      |
| Lokasi & Peta     | `LocationSection.vue`   |
| Hitung Mundur     | `CountdownSection.vue`  |
| Nama Tamu         | `GuestSection.vue`      |
| Penutup           | `ClosingSection.vue`    |
| Generator Link    | `GeneratorView.vue`     |