import React from 'react';

export default function Materials({ materials = [] }) {
    if (!materials || materials.length === 0) return null;

    return (
        <section className="bg-neutral-100 py-16 sm:py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <span className="px-3 py-1 mb-4 inline-block rounded-full text-xs font-bold bg-primary-200 text-primary-800 uppercase tracking-wider">
                            Spesifikasi Material
                        </span>
                        <h2 className="text-3xl font-extrabold text-neutral-900 font-header">
                            Pilihan Bahan Terbaik
                        </h2>
                    </div>
                    <p className="text-sm text-neutral-700 max-w-sm text-left md:text-right">
                        Kami menyediakan berbagai pilihan bahan dengan standar kualitas industri untuk hasil pemotongan dan ukiran yang sempurna.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {materials.map((mat, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-400/20 hover:border-primary-500/50 hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <h3 className="text-lg font-bold text-neutral-900 mb-1 font-header group-hover:text-primary-700 transition-colors">
                                {mat.name}
                            </h3>
                            <div className="text-xs text-neutral-500 mb-4 uppercase tracking-wider font-semibold">
                                Ketebalan: <span className="text-primary-700">{mat.thickness_range}</span>
                            </div>
                            <p className="text-sm text-neutral-700 leading-relaxed">
                                {mat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
