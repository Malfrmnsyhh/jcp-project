import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.product-categories.update', category.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.product-categories.index')}
                        className="text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                        <FaArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-bold leading-tight text-neutral-800">
                        Edit Kategori Produk
                    </h2>
                </div>
            }
        >
            <Head title="Edit Kategori Produk" />

            <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <form onSubmit={submit} className="p-6 sm:p-8">
                    <div className="space-y-6">
                        {/* Field: Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-neutral-700 mb-2">
                                Nama Kategori <span className="text-rose-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                                    errors.name 
                                    ? 'border-rose-300 focus:ring-rose-500 bg-rose-50' 
                                    : 'border-neutral-300 focus:ring-primary-500 bg-white'
                                }`}
                                placeholder="Contoh: Plakat Akrilik"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                autoFocus
                            />
                            {errors.name && (
                                <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>
                            )}
                            <p className="mt-1.5 text-xs text-neutral-500">
                                Slug akan otomatis diperbarui berdasarkan nama kategori baru.
                            </p>
                        </div>

                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-end gap-3">
                        <Link
                            href={route('admin.product-categories.index')}
                            className="px-5 py-2.5 text-sm font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white transition-colors bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
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
