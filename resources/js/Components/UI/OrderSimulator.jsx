import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Stepper from './Stepper';
import { materialsData } from '../../data/materials';
import { FiChevronRight, FiChevronLeft, FiMessageCircle, FiCheckCircle } from 'react-icons/fi';

export default function OrderSimulator() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // Form State
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedThickness, setSelectedThickness] = useState(null);
    const [dimensions, setDimensions] = useState({ length: '', width: '', qty: '' });

    const steps = [
        { label: 'Pilih Bahan' },
        { label: 'Ketebalan' },
        { label: 'Ukuran' },
        { label: 'Ringkasan' }
    ];

    const buildWaLink = () => {
        const materialName = selectedMaterial ? selectedMaterial.name : '-';
        const thickness = selectedThickness || '-';
        const length = dimensions.length || '-';
        const width = dimensions.width || '-';
        const qty = dimensions.qty || '-';

        const message = `Halo, saya mau tanya untuk custom cutting:
- Bahan: ${materialName}
- Ketebalan: ${thickness}
- Ukuran: ${length}cm x ${width}cm
- Jumlah: ${qty} pcs

Boleh info harga & estimasi waktunya?`;

        return `https://wa.me/6281519007466?text=${encodeURIComponent(message)}`;
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    // Validation for Next Button
    const canGoNext = () => {
        if (currentStep === 0) return selectedMaterial !== null;
        if (currentStep === 1) return selectedThickness !== null;
        if (currentStep === 2) return dimensions.length > 0 && dimensions.width > 0 && dimensions.qty > 0;
        return true;
    };

    return (
        <section className="bg-neutral-50 py-16 border-t border-neutral-200" id="simulator">
            <div className="max-w-7xl mx-auto px-6">
                {!isOpen ? (
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-4 font-header">Sudah Tahu Kebutuhan Anda?</h3>
                        <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
                            Gunakan simulator ini untuk merancang pesanan custom Anda dan dapatkan format pesan otomatis untuk dikirim ke WhatsApp kami.
                        </p>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3.5 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Coba Konfigurasi Pesanan Kamu
                        </button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-xl border border-neutral-200 p-6 sm:p-10 max-w-4xl mx-auto"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl font-extrabold text-neutral-900 font-header">Konfigurator Pesanan</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-semibold text-neutral-500 hover:text-red-500 transition-colors"
                            >
                                Tutup Simulator
                            </button>
                        </div>

                        <Stepper
                            steps={steps}
                            currentStep={currentStep}
                            onStepClick={(step) => setCurrentStep(step)}
                        />

                        <div className="min-h-[300px] mt-12">
                            <AnimatePresence mode="wait">
                                {/* STEP 1: PILIH BAHAN */}
                                {currentStep === 0 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                                    >
                                        {materialsData.map((mat) => (
                                            <button
                                                key={mat.id}
                                                onClick={() => {
                                                    setSelectedMaterial(mat);
                                                    setSelectedThickness(null); // Reset thickness when material changes
                                                }}
                                                className={`flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all duration-200 ${selectedMaterial?.id === mat.id
                                                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                        : 'border-neutral-200 bg-white hover:border-primary-300 hover:bg-neutral-50 text-neutral-700'
                                                    }`}
                                            >
                                                <div className="text-3xl mb-3">{mat.icon}</div>
                                                <span className="font-bold text-sm sm:text-base">{mat.name}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}

                                {/* STEP 2: KETEBALAN */}
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        {selectedMaterial ? (
                                            <div>
                                                <h4 className="text-center font-bold text-neutral-700 mb-6">
                                                    Pilih Ketebalan untuk {selectedMaterial.name}
                                                </h4>
                                                <div className="flex flex-wrap justify-center gap-3">
                                                    {selectedMaterial.thickness_options.map((thick, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => setSelectedThickness(thick)}
                                                            className={`px-6 py-3 rounded-xl font-bold border-2 transition-all duration-200 ${selectedThickness === thick
                                                                    ? 'border-primary-500 bg-primary-500 text-white shadow-md'
                                                                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-300'
                                                                }`}
                                                        >
                                                            {thick}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center text-neutral-500 py-10">
                                                Silakan pilih bahan di langkah sebelumnya terlebih dahulu.
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {/* STEP 3: UKURAN & JUMLAH */}
                                {currentStep === 2 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="max-w-lg mx-auto"
                                    >
                                        <div className="grid grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <label className="block text-sm font-bold text-neutral-700 mb-2">Panjang (cm)</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={dimensions.length}
                                                    onChange={e => setDimensions({ ...dimensions, length: e.target.value })}
                                                    className="w-full rounded-xl border-neutral-300 focus:border-primary-500 focus:ring-primary-500 shadow-sm p-3"
                                                    placeholder="Contoh: 100"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-neutral-700 mb-2">Lebar (cm)</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={dimensions.width}
                                                    onChange={e => setDimensions({ ...dimensions, width: e.target.value })}
                                                    className="w-full rounded-xl border-neutral-300 focus:border-primary-500 focus:ring-primary-500 shadow-sm p-3"
                                                    placeholder="Contoh: 50"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-neutral-700 mb-2">Jumlah (Pcs)</label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={dimensions.qty}
                                                onChange={e => setDimensions({ ...dimensions, qty: e.target.value })}
                                                className="w-full rounded-xl border-neutral-300 focus:border-primary-500 focus:ring-primary-500 shadow-sm p-3"
                                                placeholder="Contoh: 10"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 4: RINGKASAN */}
                                {currentStep === 3 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <div className="bg-primary-50 rounded-2xl p-6 md:p-8 border border-primary-100 max-w-2xl mx-auto mb-8">
                                            <h4 className="font-header font-bold text-xl text-primary-900 mb-6 flex items-center gap-2">
                                                <FiCheckCircle className="text-primary-600" /> Ringkasan Pesanan
                                            </h4>

                                            <div className="space-y-4">
                                                <div className="flex justify-between border-b border-primary-200/50 pb-2">
                                                    <span className="text-neutral-600">Material</span>
                                                    <span className="font-bold text-neutral-900">{selectedMaterial?.name || '-'}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-primary-200/50 pb-2">
                                                    <span className="text-neutral-600">Ketebalan</span>
                                                    <span className="font-bold text-neutral-900">{selectedThickness || '-'}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-primary-200/50 pb-2">
                                                    <span className="text-neutral-600">Ukuran</span>
                                                    <span className="font-bold text-neutral-900">
                                                        {dimensions.length ? `${dimensions.length} cm` : '-'} x {dimensions.width ? `${dimensions.width} cm` : '-'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between pb-2">
                                                    <span className="text-neutral-600">Jumlah</span>
                                                    <span className="font-bold text-neutral-900">{dimensions.qty ? `${dimensions.qty} Pcs` : '-'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center">
                                            <a
                                                href={buildWaLink()}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                            >
                                                <FiMessageCircle className="w-6 h-6" />
                                                Chat via WhatsApp
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="mt-12 pt-6 border-t border-neutral-200 flex justify-between">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className={`flex items-center gap-2 font-bold px-6 py-2.5 rounded-full transition-colors ${currentStep === 0
                                        ? 'text-neutral-400 cursor-not-allowed'
                                        : 'text-neutral-700 hover:bg-neutral-100'
                                    }`}
                            >
                                <FiChevronLeft /> Ulangi Pilihan
                            </button>

                            {currentStep < steps.length - 1 && (
                                <button
                                    onClick={handleNext}
                                    disabled={!canGoNext()}
                                    className={`flex items-center gap-2 font-bold px-8 py-2.5 rounded-full transition-colors ${canGoNext()
                                            ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
                                            : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                                        }`}
                                >
                                    Lanjut <FiChevronRight />
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
