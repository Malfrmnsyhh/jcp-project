import React from 'react';
import { Link } from '@inertiajs/react';

export default function Hero({ title, subtitle }) {
    return (
        <section className="bg-primary-500 w-screen h-screen flex flex-col items-center justify-center text-center px-6 py-24 sm:py-32 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-900 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight font-header">
                    {title}
                </h1>

                <p className="mt-6 text-lg sm:text-xl text-primary-100 max-w-2xl leading-relaxed">
                    {subtitle}
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        href="/katalog"
                        className="px-8 py-3.5 rounded-xl bg-white text-primary-700 font-bold hover:bg-neutral-100 transition-all shadow-lg hover:shadow-xl text-center"
                    >
                        Lihat Katalog
                    </Link>
                    <Link
                        href="/custom-order"
                        className="px-8 py-3.5 rounded-xl bg-transparent border-2 border-white text-white font-bold hover:bg-white/10 transition-all text-center"
                    >
                        Pesan Custom Sekarang
                    </Link>
                </div>
            </div>
        </section>
    );
}
