import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function Index({ categories }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
            destroy(route('admin.product-categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-neutral-800">
                    Kategori Produk
                </h2>
            }
        >
            <Head title="Kategori Produk" />

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                {/* Header Table / Aksi */}
                <div className="px-6 py-4 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-bold text-neutral-800">Daftar Kategori</h3>
                    <Link
                        href={route('admin.product-categories.create')}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-primary-600 rounded-lg hover:bg-primary-700"
                    >
                        <FaPlus className="w-3 h-3" />
                        <span>Tambah Kategori</span>
                    </Link>
                </div>

                {/* Table Data */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-neutral-50 text-neutral-500 font-semibold uppercase border-b border-neutral-200">
                                <th className="px-6 py-4">Nama Kategori</th>
                                <th className="px-6 py-4">Slug</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 text-neutral-700">
                            {categories.data.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-8 text-center text-neutral-500">
                                        Belum ada data kategori.
                                    </td>
                                </tr>
                            ) : (
                                categories.data.map((category) => (
                                    <tr key={category.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-neutral-900">
                                            {category.name}
                                        </td>
                                        <td className="px-6 py-4 text-neutral-500 font-mono text-xs">
                                            {category.slug}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <Link
                                                href={route('admin.product-categories.edit', category.id)}
                                                className="inline-flex text-blue-600 hover:text-blue-800 transition-colors"
                                                title="Edit"
                                            >
                                                <FaEdit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="inline-flex text-rose-600 hover:text-rose-800 transition-colors"
                                                title="Hapus"
                                            >
                                                <FaTrash className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Sederhana */}
                {categories.links && categories.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-center gap-1">
                        {categories.links.map((link, i) => (
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
