import { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black min-h-screen w-full overflow-x-hidden selection:bg-accent selection:text-black">
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <Intro />
        <Portfolio />
      </main>

      <Footer />
    </div>
  );
}

export default App;
