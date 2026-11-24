import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionMark from './SectionMark';

const Artist = () => (
    <section data-ch="03" data-label="Founder" className="relative px-6 md:px-9 py-24 md:py-32">
        <SectionMark ch="03" label="Founder" />

        <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-baseline">
            <p className="md:col-span-4 font-sans font-light text-4xl md:text-6xl leading-none text-accent">
                강민혁
                <span className="block mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-dim">Acornriver</span>
            </p>
            <p className="md:col-span-6 font-sans font-light text-xl md:text-3xl leading-snug text-white break-keep">
                소리와 이미지, 코드와 신체 사이에서 작업하는 미디어 아티스트. TDA를 이끌고 있습니다.
            </p>
            <a
                href="https://acornriver.work"
                target="_blank"
                rel="noopener noreferrer"
                className="md:col-span-2 md:justify-self-end whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-dim hover:text-accent transition-colors"
            >
                acornriver.work <ArrowUpRight className="inline w-3 h-3 -mt-0.5" strokeWidth={1.5} />
            </a>
        </Reveal>
    </section>
);

export default Artist;
