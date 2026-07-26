import DangerButton from '@/Components/UI/DangerButton';
import InputError from '@/Components/UI/InputError';
import InputLabel from '@/Components/UI/InputLabel';
import Modal from '@/Components/UI/Modal';
import SecondaryButton from '@/Components/UI/SecondaryButton';
import TextInput from '@/Components/UI/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-bold text-rose-900 font-header">
                    Hapus Akun Administrator
                </h2>

                <p className="mt-1 text-sm text-rose-700 leading-relaxed">
                    Setelah akun Anda dihapus, semua data dan sumber daya terkait akan dihapus secara permanen dari sistem.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Hapus Akun
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-bold text-neutral-900 font-header">
                        Apakah Anda yakin ingin menghapus akun ini?
                    </h2>

                    <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                        Setelah akun dihapus, semua data akan hilang secara permanen. Masukkan kata sandi Anda untuk mengonfirmasi tindakan ini.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password Akun"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="Masukkan Password Anda"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>
                            Batal
                        </SecondaryButton>

                        <DangerButton disabled={processing}>
                            Hapus Akun Permanen
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
