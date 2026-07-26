import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShoppingCart, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';

export default function Show({ auth, product }) {
    // Selected image index for gallery
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Form state
    const [qty, setQty] = useState(1);
    const [customerName, setCustomerName] = useState('');
    const [customerWa, setCustomerWa] = useState('');
    const [customerNote, setCustomerNote] = useState('');

    // Submission states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successOrder, setSuccessOrder] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const ADMIN_WA_NUMBER = '6285749296583';

    const images = product.images && product.images.length > 0
        ? product.images.map(img => img.image_path)
        : [];

    const formatRupiah = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price || 0);
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsSubmitting(true);

        try {
            const response = await axios.post('/order', {
                product_id: product.id,
                qty: Number(qty),
                customer_name: customerName,
                customer_wa: customerWa,
                customer_note: customerNote,
            });

            if (response.data && response.data.success) {
                const orderNumber = response.data.order_number;
                setSuccessOrder(orderNumber);

                // Susun Pesan WhatsApp (Sesuai spesifikasi prompt: tanpa info rekening)
                const waMessage = `Halo, saya ${customerName} mau tanya soal pesanan saya (${orderNumber}):\n- ${product.name} x${qty}\n\nBoleh info lebih lanjut?`;

                const cleanAdminWa = ADMIN_WA_NUMBER.replace(/[^0-9]/g, '');
                const waUrl = `https://wa.me/${cleanAdminWa}?text=${encodeURIComponent(waMessage)}`;

                // Buka WhatsApp di tab baru
                window.open(waUrl, '_blank');
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                setErrorMessage('Terlalu banyak permintaan order. Silakan tunggu 1 menit lalu coba lagi.');
            } else if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <MainLayout auth={auth}>
            <Head title={`${product.name} - Detail Produk`} />

            <div className="bg-neutral-50 pt-24 pb-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href={route('catalog')}
                            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-primary-700 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-neutral-200"
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            <span>Kembali ke Katalog</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Gallery & Product Info (Col 7) */}
                        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200/80 space-y-6">
                            
                            {/* Main Image */}
                            <div className="aspect-square bg-neutral-100 rounded-2xl overflow-hidden relative border border-neutral-200">
                                {images.length > 0 ? (
                                    <img
                                        src={images[activeImageIndex]}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-all duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-400 font-medium">
                                        Tidak Ada Gambar
                                    </div>
                                )}

                                {/* Stock Status Badge */}
                                <div className="absolute top-4 left-4">
                                    {product.stock_status === 'in_stock' && (
                                        <span className="bg-emerald-500 text-white px-3.5 py-1.5 text-xs font-bold rounded-full shadow-sm">Ready Stock</span>
                                    )}
                                    {product.stock_status === 'pre_order' && (
                                        <span className="bg-amber-500 text-white px-3.5 py-1.5 text-xs font-bold rounded-full shadow-sm">Pre-Order</span>
                                    )}
                                    {product.stock_status === 'out_of_stock' && (
                                        <span className="bg-rose-500 text-white px-3.5 py-1.5 text-xs font-bold rounded-full shadow-sm">Stok Habis</span>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail Selector */}
                            {images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                                                activeImageIndex === idx ? 'border-primary-600 ring-2 ring-primary-200' : 'border-neutral-200 opacity-70 hover:opacity-100'
                                            }`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Product Header */}
                            <div>
                                <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-lg mb-3">
                                    {product.category ? product.category.name : 'Produk JCP'}
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-header leading-tight mb-3">
                                    {product.name}
                                </h1>
                                <p className="text-2xl font-black text-primary-700 font-mono">
                                    {formatRupiah(product.price)}
                                </p>
                            </div>

                            {/* Description */}
                            <div className="pt-4 border-t border-neutral-200">
                                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2 font-header">
                                    Deskripsi Produk
                                </h3>
                                <p className="text-neutral-700 leading-relaxed text-sm whitespace-pre-line">
                                    {product.description || 'Belum ada deskripsi detail untuk produk ini.'}
                                </p>
                            </div>

                        </div>

                        {/* Order Form Card (Col 5) */}
                        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200/80 sticky top-28 space-y-6">
                            
                            <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                                    <FaWhatsapp className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-neutral-900 font-header">
                                        Order via WhatsApp
                                    </h2>
                                    <p className="text-xs text-neutral-500">
                                        Isi data pesanan untuk terhubung ke WhatsApp Admin
                                    </p>
                                </div>
                            </div>

                            {/* Success State Banner */}
                            {successOrder ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4"
                                >
                                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                                        <FiCheckCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-emerald-900 font-header">
                                            Pesanan Berhasil Dicatat!
                                        </h3>
                                        <p className="text-xs text-emerald-800 mt-1 font-mono font-bold">
                                            No. Pesanan: #{successOrder}
                                        </p>
                                    </div>
                                    <p className="text-xs text-emerald-700 leading-relaxed">
                                        Pesananmu sudah tercatat di sistem kami. Silakan lanjutkan obrolan di jendela WhatsApp yang baru terbuka.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSuccessOrder(null);
                                            setQty(1);
                                            setCustomerName('');
                                            setCustomerWa('');
                                            setCustomerNote('');
                                        }}
                                        className="inline-block text-xs font-bold text-emerald-800 underline hover:text-emerald-900 pt-2"
                                    >
                                        + Buat Pesanan Baru Lagi
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmitOrder} className="space-y-4">
                                    
                                    {/* Error Banner */}
                                    {errorMessage && (
                                        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                                            <FiAlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    {/* Qty Input */}
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                                            Jumlah (Qty) <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setQty(Math.max(1, qty - 1))}
                                                className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-lg flex items-center justify-center transition-colors"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                min="1"
                                                required
                                                value={qty}
                                                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                                                className="w-20 text-center py-2 bg-neutral-100 border-transparent focus:border-primary-500 rounded-xl text-sm font-bold font-mono"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setQty(qty + 1)}
                                                className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-lg flex items-center justify-center transition-colors"
                                            >
                                                +
                                            </button>
                                            <div className="ml-auto text-right">
                                                <span className="text-[11px] text-neutral-500 block">Total Estimasi</span>
                                                <span className="text-sm font-extrabold text-primary-700 font-mono">
                                                    {formatRupiah((product.price || 0) * qty)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nama Pelanggan */}
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                                            Nama Lengkap <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Contoh: Budi Santoso"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white focus:border-primary-500 rounded-xl text-sm font-medium transition-all border border-transparent"
                                        />
                                    </div>

                                    {/* Nomor WhatsApp */}
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                                            Nomor WhatsApp <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Contoh: 08123456789"
                                            value={customerWa}
                                            onChange={(e) => setCustomerWa(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white focus:border-primary-500 rounded-xl text-sm font-medium transition-all border border-transparent"
                                        />
                                    </div>

                                    {/* Catatan Tambahan (Opsional) */}
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                                            Catatan Tambahan (Opsional)
                                        </label>
                                        <textarea
                                            rows="3"
                                            placeholder="Ukuran kustom, warna pilihan, atau catatan khusus..."
                                            value={customerNote}
                                            onChange={(e) => setCustomerNote(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white focus:border-primary-500 rounded-xl text-sm font-medium transition-all border border-transparent"
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md disabled:opacity-60 text-sm mt-4"
                                    >
                                        <FaWhatsapp className="w-5 h-5" />
                                        <span>
                                            {isSubmitting ? 'Memproses Pesanan...' : 'Kirim Order & Chat WhatsApp'}
                                        </span>
                                    </button>

                                    <p className="text-[11px] text-neutral-500 text-center leading-relaxed">
                                        Dengan menekan tombol di atas, data pesanan Anda akan dicatat dan Anda akan langsung terhubung ke WhatsApp Admin JCP.
                                    </p>

                                </form>
                            )}

                        </div>

                    </div>

                </div>
            </div>
        </MainLayout>
    );
}
