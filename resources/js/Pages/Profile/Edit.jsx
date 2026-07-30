import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Pengaturan Profil" />

            <div className="max-w-full space-y-6">
                <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8">
                    <UpdatePasswordForm />
                </div>

                <div className="bg-white rounded-xl border border-rose-200 bg-rose-50/30 p-6 sm:p-8">
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
