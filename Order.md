# KONFIGURATOR.md — Simulator Pesanan Interaktif (Frontend-only)

> File ini MENGGANTIKAN rencana `05-order-stepper.md` sebelumnya. Versi lama
> mengasumsikan Stepper mengirim data ke backend + notifikasi Fonnte — itu
> dibatalkan. Versi ini murni interaktif di sisi browser, tidak ada data yang
> disimpan atau dikirim ke server mana pun.

## Konteks

Ini BUKAN sistem order/checkout. Ini alat bantu interaktif di halaman
company profile supaya calon customer bisa "coba-coba" kombinasi bahan,
ketebalan, dan ukuran — lalu hasil pilihannya dirangkai jadi draft pesan
WhatsApp yang siap dikirim. Semua logika berjalan di React, tidak ada
migration, tidak ada endpoint Laravel, tidak ada Fonnte.

Lokasi: komponen baru di dalam `Pages/Home.jsx`, ditaruh tepat di bawah
section `HowItWorks` (Cara Pesan).

File komponen:

- `resources/js/Components/Sections/OrderSimulator.jsx` (bukan `Components/Order/`,
  supaya tidak dikira sistem order sungguhan)
- `resources/js/Components/Sections/Stepper.jsx` + `Stepper.css` (adaptasi dari
  React Bits, styling sama seperti panduan warna sebelumnya: ganti semua
  hex hardcode dengan token `primary-*`/`neutral-*` dari `app.css`)

---

## Alur komponen

### 1. Trigger (selalu terlihat, di bawah section Cara Pesan)

Satu tombol: **"Coba Konfigurasi Pesanan Kamu"** (`bg-primary-600`, teks putih).
Klik → Stepper muncul dengan animasi expand/fade (pakai `motion`), atau buka
sebagai modal — pilih salah satu, modal lebih aman kalau nanti isinya
lumayan panjang.

### 2. Step 1 — Pilih Bahan

Grid tombol kategori (bukan dropdown, biar terasa interaktif):
Akrilik, Kayu/MDF/Plywood, PVC Board, ACP, Besi, Stainless Steel.
Klik salah satu → tersimpan di state lokal `selectedMaterial`, lanjut ke step 2.

### 3. Step 2 — Pilih Ketebalan

Tampilkan chip ketebalan **sesuai kategori yang dipilih** di step 1 (reuse
data `thickness_options` yang sama persis dengan yang dipakai di halaman
Katalog — jangan duplikasi data, import dari satu sumber yang sama, misal
`resources/js/data/materials.js`).

### 4. Step 3 — Ukuran & Jumlah

Input panjang (cm), lebar (cm), jumlah (pcs). Validasi sederhana: tidak
boleh kosong/0 sebelum lanjut ke step berikutnya.

### 5. Step 4 — Ringkasan & Chat WA

Tampilkan ringkasan semua pilihan (read-only), lalu satu tombol besar:
**"Chat via WhatsApp"** — bukan "Kirim Pesanan" atau "Submit".

Fungsi generate link (contoh):

```js
function buildWaLink({ material, thickness, length, width, qty }) {
    const message = `Halo, saya mau tanya untuk custom cutting:
- Bahan: ${material}
- Ketebalan: ${thickness}
- Ukuran: ${length}cm x ${width}cm
- Jumlah: ${qty} pcs

Boleh info harga & estimasi waktunya?`;

    return `https://wa.me/62XXXXXXXXXX?text=${encodeURIComponent(message)}`;
}
```

Tombol pakai `<a href={waLink} target="_blank">`, bukan `onClick` yang manggil
API — supaya jelas ini murni deep link, tidak ada request ke server.

---

## Adaptasi Stepper dari versi sebelumnya

Panduan warna (`primary-600` untuk tombol, `neutral-400` untuk indicator
tidak aktif, dst) **tetap sama** seperti yang sudah dibahas. Yang berubah
cuma bagian logic:

- **Hapus** `onFinalStepCompleted` yang manggil `router.post()` ke Laravel
- **Ganti** dengan fungsi `buildWaLink()` di atas, dipanggil saat step 4 dirender
- **Hapus** `disableStepIndicators` yang terlalu ketat — karena ini cuma
  simulator (bukan form data serius), user boleh bebas klik mundur/maju
  antar step untuk coba-coba kombinasi lain
- `nextButtonText` = "Lanjut", `backButtonText` = "Ulangi Pilihan"

---

## Yang TIDAK dibuat di fitur ini

- Tidak ada migration/tabel database baru
- Tidak ada route POST di Laravel
- Tidak ada integrasi Fonnte/WA API
- Tidak ada penyimpanan histori — kalau user tutup browser, pilihannya hilang, dan itu memang tujuannya (murni alat bantu, bukan sistem pencatatan)

---

## Kriteria selesai (definition of done)

- [ ] Semua interaksi Stepper murni client-side, tidak ada network request kecuali load halaman awal
- [ ] Data ketebalan per kategori diambil dari sumber yang sama dengan halaman Katalog (tidak hardcode dobel)
- [ ] Link WA yang dihasilkan berisi ringkasan pilihan lengkap dan benar (cek encoding karakter khusus tidak rusak)
- [ ] Warna Stepper konsisten dengan token brand (`primary-*`/`neutral-*`)
- [ ] Tombol trigger di section Cara Pesan jelas mengarahkan ke Stepper (scroll otomatis ke posisi Stepper saat dibuka)
