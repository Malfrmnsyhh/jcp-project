import { useEffect, useRef } from 'react';

/**
 * Panggil `handler` saat klik terjadi di luar semua elemen pada `refs`.
 *
 * Listener hanya terpasang saat `enabled` true. `refs` dan `handler` disalin ke
 * ref lewat effect (bukan saat render) supaya listener tidak dipasang ulang tiap
 * render meski pemanggil mengoper array literal dan arrow function.
 *
 * @param {object|object[]} refs Satu ref atau array ref elemen "bagian dalam"
 * @param {(event: MouseEvent) => void} handler
 * @param {boolean} enabled
 */
export default function useClickOutside(refs, handler, enabled = true) {
    const latestRefs = useRef(null);
    const latestHandler = useRef(null);

    // Tanpa dependency array: menyegarkan nilai terbaru setiap selesai render.
    useEffect(() => {
        latestRefs.current = refs;
        latestHandler.current = handler;
    });

    useEffect(() => {
        if (!enabled) return;

        const onPointerDown = (event) => {
            const current = latestRefs.current;
            if (!current) return;

            const refList = Array.isArray(current) ? current : [current];

            const clickedInside = refList.some(
                (ref) => ref.current && ref.current.contains(event.target),
            );

            if (!clickedInside) latestHandler.current?.(event);
        };

        document.addEventListener('mousedown', onPointerDown);

        return () => document.removeEventListener('mousedown', onPointerDown);
    }, [enabled]);
}
