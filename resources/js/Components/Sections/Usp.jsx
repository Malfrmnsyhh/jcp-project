import React from 'react';

export default function Usp({ items = [] }) {
    if (!items || items.length === 0) return null;

    return (
        <section className="bg-neutral-100 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <div 
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-neutral-400/20 flex flex-col items-center text-center group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2 font-header">
                                {item.title}
                            </h3>
                            <p className="text-sm text-neutral-700 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
