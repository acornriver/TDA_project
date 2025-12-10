import { motion } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: "Neural Echoes",
        category: "Generative AV",
        image: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1000&auto=format&fit=crop",
        size: "h-[400px] md:h-[600px]"
    },
    {
        id: 2,
        title: "Void Structure",
        category: "Installation",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
        size: "h-[300px] md:h-[500px]"
    },
    {
        id: 3,
        title: "Silent Frequency",
        category: "Live Performance",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
        size: "h-[500px] md:h-[700px]"
    },
    {
        id: 4,
        title: "Data Rain",
        category: "Projection Mapping",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        size: "h-[350px] md:h-[550px]"
    }
];

const Portfolio = () => {
    return (
        <section className="bg-black text-white py-20 px-4 md:px-12">
            <div className="mb-20">
                <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4">( Selected Works )</h3>
                <div className="w-full h-[1px] bg-white/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className={`relative group ${index % 2 === 1 ? 'md:mt-32' : ''}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={`w-full ${project.size} overflow-hidden bg-gray-900`}>
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
                        </div>

                        <div className="mt-6 flex justify-between items-end">
                            <div>
                                <h4 className="font-display text-4xl uppercase leading-none mb-1">{project.title}</h4>
                                <p className="font-mono text-xs text-gray-400 uppercase tracking-wider">{project.category}</p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 11L11 1M11 1H2M11 1V10" stroke="white" strokeWidth="1.5" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
