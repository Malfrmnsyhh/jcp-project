import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { FiCheckCircle, FiClock, FiLayers, FiTrendingUp, FiImage, FiAward, FiGrid, FiScissors } from 'react-icons/fi';

import Hero from '@/Components/Sections/Home';
import Catalog from '@/Components/Sections/Materials';
import Portfolio from '@/Components/Sections/Portfolio';
import HowItWorks from '@/Components/Sections/Order';
import Testimonials from '@/Components/Sections/Testimonials';
import About from '@/Components/Sections/About';
import Faq from '@/Components/Sections/Faq';

export default function Home({ auth, portfolios }) {
    // 1. Hero Data
    const heroData = {
        title: "Jasa Cutting laser & Pusat Produk Kebutuhan Anda",
        subtitle: "Spesialis potongan presisi untuk akrilik, Kayu, dan MDF. Dari layanan kustom hingga katalog produk unggulan, kami siap mewujudkan kebutuhan Anda."
    };

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
            <Catalog materials={materials} />
            <Portfolio items={portfolios} />
            <HowItWorks steps={workSteps} />
            <Testimonials testimonials={testimonials} />
            <About />
            <Faq faqs={faqs} />

        </MainLayout>
    );
}
