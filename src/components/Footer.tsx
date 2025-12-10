const Footer = () => {
    return (
        <footer className="bg-black text-white py-20 px-4 md:px-12 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div>
                    <h2 className="font-display text-[10vw] leading-none text-accent">TDA.</h2>
                </div>

                <div className="flex flex-col gap-4 font-mono text-sm uppercase tracking-wider text-right w-full md:w-auto">
                    <a href="#" className="hover:text-accent transition-colors">Instagram</a>
                    <a href="#" className="hover:text-accent transition-colors">Twitter</a>
                    <a href="#" className="hover:text-accent transition-colors">hello@tda.art</a>
                </div>
            </div>

            <div className="flex justify-between items-center mt-20 text-xs font-mono text-gray-600 uppercase">
                <span>© {new Date().getFullYear()} TDA Collective</span>
                <span>Designed by TDA</span>
            </div>
        </footer>
    );
};

export default Footer;
