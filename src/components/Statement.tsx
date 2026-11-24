import Beam from './Beam';
import Reveal from './Reveal';
import SectionMark from './SectionMark';

const Statement = () => (
    <section data-ch="01" data-label="Statement" className="relative px-6 md:px-9 py-28 md:py-44">
        <SectionMark ch="01" label="Statement" meta="Who we are" />

        <div className="-mx-2 md:-mx-4">
            <Beam text="STAND OUT." intensity={1.1} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-12 md:mt-20">
            <Reveal className="md:col-span-3 font-mono text-[11px] uppercase tracking-[0.22em] text-dim space-y-2">
                <p className="text-accent">눈에 띄다.</p>
                <p>Media art · Interaction · Sound performance</p>
            </Reveal>

            <div className="md:col-span-9 space-y-10">
                <Reveal>
                    <p className="font-sans font-light text-3xl md:text-6xl leading-[1.12] text-white break-keep">
                        TDA는 서울에서 활동하는<br className="hidden md:block" /> 미디어 아트 콜렉티브입니다.
                    </p>
                </Reveal>
                <Reveal delay={0.15}>
                    <p className="font-sans font-light text-lg md:text-2xl leading-relaxed text-white/60 break-keep max-w-3xl">
                        가장 앞선 기술로 가장 오래된 감각을 건드립니다.
                        화면과 스피커, 무대와 몸 사이 어딘가에서 작업이 시작되고,
                        관객이 선 자리에서 비로소 완성됩니다.
                    </p>
                </Reveal>
            </div>
        </div>
    </section>
);

export default Statement;
