import { useEffect, useRef, useState } from 'react';
import { pad, useCountdown } from '../lib/deadline';
import Logo from './Logo';

const Corner = ({ pos }: { pos: string }) => (
    <span aria-hidden="true" className={`absolute w-4 h-4 border-accent/50 ${pos}`} />
);

const Hud = () => {
    const [ch, setCh] = useState({ ch: '00', label: 'Signal' });
    const xy = useRef<HTMLSpanElement>(null);
    const { d, h, m, s } = useCountdown();

    useEffect(() => {
        const els = Array.from(document.querySelectorAll<HTMLElement>('[data-ch]'));
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        const el = e.target as HTMLElement;
                        setCh({ ch: el.dataset.ch ?? '00', label: el.dataset.label ?? '' });
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px' }
        );
        els.forEach((el) => io.observe(el));

        let raf = 0;
        const onMove = (e: PointerEvent) => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                if (xy.current) xy.current.textContent = `X ${pad(Math.round(e.clientX), 4)}  Y ${pad(Math.round(e.clientY), 4)}`;
            });
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            io.disconnect();
            window.removeEventListener('pointermove', onMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-40 pointer-events-none font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-dim">
            <div className="absolute inset-3 md:inset-4">
                <Corner pos="top-0 left-0 border-t border-l" />
                <Corner pos="top-0 right-0 border-t border-r" />
                <Corner pos="bottom-0 left-0 border-b border-l" />
                <Corner pos="bottom-0 right-0 border-b border-r" />
            </div>

            <div className="absolute top-0 inset-x-0 px-6 md:px-9 pt-5 md:pt-6 flex items-center justify-between">
                <a href="#top" className="pointer-events-auto text-accent" aria-label="TDA, 맨 위로">
                    <Logo className="h-6 md:h-7 w-auto" strokeWidth={8} />
                </a>
                <span className="hidden sm:block">
                    <span className="text-accent">CH {ch.ch}</span>
                    <span className="mx-3 text-white/20">/</span>
                    {ch.label}
                </span>
                <a href="#apply" className="pointer-events-auto border border-accent/60 text-accent px-3 py-1.5 hover:bg-accent hover:text-black transition-colors">
                    Apply →
                </a>
            </div>

            <div className="absolute bottom-0 inset-x-0 px-6 md:px-9 pb-5 md:pb-6 flex items-center justify-between">
                <span ref={xy} className="hidden [@media(pointer:fine)]:inline">X 0000  Y 0000</span>
                <span className="[@media(pointer:fine)]:hidden">CH {ch.ch}</span>
                <span className="hidden md:inline">Media art collective · Seoul</span>
                <span>
                    T−<span className="text-accent">{d}</span>D {pad(h)}:{pad(m)}:{pad(s)}
                </span>
            </div>
        </div>
    );
};

export default Hud;
