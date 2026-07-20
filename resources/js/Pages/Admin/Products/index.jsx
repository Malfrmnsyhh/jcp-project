import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaPlus, FaEdit, FaTrash, FaImage } from 'react-icons/fa';

export default function Index({ products }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini? Semua gambar dan relasi terkait juga akan terhapus.')) {
            destroy(route('admin.products.destroy', id));
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-neutral-800">
                    Produk
                </h2>
            }
        >
            <Head title="Produk" />

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-bold text-neutral-800">Daftar Produk</h3>
                    <Link
                        href={route('admin.products.create')}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-primary-600 rounded-lg hover:bg-primary-700"
                    >
                        <FaPlus className="w-3 h-3" />
                        <span>Tambah Produk</span>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-neutral-50 text-neutral-500 font-semibold uppercase border-b border-neutral-200">
                                <th className="px-6 py-4">Gambar</th>
                                <th className="px-6 py-4">Produk</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Harga</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 text-neutral-700">
                            {products.data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-neutral-500">
                                        Belum ada data produk.
                                    </td>
                                </tr>
                            ) : (
                                products.data.map((product) => {
                                    // Cari gambar utama (is_primary = 1) atau ambil gambar pertama
                                    const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];
                                    
                                    return (
                                        <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-6 py-4">
                                                {primaryImage ? (
                                                    <img 
                                                        src={primaryImage.image_path} 
                                                        alt={product.name} 
                                                        className="w-12 h-12 rounded object-cover border border-neutral-200 shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded bg-neutral-100 flex items-center justify-center text-neutral-400 border border-neutral-200">
                                                        <FaImage className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-neutral-900">{product.name}</div>
                                                <div className="text-xs text-neutral-500 font-mono mt-0.5">{product.slug}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.category?.name || '-'}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-emerald-600">
                                                {formatPrice(product.price)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {product.is_active ? (
                                                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 rounded border border-green-200">Aktif</span>
                                                ) : (
                                                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-700 bg-neutral-100 rounded border border-neutral-200">Draft</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-3">
                                                <Link
                                                    href={route('admin.products.edit', product.id)}
                                                    className="inline-flex text-blue-600 hover:text-blue-800 transition-colors"
                                                    title="Edit"
                                                >
                                                    <FaEdit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="inline-flex text-rose-600 hover:text-rose-800 transition-colors"
                                                    title="Hapus"
                                                >
                                                    <FaTrash className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {products.links && products.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-center gap-1">
                        {products.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 text-sm border rounded ${
                                    link.active 
                                    ? 'bg-primary-600 text-white border-primary-600 font-bold' 
                                    : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-100'
                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}