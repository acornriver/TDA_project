// TDA ligature logo (lowercase "tda," with underline).
// The t crossbar runs into the top of the d bowl, and the d stem doubles as the left wall of the a.
// Coordinates live in a 156 x 104 box (y offset 4) and are shared by the SVG mark and the beam renderer.

export type Pt = [number, number];

export const LOGO_VIEWBOX = '-4 0 162 106';
export const LOGO_W = 156;
export const LOGO_H = 104;

/** SVG path data for the mark (stroke-only, round caps). */
export const LOGO_PATHS = {
    t: 'M10 8V66Q10 82 26 82',
    bar: 'M0 34H62',
    dStem: 'M86 6V82',
    aStem: 'M134 34V82',
    comma: 'M152 74L147 90',
    underline: 'M0 101H86',
};
export const LOGO_CIRCLES = [
    { cx: 62, cy: 58, r: 24 },
    { cx: 110, cy: 58, r: 24 },
];

const arc = (cx: number, cy: number, r: number, startDeg: number, steps = 64): Pt[] =>
    Array.from({ length: steps + 1 }, (_, i) => {
        const a = ((startDeg + (i * 360) / steps) * Math.PI) / 180;
        return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    });

const quad = (p0: Pt, c: Pt, p1: Pt, steps = 10): Pt[] =>
    Array.from({ length: steps + 1 }, (_, i) => {
        const t = i / steps;
        const u = 1 - t;
        return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]];
    });

/** Stroke order for the beam: the bar flows straight into the d bowl. */
export const LOGO_STROKES: Pt[][] = [
    [[10, 8], [10, 66], ...quad([10, 66], [10, 82], [26, 82]).slice(1)],
    [[0, 34], [62, 34], ...arc(62, 58, 24, -90).slice(1)],
    [[86, 6], [86, 82]],
    arc(110, 58, 24, 180),
    [[134, 34], [134, 82]],
    [[152, 74], [147, 90]],
    [[0, 101], [86, 101]],
];
