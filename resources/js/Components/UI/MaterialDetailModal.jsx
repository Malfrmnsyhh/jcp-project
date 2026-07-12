import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function MaterialDetailModal({ material, onClose }) {
    if (!material) return null;

    const waNumber = "6281234567890"; // Ganti dengan nomor asli
    const waText = encodeURIComponent(`Halo, saya mau tanya soal bahan ${material.name}`);
    const waLink = `https://wa.me/${waNumber}?text=${waText}`;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-neutral-400/20 bg-primary-700/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center text-2xl">
                                {material.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-900 font-header">
                                {material.name}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors shadow-sm"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content Scrollable */}
                    <div className="p-6 sm:p-8 overflow-y-auto">
                        <p className="text-neutral-700 leading-relaxed text-lg mb-8">
                            {material.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Thickness */}
                            {material.thickness_options && material.thickness_options.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4 font-header">
                                        Ketebalan Tersedia
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {material.thickness_options.map((thickness, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1.5 bg-neutral-100 border border-neutral-400/30 text-neutral-800 rounded-lg text-sm font-semibold"
                                            >
                                                {thickness}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Finishes / Colors */}
                            {material.finishes && material.finishes.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4 font-header">
                                        Pilihan Warna / Finishing
                                    </h4>
                                    <div className="grid grid-cols-4 gap-3">
                                        {material.finishes.map((finish, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-2 group">
                                                <div
                                                    className="w-10 h-10 rounded-full border-2 border-neutral-400/20 shadow-sm group-hover:scale-110 group-hover:border-primary-500 transition-all cursor-pointer"
                                                    style={{ backgroundColor: finish.swatch }}
                                                    title={finish.name}
                                                />
                                                <span className="text-[10px] text-center font-semibold text-neutral-600 line-clamp-2">
                                                    {finish.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="p-6 border-t border-neutral-400/20 bg-primary-700/10">
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full flex items-center justify-center py-4 bg-primary-700 hover:bg-primary-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl gap-2"
                        >
                            <span>Tanya ketersediaan via WA</span>
                            <FaWhatsapp className="w-5 h-5" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
