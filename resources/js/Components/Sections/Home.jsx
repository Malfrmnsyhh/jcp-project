import React from 'react';
import { Link } from '@inertiajs/react';

export default function Hero({ title, subtitle }) {
    return (
        <section 
            className="relative w-full h-screen flex items-center justify-center sm:justify-start"
            style={{
                backgroundImage: "url('/storage/images/mesinlaser.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-neutral-900/70 z-0"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-16 flex flex-col items-start justify-center">

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 uppercase font-header max-w-4xl">
                    {title}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-neutral-200 max-w-2xl leading-relaxed mb-10 font-medium">
                    {subtitle}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        href="/#katalog"
                        className="px-8 py-3.5 rounded-full bg-white text-neutral-900 font-bold hover:bg-neutral-100 transition-all text-center text-sm shadow-lg hover:shadow-xl"
                    >
                        Lihat Katalog
                    </Link>
                    <Link
                        href="/#custom-order"
                        className="px-8 py-3.5 rounded-full bg-neutral-900/40 backdrop-blur-sm border border-white/30 text-white font-bold hover:bg-white/10 hover:border-white/50 transition-all text-center text-sm"
                    >
                        Minta Penawaran
                    </Link>
                </div>
            </div>
        </section>
    );
}
