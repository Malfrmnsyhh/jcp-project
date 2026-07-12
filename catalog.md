# CATALOG.md — Halaman Katalog Bahan (Edukasi Material)

## Konteks

Halaman "Katalog" BUKAN marketplace/e-commerce. Fungsinya murni edukasi:
menampilkan jenis bahan yang bisa dikerjakan JCP, ketebalan yang tersedia,
dan pilihan warna/finishing — supaya calon customer paham opsi sebelum
menghubungi tim lewat WA. Tidak ada harga, tidak ada tombol beli.

File: `resources/js/Pages/Katalog.jsx`
Route: `/katalog` (halaman publik, pakai `MainLayout`)
Komponen baru: `Components/Sections/MaterialCard.jsx`,
`Components/Sections/MaterialDetailModal.jsx`

---

## Struktur data

Satu material = satu objek dengan bentuk berikut (dipakai baik untuk card
maupun modal detail):

```js
{
  id: 1,
  category: "akrilik", // slug untuk filter: akrilik | kayu | pvc | acp | besi | stainless
  name: "Akrilik",
  icon: "ti-square", // nama icon Tabler, ditampilkan di card
  short_description: "Bening, susu, solid, mirror",
  description: "Bahan transparan atau berwarna, hasil akhir elegan. Cocok untuk plakat dan signage.",
  thickness_options: ["2mm", "3mm", "5mm", "8mm", "10mm"],
  finishes: [
    { name: "Bening", swatch: "#eef6f8" },
    { name: "Susu", swatch: "#f5f5f0" },
    { name: "Solid", swatch: "#d85a30" },
    { name: "Mirror", swatch: "#b4b2a9" }
  ]
}
```

Untuk kategori yang tidak punya varian warna (misalnya Besi/Stainless yang
cuma punya finishing seperti brushed/glossy, bukan warna), field `finishes`
tetap dipakai tapi isinya finishing, bukan warna — struktur data sama,
cuma isi beda. Kalau memang tidak relevan sama sekali, kirim array kosong
dan modal otomatis sembunyikan bagian itu (jangan tampilkan section kosong).

### 6 kategori awal yang wajib diisi

1. Akrilik
2. Kayu / MDF / Plywood
3. PVC Board
4. ACP (Aluminum Composite Panel)
5. Besi
6. Stainless Steel

---

## SCOPE: 3 bagian yang harus dibangun

### 1. Filter tab kategori (bagian atas halaman)

- Tab: Semua, Akrilik, Kayu/MDF/Plywood, PVC Board, ACP, Besi, Stainless Steel
- State lokal React (`useState`), filter grid di bawahnya — tidak perlu reload halaman
- Tab aktif diberi background `bg-primary-600` teks putih, tab non-aktif teks `neutral-700`

### 2. Grid kartu material (`MaterialCard.jsx`)

Setiap kartu ringkas saja, isinya:

- Icon (ukuran kecil, warna `primary-700`)
- Nama material (`font-header`, bold)
- `short_description` (1 baris)
- Badge kecil rentang ketebalan, contoh "2mm - 10mm"
- Seluruh kartu clickable → buka modal detail (`onClick` set state `selectedMaterial`)

Grid: `grid-cols-3` di desktop, `grid-cols-2` di tablet, `grid-cols-1` di mobile.

### 3. Modal detail (`MaterialDetailModal.jsx`)

Muncul saat kartu diklik, isinya:

- Nama + `description` (versi panjang)
- Section "Ketebalan tersedia" → render `thickness_options` sebagai chip/badge kecil, bukan dropdown
- Section "Pilihan warna/finishing" → render `finishes` sebagai lingkaran swatch warna + label di bawahnya. **Jangan render section ini kalau array `finishes` kosong.**
- Tombol CTA penuh lebar di bawah: "Tanya ketersediaan via WA" → `href` ke
  `https://wa.me/62XXXXXXXXXX?text=Halo,%20saya%20mau%20tanya%20soal%20bahan%20{nama_material}`
  (ganti nomor WA asli, dan encode nama material dinamis dari state)
- Tombol close (X) di pojok kanan atas modal

---

## Yang TIDAK boleh ada di halaman ini

- Tombol "Tambah ke keranjang" atau "Beli sekarang"
- Input harga atau kalkulasi apapun
- Form checkout

---

## Kriteria selesai (definition of done)

- [ ] Data material didefinisikan di `Katalog.jsx` sebagai array (nanti dari
      controller Laravel, tapi untuk sekarang boleh hardcode array di file React)
- [ ] Filter tab berfungsi tanpa reload halaman
- [ ] Modal detail menyembunyikan section "Pilihan warna" kalau `finishes` kosong
- [ ] Tombol WA di modal membawa nama material yang sedang dibuka (dinamis,
      bukan teks statis sama untuk semua material)
- [ ] Responsive 3/2/1 kolom sesuai lebar layar
- [ ] Semua warna pakai token dari `app.css` (`primary-*`, `neutral-*`), tidak ada hex baru
