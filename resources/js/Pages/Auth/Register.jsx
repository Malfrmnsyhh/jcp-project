import FloatingInput from '@/Components/UI/FloatingInput';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar" />

            <form onSubmit={submit} className="space-y-6">
                <FloatingInput
                    id="name"
                    label="Nama Lengkap"
                    value={data.name}
                    isFocused={true}
                    autoComplete="name"
                    error={errors.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />

                <FloatingInput
                    id="email"
                    type="email"
                    label="Alamat Email"
                    value={data.email}
                    autoComplete="username"
                    error={errors.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />

                <FloatingInput
                    id="password"
                    type="password"
                    label="Password"
                    value={data.password}
                    autoComplete="new-password"
                    error={errors.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                />

                <FloatingInput
                    id="password_confirmation"
                    type="password"
                    label="Konfirmasi Password"
                    value={data.password_confirmation}
                    autoComplete="new-password"
                    error={errors.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required
                />

                <div className="flex items-center justify-between pt-2">
                    <Link
                        href={route('login')}
                        className="text-sm text-primary-700 hover:text-primary-800 underline"
                    >
                        Sudah punya akun?
                    </Link>

                    <PrimaryButton disabled={processing}>
                        Daftar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
