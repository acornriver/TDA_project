import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <motion.nav
            className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
        >
            <a href="#" className="font-display font-bold text-xl md:text-2xl pointer-events-auto">TDA.</a>

            <button className="font-mono text-xs md:text-sm uppercase tracking-widest pointer-events-auto hover:text-accent transition-colors">
                Menu
            </button>
        </motion.nav>
    );
};

export default Navbar;
