import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Welcome({ auth }) {
    return (
        <MainLayout auth={auth}>
            <Head title="JCP - Premium Company Profile" />
            
            {/* Hero Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 text-center lg:pt-32">
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 border border-primary-200 uppercase tracking-wider">
                    Welcome to JCP Profile
                </span>
                <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 max-w-4xl mx-auto leading-tight">
                    We Build Premium{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500">
                        Digital Experiences
                    </span>
                </h1>
                <p className="mt-6 text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
                    Empowering businesses with cutting-edge web design, robust development, and intelligent digital solutions tailored to your unique vision.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <a
                        href="#about"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-700 to-primary-600 font-semibold text-white hover:opacity-90 transition-all shadow-lg shadow-primary-700/25"
                    >
                        Get Started
                    </a>
                    <a
                        href="#services"
                        className="px-6 py-3 rounded-xl bg-white font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors border border-neutral-400"
                    >
                        Our Services
                    </a>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-neutral-400/20">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">Our Creative Services</h2>
                    <p className="mt-4 text-neutral-700">Discover how we can help your brand stand out and grow in the digital era.</p>
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Service 1 */}
                    <div className="group p-8 rounded-2xl bg-white border border-neutral-400/20 hover:border-primary-500/50 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                            💻
                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">Web Development</h3>
                        <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                            Highly optimized, responsive, and functional websites built using modern frameworks like React and Laravel.
                        </p>
                    </div>

                    {/* Service 2 */}
                    <div className="group p-8 rounded-2xl bg-white border border-neutral-400/20 hover:border-primary-500/50 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                            🎨
                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">UI/UX Design</h3>
                        <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                            Beautiful, intuitive, and conversion-focused user interfaces designed for unmatched user experiences.
                        </p>
                    </div>

                    {/* Service 3 */}
                    <div className="group p-8 rounded-2xl bg-white border border-neutral-400/20 hover:border-primary-500/50 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                            📈
                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">Digital Branding</h3>
                        <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                            Strategy, social presence, and identity development to establish your company as a leader in your industry.
                        </p>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-neutral-400/20">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    <div>
                        <span className="text-xs font-semibold text-primary-700 uppercase tracking-widest">Who We Are</span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
                            We are a team of visionary builders and creators
                        </h2>
                        <p className="mt-6 text-neutral-700 leading-relaxed">
                            Established in 2026, JCP specializes in delivering robust tech architecture and beautiful UI layouts. We believe that technology should be elegant, powerful, and accessible.
                        </p>
                        <p className="mt-4 text-neutral-700 leading-relaxed">
                            Our mission is to accelerate our clients' digital transformations, helping them navigate complex technical landscapes with ease.
                        </p>
                        <div className="mt-8 flex gap-6">
                            <div>
                                <h4 className="text-2xl font-bold text-neutral-900">99%</h4>
                                <p className="text-xs text-neutral-700 uppercase mt-1">Client Satisfaction</p>
                            </div>
                            <div className="border-l border-neutral-400/20 pl-6">
                                <h4 className="text-2xl font-bold text-neutral-900">50+</h4>
                                <p className="text-xs text-neutral-700 uppercase mt-1">Projects Completed</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-video w-full rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-400 p-1 shadow-2xl">
                            <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center p-8">
                                <div className="text-center">
                                    <div className="text-5xl mb-4">🚀</div>
                                    <h4 className="text-lg font-bold text-neutral-900">Innovating Continuously</h4>
                                    <p className="text-sm text-neutral-700 mt-2">Delivering state-of-the-art software designs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
