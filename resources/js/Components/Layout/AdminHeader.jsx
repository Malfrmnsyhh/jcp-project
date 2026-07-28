import { Fragment, useMemo, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    FaBell,
    FaUser,
    FaSignOutAlt,
    FaChevronDown,
    FaBars,
    FaShoppingBag,
} from 'react-icons/fa';
import useClickOutside from '@/Hooks/useClickOutside';
import { getInitials } from '@/utils/user';
import { buildBreadcrumbs } from '@/utils/breadcrumbs';

function SidebarCollapseIcon({ collapsed }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className={`w-4 h-4 transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`}
        >
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
            <path d="M9 4v16" />
            <path d="M14 10l2 2l-2 2" />
        </svg>
    );
}

function Breadcrumbs({ items }) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold text-neutral-500 truncate"
        >
            {items.map((item, index) => (
                <Fragment key={`${item.label}-${index}`}>
                    {index > 0 && <span className="text-neutral-400">/</span>}
                    {item.href && !item.isLast ? (
                        <Link href={item.href} className="hover:text-primary-700 transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span
                            aria-current={item.isLast ? 'page' : undefined}
                            className={
                                item.isLast
                                    ? 'text-neutral-800 font-bold truncate'
                                    : 'text-neutral-600 font-medium'
                            }
                        >
                            {item.label}
                        </span>
                    )}
                </Fragment>
            ))}
        </nav>
    );
}

function NotificationMenu({ orderBaruCount, onNavigate }) {
    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-neutral-200 py-3 px-4 z-50">
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
                        onClick={onNavigate}
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
                    onClick={onNavigate}
                    className="text-xs font-bold text-primary-700 hover:text-primary-800"
                >
                    Lihat Semua Pesanan &rarr;
                </Link>
            </div>
        </div>
    );
}

function ProfileMenu({ user, onNavigate }) {
    return (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-neutral-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-neutral-100">
                <p className="text-xs font-bold text-neutral-900 truncate">{user?.name}</p>
                <p className="text-[11px] text-neutral-500 truncate">{user?.email}</p>
            </div>

            <div className="py-1">
                <Link
                    href={route('profile.edit')}
                    onClick={onNavigate}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                    <FaUser className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Pengaturan Profil</span>
                </Link>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    onClick={onNavigate}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left"
                >
                    <FaSignOutAlt className="w-3.5 h-3.5 text-rose-500" />
                    <span>Keluar / Logout</span>
                </Link>
            </div>
        </div>
    );
}

export default function AdminHeader({
    onToggleSidebar,
    onToggleCollapse,
    isCollapsed,
    title,
    path,
}) {
    const { auth, orderBaruCount = 0 } = usePage().props;
    const currentUrl = usePage().url;
    const user = auth.user;

    // Satu state untuk dua menu yang saling eksklusif — membuka salah satu
    // otomatis menutup yang lain tanpa saling memanggil setter.
    const [openMenu, setOpenMenu] = useState(null);

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    const closeMenu = () => setOpenMenu(null);
    const toggleMenu = (name) => setOpenMenu((current) => (current === name ? null : name));

    useClickOutside([notifRef, profileRef], closeMenu, openMenu !== null);

    const breadcrumbItems = useMemo(
        () => buildBreadcrumbs(currentUrl, { title, path }),
        [currentUrl, title, path],
    );

    return (
        <header className="bg-white border-b border-neutral-200/80 px-4 sm:px-6 py-3 sticky top-0 z-40 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
                <button
                    onClick={onToggleSidebar}
                    className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                    aria-label="Buka menu samping"
                >
                    <FaBars className="w-5 h-5" />
                </button>

                {onToggleCollapse && (
                    <button
                        onClick={onToggleCollapse}
                        className="hidden md:flex p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                        aria-label={isCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
                    >
                        <SidebarCollapseIcon collapsed={isCollapsed} />
                    </button>
                )}

                <Breadcrumbs items={breadcrumbItems} />
            </div>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => toggleMenu('notif')}
                        aria-haspopup="menu"
                        aria-expanded={openMenu === 'notif'}
                        aria-label={
                            orderBaruCount > 0
                                ? `Notifikasi, ${orderBaruCount} pesanan baru`
                                : 'Notifikasi'
                        }
                        className="relative p-2.5 text-neutral-600 hover:text-primary-700 hover:bg-neutral-100 rounded-xl transition-all"
                    >
                        <FaBell className="w-4 h-4" />
                        {orderBaruCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
                        )}
                    </button>

                    {openMenu === 'notif' && (
                        <NotificationMenu orderBaruCount={orderBaruCount} onNavigate={closeMenu} />
                    )}
                </div>

                <div className="h-6 w-px bg-neutral-200" />

                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => toggleMenu('profile')}
                        aria-haspopup="menu"
                        aria-expanded={openMenu === 'profile'}
                        className="flex items-center gap-2.5 p-1.5 hover:bg-neutral-100 rounded-xl transition-all text-left"
                    >
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

                    {openMenu === 'profile' && <ProfileMenu user={user} onNavigate={closeMenu} />}
                </div>
            </div>
        </header>
    );
}
