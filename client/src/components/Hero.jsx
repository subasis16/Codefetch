import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      duration: `${Math.random() * 10 + 10}s`,
      opacity: Math.random() * 0.5 + 0.1,
      delay: `${Math.random() * 5}s`
    }));
    setParticles(newParticles); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-24 px-4 sm:px-6">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-dot-pattern z-0"></div>
        <div className="absolute inset-0 bg-fluid-aurora z-0"></div>
      </div>

      {/* Floating Particles Generator */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((style, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: style.left,
              width: style.width,
              height: style.height,
              '--duration': style.duration,
              '--opacity': style.opacity,
              animationDelay: style.delay
            }}
          ></div>
        ))}
      </div>

      {/* Radial Gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] opacity-60"></div>

      {/* Bottom Fade for Merging Sections */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[5]"></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center animate-fade-in-up px-2">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[1.15] mb-4 sm:mb-6 md:mb-8 drop-shadow-2xl">
          Recall anything in{' '}
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ossium-accent to-gray-400 inline-block">
            Seconds
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-ossium-muted max-w-2xl mb-8 sm:mb-12 leading-relaxed font-light px-2 sm:px-0">
          The coding cheat-sheet and documentation platform designed for developers who build fast.
          Stop context switching. <span className="text-white font-medium">Start shipping.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto px-2 sm:px-0">
          <Link to="/dashboard" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-ossium-accent text-ossium-darker font-bold rounded-lg hover:bg-ossium-accent-hover transition-all shadow-[0_4px_20px_rgba(249,250,251,0.3)] text-sm sm:text-base text-center block">
            Dashboard
          </Link>
          <Link to="/dashboard" state={{ tab: 'docs' }} className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#1A1A1A] border border-white/10 text-white font-medium rounded-lg hover:bg-white/5 hover:border-white/20 transition-all text-sm sm:text-base backdrop-blur-md text-center block">
            View Documentation
          </Link>
        </div>

        {/* Social Proof / Tech Stack Icons */}
        <div className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-white/5 w-full max-w-4xl">
          <p className="text-[10px] sm:text-xs text-ossium-muted mb-4 sm:mb-6 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold">Powering developers working with</p>
          <div className="relative w-full overflow-hidden mask-linear-fade">
            <div className="flex gap-8 sm:gap-16 items-center whitespace-nowrap animate-scroll w-max">
              {/* Duplicate the list to create seamless loop */}
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8 sm:gap-16 items-center">
                  {['JavaScript', 'TypeScript', 'React', 'Python', 'Go', 'Rust', 'Java', 'C++', 'Swift', 'Kotlin', 'PHP', 'Ruby', 'Dart', 'Solidity', 'HTML5', 'CSS3', 'Docker', 'Kubernetes', 'AWS', 'TensorFlow'].map((tech) => (
                    <span key={`${tech}-${i}`} className="font-bold text-white text-sm sm:text-lg md:text-xl opacity-40 hover:opacity-100 transition-opacity cursor-default select-none">
                      {tech}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
