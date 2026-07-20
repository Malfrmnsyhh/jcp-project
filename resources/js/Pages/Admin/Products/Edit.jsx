import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaUpload, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Edit({ product, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Untuk mendukung file upload dengan method PUT di Laravel
        product_category_id: product.product_category_id || '',
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        is_active: product.is_active,
        new_images: [], // File objek gambar baru
    });

    const [newImagePreviews, setNewImagePreviews] = useState([]);

    const handleNewImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const updatedImages = [...data.new_images, ...files];
        setData('new_images', updatedImages);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setNewImagePreviews([...newImagePreviews, ...newPreviews]);
    };

    const removeNewImage = (index) => {
        const updatedImages = [...data.new_images];
        updatedImages.splice(index, 1);
        setData('new_images', updatedImages);

        const updatedPreviews = [...newImagePreviews];
        URL.revokeObjectURL(updatedPreviews[index]);
        updatedPreviews.splice(index, 1);
        setNewImagePreviews(updatedPreviews);
    };

    const deleteOldImage = (imageId) => {
        if (confirm('Yakin ingin menghapus gambar ini secara permanen?')) {
            router.delete(route('admin.products.image.destroy', [product.id, imageId]), {
                preserveScroll: true
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.update', product.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.products.index')}
                        className="text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                        <FaArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-bold leading-tight text-neutral-800">
                        Edit Produk: {product.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit Produk - ${product.name}`} />

            <div className="max-w-4xl bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <form onSubmit={submit} className="p-6 sm:p-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Kolom Kiri */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b pb-2">
                                Informasi Dasar
                            </h3>

                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Kategori <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    className="w-full rounded-lg border-neutral-300 px-4 py-2.5 text-sm focus:ring-primary-500"
                                    value={data.product_category_id}
                                    onChange={(e) => setData('product_category_id', e.target.value)}
                                >
                                    <option value="">-- Pilih Kategori --</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.product_category_id && <p className="mt-1 text-xs text-rose-500">{errors.product_category_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Nama Produk <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-neutral-300 px-4 py-2.5 text-sm focus:ring-primary-500"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Harga Dasar (Rp) <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full rounded-lg border-neutral-300 px-4 py-2.5 text-sm focus:ring-primary-500"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                />
                                {errors.price && <p className="mt-1 text-xs text-rose-500">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                    />
                                    <span className="text-sm font-bold text-neutral-700">Produk Aktif / Ditampilkan</span>
                                </label>
                            </div>
                        </div>

                        {/* Kolom Kanan */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b pb-2">
                                Detail & Gambar
                            </h3>

                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">Deskripsi Produk</label>
                                <textarea
                                    rows="4"
                                    className="w-full rounded-lg border-neutral-300 px-4 py-2.5 text-sm focus:ring-primary-500"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                ></textarea>
                            </div>

                            {/* Gambar Lama */}
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">Gambar Saat Ini</label>
                                {product.images && product.images.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-3">
                                        {product.images.map((img) => (
                                            <div key={img.id} className="relative group rounded-lg overflow-hidden border border-neutral-200 aspect-square">
                                                <img src={img.image_path} alt="Gambar" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => deleteOldImage(img.id)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Hapus Permanen"
                                                >
                                                    <FaTimes className="w-3 h-3" />
                                                </button>
                                                {img.is_primary === 1 && (
                                                    <span className="absolute bottom-0 left-0 right-0 bg-primary-600/80 text-white text-[9px] font-bold uppercase tracking-wider text-center py-1">
                                                        Utama
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-neutral-500 italic">Belum ada gambar.</p>
                                )}
                            </div>

                            {/* Tambah Gambar Baru */}
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">Tambah Gambar Baru</label>
                                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:bg-neutral-50 cursor-pointer relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleNewImageChange}
                                    />
                                    <FaUpload className="w-5 h-5 text-neutral-400 mb-2" />
                                    <p className="text-xs font-bold text-neutral-700">Pilih gambar tambahan</p>
                                </div>
                                {errors.new_images && <p className="mt-1 text-xs text-rose-500">{errors.new_images}</p>}

                                {newImagePreviews.length > 0 && (
                                    <div className="grid grid-cols-3 gap-3 mt-4">
                                        {newImagePreviews.map((preview, index) => (
                                            <div key={index} className="relative rounded-lg overflow-hidden border border-neutral-200 aspect-square group">
                                                <img src={preview} alt="Preview Baru" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100"
                                                >
                                                    <FaTimes className="w-3 h-3" />
                                                </button>
                                                <span className="absolute bottom-0 left-0 right-0 bg-amber-500/80 text-white text-[9px] font-bold uppercase text-center py-1">Baru</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-end gap-3">
                        <Link
                            href={route('admin.products.index')}
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
