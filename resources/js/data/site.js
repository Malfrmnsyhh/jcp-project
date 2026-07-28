/**
 * Data kontak & identitas perusahaan.
 *
 * Sebelumnya nomor WhatsApp/telepon ditulis ulang di beberapa komponen dengan
 * nilai placeholder yang berbeda-beda. Semua komponen sekarang membaca dari
 * sini supaya cukup diubah di satu tempat.
 *
 * TODO: `whatsapp` dan `phone` di bawah masih nomor placeholder bawaan —
 * ganti dengan nomor JCP yang sebenarnya sebelum rilis.
 */
export const site = {
    name: 'JCP Profile',
    legalName: 'Jombang Creative Project',

    /** Format internasional tanpa "+" atau spasi, dipakai untuk tautan wa.me */
    whatsapp: '6281234567890',

    /** Format tampilan untuk dibaca manusia */
    phone: '+62 812-3456-7890',

    email: 'info@jombangcreativeproject.com',

    address:
        'Dsn Menganto RT 07 RW 02 nomor 54, Menganto, Kec. Mojowarno, Kabupaten Jombang, Jawa Timur 61475',
};

/**
 * Bangun tautan wa.me dengan pesan yang sudah ter-encode.
 */
export function whatsappLink(message) {
    const base = `https://wa.me/${site.whatsapp}`;

    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
