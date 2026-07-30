import FloatingInput from '@/Components/UI/FloatingInput';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Password" />

            <div className="mb-6 text-sm text-neutral-600">
                Lupa password? Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk mengatur ulang password.
            </div>

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
                    error={errors.email}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <div className="flex items-center justify-end">
                    <PrimaryButton disabled={processing}>
                        Kirim Tautan Reset
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
