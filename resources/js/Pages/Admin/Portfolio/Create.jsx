import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaUpload, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: '',
        client_name: '',
        description: '',
        sort_order: '',
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
        post(route('admin.portfolio.store'));
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
                        Tambah Portofolio
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Portofolio" />

            <div className="max-w-7xl bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <form onSubmit={submit} className="p-6 sm:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                        <div className="lg:col-span-7 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Judul Projek <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl px-4 py-2.5 text-sm bg-neutral-200 hover:bg-neutral-300"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Plakat Akrilik Kementerian"
                                />
                                {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-bold text-neutral-700 mb-2">
                                        Kategori Projek <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl px-4 py-2.5 text-sm bg-neutral-200 hover:bg-neutral-300"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        placeholder="Contoh: Produk Akrilik"
                                    />
                                    {errors.category && <p className="mt-1 text-xs text-rose-500">{errors.category}</p>}
                                </div>

                                {/* Client Name */}
                                <div>
                                    <label className="block text-sm font-bold text-neutral-700 mb-2">
                                        Nama Klien (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl px-4 py-2.5 text-sm bg-neutral-200 hover:bg-neutral-300"
                                        value={data.client_name}
                                        onChange={(e) => setData('client_name', e.target.value)}
                                        placeholder="Contoh: Kemenkes RI"
                                    />
                                    {errors.client_name && <p className="mt-1 text-xs text-rose-500">{errors.client_name}</p>}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Deskripsi Projek
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full rounded-xl px-4 py-2.5 text-sm bg-neutral-200 hover:bg-neutral-300"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                ></textarea>
                                {errors.description && <p className="mt-1 text-xs text-rose-500">{errors.description}</p>}
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Urutan Tampil (Opsional)
                                </label>
                                <input
                                    type="number"
                                    className="w-full rounded-xl px-4 py-2.5 text-sm bg-neutral-200 hover:bg-neutral-300"
                                    value={data.sort_order ?? ''}
                                    onChange={(e) => setData('sort_order', e.target.value === '' ? null : Number(e.target.value))}
                                    placeholder="Contoh: 1"
                                />
                                {errors.sort_order && <p className="mt-1 text-xs text-rose-500">{errors.sort_order}</p>}
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            {/* Single Image Upload */}
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Gambar Portofolio <span className="text-rose-500">*</span>
                                </label>
                                
                                {!preview ? (
                                    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-neutral-50 transition-colors relative cursor-pointer min-h-[300px]">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleImageChange}
                                        />
                                        <div className="bg-primary-100 text-primary-600 p-4 rounded-full mb-4">
                                            <FaUpload className="w-8 h-8" />
                                        </div>
                                        <p className="text-sm font-bold text-neutral-700 mb-1">Klik untuk Memilih Gambar</p>
                                        <p className="text-xs text-neutral-500">Maksimal 2MB (JPG, PNG)</p>
                                    </div>
                                ) : (
                                    <div className="relative rounded-lg overflow-hidden border border-neutral-200 aspect-[4/3] group shadow-sm">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-3 right-3 bg-red-500 text-white p-2.5 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow"
                                            title="Hapus"
                                        >
                                            <FaTimes className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                                {errors.image && <p className="mt-2 text-xs text-rose-500">{errors.image}</p>}
                            </div>
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
                            <span>{processing ? 'Menyimpan...' : 'Simpan Portofolio'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
