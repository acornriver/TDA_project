import { useEffect } from 'react';
import Lenis from 'lenis';
import Hud from './components/Hud';
import Crosshair from './components/Crosshair';
import Hero from './components/Hero';
import Statement from './components/Statement';
import Method from './components/Method';
import Artist from './components/Artist';
import OpenCall from './components/OpenCall';
import Apply from './components/Apply';

function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen w-full overflow-x-hidden">
      {/* screen: graticule, scanlines, vignette */}
      <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none graticule" />
      <div aria-hidden="true" className="fixed inset-0 z-50 pointer-events-none scanlines" />
      <div aria-hidden="true" className="fixed inset-0 z-50 pointer-events-none vignette" />

      <Crosshair />
      <Hud />

      <main className="relative z-10">
        <Hero />
        <Statement />
        <Method />
        <Artist />
        <OpenCall />
        <Apply />
      </main>
    </div>
  );
}

export default App;
