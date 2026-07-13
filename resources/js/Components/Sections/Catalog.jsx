import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MaterialCard from '../UI/MaterialCard';
import MaterialDetailModal from '../UI/MaterialDetailModal';
import { materialsData } from '../../data/materials';

export default function Catalog() {
    const [activeTab, setActiveTab] = useState('Semua');
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const tabs = ['Semua', 'Akrilik', 'Kayu', 'PVC', 'ACP', 'Besi', 'Stainless'];

    const materials = materialsData;

    const filteredMaterials = activeTab === 'Semua'
        ? materials
        : materials.filter(m => m.category === activeTab);

    return (
        <section id="catalog" className="bg-neutral-50 py-20 sm:py-28 relative ">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center max-w-2xl mx-auto mb-16">
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