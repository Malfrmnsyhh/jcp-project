/**
 * Peta segmen URL admin -> label & tujuan breadcrumb.
 * Tambahkan entri baru di sini saat ada modul admin baru.
 */
const segmentLabels = {
    dashboard: { label: 'Dashboard', routeName: 'dashboard' },
    portfolio: { label: 'Portofolio Produk', routeName: 'admin.portfolio.index' },
    machines: { label: 'Mesin Aktif', routeName: 'admin.machines.index' },
    testimonials: { label: 'Testimoni Client', routeName: 'admin.testimonials.index' },
    'material-categories': { label: 'Kategori Bahan', routeName: 'admin.material-categories.index' },
    materials: { label: 'Katalog Bahan', routeName: 'admin.materials.index' },
    'product-categories': { label: 'Kategori Produk', routeName: 'admin.product-categories.index' },
    products: { label: 'Produk', routeName: 'admin.products.index' },
    orders: { label: 'Order', routeName: 'admin.orders.index' },
    stocks: { label: 'Stok Bahan', routeName: 'admin.stocks.index' },
    profile: { label: 'Profil', routeName: 'profile.edit' },
    create: { label: 'Tambah Baru', routeName: null },
    edit: { label: 'Edit Data', routeName: null },
};

/** route() bisa melempar kalau nama route tidak dikenal — jangan sampai merusak render. */
function safeRoute(name) {
    if (!name) return null;

    try {
        return route(name);
    } catch {
        return null;
    }
}

function labelForSegment(segment) {
    const known = segmentLabels[segment];
    if (known) return known.label;

    // Segmen numerik = id record, mis. /admin/orders/12
    if (!Number.isNaN(Number(segment))) return `#${segment}`;

    return segment.charAt(0).toUpperCase() + segment.slice(1);
}

/**
 * Bangun breadcrumb dari URL saat ini.
 *
 * @param {string} currentUrl URL Inertia, mis. "/admin/products/3/edit"
 * @param {{ title?: string, path?: string }} options
 * @returns {Array<{ label: string, href: string|null, isLast: boolean }>}
 */
export function buildBreadcrumbs(currentUrl, { title, path } = {}) {
    const root = { label: 'Admin', href: safeRoute('dashboard'), isLast: false };

    // `path` eksplisit dari halaman menang atas hasil parsing URL.
    if (path) {
        return [
            root,
            { label: title || 'Dashboard', href: null, isLast: false },
            { label: path, href: null, isLast: true },
        ];
    }

    const segments = currentUrl
        .split('?')[0]
        .split('/')
        .filter(Boolean)
        .filter((segment) => segment !== 'admin');

    if (segments.length === 0) {
        return [root, { label: title || 'Dashboard', href: null, isLast: true }];
    }

    return [
        root,
        ...segments.map((segment, index) => {
            const isLast = index === segments.length - 1;

            return {
                label: labelForSegment(segment),
                href: isLast ? null : safeRoute(segmentLabels[segment]?.routeName),
                isLast,
            };
        }),
    ];
}
