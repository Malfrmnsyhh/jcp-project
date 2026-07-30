import FloatingInput from '@/Components/UI/FloatingInput';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-bold text-neutral-900 font-header">
                    Informasi Profil Administrator
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                    Perbarui nama lengkap dan alamat email akun administrator Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-8 space-y-7">
                <FloatingInput
                    id="name"
                    label="Nama Lengkap"
                    value={data.name}
                    isFocused
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

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm text-neutral-800">
                            Alamat email Anda belum terverifikasi.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="text-sm text-primary-700 underline hover:text-primary-800 focus:outline-none"
                            >
                                Klik di sini untuk mengirim ulang email verifikasi.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-semibold text-emerald-600">
                                Tautan verifikasi baru telah dikirimkan ke alamat email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <PrimaryButton disabled={processing}>
                        Simpan Perubahan
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-semibold text-emerald-600">
                            Tersimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
