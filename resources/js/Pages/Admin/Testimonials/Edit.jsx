import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

export default function Edit({ testimonial }) {
    const { data, setData, put, processing, errors } = useForm({
        customer_name: testimonial.customer_name || '',
        customer_role: testimonial.customer_role || '',
        content: testimonial.content || '',
        is_published: testimonial.is_published,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.testimonials.update', testimonial.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.testimonials.index')}
                        className="text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                        <FaArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-bold leading-tight text-neutral-800">
                        Edit Testimoni
                    </h2>
                </div>
            }
        >
            <Head title="Edit Testimoni" />

            <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <form onSubmit={submit} className="p-6 sm:p-8">
                    <div className="space-y-6">
                        
                        <div>
                            <label className="block text-sm font-bold text-neutral-700 mb-2">
                                Nama Pelanggan <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-neutral-300 px-4 py-2.5 text-sm focus:ring-primary-500"
                                value={data.customer_name}
                                onChange={(e) => setData('customer_name', e.target.value)}
                            />
                            {errors.customer_name && <p className="mt-1 text-xs text-rose-500">{errors.customer_name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-neutral-700 mb-2">
                                Perusahaan / Profesi (Opsional)
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-neutral-300 px-4 py-2.5 text-sm focus:ring-primary-500"
                                value={data.customer_role}
                                onChange={(e) => setData('customer_role', e.target.value)}
                            />
                            {errors.customer_role && <p className="mt-1 text-xs text-rose-500">{errors.customer_role}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-neutral-700 mb-2">
                                Isi Testimoni <span className="text-rose-500">*</span>
                            </label>
                            <textarea
                                rows="5"
                                className="w-full rounded-lg border-neutral-300 px-4 py-2.5 text-sm focus:ring-primary-500"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                            ></textarea>
                            {errors.content && <p className="mt-1 text-xs text-rose-500">{errors.content}</p>}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer"
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                />
                                <span className="text-sm font-bold text-neutral-700">Tampilkan Testimoni di Website</span>
                            </label>
                        </div>

                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-end gap-3">
                        <Link
                            href={route('admin.testimonials.index')}
                            className="px-5 py-2.5 text-sm font-bold text-neutral-600 hover:text-neutral-900"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-70"
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
