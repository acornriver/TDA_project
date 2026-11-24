import { ArrowUpRight } from 'lucide-react';
import Beam from './Beam';
import Reveal from './Reveal';
import SectionMark from './SectionMark';
import { pad, useCountdown } from '../lib/deadline';

const EMAIL = 'minhyuk@acornriver.work';
const SUBJECT = '[TDA Open Call] 이름';
const BODY = '이름:\n연락처:\n\n포트폴리오와 자기소개를 첨부해 주십시오.\n';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

const Apply = () => {
    const { d, h, m, s } = useCountdown();

    return (
        <section id="apply" data-ch="05" data-label="Apply" className="relative px-6 md:px-9 pt-28 md:pt-44 pb-24">
            <SectionMark ch="05" label="Apply" meta="Until 31 Dec 2026" />

            <div className="-mx-2 md:-mx-4">
                <Beam text="APPLY" intensity={1.4} duration={1.4} />
            </div>

            <Reveal className="mt-12 md:mt-16 space-y-10">
                <p className="font-sans font-light text-xl md:text-3xl text-white/70 break-keep">
                    포트폴리오와 자기소개를 아래 주소로 보내주십시오.
                </p>
                <a
                    href={MAILTO}
                    className="group flex items-center justify-between gap-4 border-y border-accent/40 py-6 md:py-10 font-mono text-[6.4vw] md:text-[4.6vw] leading-none text-accent hover:bg-accent hover:text-black transition-colors duration-300 -mx-6 md:-mx-9 px-6 md:px-9"
                >
                    <span className="break-all">{EMAIL}</span>
                    <ArrowUpRight className="shrink-0 w-[6vw] h-[6vw] md:w-[4vw] md:h-[4vw] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1} />
                </a>
                <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] text-dim">
                    Signal closes in <span className="text-accent">{d}D {pad(h)}:{pad(m)}:{pad(s)}</span>
                </p>
            </Reveal>

            <footer className="mt-40 md:mt-56 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4 justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-dim">
                <span className="text-accent">— End of signal</span>
                <a href="https://www.instagram.com/tda.official__/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a>
                <span>© 2026 TDA</span>
            </footer>
        </section>
    );
};

export default Apply;
