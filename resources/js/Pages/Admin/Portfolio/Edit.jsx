import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaUpload, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Edit({ portfolio }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: portfolio.title || '',
        client_name: portfolio.client_name || '',
        description: portfolio.description || '',
        image: null,
    });

    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setData('image', null);
        setPreview(null);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.portfolio.update', portfolio.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.portfolio.index')}
                        className="text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                        <FaArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-bold leading-tight text-neutral-800">
                        Edit Portofolio: {portfolio.title}
                    </h2>
                </div>
            }
        >
            <Head title="Edit Portofolio" />

            <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <form onSubmit={submit} className="p-6 sm:p-8">
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-bold text-neutral-700 mb-2">
                                Judul Projek <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-neutral-300 px-4 py-2.5 text-sm focus:ring-primary-500"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title}</p>}
                        </div>

                        {/* Client Name */}
                        <div>
                            <label className="block text-sm font-bold text-neutral-700 mb-2">
                                Nama Klien (Opsional)
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-neutral-300 px-4 py-2.5 text-sm focus:ring-primary-500"
                                value={data.client_name}
                                onChange={(e) => setData('client_name', e.target.value)}
                            />
                            {errors.client_name && <p className="mt-1 text-xs text-rose-500">{errors.client_name}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-bold text-neutral-700 mb-2">
                                Deskripsi Projek
                            </label>
                            <textarea
                                rows="4"
                                className="w-full rounded-lg border-neutral-300 px-4 py-2.5 text-sm focus:ring-primary-500"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            ></textarea>
                            {errors.description && <p className="mt-1 text-xs text-rose-500">{errors.description}</p>}
                        </div>

                        {/* Single Image Upload */}
                        <div>
                            <label className="block text-sm font-bold text-neutral-700 mb-2">
                                Gambar Portofolio
                            </label>
                            
                            {!preview && !portfolio.image_path && (
                                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-neutral-50 transition-colors relative cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleImageChange}
                                    />
                                    <div className="bg-primary-100 text-primary-600 p-3 rounded-full mb-3">
                                        <FaUpload className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-bold text-neutral-700 mb-1">Pilih Gambar Pengganti</p>
                                </div>
                            )}

                            {(preview || portfolio.image_path) && (
                                <div className="relative rounded-lg overflow-hidden border border-neutral-200 aspect-video group">
                                    <img 
                                        src={preview || portfolio.image_path} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover" 
                                    />
                                    {preview ? (
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow"
                                            title="Batal ubah gambar"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-white px-4 py-2 rounded-lg font-bold text-sm text-neutral-700 relative overflow-hidden cursor-pointer">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    onChange={handleImageChange}
                                                />
                                                Ganti Gambar
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {errors.image && <p className="mt-1 text-xs text-rose-500">{errors.image}</p>}
                            {!preview && portfolio.image_path && (
                                <p className="mt-2 text-xs text-neutral-500 italic">Gambar saat ini. Arahkan kursor ke gambar untuk mengganti.</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-end gap-3">
                        <Link
                            href={route('admin.portfolio.index')}
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
