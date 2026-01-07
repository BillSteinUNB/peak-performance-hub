import React, { useRef, useEffect, useContext } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { AppContext } from '../App';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setCurrentView } = useContext(AppContext);

  // Canvas Particle Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const particleCount = width < 768 ? 50 : 120;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.2, // Drift up
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw Gradient Background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0A0A0A');
      gradient.addColorStop(1, '#111');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and Draw Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-slide-up">
          <span className="text-[#FF4D00] font-mono text-sm tracking-[0.2em] font-bold">
            CANADA'S #1 FITNESS DESTINATION
          </span>
          
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-white">
            FUEL YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FFB800]">PEAK</span> <br />
            PERFORMANCE
          </h1>

          <p className="text-[#A3A3A3] text-lg max-w-md font-body leading-relaxed">
            Premium supplements shipped nationwide + 24/7 elite gym access in Ontario. Elevate your training today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => setCurrentView('shop')}>
              SHOP NOW <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => setCurrentView('gym')}>
              JOIN THE GYM
            </Button>
          </div>

          <div className="pt-8 flex gap-8 border-t border-[#262626]">
            <div>
              <p className="font-mono text-2xl font-bold text-white">500+</p>
              <p className="text-xs text-[#525252] uppercase tracking-wider">Products</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-white">24/7</p>
              <p className="text-xs text-[#525252] uppercase tracking-wider">Gym Access</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-white">4.9★</p>
              <p className="text-xs text-[#525252] uppercase tracking-wider">Reviews</p>
            </div>
          </div>
        </div>

        {/* Hero Image / 3D Placeholder */}
        <div className="relative hidden md:flex justify-center items-center animate-fade-in delay-200">
           <div className="relative z-10 w-[80%] aspect-square rounded-full bg-[#FF4D00]/10 filter blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
           <img 
            src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=800" 
            alt="Premium Whey Protein" 
            className="relative z-20 w-3/4 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500 ease-out"
           />
           {/* Floating Badge */}
           <div className="absolute top-1/4 right-10 bg-[#141414]/90 backdrop-blur border border-[#262626] p-4 rounded-lg shadow-xl animate-bounce-slow">
             <div className="flex items-center gap-2 mb-1">
               <span className="w-2 h-2 rounded-full bg-[#00D4AA]"></span>
               <span className="text-[#00D4AA] text-xs font-bold tracking-wider">BEST SELLER</span>
             </div>
             <p className="text-white font-bold text-sm">Gold Standard Whey</p>
             <p className="text-[#A3A3A3] text-xs">24g Protein / Serving</p>
           </div>
        </div>
      </div>
    </section>
  );
};