import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.material-categories.store'));
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
                        Tambah Kategori Bahan
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Kategori Bahan" />

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
                                    placeholder="Contoh: Akrilik, Kayu, MDF, Logam..."
                                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all ${
                                        errors.name ? 'bg-rose-50' : 'bg-neutral-200 hover:bg-neutral-300'
                                    }`}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoFocus
                                />
                                {errors.name && <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>}
                            </div>
                        </div>

                        {/* Kolom Kanan */}
                        <div className="lg:col-span-5 space-y-6">
                            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b pb-2">
                                Informasi
                            </h3>
                            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4 text-sm text-neutral-600 space-y-2 leading-relaxed">
                                <p className="font-bold text-neutral-700">💡 Tentang Kategori Bahan</p>
                                <p>Kategori bahan digunakan untuk mengelompokkan jenis-jenis bahan yang tersedia.</p>
                                <p>Contoh: <span className="font-semibold">Akrilik</span>, <span className="font-semibold">Kayu</span>, <span className="font-semibold">MDF</span>, <span className="font-semibold">Kaca</span>.</p>
                                <p className="text-xs text-neutral-400 pt-1">Slug akan dibuat otomatis dari nama kategori.</p>
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
                            <span>{processing ? 'Menyimpan...' : 'Simpan Kategori'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
