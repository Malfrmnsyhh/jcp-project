import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

export default function Create({ existingCategories = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: '',
        unit: 'Pcs',
        quantity: 0,
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.stocks.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.stocks.index')}
                        className="text-neutral-500 hover:text-neutral-700 transition-colors p-2 hover:bg-neutral-100 rounded-lg"
                    >
                        <FaArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-bold leading-tight text-neutral-800 font-header">
                        Tambah Stok Bahan Operasional
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Stok Baru" />

            <div className="max-w-4xl bg-white rounded-2xl shadow-sm border border-neutral-200/80 overflow-hidden">
                <form onSubmit={submit} className="p-6 sm:p-8 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Nama Item */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-neutral-700 mb-2">
                                Nama Stok / Material <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Contoh: Akrilik Bening 3mm (120x240cm), Cat Spray Hitam, Mata Laser 80W..."
                                className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all ${
                                    errors.name ? 'border-rose-300 focus:ring-rose-500 bg-rose-50' : 'bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white focus:ring-primary-500 border-transparent'
                                }`}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="block text-sm font-bold text-neutral-700 mb-2">
                                Kategori Stok <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                list="categories-list"
                                placeholder="Contoh: Bahan Baku, Sparepart, Konsumsi, Tools..."
                                className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all ${
                                    errors.category ? 'border-rose-300 focus:ring-rose-500 bg-rose-50' : 'bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white focus:ring-primary-500 border-transparent'
                                }`}
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                            />
                            <datalist id="categories-list">
                                {existingCategories.map((cat, idx) => (
                                    <option key={idx} value={cat} />
                                ))}
                            </datalist>
                            {errors.category && <p className="mt-1 text-xs text-rose-500">{errors.category}</p>}
                        </div>

                        {/* Satuan Unit */}
                        <div>
                            <label className="block text-sm font-bold text-neutral-700 mb-2">
                                Satuan Unit <span className="text-rose-500">*</span>
                            </label>
                            <select
                                className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all ${
                                    errors.unit ? 'border-rose-300 focus:ring-rose-500 bg-rose-50' : 'bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white focus:ring-primary-500 border-transparent'
                                }`}
                                value={data.unit}
                                onChange={(e) => setData('unit', e.target.value)}
                            >
                                <option value="Pcs">Pcs / Buah</option>
                                <option value="Lembar">Lembar / Sheet</option>
                                <option value="Meter">Meter (m)</option>
                                <option value="Kg">Kilogram (kg)</option>
                                <option value="Roll">Roll / Gulung</option>
                                <option value="Botol">Botol / Can</option>
                                <option value="Box">Box / Pack</option>
                            </select>
                            {errors.unit && <p className="mt-1 text-xs text-rose-500">{errors.unit}</p>}
                        </div>

                        {/* Jumlah Quantity */}
                        <div>
                            <label className="block text-sm font-bold text-neutral-700 mb-2">
                                Jumlah Stok Awal <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="number"
                                step="any"
                                min="0"
                                className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all font-mono ${
                                    errors.quantity ? 'border-rose-300 focus:ring-rose-500 bg-rose-50' : 'bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white focus:ring-primary-500 border-transparent'
                                }`}
                                value={data.quantity}
                                onChange={(e) => setData('quantity', e.target.value)}
                            />
                            {errors.quantity && <p className="mt-1 text-xs text-rose-500">{errors.quantity}</p>}
                        </div>

                        {/* Catatan / Keterangan */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-neutral-700 mb-2">
                                Catatan / Keterangan Tambahan
                            </label>
                            <textarea
                                rows="3"
                                placeholder="Lokasi rak penyimpanan, spesifikasi khusus, produsen, dll..."
                                className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all ${
                                    errors.notes ? 'border-rose-300 focus:ring-rose-500 bg-rose-50' : 'bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white focus:ring-primary-500 border-transparent'
                                }`}
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                            ></textarea>
                            {errors.notes && <p className="mt-1 text-xs text-rose-500">{errors.notes}</p>}
                        </div>

                    </div>

                    <div className="pt-6 border-t border-neutral-200 flex items-center justify-end gap-3">
                        <Link
                            href={route('admin.stocks.index')}
                            className="px-5 py-2.5 text-sm font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm disabled:opacity-70"
                        >
                            <FaSave className="w-4 h-4" />
                            <span>{processing ? 'Menyimpan...' : 'Simpan Stok'}</span>
                        </button>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
