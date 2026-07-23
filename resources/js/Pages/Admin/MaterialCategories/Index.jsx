import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaPlus, FaEdit, FaTrashAlt, FaLayerGroup } from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index({ categories, flash }) {
    const { delete: destroy, processing } = useForm();
    const [itemToDelete, setItemToDelete] = useState(null);

    const confirmDelete = () => {
        if (itemToDelete) {
            destroy(route('admin.material-categories.destroy', itemToDelete.id), {
                onSuccess: () => setItemToDelete(null),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-neutral-800">
                    Kategori Bahan
                </h2>
            }
        >
            <Head title="Kategori Bahan" />

            {/* Flash Messages */}
            <AnimatePresence>
                {flash?.success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-4 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-semibold"
                    >
                        {flash.success}
                    </motion.div>
                )}
                {flash?.error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-4 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold"
                    >
                        {flash.error}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden relative">
                <div className="px-6 py-4 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-bold text-neutral-800">Daftar Kategori Bahan</h3>
                    <Link
                        href={route('admin.material-categories.create')}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-primary-600 rounded-lg hover:bg-primary-700"
                    >
                        <FaPlus className="w-3 h-3" />
                        <span>Tambah Kategori</span>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-neutral-50 text-neutral-500 font-semibold uppercase border-b border-neutral-200 text-xs tracking-wider">
                                <th className="px-6 py-4">Nama Kategori</th>
                                <th className="px-6 py-4">Slug</th>
                                <th className="px-6 py-4 text-center">Jumlah Bahan</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 text-neutral-700">
                            {categories.data.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3 text-neutral-400">
                                            <FaLayerGroup className="w-8 h-8" />
                                            <p className="font-medium">Belum ada data kategori bahan.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                categories.data.map((category) => (
                                    <tr key={category.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                                                    <FaLayerGroup className="w-3.5 h-3.5 text-primary-600" />
                                                </div>
                                                <span className="font-bold text-neutral-900">{category.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded">{category.slug}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-2.5 py-1 text-xs font-bold text-primary-700 bg-primary-100 rounded-full">
                                                {category.materials_count ?? category.materials?.length ?? 0} bahan
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <Link
                                                href={route('admin.material-categories.edit', category.id)}
                                                className="inline-flex text-blue-600 hover:text-blue-800 transition-colors"
                                                title="Edit"
                                            >
                                                <FaEdit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => setItemToDelete(category)}
                                                className="inline-flex text-rose-600 hover:text-rose-800 transition-colors"
                                                title="Hapus"
                                            >
                                                <FaTrashAlt className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

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

            {/* Modal Konfirmasi Hapus */}
            <AnimatePresence>
                {itemToDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                            className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden border border-neutral-200 relative"
                        >
                            <div className="p-6 text-center">
                                <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mb-4 mx-auto ring-4 ring-rose-50">
                                    <FaTrashAlt className="w-6 h-6 text-rose-600" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">Hapus Kategori?</h3>
                                <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                                    Apakah Anda yakin ingin menghapus <span className="font-bold text-neutral-800">"{itemToDelete.name}"</span>? Kategori yang masih memiliki bahan terkait tidak dapat dihapus.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setItemToDelete(null)}
                                        disabled={processing}
                                        className="flex-1 px-4 py-2.5 rounded-xl font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        disabled={processing}
                                        className="flex-1 px-4 py-2.5 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm shadow-rose-200 disabled:opacity-70"
                                    >
                                        {processing ? 'Menghapus...' : 'Ya, Hapus'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    );
}
