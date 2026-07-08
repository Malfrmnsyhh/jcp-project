import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="JCP - Premium Company Profile" />
            
            <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
                {/* Background decorative glow */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Navbar */}
                <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-900">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-indigo-500/30">
                            J
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            JCP Profile
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a href="#services" className="hover:text-indigo-400 transition-colors">Services</a>
                        <a href="#about" className="hover:text-indigo-400 transition-colors">About Us</a>
                        <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-4 py-2 rounded-lg bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 rounded-lg bg-slate-800 text-sm font-medium text-white hover:bg-slate-700 transition-colors border border-slate-700"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 text-center lg:pt-32">
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                        Welcome to JCP Profile
                    </span>
                    <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
                        We Build Premium{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Digital Experiences
                        </span>
                    </h1>
                    <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Empowering businesses with cutting-edge web design, robust development, and intelligent digital solutions tailored to your unique vision.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <a
                            href="#about"
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-white hover:opacity-90 transition-all shadow-lg shadow-indigo-500/25"
                        >
                            Get Started
                        </a>
                        <a
                            href="#services"
                            className="px-6 py-3 rounded-xl bg-slate-800 font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
                        >
                            Our Services
                        </a>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Creative Services</h2>
                        <p className="mt-4 text-slate-400">Discover how we can help your brand stand out and grow in the digital era.</p>
                    </div>

                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Service 1 */}
                        <div className="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                                💻
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">Web Development</h3>
                            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                                Highly optimized, responsive, and functional websites built using modern frameworks like React and Laravel.
                            </p>
                        </div>

                        {/* Service 2 */}
                        <div className="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-purple-500/50 hover:bg-slate-900/80 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                                🎨
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">UI/UX Design</h3>
                            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                                Beautiful, intuitive, and conversion-focused user interfaces designed for unmatched user experiences.
                            </p>
                        </div>

                        {/* Service 3 */}
                        <div className="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-pink-500/50 hover:bg-slate-900/80 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                                📈
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-white group-hover:text-pink-400 transition-colors">Digital Branding</h3>
                            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                                Strategy, social presence, and identity development to establish your company as a leader in your industry.
                            </p>
                        </div>
                    </div>
                </section>

                {/* About Us Section */}
                <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div>
                            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Who We Are</span>
                            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white leading-tight">
                                We are a team of visionary builders and creators
                            </h2>
                            <p className="mt-6 text-slate-400 leading-relaxed">
                                Established in 2026, JCP specializes in delivering robust tech architecture and beautiful UI layouts. We believe that technology should be elegant, powerful, and accessible.
                            </p>
                            <p className="mt-4 text-slate-400 leading-relaxed">
                                Our mission is to accelerate our clients' digital transformations, helping them navigate complex technical landscapes with ease.
                            </p>
                            <div className="mt-8 flex gap-6">
                                <div>
                                    <h4 className="text-2xl font-bold text-white">99%</h4>
                                    <p className="text-xs text-slate-500 uppercase mt-1">Client Satisfaction</p>
                                </div>
                                <div className="border-l border-slate-800 pl-6">
                                    <h4 className="text-2xl font-bold text-white">50+</h4>
                                    <p className="text-xs text-slate-500 uppercase mt-1">Projects Completed</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-video w-full rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-1 shadow-2xl">
                                <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center p-8">
                                    <div className="text-center">
                                        <div className="text-5xl mb-4">🚀</div>
                                        <h4 className="text-lg font-bold text-white">Innovating Continuously</h4>
                                        <p className="text-sm text-slate-500 mt-2">Delivering state-of-the-art software designs.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 border-t border-slate-900 bg-slate-950 py-12 text-center text-sm text-slate-500">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-md">
                                J
                            </div>
                            <span className="text-md font-semibold text-slate-300">JCP Profile</span>
                        </div>
                        <p>© 2026 JCP Profile. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
