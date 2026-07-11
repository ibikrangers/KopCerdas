# KopCerdas

KopCerdas adalah aplikasi web berbasis React dan Vite yang dirancang untuk pembelajaran dan simulasi sistem koperasi. Aplikasi ini dilengkapi dengan berbagai modul interaktif seperti materi belajar, kuis, dasbor simulasi, pengaturan sandbox, simulasi voting, dan RAT (Rapat Anggota Tahunan).

## Prasyarat (Prerequisites)

Sebelum menjalankan aplikasi, pastikan perangkat Anda telah terinstal:
- **Node.js** (versi 18.x atau yang lebih baru direkomendasikan)
- **npm** (biasanya otomatis terinstal bersama Node.js)

## Cara Menjalankan Aplikasi secara Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di lingkungan pengembangan lokal Anda:

### 1. Klon Repositori (jika belum)
```bash
git clone <url-repositori>
cd Antigravity-KopCerdas
```

### 2. Instalasi Dependensi
Jalankan perintah berikut di dalam direktori proyek untuk menginstal semua pustaka (library) yang dibutuhkan:
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Dev Server)
Untuk menjalankan aplikasi dalam mode pengembangan dengan Hot Module Replacement (HMR):
```bash
npm run dev
```
Setelah menjalankan perintah di atas, buka peramban (browser) dan akses alamat yang tertera di terminal, biasanya:
`http://localhost:5173`

---

## Perintah Lain yang Tersedia (Available Scripts)

Di dalam berkas `package.json`, terdapat beberapa skrip lain yang dapat Anda gunakan:

- **Membangun Aplikasi untuk Produksi (Production Build):**
  ```bash
  npm run build
  ```
  Perintah ini akan mengompilasi dan mengoptimalkan kode aplikasi ke dalam folder `dist/` agar siap dideploy ke server produksi.

- **Menjalankan Pratinjau Build (Preview Production Build):**
  ```bash
  npm run preview
  ```
  Gunakan perintah ini untuk menguji secara lokal hasil build produksi yang ada di folder `dist/` sebelum benar-benar dideploy.

- **Melakukan Linting Kode:**
  ```bash
  npm run lint
  ```
  Menjalankan pemeriksa kesalahan kode (linter) menggunakan `oxlint` untuk menjaga kualitas dan kerapian penulisan kode.

- **Deploy ke GitHub Pages:**
  ```bash
  npm run deploy
  ```
  Mengunggah hasil build dari folder `dist/` langsung ke GitHub Pages (jika repositori ini terkonfigurasi untuk GitHub Pages).

---

## Struktur Proyek Utama

- `src/components/` - Berisi komponen-komponen UI interaktif (LandingPage, LearnSection, QuizSection, Sandbox Simulator, dll).
- `src/App.jsx` - Komponen utama yang mengatur navigasi dan alur aplikasi.
- `src/main.jsx` - Entry point untuk aplikasi React.
- `public/` - Direktori untuk aset statis yang tidak diproses oleh bundler.
