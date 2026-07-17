import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from '@/Components/UI/ApplicationLogo';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const { url } = usePage();

    const navItems = [
        { label: 'Beranda', href: '#hero', sectionId: 'hero' },
        { label: 'Bahan', href: '#materials', sectionId: 'materials' },
        { label: 'Portfolio', href: '#portfolio', sectionId: 'portfolio' },
        { label: 'Order', href: '#order', sectionId: 'order' },
        { label: 'Tentang', href: '#about', sectionId: 'about' },
        { label: 'FAQ', href: '#faq', sectionId: 'faq' },
    ];

    // Scroll spy: detect which section is visible
    useEffect(() => {
        const sectionIds = navItems.map(item => item.sectionId);

        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px',
                threshold: 0,
            }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);

        const targetId = href.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        } else if (targetId === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <header className="w-full fixed top-0 z-50 transition-all duration-300">
            <div className={`w-full transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-neutral-200'
                : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
                    {/* Logo & Company Name */}
                    <Link href="#hero" className="flex items-center gap-3 group">
                        <ApplicationLogo className="h-9 w-10" />
                        <span className="flex flex-col leading-none">
                            <p className="font-header text-xl font-extrabold text-primary-700 group-hover:text-primary-700 transition-colors">
                                JCP
                            </p>
                            <span className={`text-[9px] font-bold tracking-wider transition-colors ${scrolled ? 'text-primary-600' : 'text-primary-400'
                                }`}>
                                Jombang Creative Project
                            </span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item, idx) => {
                            const isActive = activeSection === item.sectionId;
                            return (
                                <a
                                    key={idx}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={`relative px-3 py-2 text-xs font-semibold transition-all duration-200 rounded-lg ${isActive
                                        ? 'text-primary-700'
                                        : scrolled
                                            ? 'text-neutral-600 hover:text-primary-600'
                                            : 'text-white/80 hover:text-white'
                                        }`}
                                >
                                    {item.label}
                                    {/* Active underline indicator */}
                                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary-500 rounded-full transition-all duration-300 ${isActive ? 'w-4/5' : 'w-0'
                                        }`} />
                                </a>
                            );
                        })}
                    </nav>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-xl transition-colors focus:outline-none ${scrolled
                                ? 'text-neutral-700 hover:bg-neutral-100'
                                : 'text-white hover:bg-white/10'
                                }`}
                        >
                            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-lg w-full py-3 px-4 absolute left-0 z-40">
                    <div className="max-w-7xl mx-auto flex flex-col gap-1">
                        {navItems.map((item, idx) => {
                            const isActive = activeSection === item.sectionId;
                            return (
                                <a
                                    key={idx}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={`w-full block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                                        ? 'text-primary-700 bg-primary-50'
                                        : 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-50'
                                        }`}
                                >
                                    {item.label}
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </header>
    );
}