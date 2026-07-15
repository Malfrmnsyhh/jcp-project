import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

function FaqItem({ faq }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-neutral-50 rounded-lg border border-primary-300 overflow-hidden transition-all duration-300 hover:border-primary-500">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left focus:outline-none focus-visible:ring focus-visible:ring-primary-500 hover:bg-primary-50 transition-colors duration-200 group"
            >
                <h3 className="font-bold text-lg font-header text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {faq.question}
                </h3>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="shrink-0 text-primary-700"
                >
                    <FiPlus className="w-6 h-6" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 text-neutral-700 leading-relaxed border-t border-primary-100 pt-4 bg-white">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Faq({ faqs = [] }) {
    if (!faqs || faqs.length === 0) return null;

    return (
        <section id="faq" className="bg-white py-20 sm:py-28 relative mt-20">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header">
                        Pertanyaan Umum
                    </h2>
                    <p className="mt-4 text-neutral-700">
                        Temukan jawaban cepat untuk pertanyaan yang sering diajukan seputar layanan kami.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} faq={faq} />
                    ))}
                </div>
            </div>
        </section>
    );
}
