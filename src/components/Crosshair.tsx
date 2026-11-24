import { useEffect, useRef } from 'react';

/** Full-screen oscilloscope crosshair that follows the pointer (fine pointers only). */
const Crosshair = () => {
    const vRef = useRef<HTMLDivElement>(null);
    const hRef = useRef<HTMLDivElement>(null);
    const dRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let raf = 0;
        const onMove = (e: PointerEvent) => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                if (vRef.current) vRef.current.style.transform = `translateX(${e.clientX}px)`;
                if (hRef.current) hRef.current.style.transform = `translateY(${e.clientY}px)`;
                if (dRef.current) dRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            });
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
    }, []);

    return (
        <div aria-hidden="true" className="hidden [@media(pointer:fine)]:block fixed inset-0 z-[60] pointer-events-none">
            <div ref={vRef} className="absolute top-0 left-0 h-full w-px bg-accent/20" style={{ transform: 'translateX(-10px)' }} />
            <div ref={hRef} className="absolute top-0 left-0 w-full h-px bg-accent/20" style={{ transform: 'translateY(-10px)' }} />
            <div ref={dRef} className="absolute top-0 left-0 w-2 h-2 border border-accent shadow-[0_0_10px_rgba(184,255,198,0.9)]" style={{ transform: 'translate(-20px,-20px)' }} />
        </div>
    );
};

export default Crosshair;
