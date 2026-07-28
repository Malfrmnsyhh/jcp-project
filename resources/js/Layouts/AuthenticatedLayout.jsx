import ApplicationLogo from '@/Components/UI/ApplicationLogo';
import AdminHeader from '@/Components/UI/AdminHeader';
import { Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { getMenuGroups } from '@/data/MenuNav';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, orderBaruCount = 0 } = usePage().props;
    const user = auth.user;
    
    // Sidebar state: mobile drawer open & desktop collapsed
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['orderBaruCount'] });
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    // Ambil susunan menu dari file data/MenuNav.jsx
    const menuGroups = getMenuGroups();

    // Find active menu item label for breadcrumb
    const activeMenuItem = menuGroups.flatMap(g => g.items).find(i => i.active);
    const pageTitle = activeMenuItem ? activeMenuItem.label : 'Dashboard';

    // Helper initials
    const getInitials = (name) => {
        if (!name) return 'A';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row relative">

            {/* Sidebar (Desktop Collapsible & Mobile Slideover) */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 bg-primary-900 text-primary-100 flex flex-col border-r border-primary-800 transition-all duration-300 transform h-screen
                md:translate-x-0 md:sticky md:top-0 md:h-screen shrink-0
                ${isCollapsed ? 'md:w-20' : 'md:w-64'}
                ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 md:translate-x-0'}
            `}>
                {/* 1. STICKY TOP: Logo Area & Collapse Toggle */}
                <div className="shrink-0 z-10 bg-primary-900 p-4 sm:p-5 border-b border-primary-800 flex items-center justify-between">
                    <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'md:justify-center md:w-full' : ''}`}>
                        <ApplicationLogo className="h-8 w-auto fill-current text-white shrink-0" />
                        <span className={`font-header font-bold text-base text-white truncate transition-all duration-200 ${isCollapsed ? 'md:hidden' : 'block'}`}>
                            JCP Admin
                        </span>
                    </div>

                    {/* Mobile Close Button */}
                    <button className="md:hidden text-primary-200 hover:text-white p-1" onClick={() => setSidebarOpen(false)}>
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* 2. SCROLLABLE MIDDLE: Nav Links */}
                <nav className="flex-1 overflow-y-auto min-h-0 px-3 py-4 space-y-5 hide-scrollbar">
                    {menuGroups.map((group, index) => (
                        <div key={index} className="space-y-1.5">
                            {/* Group Title */}
                            {!isCollapsed ? (
                                <h5 className="text-[10px] font-bold text-primary-400 uppercase tracking-widest px-3 truncate">
                                    {group.title}
                                </h5>
                            ) : (
                                <div className="hidden md:block border-t border-primary-800/60 my-2" />
                            )}

                            <div className="space-y-1">
                                {group.items.map((item, itemIdx) => {
                                    const Icon = item.icon;

                                    if (item.disabled) {
                                        return (
                                            <div
                                                key={itemIdx}
                                                className={`flex items-center text-xs font-medium text-primary-500/70 rounded-xl cursor-not-allowed ${
                                                    isCollapsed ? 'md:justify-center p-2.5' : 'justify-between px-3 py-2.5'
                                                }`}
                                                title={`${item.label} (${item.badge})`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon className="w-4 h-4 shrink-0" />
                                                    <span className={`${isCollapsed ? 'md:hidden' : 'block'} truncate`}>
                                                        {item.label}
                                                    </span>
                                                </div>
                                                {!isCollapsed && (
                                                    <span className="text-[9px] bg-primary-800 text-primary-400 px-2 py-0.5 rounded">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={itemIdx}
                                            href={item.href}
                                            title={isCollapsed ? item.label : undefined}
                                            className={`
                                                flex items-center text-xs font-semibold rounded-xl transition-all duration-200 ease-out relative group
                                                ${isCollapsed ? 'md:justify-center p-2.5' : 'justify-between px-3.5 py-2.5'}
                                                ${item.active
                                                    ? 'bg-primary-800 text-white font-bold border-l-4 border-primary-400 shadow-xs'
                                                    : 'text-primary-200 hover:bg-primary-800/60 hover:text-white hover:translate-x-1'}
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon
                                                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                                                        item.active ? 'text-primary-300' : 'group-hover:text-primary-300'
                                                    }`}
                                                />
                                                <span className={`${isCollapsed ? 'md:hidden' : 'block'} truncate tracking-wide`}>
                                                    {item.label}
                                                </span>
                                            </div>

                                            {/* Order Badge - Full view */}
                                            {!isCollapsed && item.label === 'Order' && orderBaruCount > 0 && (
                                                <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                                                    {orderBaruCount}
                                                </span>
                                            )}

                                            {/* Order Badge - Collapsed view indicator dot */}
                                            {isCollapsed && item.label === 'Order' && orderBaruCount > 0 && (
                                                <span className="hidden md:block absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-primary-900 animate-pulse" />
                                            )}

                                            {/* Tooltip on Collapsed Mode */}
                                            {isCollapsed && (
                                                <div className="hidden md:group-hover:block absolute left-full ml-3 px-3 py-1.5 bg-primary-950 border border-primary-800 text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none">
                                                    {item.label}
                                                </div>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* 3. STICKY BOTTOM: User Footer Info */}
                <div className="shrink-0 z-10 bg-primary-950 p-3 border-t border-primary-800 flex items-center justify-between text-xs overflow-hidden">
                    {!isCollapsed ? (
                        <>
                            <div className="min-w-0 pr-2">
                                <p className="font-semibold text-white truncate max-w-[140px]">{user.name}</p>
                                <p className="text-[10px] text-primary-400 truncate max-w-[140px]">{user.email}</p>
                            </div>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="p-2 text-primary-400 hover:text-white rounded-xl hover:bg-primary-800 transition-colors shrink-0"
                                title="Logout"
                            >
                                <FaSignOutAlt className="w-4 h-4" />
                            </Link>
                        </>
                    ) : (
                        <div className="w-full flex flex-col items-center gap-2 py-1">
                            <div
                                className="w-8 h-8 rounded-full bg-primary-800 text-white font-bold text-xs flex items-center justify-center shadow-xs cursor-pointer"
                                title={`${user?.name} (${user?.email})`}
                            >
                                {getInitials(user?.name)}
                            </div>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="p-1.5 text-primary-400 hover:text-white rounded-lg hover:bg-primary-800 transition-colors"
                                title="Logout"
                            >
                                <FaSignOutAlt className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    )}
                </div>
            </aside>

            {/* Backdrop for Mobile */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* TailAdmin Style Top Header */}
                <AdminHeader
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    title={pageTitle}
                />

                {/* Optional Page Specific Sub-Header / Action Banner */}
                {header && (
                    <div className="bg-white border-b border-neutral-200 py-4 px-6 sm:px-8">
                        <div className="flex items-center justify-between">
                            {header}
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>

        </div>
    );
}
