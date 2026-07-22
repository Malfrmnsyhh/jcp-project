import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function Portfolio({ items = [] }) {
    if (!items || items.length === 0) return null;

    return (
        <section id="portfolio" className="bg-neutral-100 py-20 sm:py-28 relative mt-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                    <div className="text-start">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header">
                            Portofolio Projek
                        </h2>
                        <p className="mt-4 text-neutral-700 max-w-xl">
                            Beberapa hasil karya terbaik kami yang telah dipercaya oleh berbagai klien.
                        </p>
                    </div>
                </div>

                {/* Portfolio Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    <AnimatePresence>
                        {items.map((item) => (
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
                                    {item.image_path ? (
                                        <img
                                            src={item.image_path}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                                            Gambar belum tersedia
                                        </div>
                                    )}

                                    {/* Client Badge */}
                                    {item.client_name && (
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-primary-700 uppercase tracking-wider border border-primary-200">
                                            {item.client_name}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold text-neutral-900 mb-1 font-header group-hover:text-primary-700 transition-colors leading-snug">
                                        {item.title}
                                    </h3>

                                    {item.description && (
                                        <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
