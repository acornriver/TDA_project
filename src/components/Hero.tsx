import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black text-white px-4">
            {/* Background noise or subtle gradient could be added here */}

            <div className="z-10 flex flex-col items-center">
                <motion.h1
                    className="font-display font-bold text-[18vw] leading-none tracking-tighter mix-blend-difference"
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    tda.
                </motion.h1>
                <div className="overflow-hidden mt-4">
                    <motion.p
                        className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-accent"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    >
                        Visualizing the Unseen
                    </motion.p>
                </div>
            </div>

            {/* Rotating Badge */}
            <motion.div
                className="absolute bottom-10 right-10 md:bottom-16 md:right-16"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/20 flex items-center justify-center animate-spin-slow">
                    <svg viewBox="0 0 100 100" className="w-full h-full absolute top-0 left-0">
                        <defs>
                            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                        </defs>
                        <text fontSize="10.5" fontWeight="bold" fill="white" letterSpacing="2">
                            <textPath href="#circlePath" startOffset="0%" textLength="230">
                                OFFICIAL PORTFOLIO • TDA COLLECTIVE •
                            </textPath>
                        </text>
                    </svg>
                    <div className="w-2 h-2 bg-accent rounded-full" />
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse" />
            </motion.div>
        </section>
    );
};

export default Hero;
