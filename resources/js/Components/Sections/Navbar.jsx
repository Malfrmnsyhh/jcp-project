import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/UI/ApplicationLogo';
import ResponsiveNavLink from '@/Components/UI/ResponsiveNavLink';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar({ user }) {
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
            {/* Sticky Main Bar */}
            <div className="sticky top-0 bg-white border-b border-neutral-100 shadow-sm w-full py-3.5 px-6 flex justify-between items-center z-50">
                {/* Left: Brand Logo */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2">
                        <ApplicationLogo className="w-10 h-10 text-primary-700" />
                        <span className="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-700 bg-clip-text text-transparent leading-none flex flex-col">
                            <p className="font-header text-xl">JCP</p>
                            <span className="text-[11px] font-bold text-primary-500 mt-1 tracking-wider font-header">JOMBANG CREATIVE PROJECT</span>
                        </span>
                    </Link>
                </div>

                {/* Middle: Navigation menu (Hidden on mobile) */}
                <nav className="hidden md:flex items-center gap-5">
                    {navItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className={`px-2 py-1 text-xs font-semibold transition-colors hover:text-primary-700 ${
                                item.active
                                    ? 'text-primary-700 border-b-2 border-primary-700'
                                    : 'text-neutral-700'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Area: Search & Account Button (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Search bar */}
                    <div className="flex border border-neutral-400 rounded-lg overflow-hidden bg-neutral-100 focus-within:border-primary-700 transition-colors w-56">
                        <input
                            type="text"
                            placeholder="Cari..."
                            className="flex-1 bg-transparent px-3 py-1.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none"
                        />
                        <button className="bg-primary-700 hover:bg-primary-600 text-white px-3.5 flex items-center justify-center transition-colors">
                            <FiSearch className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Account Button */}
                    {user ? (
                        <Link
                            href={route('dashboard')}
                            className="px-4 py-1.5 bg-primary-700 hover:bg-primary-600 text-white rounded-lg font-semibold text-xs transition-colors shadow-sm"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="px-4 py-1.5 border border-primary-700 text-primary-700 hover:bg-primary-100/50 rounded-lg font-semibold text-xs transition-colors"
                        >
                            Masuk / Daftar
                        </Link>
                    )}
                </div>

                {/* Mobile hamburger menu trigger */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 hover:bg-neutral-100 rounded-full text-neutral-700 hover:text-primary-700 transition-colors focus:outline-none"
                    >
                        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Drawer */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-neutral-100 shadow-md w-full py-4 px-4 flex flex-col gap-4 absolute top-[62px] left-0 z-40 transition-all">
                    {/* Search bar inside mobile menu */}
                    <div className="flex border border-neutral-400 rounded-lg overflow-hidden bg-neutral-100 focus-within:border-primary-700">
                        <input
                            type="text"
                            placeholder="Cari..."
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

                    {/* Account Button Mobile */}
                    <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2">
                        {user ? (
                            <>
                                <div className="px-3 py-1 mb-2">
                                    <p className="text-[10px] text-neutral-700">Masuk Sebagai</p>
                                    <p className="text-sm font-semibold text-neutral-900">{user.name}</p>
                                </div>
                                <Link
                                    href={route('dashboard')}
                                    className="w-full text-center py-2 bg-primary-700 hover:bg-primary-600 text-white rounded-lg font-semibold text-xs transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </>
                        ) : (
                            <Link
                                href={route('login')}
                                className="w-full text-center py-2 border border-primary-700 text-primary-700 hover:bg-primary-100/50 rounded-lg font-semibold text-xs transition-colors"
                            >
                                Masuk / Daftar
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
