import React from 'react';

export default function HowItWorks({ steps = [] }) {
    if (!steps || steps.length === 0) return null;

    return (
        <section id="order" className="bg-white py-20 sm:py-28 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="px-3 py-1 mb-4 inline-block rounded-full text-xs font-bold bg-primary-100 text-primary-700 uppercase tracking-wider">
                        Alur Pemesanan
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header">
                        Cara Mudah Pesan Custom
                    </h2>
                    <p className="mt-4 text-neutral-700">
                        Proses pemesanan yang transparan, cepat, dan mudah dipahami.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting line (hidden on mobile, visible on lg) */}
                    <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-neutral-400/20 z-0"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center text-center">
                            {/* Number Circle */}
                            <div className="w-16 h-16 rounded-full bg-white border-4 border-primary-100 text-primary-700 font-extrabold text-xl flex items-center justify-center shadow-sm mb-6 relative">
                                {index + 1}
                                {/* Small decorative dot */}
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full border-2 border-white"></div>
                            </div>

                            <h3 className="text-lg font-bold text-neutral-900 mb-3 font-header">
                                {step.title}
                            </h3>
                            <p className="text-sm text-neutral-700 leading-relaxed max-w-xs">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
