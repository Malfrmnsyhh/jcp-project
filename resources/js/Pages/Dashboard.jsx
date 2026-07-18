import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    FaClipboardList, FaBoxOpen, FaCubes, FaUserClock, FaArrowRight
} from 'react-icons/fa';

export default function Dashboard({ stats, latestOrders }) {
    // Helper untuk mengubah status order menjadi badge berwarna
    const getStatusBadge = (status) => {
        const styles = {
            baru: 'bg-amber-100 text-amber-800 border-amber-200',
            dikonfirmasi: 'bg-blue-100 text-blue-800 border-blue-200',
            menunggu_pembayaran: 'bg-indigo-100 text-indigo-800 border-indigo-200',
            dibayar: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            dikirim: 'bg-sky-100 text-sky-800 border-sky-200',
            selesai: 'bg-green-100 text-green-800 border-green-200',
            dibatalkan: 'bg-neutral-100 text-neutral-800 border-neutral-200',
        };

        return (
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${styles[status] || styles.baru}`}>
                {status.replace('_', ' ')}
            </span>
        );
    };

    // Helper format mata uang Rupiah (jika ada total belanja di order nanti)
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-neutral-800 font-header">
                    Ringkasan Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* 4 Cards Statistik */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Card 1: Order Baru */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Order Baru</p>
                            <h3 className="text-3xl font-extrabold text-neutral-800">{stats.new_orders}</h3>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-lg text-amber-500">
                            <FaClipboardList className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Card 2: Produk Aktif */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Produk Aktif</p>
                            <h3 className="text-3xl font-extrabold text-neutral-800">{stats.active_products}</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-lg text-emerald-500">
                            <FaBoxOpen className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Card 3: Stok Menipis */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Stok Menipis (&lt;5)</p>
                            <h3 className="text-3xl font-extrabold text-neutral-800">{stats.low_stock}</h3>
                        </div>
                        <div className="p-3 bg-rose-50 rounded-lg text-rose-500">
                            <FaCubes className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Card 4: Testimoni Pending */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Testimoni Pending</p>
                            <h3 className="text-3xl font-extrabold text-neutral-800">{stats.pending_testimonials}</h3>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-500">
                            <FaUserClock className="w-6 h-6" />
                        </div>
                    </div>

                </div>

                {/* Daftar Order Terbaru */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                    <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
                        <h4 className="font-header font-bold text-neutral-800">5 Transaksi/Order Terbaru</h4>
                        <Link
                            href="#"
                            className="text-xs font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1.5 transition-colors"
                        >
                            <span>Lihat Semua Order</span>
                            <FaArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        {latestOrders.length === 0 ? (
                            <div className="p-12 text-center text-neutral-500 text-sm">
                                Belum ada transaksi masuk saat ini.
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="bg-neutral-50 text-neutral-500 font-semibold uppercase border-b border-neutral-200">
                                        <th className="px-6 py-4">No. Order</th>
                                        <th className="px-6 py-4">Nama Pelanggan</th>
                                        <th className="px-6 py-4">Nomor WhatsApp</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Waktu Order</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200 text-neutral-700">
                                    {latestOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-neutral-50 cursor-pointer transition-colors"
                                        >
                                            <td className="px-6 py-4 font-mono font-bold text-neutral-900">
                                                #{order.order_number}
                                            </td>
                                            <td className="px-6 py-4 font-medium">{order.customer_name}</td>
                                            <td className="px-6 py-4 text-neutral-500">{order.customer_wa}</td>
                                            <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                                            <td className="px-6 py-4 text-neutral-500">{formatDate(order.created_at)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href="#"
                                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-600 hover:text-primary-800 transition-colors"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <span>Detail</span>
                                                    <FaArrowRight className="w-2.5 h-2.5" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
