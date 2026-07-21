import React from 'react';
import { motion } from 'framer-motion';

export default function About({ machine = null }) {
    const hasMachineImage = Boolean(machine?.image_path);
    const machineName = machine?.name || 'Laser Cutting Presisi';
    const machineDescription = machine?.description || 'Mesin laser terbaru JCP siaga memotong akrilik, kayu, & material khusus dengan hasil tepi rapi dan detail tajam.';
    const machineType = machine?.type || 'Mesin Laser Cutting';
    const machineWorkArea = machine?.work_area || '1300 x 900 mm';

    return (
        <section id="about" className="bg-neutral-50 py-20 sm:py-28 relative overflow-hidden mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Image + Machine Card */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-primary-100 rounded-[2rem] transform rotate-3 group-hover:rotate-6 transition-transform duration-500 z-0 border border-primary-200"></div>
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            whileHover={{ y: -6 }}
                            className="aspect-[4/3] w-full bg-white rounded-[2rem] relative z-10 overflow-hidden shadow-[0_40px_120px_rgba(15,23,42,0.12)] border border-primary-300"
                        >
                            {hasMachineImage ? (
                                <img
                                    src={machine.image_path}
                                    alt={machineName}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : null}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                            <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-8">
                                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary-100 mb-3">{machineType}</p>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{machineName}</h3>
                                <p className="max-w-xs text-sm text-white/80 leading-relaxed">
                                    {machineDescription}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                            whileHover={{ scale: 1.02 }}
                            className="absolute -bottom-8 left-4 right-4 rounded-[2rem] bg-white border border-neutral-200 shadow-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                            <div className="rounded-3xl bg-primary-50 p-4 text-center">
                                <p className="text-2xl font-extrabold text-primary-700">1300</p>
                                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mt-2">Lebar mm</p>
                            </div>
                            <div className="rounded-3xl bg-white p-4 text-center border border-neutral-100">
                                <p className="text-2xl font-extrabold text-neutral-900">1000W</p>
                                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mt-2">Daya Laser</p>
                            </div>
                            <div className="rounded-3xl bg-white p-4 text-center border border-neutral-100">
                                <p className="text-2xl font-extrabold text-neutral-900">0.05</p>
                                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mt-2">Ketelitian mm</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="flex flex-col">

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-header leading-tight mb-6">
                            Dedikasi untuk Presisi dan <span className="text-primary-700">Kreativitas</span>
                        </h2>

                        <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                            Jombang Creative Project (JCP) bermula dari semangat untuk menghadirkan solusi pemotongan dan pengukiran material yang presisi di wilayah Jombang dan sekitarnya. Dengan dukungan mesin laser cutting berteknologi terkini dan tim desain yang berpengalaman, kami berkomitmen mengubah ide-ide kreatif Anda menjadi produk nyata yang berkualitas tinggi—mulai dari plakat akrilik eksklusif, neon box yang menarik perhatian, hingga elemen dekoratif interior kayu yang menawan.
                        </p>

                        {/* Quick stats or points */}
                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-primary-200">
                            <div>
                                <h4 className="font-extrabold text-3xl text-primary-700 font-header mb-1">100+</h4>
                                <p className="text-xs text-neutral-600 font-semibold uppercase tracking-wider">Proyek Selesai</p>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-3xl text-primary-700 font-header mb-1">99%</h4>
                                <p className="text-xs text-neutral-600 font-semibold uppercase tracking-wider">Klien Puas</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
