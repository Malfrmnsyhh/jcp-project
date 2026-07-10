import React from 'react';

export default function About() {
    return (
        <section id="about" className="bg-white py-20 sm:py-28 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left: Image Placeholder */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-primary-100 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 z-0"></div>
                        <div className="aspect-[4/3] w-full bg-neutral-200 rounded-2xl relative z-10 overflow-hidden shadow-lg flex flex-col items-center justify-center border border-neutral-400/20">
                            {/* Placeholder content for workshop photo */}
                            <div className="w-16 h-16 bg-neutral-300 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">📸</span>
                            </div>
                            <p className="text-neutral-500 font-medium">Foto Workshop JCP (Menunggu aset asli)</p>
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="flex flex-col">
                        <span className="px-3 py-1 mb-6 self-start rounded-full text-xs font-bold bg-primary-100 text-primary-700 uppercase tracking-wider">
                            Tentang Kami
                        </span>
                        
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header leading-tight mb-6">
                            Dedikasi untuk Presisi dan <span className="text-primary-700">Kreativitas</span>
                        </h2>
                        
                        <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                            Jombang Creative Project (JCP) bermula dari semangat untuk menghadirkan solusi pemotongan dan pengukiran material yang presisi di wilayah Jombang dan sekitarnya. Dengan dukungan mesin laser cutting berteknologi terkini dan tim desain yang berpengalaman, kami berkomitmen mengubah ide-ide kreatif Anda menjadi produk nyata yang berkualitas tinggi—mulai dari plakat akrilik eksklusif, neon box yang menarik perhatian, hingga elemen dekoratif interior kayu yang menawan.
                        </p>

                        {/* Quick stats or points */}
                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-400/20">
                            <div>
                                <h4 className="font-extrabold text-3xl text-primary-700 font-header mb-1">100+</h4>
                                <p className="text-xs text-neutral-600 font-semibold uppercase tracking-wider">Proyek Selesai</p>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-3xl text-primary-700 font-header mb-1">99%</h4>
                                <p className="text-xs text-neutral-600 font-semibold uppercase tracking-wider">Klien Puas</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
