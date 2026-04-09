import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[min(100vh,800px)] pt-32 pb-8 flex flex-col items-center justify-center px-4 sm:px-6 bg-[#050505] overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none opacity-80"></div>

      {/* Premium Spotlight Effect */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-white/5 blur-[150px] rounded-[100%] pointer-events-none z-0"></div>

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none vignette-overlay opacity-90 z-0"></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center animate-fade-in-up mt-8 sm:mt-16 pb-10">

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tight leading-[1.1] mb-6 sm:mb-8 z-10 text-white">
          Recall anything in
          <br />
          <span className="text-white/70">Seconds</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed z-10 px-4 sm:px-0 font-light">
          The coding cheat-sheet and documentation platform designed for developers who build fast.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6 sm:px-0 sm:w-auto z-10">
          <Link 
            to="/dashboard" 
            className="w-full sm:w-auto px-10 py-3.5 bg-white text-black font-bold rounded-lg hover:bg-gray-100 active:scale-[0.98] transition-all duration-300 text-center shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            Dashboard
          </Link>
          <Link 
            to="/dashboard" 
            state={{ tab: 'docs' }} 
            className="w-full sm:w-auto px-10 py-3.5 bg-[#121212] border border-white/10 text-white font-bold rounded-lg hover:bg-[#1a1a1a] hover:border-white/20 active:scale-[0.98] transition-all duration-300 text-center"
          >
            View Documentation
          </Link>
        </div>
      </div>

      {/* Tech Stack Ticker */}
      <div className="relative z-10 mt-16 sm:mt-auto pt-8 w-full max-w-5xl">
        <p className="text-xs text-ossium-muted text-center mb-8 uppercase tracking-[0.3em] font-semibold">
          Powering developers working with
        </p>
        <div className="relative w-full overflow-hidden mask-linear-fade">
          <div className="flex gap-20 items-center whitespace-nowrap animate-scroll w-max group hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-20 items-center">
                {['React', 'TypeScript', 'Docker', 'Python', 'Go', 'Rust', 'Kubernetes', 'Node.js', 'Next.js', 'Vite', 'GraphQL', 'PostgreSQL', 'MongoDB'].map((tech) => (
                  <span key={`${tech}-${i}`} className="font-bold text-white/20 text-xl sm:text-2xl hover:text-white/80 hover:-translate-y-1 transition-all duration-300 cursor-default select-none">
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Fade transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ossium-darker via-[#050505] to-transparent z-[5]"></div>
    </section>
  );
};

export default Hero;
