import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaPlus, FaEdit, FaTrashAlt, FaImage } from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index({ machines }) {
    const { delete: destroy } = useForm();
    const [itemToDelete, setItemToDelete] = useState(null);

    const confirmDelete = () => {
        if (itemToDelete) {
            destroy(route('admin.machines.destroy', itemToDelete.id), {
                onSuccess: () => setItemToDelete(null),
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Mesin & Fasilitas" />

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-bold text-neutral-800">Daftar Mesin</h3>
                    <Link
                        href={route('admin.machines.create')}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-primary-600 rounded-lg hover:bg-primary-700"
                    >
                        <FaPlus className="w-3 h-3" />
                        <span>Tambah Mesin</span>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-neutral-50 text-neutral-500 font-semibold uppercase border-b border-neutral-200">
                                <th className="px-6 py-4">Gambar</th>
                                <th className="px-6 py-4">Nama Mesin</th>
                                <th className="px-6 py-4">Tipe / Area Kerja</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 text-neutral-700">
                            {machines.data.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-neutral-500">
                                        Belum ada data mesin.
                                    </td>
                                </tr>
                            ) : (
                                machines.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-6 py-4">
                                            {item.image_path ? (
                                                <img 
                                                    src={item.image_path} 
                                                    alt={item.name} 
                                                    className="w-16 h-12 rounded object-cover border border-neutral-200 shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-16 h-12 rounded bg-neutral-100 flex items-center justify-center text-neutral-400 border border-neutral-200">
                                                    <FaImage className="w-5 h-5" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-neutral-900">{item.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">{item.type}</div>
                                            <div className="text-xs text-neutral-500">{item.work_area}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.is_active ? (
                                                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 rounded border border-green-200">Aktif</span>
                                            ) : (
                                                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-700 bg-neutral-100 rounded border border-neutral-200">Tidak Aktif</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <Link
                                                href={route('admin.machines.edit', item.id)}
                                                className="inline-flex text-blue-600 hover:text-blue-800 transition-colors"
                                                title="Edit"
                                            >
                                                <FaEdit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => setItemToDelete(item)}
                                                className="inline-flex text-rose-600 hover:text-rose-800 transition-colors"
                                                title="Hapus"
                                            >
                                                <FaTrashAlt className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {itemToDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                            className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden border border-neutral-200 relative"
                        >
                            <div className="p-6 text-center">
                                <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mb-4 mx-auto ring-4 ring-rose-50">
                                    <FaTrashAlt className="w-6 h-6 text-rose-600" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">Hapus Mesin?</h3>
                                <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                                    Apakah Anda yakin ingin menghapus <span className="font-bold text-neutral-800">"{itemToDelete.name}"</span>? Tindakan ini tidak dapat dibatalkan.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setItemToDelete(null)}
                                        className="flex-1 px-4 py-2.5 rounded-xl font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="flex-1 px-4 py-2.5 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm shadow-rose-200"
                                    >
                                        Ya, Hapus
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    );
}
