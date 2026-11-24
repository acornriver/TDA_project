import { LOGO_CIRCLES, LOGO_PATHS, LOGO_VIEWBOX } from '../lib/logo';

type Props = { className?: string; strokeWidth?: number; title?: string };

/** TDA ligature mark. Colour follows `currentColor`. */
const Logo = ({ className = '', strokeWidth = 5, title = 'TDA' }: Props) => (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label={title}>
        <g fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d={LOGO_PATHS.t} />
            <path d={LOGO_PATHS.bar} />
            {LOGO_CIRCLES.map((c) => (
                <circle key={c.cx} cx={c.cx} cy={c.cy} r={c.r} />
            ))}
            <path d={LOGO_PATHS.dStem} />
            <path d={LOGO_PATHS.aStem} />
            <path d={LOGO_PATHS.comma} />
            <path d={LOGO_PATHS.underline} strokeWidth={strokeWidth * 0.26} />
        </g>
    </svg>
);

export default Logo;
