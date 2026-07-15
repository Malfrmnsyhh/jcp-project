import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { FiCheckCircle, FiClock, FiLayers, FiTrendingUp, FiImage, FiAward, FiGrid, FiScissors } from 'react-icons/fi';

// Import Sections
import Hero from '@/Components/Sections/Home';
import Catalog from '@/Components/Sections/Materials';
import Portfolio from '@/Components/Sections/Portfolio';
import HowItWorks from '@/Components/Sections/Order';
import OrderSimulator from '@/Components/UI/OrderSimulator';
import Materials from '@/Components/Sections/Materials';
import Testimonials from '@/Components/Sections/Testimonials';
import About from '@/Components/Sections/About';
import Faq from '@/Components/Sections/Faq';

export default function Home({ auth }) {
    // 1. Hero Data
    const heroData = {
        title: "Jasa Cutting laser & Pusat Produk Kebutuhan Anda",
        subtitle: "Spesialis potongan presisi untuk akrilik, Kayu, dan MDF. Dari layanan kustom hingga katalog produk UMKM unggulan, kami siap mewujudkan ide Anda."
    };

    // 3. Services Data
    const serviceCategories = [
        { icon: <FiImage />, title: "Signage & Branding", description: "Logo timbul, neon box, sampai huruf timbul untuk bikin usahamu lebih dikenali.", href: "/katalog?kategori=signage" },
        { icon: <FiAward />, title: "Vandel & Trophy", description: "Plakat penghargaan yang beda dari yang lain, dari akrilik atau kombinasi kayu.", href: "/katalog?kategori=vandel" },
        { icon: <FiGrid />, title: "Produk Akrilik/Kayu", description: "Gantungan kunci, kotak display, jam dinding, dan aksesoris custom lainnya.", href: "/katalog?kategori=produk" },
        { icon: <FiScissors />, title: "Custom Cutting", description: "Punya file desain sendiri? Kirim, kami potong sesuai bentuknya.", href: "/custom-order" }
    ];

    const portfolioItems = [
        {
            id: 1,
            image: '/storage/images/portfolio/Rectangle 7.png',
            title: 'Box Display Minimalis 30x20x10 Cm',
            description: 'Kotak display akrilik bening dengan tutup sliding, cocok untuk pajangan produk.',
            category: 'produk',
            material: 'Akrilik 3mm',
            status: 'ready-stock'
        },
        {
            id: 2,
            image: '/storage/images/portfolio/Rectangle 8.png',
            title: 'Letter Timbul Acrylic (Font ARIAL 10 Cm)',
            description: 'Huruf timbul akrilik warna putih, dipasang menggunakan braket di dinding.',
            category: 'signage',
            material: 'Akrilik 8mm',
            status: 'ready-stock'
        },
        {
            id: 3,
            image: '/storage/images/portfolio/Rectangle 9.png',
            title: 'Thank You Card Cutting (Ukuran A5)',
            description: 'Kartu ucapan dengan teknik cutting pada permukaan kertas karton tebal.',
            category: 'produk',
            material: 'Kertas Jasmine 260gr',
            status: 'custom-order'
        },
        {
            id: 4,
            image: '/storage/images/portfolio/Rectangle 10.png',
            title: 'Vandel Akrilik 3D (Logo diukir 2 lapis)',
            description: 'Plakat penghargaan premium dengan teknik ukir lapisan untuk kedalaman visual.',
            category: 'vandel',
            material: 'Akrilik 10mm',
            status: 'ready-stock'
        },
        {
            id: 5,
            image: '/storage/images/portfolio/Rectangle 11.png',
            title: 'Case Custom untuk Handphone',
            description: 'Casing HP akrilik dengan pola grafir khusus sesuai keinginan customer.',
            category: 'produk',
            material: 'Akrilik 2mm',
            status: 'custom-order'
        },
        {
            id: 6,
            image: '/storage/images/portfolio/Rectangle 12.png',
            title: 'Name Tag Kantor (Ukuran 2x8 Cm)',
            description: 'Label nama karyawan dengan bahan logam tipis, awet dan tidak mudah pudar.',
            category: 'produk',
            material: 'Plat Stainless 0.8mm',
            status: 'ready-stock'
        }
    ];

    // 5. How It Works Data
    const workSteps = [
        { title: "Pilih Produk di halaman Produk", description: "Klik pada gambar produk yang kamu inginkan" },
        { title: "Konfirmasi Produk Lewat Whatshap", description: "Admin akan menghubungi kamu untuk konfirmasi produk" },
        { title: "Pembayaran dan Estimasi Waktu lewat Whatshap", description: "Admin akan menghitung biaya & perkiraan waktu pengerjaannya buatmu." },
        { title: "Setelah jadi admin akan konfirmasi", description: "Admin akan menginformasikan bahwa produk kamu sudah selesai dan siap dikirim" }
    ];

    // 6. Materials Data
    const materials = [
        { name: "Akrilik Bening & Warna", thickness_range: "1.5mm - 20mm", description: "Transparan atau warna, hasil akhirnya elegan — favorit buat plakat & signage." },
        { name: "Kayu Solid & Triplek", thickness_range: "3mm - 12mm", description: "Kesannya hangat dan natural, cocok untuk dekorasi dan produk grafir." },
        { name: "MDF (Medium Density Fibreboard)", thickness_range: "3mm - 18mm", description: "Permukaannya halus dan rata, pas buat produk yang nantinya mau dicat." },
        { name: "Logam Tipis (Plat)", thickness_range: "0.5mm - 2mm", description: "Kuat dan awet, sering dipakai untuk name tag atau identitas mesin." }
    ];

    // 7. Testimonials Data (Empty as requested until real data is available)
    const testimonials = [];

    // 9. FAQ Data
    const faqs = [
        { question: "Berapa minimal order untuk jasa laser cutting?", answer: "Nggak ada minimal order. Mau pesan 1 pcs buat coba-coba atau langsung banyak, sama-sama kami layani." },
        { question: "Berapa lama proses produksinya?", answer: "Tergantung jumlah dan tingkat kerumitan desain. Biasanya 2-5 hari kerja setelah desain & pembayaran dikonfirmasi." },
        { question: "Metode pembayaran apa saja yang bisa dipakai?", answer: "Transfer bank (BCA, Mandiri, BRI) atau e-wallet seperti GoPay, OVO, dan Dana." },
        { question: "Saya harus punya desain sendiri, nggak?", answer: "Nggak wajib. Kalau sudah punya file vector (CorelDRAW/Illustrator), prosesnya lebih cepat. Belum punya juga nggak apa-apa, tim kami bisa bantu buatkan konsepnya." }
    ];

    return (
        <MainLayout auth={auth}>
            <Head title='Profile' />
            <Hero title={heroData.title} subtitle={heroData.subtitle} />
            <Catalog />
            <Portfolio items={portfolioItems} />
            <HowItWorks steps={workSteps} />
            <OrderSimulator />
            <Testimonials testimonials={testimonials} />
            <About />
            <Faq faqs={faqs} />

        </MainLayout>
    );
}
