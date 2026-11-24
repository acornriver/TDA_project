import { useEffect, useState } from 'react';

export const DEADLINE = new Date('2026-12-31T23:59:59+09:00');

export const pad = (n: number, len = 2) => String(n).padStart(len, '0');

export function remaining(now = Date.now()) {
    const ms = Math.max(0, DEADLINE.getTime() - now);
    return {
        ms,
        d: Math.floor(ms / 864e5),
        h: Math.floor(ms / 36e5) % 24,
        m: Math.floor(ms / 6e4) % 60,
        s: Math.floor(ms / 1e3) % 60,
    };
}

export function useCountdown() {
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const id = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(id);
    }, []);
    return remaining(now);
}
