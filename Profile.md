# INSTRUKSI.md — Halaman Company Profile (Guest) — JCP

## Konteks

Halaman ini adalah landing page publik (tidak perlu login) untuk usaha jasa
laser cutting JCP (Jombang Creative Project). Stack: Laravel 11 + Inertia.js +
React + Tailwind CSS v4.

File ini: `resources/js/Pages/Home.jsx`
Layout: gunakan `Layouts/MainLayout.jsx` (bukan `GuestLayout` yang khusus auth)
Navbar: sudah selesai di `Components/Sections/Navbar.jsx` — pakai ulang, jangan dibuat ulang.

---

## Design Tokens (sudah didefinisikan di `resources/css/app.css`)

```css
@import "tailwindcss";

@theme {
    --font-sans: "Inter", sans-serif;
    --font-header: "Plus Jakarta Sans", sans-serif;

    --color-primary-900: #03045e;
    --color-primary-800: #023e8a;
    --color-primary-700: #0077b6;
    --color-primary-600: #0096c7;
    --color-primary-500: #00b4d8;
    --color-primary-400: #48cae4;
    --color-primary-300: #90e0ef;
    --color-primary-200: #ade8f4;
    --color-primary-100: #caf0f8;

    --color-neutral-900: #171923;
    --color-neutral-700: #4a5568;
    --color-neutral-400: #a0aec0;
    --color-neutral-100: #f7fafc;
    --color-white: #ffffff;

    --color-success: #2f9e44;
    --color-danger: #e03131;
}
```

**Aturan pemakaian font & warna (wajib diikuti, jangan pakai hex langsung di JSX):**

- `font-header` (Plus Jakarta Sans) → semua heading (`h1`-`h3`), CTA button besar
- `font-sans` (Inter) → semua body text, label, paragraf
- Teks body → `text-neutral-900` / `text-neutral-700` (bukan warna biru)
- Background section selang-seling: putih (`bg-white`) dan `bg-neutral-100`, supaya section terlihat terpisah tanpa garis pembatas
- `primary-600` → CTA utama (background tombol)
- `primary-700` → link aktif, ikon aksen
- `primary-100`/`primary-300` → hanya untuk background section hero atau badge, tidak untuk teks

---

## SCOPE: Halaman Home (guest) — 9 section di bawah Navbar

> AI Agent: kerjakan section berikut SATU PER SATU sesuai urutan, sebagai
> komponen terpisah di `Components/Sections/`, lalu di-import & disusun di
> `Pages/Home.jsx`. Jangan gabung semua logic dalam satu file besar.

### 1. Hero (`Hero.jsx`)

- Background `primary-600`, teks putih, center-align
- Headline (`font-header`, besar): "Jasa laser cutting presisi untuk akrilik, kayu & logam"
- Subheadline: 1 kalimat pendek
- 2 tombol: primary ("Lihat Katalog", bg putih teks `primary-700`) dan outline ("Pesan Custom Sekarang", border putih)
- Props: terima `title`, `subtitle` (jangan hardcode, supaya gampang diubah dari controller nanti)

### 2. USP (`Usp.jsx`)

- 4 kartu grid (`grid-cols-4`, responsive jadi `grid-cols-2` di mobile)
- Tiap kartu: icon + judul singkat + deskripsi 1 baris
- Data: presisi tinggi, estimasi harga instan, banyak pilihan bahan, pengerjaan cepat
- Terima props `items` berupa array objek `{icon, title, description}`

### 3. Layanan (`Services.jsx`)

- 4 kartu kategori: Signage & Branding, Vandel & Trophy, Produk Akrilik/Kayu, Custom Cutting
- Tiap kartu clickable, arahkan ke `/katalog?kategori=...` (boleh dummy link dulu)
- Terima props `categories` array

### 4. Portofolio (`Portfolio.jsx`)

- Tab filter di atas grid: Semua / Akrilik / Neon Box / Vandel (state lokal React, tidak perlu backend dulu)
- Grid 3 kolom kartu: gambar + nama produk + kategori
- Terima props `items` array `{image, title, category}`

### 5. Cara Pesan (`HowItWorks.jsx`)

- 4 langkah bernomor horizontal: Upload desain → Pilih bahan → Dapat estimasi → Bayar & tunggu
- Terima props `steps` array

### 6. Bahan & Spesifikasi (`Materials.jsx`)

- Grid kartu 4 kolom: nama bahan + rentang ketebalan
- Data awal: Akrilik, Kayu, MDF, Logam tipis
- Terima props `materials` array (bentuknya harus sama dengan tabel `materials` di database nanti)

### 7. Testimoni (`Testimonials.jsx`)

- 3 kartu: kutipan singkat + nama + jenis customer
- Terima props `testimonials` array — **jangan isi data testimoni palsu**, biarkan array kosong dulu sampai ada data asli dari kakak saya

### 8. Tentang Kami (`About.jsx`)

- Sudah ada file-nya, isi dengan 1 paragraf cerita usaha + foto workshop (placeholder dulu)

### 9. FAQ (`Faq.jsx`)

- Accordion sederhana (pakai elemen native `<details>`/`<summary>` dulu, tidak perlu library)
- Minimal 3 pertanyaan: minimal order, lama produksi, metode pembayaran

### Footer (`Footer.jsx`, taruh di `MainLayout.jsx` bukan di `Home.jsx`)

- Background `primary-900`, teks `primary-100`
- 3 kolom: identitas singkat, tautan cepat, kontak (alamat + ikon)

---

## Kriteria selesai (definition of done)

- [ ] Semua section terima data lewat props, tidak ada teks/gambar hardcode di dalam JSX (kecuali label statis seperti judul section)
- [ ] Semua warna & font pakai token di atas (`bg-primary-600`, `font-header`, dst), nol hex code langsung
- [ ] Responsive: grid 4 kolom di desktop otomatis turun ke 2 kolom (tablet) dan 1 kolom (mobile)
- [ ] Tidak ada data dummy yang terlihat "palsu" untuk testimoni — kosongkan dulu section ini kalau belum ada data asli
- [ ] Komponen disusun di `Pages/Home.jsx` dengan urutan sesuai daftar di atas, di bawah `<Navbar />`
