# Project Base — JCP (Jombang Creative Project) Website

## Konteks Project

Website untuk usaha jasa laser cutting JCP (Jombang Creative Project) — meliputi
company profile, katalog produk (akrilik, kayu, MDF, vandel, trophy, neon box,
3D neon sign, letter box), dan jasa custom cutting dengan upload desain.

**Stack:** Laravel 11 + Inertia.js + React + Tailwind CSS + Vite
**Struktur folder:** `resources/js/Components/section`, `resources/js/Components/UI`,
`resources/js/Layouts`, `resources/js/Pages`

> Catatan struktur: buat `Layouts/MainLayout.jsx` untuk halaman publik
> (company profile, katalog) — terpisah dari `GuestLayout` yang dipakai untuk
> auth (login/register).

---

## Design Tokens — Color Palette

Palet dasar (brand, monokromatik biru — kesan presisi & profesional):

```css
:root {
    /* Brand blue scale */
    --color-primary-900: #03045e; /* teks gelap / header dark section */
    --color-primary-800: #023e8a;
    --color-primary-700: #0077b6; /* brand utama / logo, link aktif */
    --color-primary-600: #0096c7; /* tombol utama (PrimaryButton) */
    --color-primary-500: #00b4d8; /* hover state, accent */
    --color-primary-400: #48cae4;
    --color-primary-300: #90e0ef; /* background tint section */
    --color-primary-200: #ade8f4;
    --color-primary-100: #caf0f8; /* background lembut, badge */

    /* Neutral scale — pelengkap wajib, palet brand di atas tidak punya netral */
    --color-neutral-900: #171923; /* teks body utama */
    --color-neutral-700: #4a5568; /* teks sekunder */
    --color-neutral-400: #a0aec0; /* border, placeholder */
    --color-neutral-100: #f7fafc; /* background halaman */
    --color-white: #ffffff;

    /* Semantic */
    --color-success: #2f9e44;
    --color-danger: #e03131;
}
```

**Aturan pemakaian:**

- Teks body → `neutral-900`, bukan warna biru (biru hanya untuk aksen/brand elements)
- Background halaman → `neutral-100` / `white`, bukan biru terang, supaya konten tidak "tenggelam"
- `primary-600` → warna utama tombol CTA (Pesan Sekarang, Lihat Katalog)
- `primary-700` → warna logo & link navigasi aktif
- `primary-100`/`primary-300` → hanya untuk background section aksen (misal background section USP), tidak untuk teks

Implementasikan sebagai extend di `tailwind.config.js` dengan nama token di atas
(`primary-100` ... `primary-900`, `neutral-*`), jangan pakai hex langsung di JSX.

---

## SCOPE KERJA SAAT INI: Navbar sahaja

> AI Agent: fokus HANYA pada komponen `Navbar.jsx` di
> `resources/js/Components/section/Navbar.jsx`. Jangan sentuh komponen
> section lain (Hero, About, Layanan, Portfolio) di tahap ini.

### Struktur Navbar (3 lapis, referensi pola header e-commerce)

**Lapis 1 — Top utility bar** (background `primary-900`, teks putih, ukuran kecil)

- Kiri: teks promo singkat, contoh "Konsultasi desain gratis sebelum order"
- Kanan: link "Lacak Pesanan" | "Bantuan"
- Sembunyikan lapis ini di mobile (breakpoint < md) untuk hemat ruang

**Lapis 2 — Main bar** (background putih, sticky on scroll, shadow tipis)

- Kiri: Logo JCP (pakai `ApplicationLogo.jsx` yang sudah ada)
- Tengah: Search bar dengan placeholder "Cari produk laser cutting..." +
  dropdown kategori kecil di sisi kiri search bar (opsional untuk versi awal,
  boleh statis dulu tanpa fungsi search aktif)
- Kanan: ikon Akun (Sign In / My Account) dan ikon Keranjang dengan badge
  jumlah item (badge sementara static `0`, belum perlu logic cart)

**Lapis 3 — Category nav** (background `primary-700`, teks putih)

- Menu horizontal: Beranda, Katalog, Custom Order, Portofolio, Tentang Kami, Kontak
- Item aktif diberi underline atau background `primary-600`
- Di mobile, lapis ini + lapis 2 kanan digabung jadi hamburger menu
  (gunakan `ResponsiveNavLink.jsx` yang sudah tersedia di `Components/UI`)

### Komponen yang boleh dipakai ulang (sudah ada, jangan bikin baru)

- `ApplicationLogo.jsx`
- `NavLink.jsx` / `ResponsiveNavLink.jsx`
- `PrimaryButton.jsx` (jika perlu CTA kecil di navbar)

### Kriteria selesai (definition of done)

- [ ] Responsive: desktop (3 lapis penuh) dan mobile (hamburger menu)
- [ ] Sticky main bar saat scroll ke bawah
- [ ] Semua warna pakai token Tailwind di atas, tidak ada hex hardcoded
- [ ] Tidak ada data dummy yang di-hardcode selain label menu statis di atas
- [ ] Props `cartCount` dan `user` diterima sebagai prop (bukan hardcode),
      supaya nanti gampang disambungkan ke data auth & cart asli
