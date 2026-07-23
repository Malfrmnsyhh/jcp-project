import React from 'react';
import { hexToRgba } from '@/utils/color';
import { motion } from 'framer-motion';

export default function MaterialCard({ material, onClick }) {
    const colorHex = material.color_hex || '#0ea5e9';
    const isTransparent = colorHex === 'transparent' || colorHex === 'bening';
    const isLightColor = colorHex.toLowerCase() === '#ffffff' || colorHex.toLowerCase() === '#fff';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl border border-primary-200/80 shadow-sm hover:shadow-xl hover:border-primary-400 cursor-default group flex flex-col h-full transition-all duration-300 relative overflow-hidden"
            whileHover={{ y: -5 }}
        >
            {/* Color Swatch / Icon Box */}
            <div
                className={`w-12 h-12 rounded-xl mb-4 relative overflow-hidden shadow-inner flex items-center justify-center transition-transform group-hover:scale-105 ${
                    isTransparent
                        ? 'border-2 border-sky-300/80 bg-gradient-to-tr from-sky-100/60 via-white/90 to-blue-200/70 backdrop-blur-sm'
                        : isLightColor
                        ? 'border border-neutral-300 bg-white'
                        : 'border border-black/10'
                }`}
                style={{
                      backgroundColor: !isTransparent ? hexToRgba(colorHex, 0.8) : undefined,
                      backgroundImage: isTransparent
                        ? 'linear-gradient(135deg, rgba(224, 242, 254, 0.8) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(186, 230, 253, 0.7) 100%)'
                        : undefined
                    }}
            >
                {/* Subtle sheen highlight effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent pointer-events-none" />
                
                {isTransparent && (
                    <span className="text-[10px] font-extrabold uppercase text-sky-800 tracking-tighter opacity-80 z-10">
                        Bening
                    </span>
                )}
            </div>

            <h3 className="text-xl font-bold text-neutral-900 mb-2 font-header group-hover:text-primary-700 transition-colors">
                {material.name}
            </h3>

            <p className="text-sm text-neutral-700 leading-relaxed flex-1 mb-4">
                {material.short_description}
            </p>

            <div className="mt-auto flex justify-between items-center border-t border-neutral-200/80 pt-4">
                <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold">
                        {material.thickness_options && material.thickness_options.length > 0 
                            ? `${material.thickness_options[0]} - ${material.thickness_options[material.thickness_options.length - 1]}`
                            : 'Standar'}
                    </span>
                </div>
                <span
                    onClick={onClick}
                    className="text-xs font-bold text-primary-700 hover:text-white hover:bg-primary-600 transition-colors cursor-pointer border border-primary-500 rounded-lg px-3 py-2">
                    Lihat Detail
                </span>
            </div>
        </motion.div>
    );
}
