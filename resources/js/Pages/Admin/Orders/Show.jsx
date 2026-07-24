import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FaArrowLeft, FaWhatsapp, FaCheckCircle, FaUser, FaStickyNote, FaCalendarAlt, FaShoppingBag, FaSave, FaExclamationCircle } from 'react-icons/fa';

export default function Show({ order }) {
    const { flash } = usePage().props;

    const { data, setData, patch, processing, errors } = useForm({
        status: order.status || 'baru',
    });

    const handleStatusUpdate = (e) => {
        e.preventDefault();
        patch(route('admin.orders.status', order.id));
    };

    const handleConfirmOrder = () => {
        if (confirm('Konfirmasi pesanan ini?')) {
            useForm().post(route('admin.orders.confirm', order.id));
        }
    };

    const cleanWa = order.customer_wa ? order.customer_wa.replace(/[^0-9]/g, '') : '';
    const waNumber = cleanWa.startsWith('0') ? '62' + cleanWa.slice(1) : cleanWa;
    const waText = encodeURIComponent(`Halo Kak ${order.customer_name}, mengenai pesanan #${order.order_number} di JCP Profile...`);
    const waUrl = waNumber ? `https://wa.me/${waNumber}?text=${waText}` : '#';

    // Calculate total
    const totalAmount = order.items ? order.items.reduce((sum, item) => sum + Number(item.subtotal || (item.price * item.qty)), 0) : 0;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.orders.index')}
                        className="text-neutral-500 hover:text-neutral-700 transition-colors p-2 hover:bg-neutral-100 rounded-lg"
                    >
                        <FaArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="text-xl font-bold leading-tight text-neutral-800 font-header">
                            Detail Pesanan #{order.order_number}
                        </h2>
                        <p className="text-xs text-neutral-500 mt-0.5">
                            Dibuat pada {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={`Detail Order #${order.order_number}`} />

            {/* Flash Notification */}
            {flash?.success && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
                    <FaCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{flash.success}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Main Content (Items & Status) */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* Item List Table */}
                    <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden p-6">
                        <div className="flex items-center gap-2 mb-4 border-b border-neutral-200 pb-3">
                            <FaShoppingBag className="w-5 h-5 text-primary-600" />
                            <h3 className="text-base font-bold text-neutral-900 font-header">
                                Daftar Produk Dipesan
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="bg-neutral-50 text-neutral-500 font-semibold uppercase text-xs border-b border-neutral-200">
                                        <th className="px-4 py-3">Nama Produk</th>
                                        <th className="px-4 py-3 text-right">Harga Satuan</th>
                                        <th className="px-4 py-3 text-center">Jumlah</th>
                                        <th className="px-4 py-3 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200">
                                    {order.items && order.items.length > 0 ? (
                                        order.items.map((item) => (
                                            <tr key={item.id} className="hover:bg-neutral-50/50">
                                                <td className="px-4 py-3.5 font-bold text-neutral-900">
                                                    {item.product_name || item.product?.name || 'Produk Custom'}
                                                </td>
                                                <td className="px-4 py-3.5 text-right font-mono">
                                                    Rp {Number(item.price).toLocaleString('id-ID')}
                                                </td>
                                                <td className="px-4 py-3.5 text-center font-bold">
                                                    {item.qty}
                                                </td>
                                                <td className="px-4 py-3.5 text-right font-mono font-bold text-primary-700">
                                                    Rp {Number(item.subtotal || (item.price * item.qty)).toLocaleString('id-ID')}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-8 text-center text-neutral-500">
                                                Tidak ada item khusus terlampir pada order ini.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                {totalAmount > 0 && (
                                    <tfoot>
                                        <tr className="bg-neutral-50 font-bold border-t-2 border-neutral-200">
                                            <td colSpan="3" className="px-4 py-3 text-right text-neutral-700">
                                                Total Pembayaran:
                                            </td>
                                            <td className="px-4 py-3 text-right text-primary-700 font-mono text-base">
                                                Rp {totalAmount.toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    </tfoot>
                                )}
                            </table>
                        </div>
                    </div>

                    {/* Customer Notes */}
                    {order.customer_note && (
                        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6">
                            <div className="flex items-center gap-2 text-amber-800 font-bold mb-2">
                                <FaStickyNote className="w-4 h-4" />
                                <span>Catatan Pelanggan</span>
                            </div>
                            <p className="text-sm text-amber-900 leading-relaxed italic whitespace-pre-line">
                                "{order.customer_note}"
                            </p>
                        </div>
                    )}

                </div>

                {/* Sidebar Info & Controls */}
                <div className="lg:col-span-4 space-y-6">
                    
                    {/* Status Management Box */}
                    <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 space-y-4">
                        <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-200 pb-3 font-header">
                            Ubah Status Pesanan
                        </h3>

                        <form onSubmit={handleStatusUpdate} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 mb-2 uppercase tracking-wider">
                                    Status Saat Ini
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full bg-neutral-100 hover:bg-neutral-200/70 rounded-xl text-sm py-2.5 px-4 border border-transparent focus:border-primary-500 focus:ring-primary-500 font-bold"
                                >
                                    <option value="baru">Baru</option>
                                    <option value="dikonfirmasi">Dikonfirmasi</option>
                                    <option value="menunggu_pembayaran">Menunggu Pembayaran</option>
                                    <option value="dibayar">Dibayar</option>
                                    <option value="dikirim">Dikirim</option>
                                    <option value="selesai">Selesai</option>
                                    <option value="dibatalkan">Dibatalkan</option>
                                </select>
                                {errors.status && <p className="mt-1 text-xs text-rose-500">{errors.status}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm disabled:opacity-70"
                            >
                                <FaSave className="w-4 h-4" />
                                <span>{processing ? 'Menyimpan...' : 'Simpan Status'}</span>
                            </button>
                        </form>

                        {order.status === 'baru' && (
                            <button
                                onClick={handleConfirmOrder}
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
                            >
                                <FaCheckCircle className="w-4 h-4" />
                                <span>Konfirmasi Pesanan Ini</span>
                            </button>
                        )}
                    </div>

                    {/* Customer Detail Card */}
                    <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 space-y-4">
                        <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-200 pb-3 font-header">
                            Informasi Pemesan
                        </h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <FaUser className="w-4 h-4 text-neutral-400 mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs text-neutral-500">Nama Pelanggan</p>
                                    <p className="font-bold text-neutral-900">{order.customer_name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FaWhatsapp className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs text-neutral-500">Nomor WhatsApp</p>
                                    <p className="font-bold text-neutral-900 mb-1">{order.customer_wa}</p>
                                    {cleanWa && (
                                        <a
                                            href={waUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg text-xs transition-all shadow-sm"
                                        >
                                            <FaWhatsapp className="w-3.5 h-3.5" />
                                            Chat WhatsApp
                                        </a>
                                    )}
                                </div>
                            </div>

                            {order.confirmer && (
                                <div className="flex items-start gap-3 pt-3 border-t border-neutral-200">
                                    <FaCalendarAlt className="w-4 h-4 text-sky-500 mt-1 shrink-0" />
                                    <div>
                                        <p className="text-xs text-neutral-500">Dikonfirmasi oleh</p>
                                        <p className="font-bold text-neutral-900">{order.confirmer.name}</p>
                                        {order.confirmed_at && (
                                            <p className="text-[11px] text-neutral-500">
                                                {new Date(order.confirmed_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}
