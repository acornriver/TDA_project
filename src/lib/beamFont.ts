// Single-stroke vector font for the beam titles.
// Each glyph lives on a 40 x 60 grid and is a list of strokes (polylines).
type Pt = [number, number];
type Glyph = Pt[][];

const O: Glyph = [[[20, 0], [34, 4], [40, 18], [40, 42], [34, 56], [20, 60], [6, 56], [0, 42], [0, 18], [6, 4], [20, 0]]];

export const GLYPHS: Record<string, Glyph> = {
    A: [[[0, 60], [20, 0], [40, 60]], [[8, 36], [32, 36]]],
    B: [[[0, 30], [26, 30], [36, 22], [36, 8], [26, 0], [0, 0], [0, 60], [28, 60], [40, 52], [40, 38], [28, 30]]],
    C: [[[40, 8], [30, 0], [10, 0], [0, 12], [0, 48], [10, 60], [30, 60], [40, 52]]],
    D: [[[0, 0], [0, 60], [22, 60], [38, 48], [40, 30], [38, 12], [22, 0], [0, 0]]],
    E: [[[40, 0], [0, 0], [0, 60], [40, 60]], [[0, 30], [30, 30]]],
    F: [[[40, 0], [0, 0], [0, 60]], [[0, 30], [30, 30]]],
    G: [[[40, 8], [30, 0], [10, 0], [0, 12], [0, 48], [10, 60], [30, 60], [40, 50], [40, 34], [22, 34]]],
    H: [[[0, 0], [0, 60]], [[40, 0], [40, 60]], [[0, 30], [40, 30]]],
    I: [[[20, 0], [20, 60]]],
    J: [[[40, 0], [40, 45], [32, 58], [20, 60], [8, 58], [0, 48]]],
    K: [[[0, 0], [0, 60]], [[40, 0], [0, 36]], [[14, 24], [40, 60]]],
    L: [[[0, 0], [0, 60], [40, 60]]],
    M: [[[0, 60], [0, 0], [20, 34], [40, 0], [40, 60]]],
    N: [[[0, 60], [0, 0], [40, 60], [40, 0]]],
    O,
    P: [[[0, 60], [0, 0], [30, 0], [40, 8], [40, 22], [30, 30], [0, 30]]],
    R: [[[0, 60], [0, 0], [30, 0], [40, 8], [40, 22], [30, 30], [0, 30]], [[16, 30], [40, 60]]],
    S: [[[40, 8], [30, 0], [10, 0], [0, 8], [0, 22], [10, 30], [30, 30], [40, 38], [40, 52], [30, 60], [10, 60], [0, 52]]],
    T: [[[0, 0], [40, 0]], [[20, 0], [20, 60]]],
    U: [[[0, 0], [0, 48], [8, 58], [20, 60], [32, 58], [40, 48], [40, 0]]],
    V: [[[0, 0], [20, 60], [40, 0]]],
    W: [[[0, 0], [10, 60], [20, 24], [30, 60], [40, 0]]],
    X: [[[0, 0], [40, 60]], [[40, 0], [0, 60]]],
    Y: [[[0, 0], [20, 30], [40, 0]], [[20, 30], [20, 60]]],
    Z: [[[0, 0], [40, 0], [0, 60], [40, 60]]],
    '0': O,
    '1': [[[10, 10], [22, 0], [22, 60]], [[8, 60], [36, 60]]],
    '2': [[[0, 10], [8, 2], [20, 0], [32, 2], [40, 12], [38, 24], [0, 60], [40, 60]]],
    '6': [[[36, 4], [24, 0], [10, 2], [2, 14], [0, 40], [4, 54], [18, 60], [32, 56], [40, 44], [36, 32], [22, 28], [8, 32], [0, 40]]],
    '.': [[[17, 54], [23, 54], [23, 60], [17, 60], [17, 54]]],
    '-': [[[8, 32], [32, 32]]],
    '_': [[[0, 60], [40, 60]]],
    ' ': [],
};

const ADVANCE = 54;
const SPACE = 30;

export type BeamPoint = { x: number; y: number; s: number }; // s = stroke id

/** Turn text into evenly spaced beam points in glyph units. Returns width in glyph units. */
export function textToPoints(text: string, step = 1): { pts: BeamPoint[]; width: number } {
    const pts: BeamPoint[] = [];
    let x = 0;
    let stroke = 0;
    for (const ch of text.toUpperCase()) {
        const g = GLYPHS[ch] ?? [];
        for (const seg of g) {
            for (let i = 0; i < seg.length - 1; i++) {
                const [ax, ay] = seg[i];
                const [bx, by] = seg[i + 1];
                const n = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / step));
                for (let k = 0; k < n; k++) {
                    pts.push({ x: x + ax + ((bx - ax) * k) / n, y: ay + ((by - ay) * k) / n, s: stroke });
                }
            }
            const last = seg[seg.length - 1];
            pts.push({ x: x + last[0], y: last[1], s: stroke });
            stroke++;
        }
        x += ch === ' ' ? SPACE : ADVANCE;
    }
    return { pts, width: Math.max(0, x - (ADVANCE - 40)) };
}

/** Sample arbitrary polylines (e.g. the logo) into beam points. */
export function strokesToPoints(strokes: Pt[][], step = 1): BeamPoint[] {
    const pts: BeamPoint[] = [];
    strokes.forEach((seg, stroke) => {
        for (let i = 0; i < seg.length - 1; i++) {
            const [ax, ay] = seg[i];
            const [bx, by] = seg[i + 1];
            const n = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / step));
            for (let k = 0; k < n; k++) pts.push({ x: ax + ((bx - ax) * k) / n, y: ay + ((by - ay) * k) / n, s: stroke });
        }
        const last = seg[seg.length - 1];
        pts.push({ x: last[0], y: last[1], s: stroke });
    });
    return pts;
}
