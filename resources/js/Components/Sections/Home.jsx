import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' },
    },
};

export default function Hero({ title, subtitle }) {
    return (
        <section id="hero" className="relative w-full h-screen flex items-center overflow-hidden">

            {/* Background Image with Ken Burns Effect */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: 18, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
            >
                <img
                    src="/storage/images/mesinlaser.png"
                    alt="Mesin Laser Cutting JCP"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Gradient overlay: left-to-right for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-[1]" />

            {/* Content */}
            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-start justify-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Title */}
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 uppercase font-header max-w-3xl"
                >
                    {title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed mb-10 font-medium"
                >
                    {subtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            href="#catalog"
                            className="inline-block px-8 py-3.5 rounded bg-white text-primary-700 font-bold hover:bg-neutral-100 transition-all text-center text-sm border border-white hover:shadow-md"
                        >
                            Lihat Katalog
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            href="#order"
                            className="inline-block px-8 py-3.5 rounded bg-transparent border border-white text-white font-bold hover:bg-white/10 transition-all text-center text-sm"
                        >
                            Minta Penawaran
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
