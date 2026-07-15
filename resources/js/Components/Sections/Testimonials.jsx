import React from 'react';

export default function Testimonials({ testimonials = [] }) {
    // Kriteria: jangan isi data testimoni palsu. Jika kosong, tidak usah tampilkan section ini.
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section id="testimoni" className="bg-white py-20 sm:py-28 relative scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="px-3 py-1 mb-4 inline-block rounded text-xs font-bold bg-primary-100 text-primary-700 uppercase tracking-wider border border-primary-200">
                        Testimoni Klien
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header">
                        Apa Kata Mereka?
                    </h2>
                    <p className="mt-4 text-neutral-700">
                        Kepercayaan pelanggan adalah prioritas utama kami dalam menghasilkan karya terbaik.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testi, index) => (
                        <div 
                            key={index} 
                            className="bg-primary-50 p-8 rounded-lg relative border border-primary-300 shadow-none"
                        >
                            {/* Quote mark icon */}
                            <div className="absolute top-6 left-6 text-primary-300 opacity-50 text-6xl font-serif leading-none">
                                "
                            </div>
                            
                            <p className="relative z-10 text-neutral-700 italic leading-relaxed mb-8 pt-4">
                                "{testi.quote}"
                            </p>
                            
                            <div className="flex items-center gap-4 border-t border-neutral-400/20 pt-6">
                                <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold text-xl font-header">
                                    {testi.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-neutral-900 text-sm">{testi.name}</h4>
                                    <p className="text-xs text-neutral-500">{testi.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
