import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    FaBell,
    FaSearch,
    FaUser,
    FaSignOutAlt,
    FaChevronDown,
    FaBars,
    FaShoppingBag
} from 'react-icons/fa';

export default function AdminHeader({ sidebarOpen, setSidebarOpen, isCollapsed, setIsCollapsed, title }) {
    const { auth, orderBaruCount = 0 } = usePage().props;
    const user = auth.user;

    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setNotifOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Get initials for avatar fallback
    const getInitials = (name) => {
        if (!name) return 'A';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <header className="bg-white border-b border-neutral-200/80 px-4 sm:px-6 py-3 sticky top-0 z-40 shadow-xs flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3 min-w-0">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Toggle Sidebar"
                >
                    <FaBars className="w-5 h-5" />
                </button>

                {setIsCollapsed && (
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden md:flex p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                        title={isCollapsed ? "Perluas Sidebar" : "Ciutkan Sidebar"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2"
                            fill="none"
                            stroke="currentColor"
                            className={`w-4 h-4 transition-transform duration-300 ${!isCollapsed ? 'rotate-180' : ''}`}
                        >
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                            <path d="M9 4v16" />
                            <path d="M14 10l2 2l-2 2" />
                        </svg>
                    </button>
                )}

                <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-neutral-500 truncate">
                    <Link href={route('dashboard')} className="hover:text-primary-700 transition-colors">
                        Admin
                    </Link>
                    <span>/</span>
                    <span className="text-neutral-800 font-bold truncate">
                        {title || 'Dashboard'}
                    </span>
                </div>
            </div>

            {/* search bar */}
            <div className="flex-1 max-w-md hidden md:block">
                <div className="relative">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-3.5 h-3.5" />
                    <input
                        type="text"
                        placeholder="Cari di dashboard admin..."
                        className="w-full pl-9 pr-4 py-2 bg-neutral-100 hover:bg-neutral-200/60 focus:bg-white border border-transparent focus:border-primary-500 rounded-xl text-xs font-medium transition-all"
                        readOnly
                    />
                </div>
            </div>

            {/* Kanan: Notification Bell & Profile Dropdown */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                
                {/* 1. Notification Bell */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => {
                            setNotifOpen(!notifOpen);
                            setProfileOpen(false);
                        }}
                        className="relative p-2.5 text-neutral-600 hover:text-primary-700 hover:bg-neutral-100 rounded-xl transition-all"
                        title="Notifikasi"
                    >
                        <FaBell className="w-4 h-4" />
                        {orderBaruCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {notifOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-neutral-200 py-3 px-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                                <h4 className="text-xs font-bold text-neutral-900 font-header uppercase tracking-wider">
                                    Notifikasi Pesanan
                                </h4>
                                {orderBaruCount > 0 && (
                                    <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-300">
                                        {orderBaruCount} Baru
                                    </span>
                                )}
                            </div>

                            <div className="py-3">
                                {orderBaruCount > 0 ? (
                                    <Link
                                        href={route('admin.orders.index')}
                                        onClick={() => setNotifOpen(false)}
                                        className="flex items-start gap-3 p-2.5 bg-amber-50/80 hover:bg-amber-100/80 rounded-xl transition-colors border border-amber-200/70"
                                    >
                                        <div className="p-2 bg-amber-500 text-white rounded-lg shrink-0 mt-0.5">
                                            <FaShoppingBag className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="text-xs">
                                            <p className="font-bold text-neutral-900">
                                                Ada {orderBaruCount} pesanan baru!
                                            </p>
                                            <p className="text-neutral-600 mt-0.5 text-[11px]">
                                                Segera periksa dan konfirmasi pesanan dari pelanggan.
                                            </p>
                                        </div>
                                    </Link>
                                ) : (
                                    <p className="text-xs text-neutral-500 text-center py-4">
                                        Tidak ada pesanan baru saat ini.
                                    </p>
                                )}
                            </div>

                            <div className="pt-2 border-t border-neutral-100 text-center">
                                <Link
                                    href={route('admin.orders.index')}
                                    onClick={() => setNotifOpen(false)}
                                    className="text-xs font-bold text-primary-700 hover:text-primary-800"
                                >
                                    Lihat Semua Pesanan &rarr;
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Vertical Divider */}
                <div className="h-6 w-px bg-neutral-200" />

                {/* 2. Admin User Profile */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => {
                            setProfileOpen(!profileOpen);
                            setNotifOpen(false);
                        }}
                        className="flex items-center gap-2.5 p-1.5 hover:bg-neutral-100 rounded-xl transition-all text-left"
                    >
                        {/* Avatar initials */}
                        <div className="w-8 h-8 rounded-full bg-primary-800 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                            {getInitials(user?.name)}
                        </div>

                        <div className="hidden lg:block text-left">
                            <p className="text-xs font-bold text-neutral-800 leading-none">
                                {user?.name}
                            </p>
                            <p className="text-[10px] text-neutral-500 leading-none mt-1">
                                Administrator
                            </p>
                        </div>

                        <FaChevronDown className="w-3 h-3 text-neutral-400 hidden sm:block ml-1" />
                    </button>

                    {/* Profile Dropdown */}
                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-neutral-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-4 py-2 border-b border-neutral-100">
                                <p className="text-xs font-bold text-neutral-900 truncate">
                                    {user?.name}
                                </p>
                                <p className="text-[11px] text-neutral-500 truncate">
                                    {user?.email}
                                </p>
                            </div>

                            <div className="py-1">
                                <Link
                                    href={route('profile.edit')}
                                    onClick={() => setProfileOpen(false)}
                                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                                >
                                    <FaUser className="w-3.5 h-3.5 text-neutral-400" />
                                    <span>Pengaturan Profil</span>
                                </Link>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    onClick={() => setProfileOpen(false)}
                                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left"
                                >
                                    <FaSignOutAlt className="w-3.5 h-3.5 text-rose-500" />
                                    <span>Keluar / Logout</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

            </div>

        </header>
    );
}
