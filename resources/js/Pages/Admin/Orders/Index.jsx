import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { FaSearch, FaEye, FaTrashAlt, FaWhatsapp, FaShoppingCart, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index({ orders, filters = {} }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.orders.index'), { search, status }, { preserveState: true });
    };

    const handleFilterStatus = (newStatus) => {
        setStatus(newStatus);
        router.get(route('admin.orders.index'), { search, status: newStatus }, { preserveState: true });
    };

    const handleDelete = () => {
        if (confirmDeleteId) {
            router.delete(route('admin.orders.destroy', confirmDeleteId), {
                onSuccess: () => setConfirmDeleteId(null),
            });
        }
    };

    const getStatusBadge = (orderStatus) => {
        switch (orderStatus) {
            case 'baru':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300"><FaClock className="w-3 h-3" /> Baru</span>;
            case 'dikonfirmasi':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300"><FaCheckCircle className="w-3 h-3" /> Dikonfirmasi</span>;
            case 'menunggu_pembayaran':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300"><FaClock className="w-3 h-3" /> Menunggu Bayar</span>;
            case 'dibayar':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300"><FaCheckCircle className="w-3 h-3" /> Dibayar</span>;
            case 'dikirim':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">Dikirim</span>;
            case 'selesai':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300"><FaCheckCircle className="w-3 h-3" /> Selesai</span>;
            case 'dibatalkan':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300"><FaExclamationCircle className="w-3 h-3" /> Dibatalkan</span>;
            default:
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-800 border border-neutral-300">{orderStatus}</span>;
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black leading-tight text-neutral-800 font-header">
                            Kelola Pesanan Masuk
                        </h2>
                        <p className="text-sm text-neutral-500 mt-1">
                            Daftar transaksi dan pesanan dari pelanggan
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Kelola Pesanan" />

            {/* Flash Message */}
            {flash?.success && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
                    <FaCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{flash.success}</span>
                </div>
            )}

            {/* Filter & Search Bar */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-sm mb-6">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Cari no. order, nama pelanggan, atau WhatsApp..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white rounded-xl text-sm transition-all border border-transparent focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <select
                            value={status}
                            onChange={(e) => handleFilterStatus(e.target.value)}
                            className="w-full md:w-48 bg-neutral-100 hover:bg-neutral-200/70 rounded-xl text-sm py-2.5 px-4 border border-transparent focus:border-primary-500 focus:ring-primary-500 font-medium"
                        >
                            <option value="">-- Semua Status --</option>
                            <option value="baru">Baru</option>
                            <option value="dikonfirmasi">Dikonfirmasi</option>
                            <option value="menunggu_pembayaran">Menunggu Bayar</option>
                            <option value="dibayar">Dibayar</option>
                            <option value="dikirim">Dikirim</option>
                            <option value="selesai">Selesai</option>
                            <option value="dibatalkan">Dibatalkan</option>
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
                                <th className="px-6 py-4">No. Order</th>
                                <th className="px-6 py-4">Pelanggan</th>
                                <th className="px-6 py-4">WhatsApp</th>
                                <th className="px-6 py-4">Jumlah Item</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200">
                            {orders.data && orders.data.length > 0 ? (
                                orders.data.map((order) => {
                                    const cleanWa = order.customer_wa ? order.customer_wa.replace(/[^0-9]/g, '') : '';
                                    const waUrl = cleanWa ? `https://wa.me/${cleanWa.startsWith('0') ? '62' + cleanWa.slice(1) : cleanWa}` : '#';

                                    return (
                                        <tr key={order.id} className="hover:bg-neutral-50/80 transition-colors">
                                            <td className="px-6 py-4 font-mono font-bold text-neutral-900">
                                                #{order.order_number}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-neutral-900">
                                                {order.customer_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {cleanWa ? (
                                                    <a
                                                        href={waUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                                                    >
                                                        <FaWhatsapp className="w-3.5 h-3.5" />
                                                        {order.customer_wa}
                                                    </a>
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-neutral-700">
                                                {order.items_count ?? order.items?.length ?? 0} item
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(order.status)}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-neutral-500">
                                                {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={route('admin.orders.show', order.id)}
                                                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                        title="Lihat Detail"
                                                    >
                                                        <FaEye className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => setConfirmDeleteId(order.id)}
                                                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Hapus Order"
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
                                        <FaShoppingCart className="w-10 h-10 mx-auto text-neutral-300 mb-3" />
                                        Belum ada data pesanan masuk.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {orders.links && orders.links.length > 3 && (
                    <div className="p-4 border-t border-neutral-200 flex justify-center gap-1">
                        {orders.links.map((link, idx) => (
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

            {/* Modal Delete Confirmation */}
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
                                Hapus Pesanan Ini?
                            </h3>
                            <p className="text-xs text-neutral-500 text-center mt-2">
                                Pesanan ini akan dihapus secara permanen dari sistem. Tindakan ini tidak dapat dibatalkan.
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
