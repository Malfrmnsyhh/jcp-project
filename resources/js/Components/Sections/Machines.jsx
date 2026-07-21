import React from 'react';
import { motion } from 'framer-motion';

export default function Machines({ machines = [] }) {
    if (!machines || machines.length === 0) return null;

    return (
        <section id="machines" className="bg-white py-20 sm:py-28 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header">
                        Fasilitas Produksi Kami
                    </h2>
                    <p className="mt-4 text-neutral-600">
                        Didukung dengan mesin berteknologi tinggi untuk memastikan presisi, kecepatan, dan kualitas terbaik untuk setiap produk Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {machines.map((machine, idx) => (
                        <motion.div
                            key={machine.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-neutral-50 rounded-2xl overflow-hidden shadow-sm border border-neutral-200 group"
                        >
                            <div className="aspect-4/3 overflow-hidden relative bg-neutral-200">
                                {machine.image_path ? (
                                    <img
                                        src={machine.image_path}
                                        alt={machine.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full text-neutral-400">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="text-xs font-bold text-primary-600 mb-2 uppercase tracking-wider">
                                    {machine.type}
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                    {machine.name}
                                </h3>
                                <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                                    {machine.description}
                                </p>
                                <div className="text-sm font-semibold text-neutral-700 bg-white px-3 py-1.5 rounded-lg border border-neutral-200 inline-block">
                                    Area Kerja: {machine.work_area}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
