import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaPlus, FaEdit, FaTrash, FaImage } from 'react-icons/fa';

export default function Index({ portfolios }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus portofolio ini? Semua gambar yang terkait juga akan dihapus.')) {
            destroy(route('admin.portfolio.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-neutral-800">
                    Portofolio
                </h2>
            }
        >
            <Head title="Portofolio" />

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-bold text-neutral-800">Daftar Portofolio</h3>
                    <Link
                        href={route('admin.portfolio.create')}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-primary-600 rounded-lg hover:bg-primary-700"
                    >
                        <FaPlus className="w-3 h-3" />
                        <span>Tambah Portofolio</span>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-neutral-50 text-neutral-500 font-semibold uppercase border-b border-neutral-200">
                                <th className="px-6 py-4">Gambar</th>
                                <th className="px-6 py-4">Judul Projek</th>
                                <th className="px-6 py-4">Klien</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 text-neutral-700">
                            {portfolios.data.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-neutral-500">
                                        Belum ada data portofolio.
                                    </td>
                                </tr>
                            ) : (
                                portfolios.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-6 py-4">
                                            {item.image_path ? (
                                                <img 
                                                    src={item.image_path} 
                                                    alt={item.title} 
                                                    className="w-16 h-12 rounded object-cover border border-neutral-200 shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-16 h-12 rounded bg-neutral-100 flex items-center justify-center text-neutral-400 border border-neutral-200">
                                                    <FaImage className="w-5 h-5" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-neutral-900">{item.title}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.client_name || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <Link
                                                href={route('admin.portfolio.edit', item.id)}
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

                {portfolios.links && portfolios.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-center gap-1">
                        {portfolios.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 text-sm border rounded ${
                                    link.active 
                                    ? 'bg-primary-600 text-white border-primary-600 font-bold' 
                                    : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-100'
                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
