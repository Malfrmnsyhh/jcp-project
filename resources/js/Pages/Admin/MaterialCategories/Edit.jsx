import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.material-categories.update', category.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.material-categories.index')}
                        className="text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                        <FaArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-bold leading-tight text-neutral-800">
                        Edit Kategori: {category.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit Kategori - ${category.name}`} />

            <div className="max-w-7xl bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <form onSubmit={submit} className="p-6 sm:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                        {/* Kolom Kiri */}
                        <div className="lg:col-span-7 space-y-6">
                            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b pb-2">
                                Informasi Kategori
                            </h3>

                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Nama Kategori <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all ${
                                        errors.name ? 'bg-rose-50' : 'bg-neutral-200 hover:bg-neutral-300'
                                    }`}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoFocus
                                />
                                {errors.name && <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>}
                            </div>

                            {/* Slug preview */}
                            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4 text-sm">
                                <p className="text-xs text-neutral-500 mb-1 font-semibold uppercase tracking-wider">Slug Saat Ini</p>
                                <p className="font-mono text-neutral-700">{category.slug}</p>
                                <p className="text-xs text-neutral-400 mt-1">Slug akan diperbarui otomatis saat nama diubah.</p>
                            </div>
                        </div>

                        {/* Kolom Kanan */}
                        <div className="lg:col-span-5 space-y-6">
                            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b pb-2">
                                Informasi
                            </h3>
                            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4 text-sm text-neutral-600 space-y-2 leading-relaxed">
                                <p className="font-bold text-neutral-700">⚠️ Perhatian</p>
                                <p>Mengubah nama kategori akan memperbarui slug secara otomatis.</p>
                                <p>Pastikan nama kategori sudah benar sebelum disimpan agar tidak membingungkan pengguna.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-end gap-3">
                        <Link
                            href={route('admin.material-categories.index')}
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
                            <span>{processing ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
