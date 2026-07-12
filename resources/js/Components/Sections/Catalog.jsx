import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLayers, FiBox, FiGrid, FiTablet, FiHardDrive, FiShield } from 'react-icons/fi';
import MaterialCard from '../UI/MaterialCard';
import MaterialDetailModal from '../UI/MaterialDetailModal';

export default function Catalog() {
    const [activeTab, setActiveTab] = useState('Semua');
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const tabs = ['Semua', 'Akrilik', 'Kayu', 'PVC', 'ACP', 'Besi', 'Stainless'];

    const materials = [
        {
            id: 1,
            category: "Akrilik",
            name: "Akrilik",
            icon: <FiBox />,
            short_description: "Bening, susu, solid, mirror",
            description: "Bahan transparan atau berwarna dengan hasil akhir elegan. Sangat cocok untuk pembuatan plakat, signage, neon box, dan display produk eksklusif.",
            thickness_options: ["2mm", "3mm", "5mm", "8mm", "10mm", "15mm", "20mm"],
            finishes: [
                { name: "Bening", swatch: "#eef6f8" },
                { name: "Susu", swatch: "#f5f5f0" },
                { name: "Hitam Solid", swatch: "#1a1a1a" },
                { name: "Putih Solid", swatch: "#ffffff" },
                { name: "Gold Mirror", swatch: "#d4af37" },
                { name: "Silver Mirror", swatch: "#c0c0c0" }
            ]
        },
        {
            id: 2,
            category: "Kayu",
            name: "Kayu Solid & MDF",
            icon: <FiLayers />,
            short_description: "Natural, hangat, dan mudah dibentuk",
            description: "Material kayu memberikan kesan natural dan estetik. MDF sangat halus permukaannya, cocok untuk huruf timbul atau dekorasi dinding yang akan dicat duco.",
            thickness_options: ["3mm", "5mm", "9mm", "12mm", "15mm", "18mm"],
            finishes: [
                { name: "Jati Belanda", swatch: "#d4b886" },
                { name: "MDF Mentah", swatch: "#c2a370" },
                { name: "Plywood", swatch: "#e8cfa6" }
            ]
        },
        {
            id: 3,
            category: "PVC",
            name: "PVC Board",
            icon: <FiTablet />,
            short_description: "Ringan, tahan air & cuaca",
            description: "PVC Board adalah pengganti kayu yang sangat ringan, anti rayap, dan tahan air. Sangat ideal untuk huruf timbul outdoor maupun indoor.",
            thickness_options: ["3mm", "5mm", "9mm", "12mm", "15mm", "18mm"],
            finishes: [
                { name: "Putih Matte", swatch: "#f8f9fa" }
            ]
        },
        {
            id: 4,
            category: "ACP",
            name: "Aluminium Composite Panel",
            icon: <FiGrid />,
            short_description: "Kaku, ringan, tahan karat",
            description: "Material perpaduan aluminium dan komposit yang sangat awet untuk pemakaian outdoor. Sering digunakan untuk fasad bangunan atau background papan nama.",
            thickness_options: ["3mm", "4mm"],
            finishes: [
                { name: "Putih Glossy", swatch: "#ffffff" },
                { name: "Hitam Glossy", swatch: "#000000" },
                { name: "Silver Metallic", swatch: "#a8a9ad" },
                { name: "Kuning", swatch: "#facc15" },
                { name: "Merah", swatch: "#ef4444" }
            ]
        },
        {
            id: 5,
            category: "Besi",
            name: "Besi Plat",
            icon: <FiHardDrive />,
            short_description: "Kuat, kaku, dan industrial",
            description: "Plat besi yang dipotong dengan laser fiber menghasilkan presisi tinggi. Sering digunakan untuk pagar custom, sekat ruangan (partisi), dan signage industrial.",
            thickness_options: ["1mm", "1.2mm", "1.5mm", "2mm", "3mm"],
            finishes: [
                { name: "Mentah", swatch: "#5a5a5a" },
                { name: "Karat (Rustic)", swatch: "#8b4513" }
            ] // Akan dicat sendiri atau finishing powder coating
        },
        {
            id: 6,
            category: "Stainless",
            name: "Stainless Steel",
            icon: <FiShield />,
            short_description: "Anti karat, premium, elegan",
            description: "Material logam paling premium yang tidak akan berkarat. Sangat cocok untuk huruf timbul perusahaan, name tag kantor eksklusif, dan nomor rumah mewah.",
            thickness_options: ["0.8mm", "1mm", "1.2mm", "1.5mm"],
            finishes: [
                { name: "Mirror (Kaca)", swatch: "#e3e4e5" },
                { name: "Hairline (Garis)", swatch: "#a9a9a9" },
                { name: "Gold Mirror", swatch: "#d4af37" },
                { name: "Rose Gold", swatch: "#b76e79" }
            ]
        }
    ];

    const filteredMaterials = activeTab === 'Semua'
        ? materials
        : materials.filter(m => m.category === activeTab);

    return (
        <section id="katalog" className="bg-neutral-100 py-20 sm:py-28 relative">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="px-3 py-1 mb-4 inline-block rounded-full text-xs font-bold bg-primary-200 text-primary-800 uppercase tracking-wider">
                        Katalog Material
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header">
                        Kenali Bahan Terbaik Anda
                    </h2>
                    <p className="mt-4 text-neutral-700">
                        Kami menyediakan beragam jenis bahan berkualitas tinggi. Silakan pelajari spesifikasi dan ketersediaannya sebelum memesan.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {tabs.map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all relative ${activeTab === tab
                                    ? 'text-white'
                                    : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-400/20'
                                }`}
                        >
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute inset-0 bg-primary-700 rounded-full shadow-md z-0"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{tab}</span>
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredMaterials.map((material) => (
                            <MaterialCard
                                key={material.id}
                                material={material}
                                onClick={() => setSelectedMaterial(material)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredMaterials.length === 0 && (
                    <div className="text-center py-12 text-neutral-500">
                        Kategori ini belum memiliki data material.
                    </div>
                )}
            </div>

            {/* Modal */}
            <MaterialDetailModal
                material={selectedMaterial}
                onClose={() => setSelectedMaterial(null)}
            />
        </section>
    );
}