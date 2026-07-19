import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ products }) {
    const handleDelete = (id) => {
        if (!confirm('Hapus produk ini?')) return;
        router.delete(route('admin.products.destroy', id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Produk" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Produk</h1>
                    <Link href={route('admin.products.create')} className="btn">Buat Produk</Link>
                </div>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="py-2">Nama</th>
                            <th className="py-2">Harga</th>
                            <th className="py-2 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.map(p => (
                            <tr key={p.id} className="border-b">
                                <td className="py-2">{p.name}</td>
                                <td className="py-2">{p.price ? `Rp ${Number(p.price).toLocaleString('id-ID')}` : '-'}</td>
                                <td className="py-2 text-right">
                                    <Link href={route('admin.products.edit', p.id)} className="mr-3 text-primary-600">Edit</Link>
                                    <button onClick={() => handleDelete(p.id)} className="text-danger">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4 flex gap-1">
                    {products.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => link.url && router.get(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-1 text-sm border rounded ${link.active ? 'bg-primary-600 text-white' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}