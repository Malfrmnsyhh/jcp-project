import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from '@/components/UI/ApplicationLogo';
import ResponsiveNavLink from '@/components/UI/ResponsiveNavLink';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();

    const navItems = [
        { label: 'Beranda', href: '/' },
        { label: 'Katalog', href: '/#katalog' },
        { label: 'Portfolio', href: '/#portfolio' },
        { label: 'Order', href: '/#order' },
        { label: 'Kontak', href: '/#kontak' },
        { label: 'Testimoni', href: '/#testimoni' },
        { label: 'Lokasi', href: '/#lokasi' },
    ];

    return (
        <header className="w-flex flex flex-col relative z-50">
            {/* sticky main bar */}
            <div className="sticky top-0 bg-primary-200/400 border-b border-neutral-100 shadow-sm w-full py-3.5 px-6 flex justify-between items-center z-50">
                {/* logo & nama*/}
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3">
                        <ApplicationLogo className="h-10 w-12" />
                        <span className="text-xl font-bold flex flex-col leading-none">
                            <p className="font-header text-2xl text-primary-900">JCP</p>
                            <span className="text-[10px] font-bold text-primary-600 tracking-wider">Jombang Creative Project</span>
                        </span>
                    </Link>
                </div>

                {/* middle hidden on mobile */}
                <nav className="hidden md:flex items-center gap-5">
                    {navItems.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            className="px-2 py-1 text-xs font-semibold transition-colors hover:text-primary-500 text-neutral-700"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* mobile hamburger menu */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 hover:bg-neutral-100 rounded-3xl text-neutral-700 hover:text-primary-700 transition-colors focus:outline-none"
                    >
                        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* mobile mode */}
            {isOpen && (
                <div className="md:hiddne bg-white border-b border-neutral-100 shadow-md w-full py-4 px4 flex flex-col gap-4 absolute top-[62px] left-0 z-4 transition-all duration-200 ">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="w-full block px-4 py-3 rounded-lg text-sm font-medium text-neutral-700 hover:text-primary-700/50 transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}