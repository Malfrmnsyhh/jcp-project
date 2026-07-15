import Navbar from '@/Components/Sections/Navbar';
import { Link } from '@inertiajs/react';

export default function MainLayout({ auth = {}, children }) {
    const user = auth.user;

    return (
        <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans flex flex-col relative overflow-x-hidden">
            {/* Background decorative glows */}

            {/* Navbar */}
            <Navbar user={user} cartCount={0} />

            {/* Main Content */}
            <main className="flex-1 w-full relative z-10">
                {children}
            </main>

            {/* Premium Footer */}
            <footer id="kontak" className="relative z-10 border-t border-primary-800 bg-primary-900 text-primary-100 py-12">
                <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-3">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-primary-900 text-md">
                                J
                            </div>
                            <span className="text-lg font-bold text-white font-header">JCP Profile</span>
                        </div>
                        <p className="text-xs text-primary-100 leading-relaxed max-w-xs">
                            Jombang Creative Project (JCP) menyediakan jasa laser cutting presisi & profesional untuk kebutuhan media akrilik, kayu, MDF, trophy, neon box, dan dekorasi kustom Anda.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider font-header">Tautan Cepat</h4>
                        <ul className="flex flex-col gap-2 text-xs text-primary-100">
                            <li><a href="/katalog" className="hover:text-white transition-colors">Katalog Produk</a></li>
                            <li><a href="/custom-order" className="hover:text-white transition-colors">Custom Order</a></li>
                            <li><a href="/portofolio" className="hover:text-white transition-colors">Portofolio</a></li>
                            <li><a href="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3 text-xs text-primary-100">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider font-header">Hubungi Kami</h4>
                        <p>📍 Jombang, Jawa Timur, Indonesia</p>
                        <p>✉️ info@jombangcreativeproject.com</p>
                        <p>📞 +62 812-3456-7890</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-primary-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-100">
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
