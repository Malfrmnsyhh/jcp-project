import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { FiCheckCircle, FiClock, FiLayers, FiTrendingUp, FiImage, FiAward, FiGrid, FiScissors } from 'react-icons/fi';

import Hero from '@/Components/Sections/Home';
import Catalog from '@/Components/Sections/Materials';
import Machines from '@/Components/Sections/Machines';
import Portfolio from '@/Components/Sections/Portfolio';
import HowItWorks from '@/Components/Sections/Order';
import Testimonials from '@/Components/Sections/Testimonials';
import About from '@/Components/Sections/About';
import Faq from '@/Components/Sections/Faq';

export default function Home({ auth, portfolios, testimonials = [], machines = [], materials = [] }) {
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

    // 7. Testimonials Data
    const testimonialsData = testimonials.map((item) => ({
        name: item.customer_name,
        role: item.customer_role || 'Pelanggan',
        quote: item.content,
        image: item.product_image || null,
    }));

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
            <Machines machines={machines} />
            <Portfolio items={portfolios} />
            <HowItWorks steps={workSteps} />
            <Testimonials testimonials={testimonialsData} />
            <About />
            <Faq faqs={faqs} />
        </MainLayout>
    );
}
