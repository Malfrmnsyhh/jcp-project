import FloatingInput from '@/Components/UI/FloatingInput';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Konfirmasi Password" />

            <div className="mb-6 text-sm text-neutral-600">
                Ini adalah area aman. Harap konfirmasi password Anda sebelum melanjutkan.
            </div>

            <form onSubmit={submit} className="space-y-6">
                <FloatingInput
                    id="password"
                    type="password"
                    label="Password"
                    value={data.password}
                    isFocused={true}
                    autoComplete="current-password"
                    error={errors.password}
                    onChange={(e) => setData('password', e.target.value)}
                />

                <div className="flex items-center justify-end">
                    <PrimaryButton disabled={processing}>
                        Konfirmasi
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
