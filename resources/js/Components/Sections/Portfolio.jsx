import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <section id="portfolio" className="bg-neutral-100 py-20 sm:py-28 relative scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-start max-w-full mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header">
                        Produk Kami
                    </h2>
                    <p className="mt-4 text-neutral-700">
                        Berikut beberapa contoh produk yang telah kami kerjakan untuk customer kami.
                    </p>
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

                {/* Portfolio Grid — same motion layout + AnimatePresence as Catalog */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -5 }}
                                className="group bg-white rounded-lg overflow-hidden border border-primary-300 shadow-none hover:shadow-md hover:border-primary-500 transition-all duration-300 flex flex-col cursor-pointer"
                            >
                                <div className="aspect-[4/3] w-full overflow-hidden bg-primary-50 relative">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                            No Image
                                        </div>
                                    )}

                                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-primary-700 uppercase tracking-wider border border-primary-200">
                                        {item.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-neutral-900 mb-2 font-header group-hover:text-primary-700 transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12 text-neutral-500">
                        Belum ada portofolio untuk kategori ini.
                    </div>
                )}
            </div>
        </section>
    );
}
