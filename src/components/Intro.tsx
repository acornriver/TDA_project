import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Intro = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="py-32 px-4 md:px-12 bg-black text-white relative z-10 flex flex-col items-center text-center">
            <motion.div
                style={{ y }}
                className="max-w-4xl"
            >
                <h2 className="text-3xl md:text-5xl font-light leading-snug">
                    We are <span className="text-accent font-display uppercase font-bold">TDA</span>.
                    A collective of media artists pushing the boundaries of perception.
                </h2>

                <div className="mt-16 flex flex-col md:flex-row justify-center gap-12 font-mono text-sm tracking-widest uppercase">
                    {['Digital Installation', 'Generative Art', 'Audio Visual'].map((item, i) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="flex items-center gap-2"
                        >
                            <span className="w-2 h-2 bg-accent rounded-full inline-block" />
                            {item}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Intro;
