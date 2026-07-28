/**
 * Varian framer-motion yang dipakai bersama oleh section landing page,
 * supaya ritme animasi antar-section konsisten dan tidak diduplikasi.
 */

export const staggerContainer = (staggerChildren = 0.15, delayChildren = 0) => ({
    hidden: {},
    visible: {
        transition: { staggerChildren, delayChildren },
    },
});

export const fadeInUp = (duration = 0.5, distance = 30) => ({
    hidden: { opacity: 0, y: distance },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: 'easeOut' },
    },
});

/** Viewport default: animasi berjalan sekali saat section masuk layar. */
export const viewportOnce = { once: true, margin: '-50px' };
