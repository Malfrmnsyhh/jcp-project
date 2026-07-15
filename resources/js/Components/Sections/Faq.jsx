import React from 'react';

export default function Faq({ faqs = [] }) {
    if (!faqs || faqs.length === 0) return null;

    return (
        <section id="faq" className="bg-neutral-100 py-20 sm:py-28 relative scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="px-3 py-1 mb-4 inline-block rounded-full text-xs font-bold bg-primary-200 text-primary-800 uppercase tracking-wider">
                        FAQ
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header">
                        Pertanyaan Umum
                    </h2>
                    <p className="mt-4 text-neutral-700">
                        Temukan jawaban cepat untuk pertanyaan yang sering diajukan seputar layanan kami.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details 
                            key={index} 
                            className="group bg-white rounded-2xl shadow-sm border border-neutral-400/20 overflow-hidden [&_summary::-webkit-details-marker]:hidden"
                        >
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-neutral-900 focus:outline-none focus-visible:ring focus-visible:ring-primary-500">
                                <h3 className="font-bold text-lg font-header group-hover:text-primary-700 transition-colors">
                                    {faq.question}
                                </h3>

                                <span className="relative size-5 shrink-0">
                                    <svg
                                        className="absolute inset-0 size-5 opacity-100 transition-opacity group-open:opacity-0 text-primary-700"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>

                                    <svg
                                        className="absolute inset-0 size-5 opacity-0 transition-opacity group-open:opacity-100 text-primary-700"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M20 12H4"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <div className="px-6 pb-6 text-neutral-700 leading-relaxed border-t border-neutral-100 pt-4">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
