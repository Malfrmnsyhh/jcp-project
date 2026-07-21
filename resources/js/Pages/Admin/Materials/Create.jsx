import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        material_category_id: '',
        name: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.materials.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="w-full max-w-4xl flex items-center gap-4 sticky top-0">
                    <Link
                        href={route('admin.materials.index')}
                        className="text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                        <FaArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-bold leading-tight text-neutral-800">
                        Tambah Material
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Material" />

            <div className="max-w-7xl bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <form onSubmit={submit} className="p-6 sm:p-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                        {/* Kolom Kiri */}
                        <div className="lg:col-span-7 space-y-6">
                            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b pb-2">
                                Informasi Dasar
                            </h3>

                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Kategori <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all ${
                                        errors.material_category_id ? 'border-rose-300 focus:ring-rose-500 bg-rose-50' : 'bg-neutral-200 hover:bg-neutral-300 focus:ring-primary-500'
                                    }`}
                                    value={data.material_category_id}
                                    onChange={(e) => setData('material_category_id', e.target.value)}
                                >
                                    <option value="">-- Pilih Kategori --</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.material_category_id && <p className="mt-1.5 text-xs text-rose-500">{errors.material_category_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Nama Material <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all ${
                                        errors.name ? 'border-rose-300 focus:ring-rose-500 bg-rose-50' : 'bg-neutral-200 hover:bg-neutral-300 focus:ring-primary-500'
                                    }`}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>}
                            </div>
                        </div>

                        {/* Kolom Kanan */}
                        <div className="lg:col-span-5 space-y-6">
                            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b pb-2">
                                Detail
                            </h3>

                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Deskripsi Singkat
                                </label>
                                <textarea
                                    rows="5"
                                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all ${
                                        errors.description ? 'border-rose-300 focus:ring-rose-500 bg-rose-50' : 'bg-neutral-200 hover:bg-neutral-300 focus:ring-primary-500'
                                    }`}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                ></textarea>
                                {errors.description && <p className="mt-1.5 text-xs text-rose-500">{errors.description}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-end gap-3">
                        <Link
                            href={route('admin.materials.index')}
                            className="px-5 py-2.5 text-sm font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white transition-colors bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-70 shadow-sm"
                        >
                            <FaSave className="w-4 h-4" />
                            <span>{processing ? 'Menyimpan...' : 'Simpan Material'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
