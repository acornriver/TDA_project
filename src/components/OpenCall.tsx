import Beam from './Beam';
import Reveal from './Reveal';
import SectionMark from './SectionMark';
import { useCountdown } from '../lib/deadline';

const OpenCall = () => {
    const { d } = useCountdown();

    const specs = [
        { key: 'Target', ko: '대상', value: '제한 없음', note: '전공, 경력, 나이를 묻지 않습니다. 매체를 넘나들려는 의지와, 한 작업을 끝까지 밀고 가는 끈기를 봅니다.' },
        { key: 'Submit', ko: '제출', value: '포트폴리오 · 자기소개', note: '형식과 분량은 자유입니다.' },
        { key: 'Deadline', ko: '마감', value: '2026.12.31', note: `마감까지 ${d}일 남았습니다.` },
        { key: 'Process', ko: '절차', value: '서류 검토 → 개별 연락', note: '검토를 마치는 대로 한 분씩 연락드립니다.' },
    ];

    return (
        <section data-ch="04" data-label="Open call" className="relative px-6 md:px-9 py-28 md:py-44">
            <SectionMark ch="04" label="Open call" meta="2026" />

            <div className="-mx-2 md:-mx-4">
                <Beam text="OPEN CALL" intensity={1.15} />
            </div>

            <Reveal className="mt-12 md:mt-20 mb-16 md:mb-24">
                <p className="font-sans font-light text-5xl md:text-8xl leading-none text-white">동료를 찾습니다.</p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-accent/20">
                {specs.map((s, i) => (
                    <Reveal key={s.key} delay={i * 0.08} className="border-r border-b border-accent/20 p-6 md:p-10 min-h-[220px] md:min-h-[280px] flex flex-col justify-between gap-8 hover:bg-accent/[0.035] transition-colors">
                        <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
                            <span><span className="text-accent">04.{i + 1}</span> &nbsp;{s.key}</span>
                            <span>{s.ko}</span>
                        </div>
                        <div className="space-y-3">
                            <p className="font-sans font-light text-3xl md:text-5xl text-white leading-tight break-keep">{s.value}</p>
                            <p className="font-sans font-light text-sm md:text-base text-white/55 leading-relaxed break-keep max-w-md">{s.note}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
};

export default OpenCall;
