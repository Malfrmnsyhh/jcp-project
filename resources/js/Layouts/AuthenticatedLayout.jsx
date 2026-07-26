import ApplicationLogo from '@/Components/UI/ApplicationLogo';
import Dropdown from '@/Components/UI/Dropdown';
import AdminHeader from '@/Components/UI/AdminHeader';
import { Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    FaBookOpen, FaBoxOpen, FaCube, FaHome, FaBookmark , FaUsers,
    FaCogs, FaCubes, FaCoins, FaSignOutAlt, FaBars, FaTimes, FaBox, FaBoxes,
    FaCartPlus
} from 'react-icons/fa';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, orderBaruCount = 0 } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['orderBaruCount'] });
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const menuGroups = [
        {
            title: 'RINGKASAN',
            items: [
                { label: 'Dashboard', href: route('dashboard'), icon: FaHome, active: route().current('dashboard') }
            ]
        },
        {
            title: 'KONTEN WEBSITE',
            items: [
                { label: 'Portofolio Produk', href: route('admin.portfolio.index'), icon: FaBookmark, active: route().current('admin.portfolio.*') },
                { label: 'Mesin Aktif', href: route('admin.machines.index'), icon: FaCogs, active: route().current('admin.machines.*') },
                { label: 'Testimoni Client', href: route('admin.testimonials.index'), icon: FaUsers, active: route().current('admin.testimonials.*') },
                { label: 'Kategori Bahan', href: route('admin.material-categories.index'), icon: FaBox, active: route().current('admin.material-categories.*') },
                { label: 'Katalog Bahan', href: route('admin.materials.index'), icon: FaCube, active: route().current('admin.materials.*') }
            ]
        },
        {
            title: 'PENJUALAN',
            items: [
                { label: 'Kategori Produk', href: route('admin.product-categories.index'), icon: FaBoxes, active: route().current('admin.product-categories.*') },
                { label: 'Produk', href: route('admin.products.index'), icon: FaBoxOpen, active: route().current('admin.products.*') },
                { label: 'Order', href: route('admin.orders.index'), icon: FaCartPlus, active: route().current('admin.orders.*') }
            ]
        },
        {
            title: 'OPERASIONAL',
            items: [
                { label: 'Stok Bahan', href: route('admin.stocks.index'), icon: FaCubes, active: route().current('admin.stocks.*') }
            ]
        },
        {
            title: 'KEUANGAN',
            items: [
                { label: 'Keuangan', href: null, icon: FaCoins, active: false, disabled: true, badge: 'Segera Hadir' }
            ]
        }
    ];

    // Find active menu item label for breadcrumb
    const activeMenuItem = menuGroups.flatMap(g => g.items).find(i => i.active);
    const pageTitle = activeMenuItem ? activeMenuItem.label : 'Dashboard';

    return (
        <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row relative">

            {/* Sidebar (Desktop & Mobile) */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-primary-900 text-primary-100 flex flex-col border-r border-primary-800 transition-transform duration-300 transform
                md:translate-x-0 md:relative md:flex
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo Area */}
                <div className="p-6 border-b border-primary-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className="h-9 w-auto fill-current text-white" />
                        <span className="font-header font-bold text-lg text-white">JCP Admin</span>
                    </div>
                    {/* Close button for Mobile */}
                    <button className="md:hidden text-primary-200 hover:text-white" onClick={() => setSidebarOpen(false)}>
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                    {menuGroups.map((group, index) => (
                        <div key={index} className="space-y-2">
                            <h5 className="text-[10px] font-bold text-primary-400 uppercase tracking-widest px-3">
                                {group.title}
                            </h5>
                            <div className="space-y-1">
                                {group.items.map((item, itemIdx) => {
                                    const Icon = item.icon;
                                    if (item.disabled) {
                                        return (
                                            <div
                                                key={itemIdx}
                                                className="flex items-center justify-between px-3 py-2 text-xs font-medium text-primary-500 rounded-lg cursor-not-allowed"
                                                title={item.badge}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon className="w-4 h-4" />
                                                    <span>{item.label}</span>
                                                </div>
                                                <span className="text-[9px] bg-primary-800 text-primary-400 px-2 py-0.5 rounded">
                                                    {item.badge}
                                                </span>
                                            </div>
                                        );
                                    }
                                    return (
                                        <Link
                                            key={itemIdx}
                                            href={item.href}
                                            className={`
                                                flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors
                                                ${item.active
                                                    ? 'bg-primary-750 text-white font-bold border-l-4 border-accent-default'
                                                    : 'text-primary-200 hover:bg-primary-800 hover:text-white'}
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon className="w-4 h-4" />
                                                <span>{item.label}</span>
                                            </div>
                                            {item.label === 'Order' && orderBaruCount > 0 && (
                                                <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                                                    {orderBaruCount}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* User footer info */}
                <div className="p-4 border-t border-primary-800 bg-primary-950 flex items-center justify-between text-xs">
                    <div>
                        <p className="font-semibold text-white truncate max-w-[130px]">{user.name}</p>
                        <p className="text-[10px] text-primary-400 truncate max-w-[130px]">{user.email}</p>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="p-2 text-primary-400 hover:text-white rounded-lg hover:bg-primary-800 transition-colors"
                        title="Logout"
                    >
                        <FaSignOutAlt className="w-4 h-4" />
                    </Link>
                </div>
            </aside>

            {/* Backdrop for mobile */}
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
