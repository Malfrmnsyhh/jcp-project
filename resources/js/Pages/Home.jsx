import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { FiCheckCircle, FiClock, FiLayers, FiTrendingUp, FiImage, FiAward, FiGrid, FiScissors } from 'react-icons/fi';

// Import Sections
import Hero from '@/Components/Sections/Hero';
import Usp from '@/Components/Sections/Usp';
import Services from '@/Components/Sections/Services';
import Portfolio from '@/Components/Sections/Portfolio';
import HowItWorks from '@/Components/Sections/HowItWorks';
import Materials from '@/Components/Sections/Materials';
import Testimonials from '@/Components/Sections/Testimonials';
import About from '@/Components/Sections/About';
import Faq from '@/Components/Sections/Faq';

export default function Home({ auth }) {
    // 1. Hero Data
    const heroData = {
        title: "Jasa laser cutting presisi untuk akrilik, kayu & logam",
        subtitle: "Wujudkan ide kreatif Anda menjadi produk nyata dengan teknologi laser cutting terbaik di kelasnya."
    };

    // 2. USP Data
    const uspItems = [
        { icon: <FiCheckCircle />, title: "Presisi Tinggi", description: "Hasil pemotongan rapi dan akurat hingga hitungan milimeter." },
        { icon: <FiTrendingUp />, title: "Estimasi Cepat", description: "Dapatkan perhitungan harga transparan dalam waktu singkat." },
        { icon: <FiLayers />, title: "Banyak Pilihan Bahan", description: "Akrilik, kayu, MDF, hingga logam tipis tersedia untuk Anda." },
        { icon: <FiClock />, title: "Pengerjaan Cepat", description: "Proses produksi efisien tanpa mengorbankan kualitas." }
    ];

    // 3. Services Data
    const serviceCategories = [
        { icon: <FiImage />, title: "Signage & Branding", description: "Pembuatan logo timbul, neon box, dan huruf timbul untuk identitas bisnis.", href: "/katalog?kategori=signage" },
        { icon: <FiAward />, title: "Vandel & Trophy", description: "Plakat penghargaan eksklusif dari akrilik maupun kombinasi kayu.", href: "/katalog?kategori=vandel" },
        { icon: <FiGrid />, title: "Produk Akrilik/Kayu", description: "Gantungan kunci, kotak display, jam dinding custom, dan aksesoris lainnya.", href: "/katalog?kategori=produk" },
        { icon: <FiScissors />, title: "Custom Cutting", description: "Jasa potong atau ukir material sesuai dengan desain file vector Anda.", href: "/custom-order" }
    ];

    // 4. Portfolio Data
    const portfolioItems = [
        { image: "", title: "Neon Box Kopi Senja", category: "Neon Box" },
        { image: "", title: "Plakat Penghargaan Daerah", category: "Vandel" },
        { image: "", title: "Gantungan Kunci Custom", category: "Akrilik" },
        { image: "", title: "Papan Nama Meja", category: "Akrilik" },
        { image: "", title: "Logo Timbul Kayu", category: "Semua" },
        { image: "", title: "Trophy Juara 1 Esports", category: "Vandel" },
    ];

    // 5. How It Works Data
    const workSteps = [
        { title: "Upload Desain", description: "Siapkan file vector Anda atau konsultasikan desain dengan tim kami." },
        { title: "Pilih Bahan", description: "Tentukan material dan ketebalan yang sesuai dengan kebutuhan produk Anda." },
        { title: "Dapat Estimasi", description: "Kami akan memberikan rincian biaya dan estimasi waktu pengerjaan." },
        { title: "Bayar & Tunggu", description: "Lakukan pembayaran dan kami segera memproduksi pesanan Anda." }
    ];

    // 6. Materials Data
    const materials = [
        { name: "Akrilik Bening & Warna", thickness_range: "1.5mm - 20mm", description: "Material transparan atau berwarna dengan hasil akhir elegan. Cocok untuk plakat dan signage." },
        { name: "Kayu Solid & Triplek", thickness_range: "3mm - 12mm", description: "Bahan natural yang memberikan kesan hangat dan klasik. Ideal untuk dekorasi dan grafir." },
        { name: "MDF (Medium Density Fibreboard)", thickness_range: "3mm - 18mm", description: "Papan kayu komposit yang sangat halus dan rata, sempurna untuk produk yang akan dicat." },
        { name: "Logam Tipis (Plat)", thickness_range: "0.5mm - 2mm", description: "Material kuat dan tahan lama untuk kebutuhan identitas mesin atau name tag eksklusif." }
    ];

    // 7. Testimonials Data (Empty as requested until real data is available)
    const testimonials = [];

    // 9. FAQ Data
    const faqs = [
        { question: "Berapa minimal order untuk jasa laser cutting?", answer: "Kami tidak menerapkan minimal order. Anda bisa memesan mulai dari 1 pcs untuk pembuatan sampel maupun langsung dalam partai besar." },
        { question: "Berapa lama proses produksi memakan waktu?", answer: "Lama produksi bergantung pada jumlah dan tingkat kerumitan pesanan. Rata-rata pengerjaan normal adalah 2-5 hari kerja setelah desain dan pembayaran dikonfirmasi." },
        { question: "Metode pembayaran apa saja yang diterima?", answer: "Kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BRI) serta berbagai e-wallet seperti GoPay, OVO, dan Dana." },
        { question: "Apakah saya harus punya desain sendiri?", answer: "Tidak wajib. Jika Anda sudah punya file vector (CorelDRAW/Illustrator), proses akan lebih cepat. Namun jika belum, tim kami siap membantu mendesainkan konsep Anda." }
    ];

    return (
        <MainLayout auth={auth}>
            <Head title="Beranda" />
            
            <Hero title={heroData.title} subtitle={heroData.subtitle} />
            <Usp items={uspItems} />
            <Services categories={serviceCategories} />
            <Portfolio items={portfolioItems} />
            <HowItWorks steps={workSteps} />
            <Materials materials={materials} />
            <Testimonials testimonials={testimonials} />
            <About />
            <Faq faqs={faqs} />
            
        </MainLayout>
    );
}
