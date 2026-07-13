import React, { useState } from 'react';

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
        <section id="portfolio" className="bg-neutral-100 py-20 sm:py-28 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="px-3 py-1 mb-4 inline-block rounded-full text-xs font-bold bg-primary-100 text-primary-700 uppercase tracking-wider">
                        Portofolio
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header">
                        Hasil Karya Kami
                    </h2>
                    <p className="mt-4 text-neutral-700">
                        Lihat beberapa karya terbaik yang telah kami kerjakan untuk klien-klien kami.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filter === cat
                                    ? 'bg-primary-700 text-white shadow-md'
                                    : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-400/20'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-400/20 flex flex-col cursor-pointer"
                        >
                            <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200 relative">
                                {/* Placeholder if image is empty or invalid */}
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

                                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-primary-700 uppercase tracking-wider shadow-sm">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-neutral-900 mb-2 font-header group-hover:text-primary-700 transition-colors">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12 text-neutral-500">
                        Belum ada portofolio untuk kategori ini.
                    </div>
                )}
            </div>
        </section>
    );
}
