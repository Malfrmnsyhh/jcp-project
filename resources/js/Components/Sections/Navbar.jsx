import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/UI/ApplicationLogo';
import ResponsiveNavLink from '@/Components/UI/ResponsiveNavLink';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar({ user, cartCount = 0 }) {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();

    // Menu items configuration
    const navItems = [
        { label: 'Beranda', href: '/', active: url === '/' },
        { label: 'Katalog', href: '/katalog', active: url.startsWith('/katalog') },
        { label: 'Custom Order', href: '/custom-order', active: url.startsWith('/custom-order') },
        { label: 'Portofolio', href: '/portofolio', active: url.startsWith('/portofolio') },
        { label: 'Tentang Kami', href: '/tentang-kami', active: url.startsWith('/tentang-kami') },
        { label: 'Kontak', href: '/kontak', active: url.startsWith('/kontak') },
    ];

    return (
        <header className="w-full flex flex-col relative z-50">
            <div className="hidden md:flex bg-primary-900 text-white text-xs py-2 px-6 justify-between items-center w-full font-medium">
                <div>
                    <span>Konsultasi desain gratis sebelum order</span>
                </div>
                <div className="flex items-center gap-4">
                    <a href="/lacak-pesanan" className="hover:text-primary-300 transition-colors">Lacak Pesanan</a>
                    <span className="text-primary-800">|</span>
                    <a href="/bantuan" className="hover:text-primary-300 transition-colors">Bantuan</a>
                </div>
            </div>

            <div className="sticky top-0 bg-white border-b border-neutral-100 shadow-sm w-full py-4 px-6 flex justify-between items-center z-50">
                {/* Brand Logo */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2">
                        <ApplicationLogo className="w-12 h-12 text-primary-700" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-900 to-primary-700 bg-clip-text text-transparent">
                            JCP
                            <p className="text-xs font-bold text-primary-900">JOMBANG CREATIVE PROJECT</p>
                        </span>
                    </Link>
                </div>

                <div className="hidden md:flex flex-1 max-w-lg mx-8 border border-neutral-400 rounded-lg overflow-hidden bg-neutral-100 focus-within:border-primary-700 transition-colors">
                    <select className="bg-transparent text-xs text-neutral-700 px-3 border-r border-neutral-400 focus:outline-none cursor-pointer">
                        <option value="">Semua Kategori</option>
                        <option value="akrilik">Akrilik</option>
                        <option value="kayu">Kayu</option>
                        <option value="mdf">MDF</option>
                        <option value="trophy">Trophy</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Cari produk laser cutting..."
                        className="flex-1 bg-transparent px-4 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none"
                    />
                    <button className="bg-primary-700 hover:bg-primary-600 text-white px-5 flex items-center justify-center transition-colors">
                        <FiSearch className="w-4 h-4" />
                    </button>
                </div>

                {/* Right Area (Account, Cart, Mobile Menu button) */}
                <div className="flex items-center gap-6">
                    {/* Account Icon */}
                    <Link
                        href={user ? route('dashboard') : route('login')}
                        className="flex items-center gap-2 text-neutral-700 hover:text-primary-700 transition-colors"
                    >
                        <div className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                            <FiUser className="w-5 h-5" />
                        </div>
                        <div className="hidden lg:flex flex-col text-left">
                            <span className="text-[10px] text-neutral-700 font-medium leading-none">
                                {user ? 'Selamat Datang' : 'Silakan Masuk'}
                            </span>
                            <span className="text-xs font-semibold text-neutral-900 leading-normal">
                                {user ? user.name : 'Masuk / Daftar'}
                            </span>
                        </div>
                    </Link>

                    {/* Cart Icon */}
                    <Link
                        href="/keranjang"
                        className="relative p-2 hover:bg-neutral-100 rounded-full text-neutral-700 hover:text-primary-700 transition-colors"
                    >
                        <FiShoppingCart className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-danger text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                            {cartCount}
                        </span>
                    </Link>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 hover:bg-neutral-100 rounded-full text-neutral-700 hover:text-primary-700 transition-colors focus:outline-none"
                    >
                        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Lapis 3 — Category nav (Hidden on mobile) */}
            <div className="hidden md:block bg-primary-700 text-white ">
                <nav className="flex items-center justify-center gap-6">
                    {navItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className={`px-5 py-3 text-xs font-semibold transition-colors hover:bg-primary-600 rounded-lg ${
                                item.active ? 'bg-primary-600' : ''
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Mobile Dropdown Menu (Lapis 2 Right + Lapis 3) */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-neutral-100 shadow-md w-full py-4 px-4 flex flex-col gap-4 absolute top-[68px] left-0 z-40 transition-all">
                    {/* Search bar inside mobile menu */}
                    <div className="flex border border-neutral-400 rounded-lg overflow-hidden bg-neutral-100 focus-within:border-primary-700">
                        <input
                            type="text"
                            placeholder="Cari produk laser cutting..."
                            className="flex-1 bg-transparent px-4 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none"
                        />
                        <button className="bg-primary-700 text-white px-4 flex items-center justify-center">
                            <FiSearch className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <div className="flex flex-col gap-1">
                        {navItems.map((item, idx) => (
                            <ResponsiveNavLink
                                key={idx}
                                href={item.href}
                                active={item.active}
                                className={
                                    item.active
                                        ? '!text-primary-700 !bg-primary-100/50 !border-primary-700 font-semibold'
                                        : '!text-neutral-700 hover:!text-primary-700'
                                }
                            >
                                {item.label}
                            </ResponsiveNavLink>
                        ))}
                    </div>

                    {/* Account Links */}
                    <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2">
                        {user ? (
                            <>
                                <div className="px-3 py-1">
                                    <p className="text-[10px] text-neutral-700">Masuk Sebagai</p>
                                    <p className="text-sm font-semibold text-neutral-900">{user.name}</p>
                                </div>
                                <ResponsiveNavLink href={route('dashboard')}>
                                    Dashboard
                                </ResponsiveNavLink>
                            </>
                        ) : (
                            <ResponsiveNavLink href={route('login')}>
                                Masuk / Daftar Akun
                            </ResponsiveNavLink>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
