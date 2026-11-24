type Props = { ch: string; label: string; meta?: string };

const SectionMark = ({ ch, label, meta }: Props) => (
    <div className="flex items-end justify-between border-t border-accent/25 pt-4 mb-10 md:mb-14 font-mono uppercase">
        <div className="flex items-baseline gap-4">
            <span className="text-accent text-4xl md:text-6xl leading-none tracking-tight">{ch}</span>
            <span className="text-[11px] tracking-[0.25em] text-dim">{label}</span>
        </div>
        {meta && <span className="hidden sm:block text-[11px] tracking-[0.25em] text-dim">{meta}</span>}
    </div>
);

export default SectionMark;
