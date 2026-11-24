import { motion } from 'framer-motion';
import Beam from './Beam';
import { LOGO_H, LOGO_STROKES, LOGO_W } from '../lib/logo';

const LOGO_SHAPE = { strokes: LOGO_STROKES, w: LOGO_W, h: LOGO_H };

const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay, duration: 1.2 },
});

const Hero = () => (
    <section id="top" data-ch="00" data-label="Signal" className="relative min-h-[100svh] flex flex-col justify-between px-6 md:px-9 pt-24 md:pt-28 pb-20 md:pb-24">
        <motion.div {...fade(0.4)} className="grid grid-cols-2 md:grid-cols-4 gap-y-2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-dim">
            <span>Transmission / 2026</span>
            <span className="text-right md:text-left">Seoul · 37.56N</span>
            <span className="hidden md:block">Media art collective</span>
            <span className="hidden md:block text-right text-accent">● Open call</span>
        </motion.div>

        <div className="w-full sm:w-[78%] md:w-[min(56%,92vh)] -ml-2 md:-ml-4">
            <Beam as="h1" text="TDA" shape={LOGO_SHAPE} duration={2.8} intensity={1.35} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <motion.p {...fade(2.4)} className="md:col-span-7 font-sans font-light text-3xl md:text-5xl leading-[1.15] text-white break-keep">
                보이지 않는 것을,<br />신호로 옮깁니다.
            </motion.p>
            <motion.div {...fade(2.8)} className="md:col-span-5 md:text-right font-mono text-[11px] uppercase tracking-[0.22em] text-dim space-y-1">
                <p className="text-white/80">Visualizing the unseen</p>
                <p>Scroll to tune ↓</p>
            </motion.div>
        </div>
    </section>
);

export default Hero;
