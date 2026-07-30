import FloatingInput from '@/Components/UI/FloatingInput';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-bold text-neutral-900 font-header">
                    Ubah Password Akun
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                    Pastikan akun Anda menggunakan kombinasi password yang kuat dan aman.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-8 space-y-7">
                <FloatingInput
                    id="current_password"
                    ref={currentPasswordInput}
                    type="password"
                    label="Password Saat Ini"
                    value={data.current_password}
                    autoComplete="current-password"
                    error={errors.current_password}
                    onChange={(e) => setData('current_password', e.target.value)}
                />

                <FloatingInput
                    id="password"
                    ref={passwordInput}
                    type="password"
                    label="Password Baru"
                    value={data.password}
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

                <div className="flex items-center gap-4 pt-2">
                    <PrimaryButton disabled={processing}>
                        Simpan Password
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
