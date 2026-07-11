import React from 'react';
import { Link } from '@inertiajs/react';
import { FiArrowRight } from 'react-icons/fi';

export default function Services({ categories = [] }) {
    if (!categories || categories.length === 0) return null;

    return (
        <section id="katalog" className="bg-white py-20 sm:py-28 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="px-3 py-1 mb-4 inline-block rounded-full text-xs font-bold bg-primary-100 text-primary-700 uppercase tracking-wider">
                        Layanan Unggulan
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header">
                        Solusi Laser Cutting Kami
                    </h2>
                    <p className="mt-4 text-neutral-700">
                        Kami melayani berbagai macam kebutuhan personalisasi dan industri dengan material berkualitas.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <Link 
                            key={index} 
                            href={cat.href || '#'}
                            className="group block relative overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-400/20 hover:border-primary-500/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                        >
                            {/* Decorative background shape */}
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-100 rounded-full blur-2xl group-hover:bg-primary-200 transition-colors pointer-events-none"></div>
                            
                            <div className="p-8 relative z-10 flex-1 flex flex-col">
                                <div className="w-12 h-12 rounded-xl bg-white text-primary-700 shadow-sm flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform border border-neutral-400/10">
                                    {cat.icon}
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900 mb-3 font-header group-hover:text-primary-700 transition-colors">
                                    {cat.title}
                                </h3>
                                <p className="text-sm text-neutral-700 leading-relaxed mb-6 flex-1">
                                    {cat.description}
                                </p>
                                <div className="flex items-center text-primary-700 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                    <span>Jelajahi Produk</span>
                                    <FiArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
