import Beam from './Beam';
import Reveal from './Reveal';
import SectionMark from './SectionMark';

const rows = [
    { word: 'CODE', line: '논리로 감각을 설계합니다.' },
    { word: 'SOUND', line: '보이지 않는 공기를 조각합니다.' },
    { word: 'BODY', line: '몸짓이 공간의 문장이 됩니다.' },
    { word: 'SPACE', line: '관객이 선 자리까지 작품입니다.' },
];

const Method = () => (
    <section data-ch="02" data-label="Method" className="relative px-6 md:px-9 py-28 md:py-44">
        <SectionMark ch="02" label="Method" meta="One pair of hands" />

        <Reveal className="max-w-4xl mb-16 md:mb-24">
            <p className="font-sans font-light text-2xl md:text-4xl leading-snug text-white break-keep">
                우리는 직능으로 사람을 나누지 않습니다.
                <span className="text-white/50"> 한 사람의 손이 아래의 모든 일을 합니다.</span>
            </p>
        </Reveal>

        <div className="space-y-6 md:space-y-2">
            {rows.map((r, i) => (
                <div key={r.word} className="relative border-t border-white/10">
                    <div className="flex justify-between items-center pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
                        <span>02.{i + 1}</span>
                        <span className="text-white/80 normal-case tracking-normal font-sans font-light text-sm md:text-lg">{r.line}</span>
                    </div>
                    <div className="-mx-2 md:-mx-4">
                        <Beam text={r.word} duration={1.2} intensity={0.9 + i * 0.12} />
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default Method;
