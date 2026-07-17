import Navbar from '@/Components/Sections/Navbar';
import Footer from '@/Components/Sections/Footer';
import { Link } from '@inertiajs/react';

export default function MainLayout({ auth = {}, children }) {
    const user = auth.user;

    return (
        <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans flex flex-col relative overflow-x-hidden">
            {/* Background decorative glows */}

            {/* Navbar */}
            <Navbar user={user} cartCount={0} />

            {/* Main Content */}
            <main className="flex-1 w-full relative z-10">
                {children}
            </main>

            <Footer />
        </div>
    );
}
