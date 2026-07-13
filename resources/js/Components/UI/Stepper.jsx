import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

export default function Stepper({ steps, currentStep, onStepClick }) {
    return (
        <div className="w-full max-w-3xl mx-auto mb-12">
            <div className="flex justify-between items-center relative">
                {/* Connecting Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-neutral-200 z-0 rounded-full"></div>
                
                <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-600 z-0 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, idx) => {
                    const isCompleted = currentStep > idx;
                    const isActive = currentStep === idx;
                    const isClickable = true; // Based on Order.md: "user boleh bebas klik mundur/maju"

                    return (
                        <div key={idx} className="relative z-10 flex flex-col items-center group">
                            <button
                                onClick={() => isClickable && onStepClick(idx)}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 border-4 ${
                                    isActive 
                                        ? 'bg-primary-600 text-white border-primary-200 scale-110 shadow-lg' 
                                        : isCompleted
                                            ? 'bg-primary-500 text-white border-white'
                                            : 'bg-white text-neutral-400 border-neutral-200 hover:border-primary-300'
                                }`}
                            >
                                {isCompleted ? <FiCheck className="w-5 h-5 sm:w-6 sm:h-6" /> : idx + 1}
                            </button>
                            <span 
                                className={`absolute -bottom-8 whitespace-nowrap text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                                    isActive ? 'text-primary-700' : isCompleted ? 'text-neutral-700' : 'text-neutral-400'
                                }`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
