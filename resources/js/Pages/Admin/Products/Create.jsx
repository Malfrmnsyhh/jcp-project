import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaUpload, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        product_category_id: '',
        name: '',
        description: '',
        price: '',
        is_active: true,
        images: [] // array of file objects
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Validasi dan set data
        const newImages = [...data.images, ...files];
        setData('images', newImages);

        // Buat preview URL
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...newPreviews]);
    };

    const removeImage = (index) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData('images', newImages);

        const newPreviews = [...imagePreviews];
        URL.revokeObjectURL(newPreviews[index]); // Free up memory
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="w-full max-w-4xl  flex items-center gap-4 sticky top-0">
                    <Link
                        href={route('admin.products.index')}
                        className="text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                        <FaArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-bold leading-tight text-neutral-800">
                        Tambah Produk
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Produk" />

            <div className="max-w-7xl bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <form onSubmit={submit} className="p-6 sm:p-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                        {/* Kolom Kiri: Informasi Dasar */}
                        <div className="lg:col-span-7 space-y-6">
                            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b pb-2">
                                Informasi Dasar
                            </h3>

                            {/* Field: Category */}
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Kategori <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all ${
                                        errors.product_category_id ? 'border-rose-300 focus:ring-rose-500 bg-rose-50' : 'bg-neutral-200 hover:bg-neutral-300 focus:ring-primary-500'
                                    }`}
                                    value={data.product_category_id}
                                    onChange={(e) => setData('product_category_id', e.target.value)}
                                >
                                    <option value="">-- Pilih Kategori --</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.product_category_id && <p className="mt-1.5 text-xs text-rose-500">{errors.product_category_id}</p>}
                            </div>

                            {/* Field: Name */}
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Nama Produk <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all ${
                                        errors.name ? 'border-rose-300 focus:ring-rose-500 bg-rose-50' : 'bg-neutral-200 hover:bg-neutral-300 focus:ring-primary-500'
                                    }`}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>}
                            </div>

                            {/* Field: Price */}
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Harga Dasar (Rp) <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition-all ${
                                        errors.price ? 'border-rose-300 focus:ring-rose-500 bg-rose-50' : 'bg-neutral-200 hover:bg-neutral-300 focus:ring-primary-500'
                                    }`}
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                />
                                {errors.price && <p className="mt-1.5 text-xs text-rose-500">{errors.price}</p>}
                            </div>

                            {/* Field: Status */}
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
                                {errors.is_active && <p className="mt-1.5 text-xs text-rose-500">{errors.is_active}</p>}
                            </div>
                        </div>

                        {/* Kolom Kanan: Detail & Gambar */}
                        <div className="lg:col-span-5 space-y-6">
                            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b pb-2">
                                Detail & Gambar
                            </h3>

                            {/* Field: Description */}
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Deskripsi Produk
                                </label>
                                <textarea
                                    rows="5"
                                    className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                                        errors.description ? 'border-rose-300 focus:ring-rose-500 bg-rose-50' : 'border-neutral-300 focus:ring-primary-500 bg-white'
                                    }`}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                ></textarea>
                                {errors.description && <p className="mt-1.5 text-xs text-rose-500">{errors.description}</p>}
                            </div>

                            {/* Field: Images */}
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">
                                    Gambar Produk (Bisa lebih dari 1)
                                </label>
                                
                                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-neutral-50 transition-colors relative cursor-pointer">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleImageChange}
                                    />
                                    <div className="bg-primary-100 text-primary-600 p-3 rounded-full mb-3">
                                        <FaUpload className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-bold text-neutral-700 mb-1">Klik atau Drop gambar di sini</p>
                                    <p className="text-xs text-neutral-500">Maks. 2MB per gambar. Format: JPG, PNG, WEBP.</p>
                                </div>
                                {errors.images && <p className="mt-1.5 text-xs text-rose-500">{errors.images}</p>}

                                {/* Previews */}
                                {imagePreviews.length > 0 && (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative group rounded-lg overflow-hidden border border-neutral-200 aspect-square">
                                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Hapus"
                                                >
                                                    <FaTimes className="w-3 h-3" />
                                                </button>
                                                {index === 0 && (
                                                    <span className="absolute bottom-0 left-0 right-0 bg-primary-600/80 text-white text-[9px] font-bold uppercase tracking-wider text-center py-1">
                                                        Utama
                                                    </span>
                                                )}
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
                            <span>{processing ? 'Menyimpan...' : 'Simpan Produk'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
