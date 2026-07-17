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
import Testimonials from '@/Components/Sections/Testimonials';
import About from '@/Components/Sections/About';
import Faq from '@/Components/Sections/Faq';

export default function Home({ auth }) {
    // 1. Hero Data
    const heroData = {
        title: "Jasa Cutting laser & Pusat Produk Kebutuhan Anda",
        subtitle: "Spesialis potongan presisi untuk akrilik, Kayu, dan MDF. Dari layanan kustom hingga katalog produk unggulan, kami siap mewujudkan kebutuhan Anda."
    };

    const portfolioItems = [
        {
            id: 1,
            name: 'Box Display Akrilik Minimalis 30×20×10 cm',
            description: 'Kotak display akrilik bening dengan tutup sliding, cocok untuk pajangan produk dan koleksi.',
            image: '/storage/images/portfolio/Rectangle 7.png',
            category: 'Produk Akrilik',
            price: 85000,
            stock_status: 'tersedia',
            isBestSeller: true,
        },
        {
            id: 2,
            name: 'Letter Timbul Acrylic — Font ARIAL 10 cm',
            description: 'Huruf timbul akrilik warna putih, dipasang menggunakan braket di dinding untuk signage.',
            image: '/storage/images/portfolio/Rectangle 8.png',
            category: 'Signage',
            price: 15000,
            stock_status: 'tersedia',
            isBestSeller: true,
        },
        {
            id: 3,
            name: 'Thank You Card Cutting — Ukuran A5',
            description: 'Kartu ucapan dengan teknik cutting pada permukaan kertas karton tebal, cocok untuk souvenir.',
            image: '/storage/images/portfolio/Rectangle 9.png',
            category: 'Produk Akrilik',
            price: 5000,
            stock_status: 'tersedia',
            isBestSeller: false,
        },
        {
            id: 4,
            name: 'Vandel Akrilik 3D — Logo Diukir 2 Lapis',
            description: 'Plakat penghargaan premium dengan teknik ukir lapisan untuk kedalaman visual yang elegan.',
            image: '/storage/images/portfolio/Rectangle 10.png',
            category: 'Vandel & Trophy',
            price: 120000,
            stock_status: 'tersedia',
            isBestSeller: true,
        },
        {
            id: 5,
            name: 'Case Custom Handphone Akrilik',
            description: 'Casing HP akrilik dengan pola grafir khusus sesuai keinginan customer.',
            image: '/storage/images/portfolio/Rectangle 11.png',
            category: 'Produk Akrilik',
            price: 35000,
            stock_status: 'pre_order',
            isBestSeller: false,
        },
        {
            id: 6,
            name: 'Name Tag Kantor Stainless — 2×8 cm',
            description: 'Label nama karyawan bahan logam tipis, awet dan tidak mudah pudar.',
            image: '/storage/images/portfolio/Rectangle 12.png',
            category: 'Signage',
            price: 25000,
            stock_status: 'tersedia',
            isBestSeller: false,
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
        { question: "Saya harus punya desain sendiri, nggak?", answer: "Nggak wajib. Kalau sudah punya file vector (CorelDRAW/Illustrator), prosesnya lebih cepat. Belum punya juga nggak apa-apa, tim kami bisa bantu buatkan konsepnya." },
        { question: "Apakah JCP juga menjual produk jadi?", answer: "Ya, selain jasa custom, kami juga menyediakan berbagai produk yang siap dipesan melalui katalog kami." }
    ];

    return (
        <MainLayout auth={auth}>
            <Head title='Profile' />
            <Hero title={heroData.title} subtitle={heroData.subtitle} />
            <Portfolio items={portfolioItems} />
            <HowItWorks steps={workSteps} />
            <Testimonials testimonials={testimonials} />
            <About />
            <Faq faqs={faqs} />

        </MainLayout>
    );
}
