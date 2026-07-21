import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaPlus, FaEdit, FaTrash, FaStar } from 'react-icons/fa';

export default function Index({ testimonials }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
            destroy(route('admin.testimonials.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-neutral-800">
                    Testimoni Pelanggan
                </h2>
            }
        >
            <Head title="Testimoni" />

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-bold text-neutral-800">Daftar Testimoni</h3>
                    <Link
                        href={route('admin.testimonials.create')}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-primary-600 rounded-lg hover:bg-primary-700"
                    >
                        <FaPlus className="w-3 h-3" />
                        <span>Tambah Testimoni</span>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-neutral-50 text-neutral-500 font-semibold uppercase border-b border-neutral-200">
                                <th className="px-6 py-4">Nama Pelanggan</th>
                                <th className="px-6 py-4">Isi Testimoni</th>
                                <th className="px-6 py-4 text-center">Status Publikasi</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 text-neutral-700">
                            {testimonials.data.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-neutral-500">
                                        Belum ada data testimoni.
                                    </td>
                                </tr>
                            ) : (
                                testimonials.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-neutral-900">{item.customer_name}</div>
                                            <div className="text-xs text-neutral-500 mt-0.5">{item.customer_role || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex text-amber-400 mb-1">
                                                <FaStar className="w-3 h-3" /><FaStar className="w-3 h-3" /><FaStar className="w-3 h-3" /><FaStar className="w-3 h-3" /><FaStar className="w-3 h-3" />
                                            </div>
                                            <p className="text-xs italic text-neutral-600 line-clamp-2 w-64">
                                                "{item.content}"
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.is_published ? (
                                                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 rounded border border-green-200">Dipublikasi</span>
                                            ) : (
                                                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-700 bg-neutral-100 rounded border border-neutral-200">Disembunyikan</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <Link
                                                href={route('admin.testimonials.edit', item.id)}
                                                className="inline-flex text-blue-600 hover:text-blue-800 transition-colors"
                                                title="Edit"
                                            >
                                                <FaEdit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="inline-flex text-rose-600 hover:text-rose-800 transition-colors"
                                                title="Hapus"
                                            >
                                                <FaTrash className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
