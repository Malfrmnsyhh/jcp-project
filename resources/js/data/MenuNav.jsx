import {
    FaHome,
    FaBookmark,
    FaCogs,
    FaUsers,
    FaBox,
    FaCube,
    FaBoxes,
    FaBoxOpen,
    FaCartPlus,
    FaCubes,
    FaCoins
} from 'react-icons/fa';

/**
 * Mengembalikan susunan menu navigasi admin secara dinamis.
 * Dipisah ke file data agar AuthenticatedLayout tetap bersih (clean code).
 */
export const getMenuGroups = () => [
    {
        title: 'RINGKASAN',
        items: [
            {
                label: 'Dashboard',
                href: route('dashboard'),
                icon: FaHome,
                active: route().current('dashboard')
            }
        ]
    },
    {
        title: 'KONTEN WEBSITE',
        items: [
            {
                label: 'Portofolio Produk',
                href: route('admin.portfolio.index'),
                icon: FaBookmark,
                active: route().current('admin.portfolio.*')
            },
            {
                label: 'Mesin Aktif',
                href: route('admin.machines.index'),
                icon: FaCogs,
                active: route().current('admin.machines.*')
            },
            {
                label: 'Testimoni Client',
                href: route('admin.testimonials.index'),
                icon: FaUsers,
                active: route().current('admin.testimonials.*')
            },
            {
                label: 'Kategori Bahan',
                href: route('admin.material-categories.index'),
                icon: FaBox,
                active: route().current('admin.material-categories.*')
            },
            {
                label: 'Katalog Bahan',
                href: route('admin.materials.index'),
                icon: FaCube,
                active: route().current('admin.materials.*')
            }
        ]
    },
    {
        title: 'PENJUALAN',
        items: [
            {
                label: 'Kategori Produk',
                href: route('admin.product-categories.index'),
                icon: FaBoxes,
                active: route().current('admin.product-categories.*')
            },
            {
                label: 'Produk',
                href: route('admin.products.index'),
                icon: FaBoxOpen,
                active: route().current('admin.products.*')
            },
            {
                label: 'Order',
                href: route('admin.orders.index'),
                icon: FaCartPlus,
                active: route().current('admin.orders.*')
            }
        ]
    },
    {
        title: 'OPERASIONAL',
        items: [
            {
                label: 'Stok Bahan',
                href: route('admin.stocks.index'),
                icon: FaCubes,
                active: route().current('admin.stocks.*')
            }
        ]
    },
    {
        title: 'KEUANGAN',
        items: [
            {
                label: 'Keuangan',
                href: null,
                icon: FaCoins,
                active: false,
                disabled: true,
                badge: 'Segera Hadir'
            }
        ]
    }
];
