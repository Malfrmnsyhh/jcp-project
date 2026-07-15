import React from 'react';
import { motion } from 'framer-motion';
import { FiMousePointer, FiMessageCircle, FiCreditCard, FiCheckCircle } from 'react-icons/fi';

const stepIcons = [FiMousePointer, FiMessageCircle, FiCreditCard, FiCheckCircle];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

export default function HowItWorks({ steps = [] }) {
    if (!steps || steps.length === 0) return null;

    return (
        <section id="order" className="bg-neutral-50 py-20 sm:py-28 relative scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-start max-w-full mb-14">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header">
                        Proses Pemesanan
                    </h2>
                    <p className="mt-4 text-neutral-700 max-w-xl">
                        Simak cara mudah order di sini.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    {/* Connecting line (desktop only) */}
                    <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-[2px] z-0">
                        <div className="w-full h-full bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 rounded-full" />
                    </div>

                    {steps.map((step, index) => {
                        const Icon = stepIcons[index] || FiCheckCircle;

                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -6 }}
                                className="relative z-10 flex flex-col items-center text-center bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm hover:shadow-lg hover:border-primary-300 transition-shadow duration-300 group"
                            >
                                {/* Number badge + Icon */}
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-300">
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center shadow-md border-2 border-white">
                                        {index + 1}
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-neutral-900 mb-2 font-header leading-snug group-hover:text-primary-700 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-neutral-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
