import Navbar from '@/Components/Sections/Navbar';
import { Link } from '@inertiajs/react';

export default function MainLayout({ auth = {}, children }) {
    const user = auth.user;

    return (
        <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans flex flex-col relative overflow-hidden">
            {/* Background decorative glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Navbar */}
            <Navbar user={user} cartCount={0} />

            {/* Main Content */}
            <main className="flex-1 w-full relative z-10">
                {children}
            </main>

            {/* Premium Footer */}
            <footer className="relative z-10 border-t border-neutral-400/20 bg-primary-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-3">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-primary-900 text-md">
                                J
                            </div>
                            <span className="text-lg font-bold text-white">JCP Profile</span>
                        </div>
                        <p className="text-xs text-primary-200 leading-relaxed max-w-xs">
                            Jombang Creative Project (JCP) menyediakan jasa laser cutting presisi & profesional untuk kebutuhan media akrilik, kayu, MDF, trophy, neon box, dan dekorasi kustom Anda.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Tautan Cepat</h4>
                        <ul className="flex flex-col gap-2 text-xs text-primary-200">
                            <li><a href="/katalog" className="hover:text-white transition-colors">Katalog Produk</a></li>
                            <li><a href="/custom-order" className="hover:text-white transition-colors">Custom Order</a></li>
                            <li><a href="/portofolio" className="hover:text-white transition-colors">Portofolio</a></li>
                            <li><a href="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3 text-xs text-primary-200">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Hubungi Kami</h4>
                        <p>📍 Jombang, Jawa Timur, Indonesia</p>
                        <p>✉️ info@jombangcreativeproject.com</p>
                        <p>📞 +62 812-3456-7890</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-primary-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-300">
                    <p>© 2026 JCP Profile. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="/syarat-ketentuan" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
                        <a href="/kebijakan-privasi" className="hover:text-white transition-colors">Kebijakan Privasi</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
