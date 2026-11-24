import { useEffect, useMemo, useRef } from 'react';
import { strokesToPoints, textToPoints } from '../lib/beamFont';
import type { Pt } from '../lib/logo';

type Props = {
    text: string;
    className?: string;
    /** seconds to write the whole word */
    duration?: number;
    /** 1 = default; raises jitter, dot density and glitch */
    intensity?: number;
    as?: 'h1' | 'h2' | 'p';
    /** Draw these polylines instead of text (box w x h units). `text` stays as the accessible label. */
    shape?: { strokes: Pt[][]; w: number; h: number };
};

const PH = '184, 255, 198';
const PAD_X = 4;
const PAD_Y = 8;
const STEP = 0.6;

const Beam = ({ text, className = '', duration = 1.8, intensity = 1, as: Tag = 'h2', shape }: Props) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { pts, width, height } = useMemo(() => {
        if (shape) return { pts: strokesToPoints(shape.strokes, STEP), width: shape.w, height: shape.h };
        const t = textToPoints(text, STEP);
        return { ...t, height: 60 };
    }, [text, shape]);

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!wrap || !canvas || !ctx || pts.length === 0) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const N = pts.length;
        let W = 0, H = 0, scale = 1, dot = 2;
        let drawn = reduced ? N : 0;
        let sweep = 0;
        let visible = false;
        let raf = 0;
        let last = 0;
        let mx = -1e5, my = -1e5;
        let glitchUntil = 0, nextGlitch = performance.now() + 1500 + Math.random() * 3000;
        let gy0 = 0, gy1 = 0, gdx = 0;

        const px = (i: number) => PAD_X * scale + pts[i].x * scale;
        const py = (i: number) => PAD_Y * scale + pts[i].y * scale;

        const layout = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = wrap.clientWidth;
            H = wrap.clientHeight;
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            scale = W / (width + PAD_X * 2);
            dot = Math.min(3.6, Math.max(1.3, scale * 0.6));
            if (reduced) drawStatic();
        };

        const drawStatic = () => {
            ctx.clearRect(0, 0, W, H);
            ctx.strokeStyle = `rgb(${PH})`;
            ctx.lineWidth = dot;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (let i = 0; i < N; i++) {
                if (i === 0 || pts[i - 1].s !== pts[i].s) ctx.moveTo(px(i), py(i));
                else ctx.lineTo(px(i), py(i));
            }
            ctx.stroke();
        };

        const place = (i: number, jit: number, t: number): [number, number] => {
            let x = px(i) + (Math.random() - 0.5) * jit;
            let y = py(i) + (Math.random() - 0.5) * jit;
            // magnetic deflection around the pointer
            const dx = x - mx, dy = y - my;
            const R = scale * 30;
            const d2 = dx * dx + dy * dy;
            if (d2 < R * R * 9) {
                const d = Math.sqrt(d2) + 0.001;
                const f = (R * R) / (d2 + R * R);
                x += (dx / d) * f * R * 0.7;
                y += (dy / d) * f * R * 0.7;
            }
            if (t < glitchUntil && y > gy0 && y < gy1) x += gdx;
            return [x, y];
        };

        const frame = (t: number) => {
            const dt = last ? Math.min(0.25, (t - last) / 1000) : 1 / 60;
            last = t;
            if (drawn < N) drawn = Math.min(N, drawn + (N / duration) * dt);
            const n = Math.floor(drawn);

            // phosphor decay on a transparent canvas
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0,0,0,0.22)';
            ctx.fillRect(0, 0, W, H);
            ctx.globalCompositeOperation = 'lighter';

            if (t > nextGlitch) {
                glitchUntil = t + 70 + Math.random() * 140;
                gy0 = Math.random() * H;
                gy1 = gy0 + H * (0.04 + Math.random() * 0.22);
                gdx = (Math.random() - 0.5) * scale * 16 * intensity;
                nextGlitch = t + 1800 + Math.random() * 4200;
            }

            const jit = dot * 0.9 * intensity;

            // faint trace
            ctx.strokeStyle = `rgba(${PH}, 0.07)`;
            ctx.lineWidth = Math.max(1, dot * 0.5);
            ctx.beginPath();
            for (let i = 0; i < n; i++) {
                if (i === 0 || pts[i - 1].s !== pts[i].s) ctx.moveTo(px(i), py(i));
                else ctx.lineTo(px(i), py(i));
            }
            ctx.stroke();

            // phosphor dots
            if (n > 0) {
                const K = Math.min(6000, Math.floor(N * 0.45 * intensity));
                ctx.fillStyle = `rgba(${PH}, 0.5)`;
                for (let k = 0; k < K; k++) {
                    const [x, y] = place((Math.random() * n) | 0, jit, t);
                    ctx.fillRect(x - dot / 2, y - dot / 2, dot, dot);
                }
            }

            // beam head: writing, then endless re-trace
            let head: number;
            if (n < N) head = n;
            else {
                sweep = (sweep + (N / 2.6) * dt) % N;
                head = Math.floor(sweep);
            }
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            for (let j = 0; j < 22; j++) {
                const i = head - j;
                if (i < 0 || i >= n + 1 || i >= N) continue;
                const [x, y] = place(i, jit * 0.3, t);
                const s = dot * (1.6 - j * 0.05);
                ctx.fillRect(x - s / 2, y - s / 2, s, s);
            }

            if (visible) raf = requestAnimationFrame(frame);
        };

        const onMove = (e: PointerEvent) => {
            const r = canvas.getBoundingClientRect();
            mx = e.clientX - r.left;
            my = e.clientY - r.top;
        };
        const onLeave = () => { mx = my = -1e5; };

        const ro = new ResizeObserver(layout);
        ro.observe(wrap);
        layout();

        const io = new IntersectionObserver(([entry]) => {
            if (reduced) return;
            if (entry.isIntersecting && !visible) {
                visible = true;
                drawn = 0;
                last = 0;
                raf = requestAnimationFrame(frame);
            } else if (!entry.isIntersecting && visible) {
                visible = false;
                cancelAnimationFrame(raf);
            }
        }, { threshold: 0.15 });
        io.observe(wrap);

        if (!reduced) {
            window.addEventListener('pointermove', onMove, { passive: true });
            document.addEventListener('pointerleave', onLeave);
        }

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerleave', onLeave);
        };
    }, [pts, width, duration, intensity]);

    return (
        <div
            ref={wrapRef}
            className={`relative w-full ${className}`}
            style={{ aspectRatio: `${width + PAD_X * 2} / ${height + PAD_Y * 2}` }}
        >
            <Tag className="sr-only">{text}</Tag>
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />
        </div>
    );
};

export default Beam;
