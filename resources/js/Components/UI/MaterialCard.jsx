import React from 'react';
import { motion } from 'framer-motion';

export default function MaterialCard({ material, onClick }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg border border-primary-300 shadow-none hover:shadow-md hover:border-primary-500 cursor-default group flex flex-col h-full transition-all duration-300"
            whileHover={{ y: -5 }}
        >
            <div className="w-12 h-12 rounded bg-primary-50 border border-primary-100 text-primary-700 flex items-center justify-center text-2xl mb-4 group-hover:bg-primary-100 transition-colors">
                {material.icon}
            </div>

            <h3 className="text-xl font-bold text-neutral-900 mb-2 font-header group-hover:text-primary-700 transition-colors">
                {material.name}
            </h3>

            <p className="text-sm text-neutral-700 leading-relaxed flex-1 mb-4">
                {material.short_description}
            </p>

            <div className="mt-auto flex justify-between items-center border-t border-neutral-400/10 pt-4">
                <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-neutral-50 border border-primary-200 text-neutral-700 rounded text-xs font-semibold">
                        {material.thickness_options[0]} - {material.thickness_options[material.thickness_options.length - 1]}
                    </span>
                </div>
                <span
                    onClick={onClick}
                    className="text-xs font-bold text-primary-700 hover:text-white hover:bg-primary-600 transition-colors cursor-pointer border border-primary-500 rounded px-3 py-2">
                    Lihat Detail
                </span>
            </div>
        </motion.div>
    );
}
