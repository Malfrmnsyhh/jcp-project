import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { FaPlus, FaSearch, FaEdit, FaTrashAlt, FaBoxes, FaExclamationTriangle, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index({ stocks, categories = [], filters = {} }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.stocks.index'), { search, category }, { preserveState: true });
    };

    const handleFilterCategory = (newCategory) => {
        setCategory(newCategory);
        router.get(route('admin.stocks.index'), { search, category: newCategory }, { preserveState: true });
    };

    const handleDelete = () => {
        if (confirmDeleteId) {
            router.delete(route('admin.stocks.destroy', confirmDeleteId), {
                onSuccess: () => setConfirmDeleteId(null),
            });
        }
    };

    // Calculate low stock items count
    const lowStockItems = stocks.data ? stocks.data.filter(item => Number(item.quantity) < 5) : [];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black leading-tight text-neutral-800 font-header">
                            Stok Bahan Operasional
                        </h2>
                        <p className="text-sm text-neutral-500 mt-1">
                            Manajemen inventaris material dan persediaan workshop
                        </p>
                    </div>
                    <Link
                        href={route('admin.stocks.create')}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm shrink-0"
                    >
                        <FaPlus className="w-4 h-4" />
                        <span>Tambah Stok Baru</span>
                    </Link>
                </div>
            }
        >
            <Head title="Stok Bahan Operasional" />

            {/* Flash Notification */}
            {flash?.success && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
                    <FaCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{flash.success}</span>
                </div>
            )}

            {/* Low Stock Warning Banner */}
            {lowStockItems.length > 0 && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-300 text-amber-900 rounded-2xl flex items-start gap-3 shadow-sm">
                    <FaExclamationTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-sm font-header">
                            Peringatan Stok Menipis! ({lowStockItems.length} Item)
                        </h4>
                        <p className="text-xs text-amber-800 mt-1">
                            Berikut item dengan stok di bawah 5 unit: {' '}
                            <span className="font-bold">
                                {lowStockItems.map(i => `${i.name} (${i.quantity} ${i.unit})`).join(', ')}
                            </span>
                        </p>
                    </div>
                </div>
            )}

            {/* Search & Filter Bar */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-sm mb-6">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Cari nama stok, kategori, atau catatan..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white rounded-xl text-sm transition-all border border-transparent focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <select
                            value={category}
                            onChange={(e) => handleFilterCategory(e.target.value)}
                            className="w-full md:w-48 bg-neutral-100 hover:bg-neutral-200/70 rounded-xl text-sm py-2.5 px-4 border border-transparent focus:border-primary-500 focus:ring-primary-500 font-medium"
                        >
                            <option value="">-- Semua Kategori --</option>
                            {categories.map((cat, idx) => (
                                <option key={idx} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm shrink-0"
                        >
                            Cari
                        </button>
                    </div>
                </form>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-neutral-700">
                        <thead>
                            <tr className="bg-neutral-50 text-neutral-500 font-semibold uppercase tracking-wider text-xs border-b border-neutral-200">
                                <th className="px-6 py-4">Nama Item</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4 text-center">Jumlah Stok</th>
                                <th className="px-6 py-4">Satuan</th>
                                <th className="px-6 py-4">Catatan</th>
                                <th className="px-6 py-4">Terakhir Diperbarui</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200">
                            {stocks.data && stocks.data.length > 0 ? (
                                stocks.data.map((item) => {
                                    const isLow = Number(item.quantity) < 5;

                                    return (
                                        <tr key={item.id} className="hover:bg-neutral-50/80 transition-colors">
                                            <td className="px-6 py-4 font-bold text-neutral-900">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center font-bold font-mono">
                                                {isLow ? (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs border border-rose-300 font-extrabold">
                                                        <FaExclamationTriangle className="w-3 h-3 text-rose-600" />
                                                        {item.quantity}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs border border-emerald-300 font-extrabold">
                                                        {item.quantity}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-neutral-600">
                                                {item.unit}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-neutral-500 max-w-xs truncate">
                                                {item.notes || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-neutral-500">
                                                {item.updater ? item.updater.name : 'System'}
                                                <br />
                                                <span className="text-[11px] text-neutral-400">
                                                    {new Date(item.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={route('admin.stocks.edit', item.id)}
                                                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                        title="Edit Stok"
                                                    >
                                                        <FaEdit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => setConfirmDeleteId(item.id)}
                                                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Hapus Stok"
                                                    >
                                                        <FaTrashAlt className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-neutral-500">
                                        <FaBoxes className="w-10 h-10 mx-auto text-neutral-300 mb-3" />
                                        Belum ada data stok bahan operasional.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {stocks.links && stocks.links.length > 3 && (
                    <div className="p-4 border-t border-neutral-200 flex justify-center gap-1">
                        {stocks.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    link.active
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                } ${!link.url && 'opacity-50 pointer-events-none'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Modal */}
            <AnimatePresence>
                {confirmDeleteId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-neutral-200"
                        >
                            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4 mx-auto">
                                <FaExclamationCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 text-center font-header">
                                Hapus Stok Item Ini?
                            </h3>
                            <p className="text-xs text-neutral-500 text-center mt-2">
                                Item stok ini akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                            </p>
                            <div className="flex items-center justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-sm"
                                >
                                    Ya, Hapus
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    );
}
