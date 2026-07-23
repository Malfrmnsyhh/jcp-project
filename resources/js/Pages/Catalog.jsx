import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiArrowLeft } from 'react-icons/fi';

export default function Catalog({ auth, categories = [], products = [] }) {
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'Semua' || (product.category && product.category.name === activeCategory);
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const formatRupiah = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <MainLayout auth={auth}>
            <Head title='Katalog Produk' />
            
            <div className="bg-white pt-24 pb-12 sm:pt-28 sm:pb-16 relative">
                <div className="absolute inset-0 bg-neutral-50" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)' }}></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 font-header mb-6">
                            Katalog <span className="text-primary-700">Produk</span>
                        </h1>
                        <p className="text-lg text-neutral-600">
                            Temukan berbagai produk unggulan JCP, dari material akrilik hingga kayu dengan berbagai desain dan fungsi.
                        </p>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-neutral-200 mb-10">
                        <div className="relative w-full sm:w-96">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                className="w-full pl-12 pr-4 py-3 bg-neutral-100 border-transparent rounded-xl focus:bg-neutral-200 focus:border-primary-500 focus:ring-primary-200 transition-all text-sm font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                            <button
                                onClick={() => setActiveCategory('Semua')}
                                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                    activeCategory === 'Semua'
                                        ? 'bg-primary-600 text-white shadow-md'
                                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                }`}
                            >
                                Semua
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.name)}
                                    className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                        activeCategory === category.name
                                            ? 'bg-primary-600 text-white shadow-md'
                                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <AnimatePresence>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    key={product.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-200 group hover:shadow-xl transition-all"
                                >
                                    <div className="aspect-square bg-neutral-100 relative overflow-hidden">
                                        {product.images && product.images.length > 0 ? (
                                            <img
                                                src={product.images[0].image_path}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                                No Image
                                            </div>
                                        )}
                                        {/* Status Badge */}
                                        <div className="absolute top-3 left-3">
                                            {product.stock_status === 'in_stock' && (
                                                <span className="bg-emerald-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-sm">Ready Stock</span>
                                            )}
                                            {product.stock_status === 'pre_order' && (
                                                <span className="bg-amber-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-sm">Pre-Order</span>
                                            )}
                                            {product.stock_status === 'out_of_stock' && (
                                                <span className="bg-rose-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-sm">Habis</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="text-xs font-bold text-primary-600 mb-1 uppercase tracking-wider">
                                            {product.category ? product.category.name : 'Uncategorized'}
                                        </div>
                                        <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-tight">
                                            {product.name}
                                        </h3>
                                        <p className="text-primary-700 font-extrabold text-xl mb-4">
                                            {formatRupiah(product.price)}
                                        </p>
                                        <button className="w-full bg-neutral-900 hover:bg-primary-600 text-white font-bold py-3 rounded-xl transition-colors text-sm">
                                            Pesan Sekarang
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 mt-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 mb-4">
                                <FiSearch className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">Tidak Ditemukan</h3>
                            <p className="text-neutral-500">
                                Tidak ada produk yang sesuai dengan filter atau pencarian Anda.
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveCategory('Semua'); }}
                                className="mt-6 text-primary-600 font-bold hover:text-primary-700"
                            >
                                Reset Filter
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
