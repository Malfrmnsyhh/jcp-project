import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiStar } from 'react-icons/fi';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
};

/**
 * Format number ke format Rupiah.
 * Contoh: 25000 → "Rp 25.000"
 */
function formatRupiah(num) {
    return 'Rp ' + Number(num).toLocaleString('id-ID');
}

/**
 * Build link WhatsApp untuk order produk langsung.
 * Sesuai PRD: user pilih produk → chat WA admin.
 */
function buildWaLink(product, waNumber = '6281234567890') {
    const message = `Halo admin JCP, saya tertarik dengan produk:\n\n*${product.name}*\nHarga: ${formatRupiah(product.price)}\n\nApakah produk ini masih tersedia?`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}

export default function Portfolio({ items = [] }) {
    const [filter, setFilter] = useState('Semua');

    if (!items || items.length === 0) return null;

    // Get unique categories for filter tabs
    const categories = ['Semua', ...new Set(items.map(item => item.category))];

    // Filter items based on selected category
    const filteredItems = filter === 'Semua'
        ? items
        : items.filter(item => item.category === filter);

    return (
        <section id="portfolio" className="bg-neutral-100 py-20 sm:py-28 relative mt-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                    <div className="text-start">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header">
                            Produk Favorit
                        </h2>
                        <p className="mt-4 text-neutral-700 max-w-xl">
                            Berikut pilihan produk yang paling banyak diminati oleh pelanggan kami.
                        </p>
                    </div>
                    <a
                        href="/katalog-produk"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-primary-700 text-white text-sm font-bold hover:bg-primary-800 transition-colors shrink-0"
                    >
                        <FiShoppingBag className="w-4 h-4" />
                        Lihat Semua Produk
                    </a>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-start gap-2 mb-12">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded text-sm font-semibold transition-all relative ${filter === cat
                                ? 'text-white'
                                : 'bg-white text-neutral-700 hover:bg-primary-50 border border-primary-300'
                                }`}
                        >
                            {filter === cat && (
                                <motion.div
                                    layoutId="portfolioActiveTab"
                                    className="absolute inset-0 bg-primary-700 rounded shadow-sm z-0"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{cat}</span>
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                variants={cardVariants}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -5 }}
                                className="group bg-white rounded-lg overflow-hidden border border-primary-300 shadow-none hover:shadow-md hover:border-primary-500 transition-all duration-300 flex flex-col"
                            >
                                {/* Image */}
                                <div className="aspect-[4/3] w-full overflow-hidden bg-primary-50 relative">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                                            Gambar belum tersedia
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-primary-700 uppercase tracking-wider border border-primary-200">
                                        {item.category}
                                    </div>

                                    {/* Best Seller Badge */}
                                    {item.isBestSeller && (
                                        <div className="absolute top-4 right-4 px-2.5 py-1 bg-amber-500 text-white rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                            <FiStar className="w-3 h-3" /> Favorit
                                        </div>
                                    )}

                                    {/* Stock Status Badge */}
                                    {item.stock_status === 'habis' && (
                                        <div className="absolute inset-0 bg-neutral-900/50 flex items-center justify-center">
                                            <span className="px-4 py-2 bg-neutral-900/80 text-white rounded font-bold text-sm tracking-wider uppercase">
                                                Stok Habis
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold text-neutral-900 mb-1 font-header group-hover:text-primary-700 transition-colors leading-snug">
                                        {item.name}
                                    </h3>

                                    {item.description && (
                                        <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">
                                            {item.description}
                                        </p>
                                    )}

                                    {/* Price & CTA */}
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-primary-100">
                                        <span className="font-extrabold text-primary-700 font-header text-lg">
                                            {formatRupiah(item.price)}
                                        </span>

                                        {item.stock_status !== 'habis' ? (
                                            <a
                                                href={buildWaLink(item)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary-700 text-white text-xs font-bold hover:bg-primary-800 transition-colors"
                                            >
                                                <FiShoppingBag className="w-3.5 h-3.5" />
                                                Pesan
                                            </a>
                                        ) : (
                                            <span className="px-4 py-2 rounded bg-neutral-200 text-neutral-500 text-xs font-bold cursor-not-allowed">
                                                Habis
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12 text-neutral-500">
                        Belum ada produk untuk kategori ini.
                    </div>
                )}
            </div>
        </section>
    );
}
