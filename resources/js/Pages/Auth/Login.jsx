import FloatingInput from '@/Components/UI/FloatingInput';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Checkbox from '@/Components/UI/Checkbox';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <FloatingInput
                    id="email"
                    type="email"
                    label="Alamat Email"
                    value={data.email}
                    isFocused={true}
                    autoComplete="username"
                    error={errors.email}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <FloatingInput
                    id="password"
                    type="password"
                    label="Password"
                    value={data.password}
                    autoComplete="current-password"
                    error={errors.password}
                    onChange={(e) => setData('password', e.target.value)}
                />

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span>Ingat saya</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-primary-700 hover:text-primary-800 underline"
                        >
                            Lupa password?
                        </Link>
                    )}
                </div>

                <PrimaryButton className="w-full justify-center" disabled={processing}>
                    Masuk
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
