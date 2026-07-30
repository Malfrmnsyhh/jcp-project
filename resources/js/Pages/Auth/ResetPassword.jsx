import FloatingInput from '@/Components/UI/FloatingInput';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit} className="space-y-6">
                <FloatingInput
                    id="email"
                    type="email"
                    label="Alamat Email"
                    value={data.email}
                    autoComplete="username"
                    error={errors.email}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <FloatingInput
                    id="password"
                    type="password"
                    label="Password Baru"
                    value={data.password}
                    isFocused={true}
                    autoComplete="new-password"
                    error={errors.password}
                    onChange={(e) => setData('password', e.target.value)}
                />

                <FloatingInput
                    id="password_confirmation"
                    type="password"
                    label="Konfirmasi Password Baru"
                    value={data.password_confirmation}
                    autoComplete="new-password"
                    error={errors.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                />

                <div className="flex items-center justify-end">
                    <PrimaryButton disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
