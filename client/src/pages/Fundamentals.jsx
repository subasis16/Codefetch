import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { fundamentalsData } from '../data/fundamentals';
import { FiCode, FiArrowRight, FiBookOpen } from 'react-icons/fi';

const Fundamentals = () => {
  const { hash } = useLocation();
  const [activeSection, setActiveSection] = useState(fundamentalsData[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    fundamentalsData.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-40 px-6 pb-32">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-8">
            <FiBookOpen className="text-white/60" />
            <span>Core Knowledge</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
            PROGRAMMING <br />
            <span className="text-white/20">FUNDAMENTALS</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            The architectural pillars of software engineering. Master these patterns to navigate any codebase with confidence.
          </p>
        </div>

        {/* Quick Nav */}
        <div className="sticky top-24 z-40 mb-20 pointer-events-none">
          <div className="max-w-6xl mx-auto flex justify-center">
            <div className="pointer-events-auto bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-full flex gap-1 shadow-2xl overflow-x-auto no-scrollbar max-w-full">
              {fundamentalsData.map(section => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-0">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[23px] sm:left-[31px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

          <div className="space-y-32">
            {fundamentalsData.map((section, sIdx) => (
              <div key={section.id} id={section.id} className="relative scroll-mt-48 group">
                
                {/* Section Header with Number */}
                <div className="flex items-start gap-6 sm:gap-10 mb-12">
                  <div className={`relative z-10 w-12 h-12 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center rounded-2xl border transition-all duration-500 font-mono text-sm sm:text-lg font-black tracking-tighter shadow-2xl ${
                    activeSection === section.id 
                    ? 'bg-white text-black border-white scale-110' 
                    : 'bg-black border-white/10 text-white/20 group-hover:border-white/30 group-hover:text-white/40'
                  }`}>
                    {(sIdx + 1).toString().padStart(2, '0')}
                    {activeSection === section.id && (
                      <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl animate-pulse" />
                    )}
                  </div>
                  
                  <div className="pt-2">
                    <h2 className={`text-3xl sm:text-5xl font-black tracking-tighter mb-4 transition-all duration-500 ${
                      activeSection === section.id ? 'text-white translate-x-1' : 'text-white/20 group-hover:text-white/40'
                    }`}>
                      {section.title}
                    </h2>
                    <p className={`text-base sm:text-lg max-w-2xl leading-relaxed transition-all duration-500 ${
                      activeSection === section.id ? 'text-white/60' : 'text-white/10 group-hover:text-white/20'
                    }`}>
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Sub-items list */}
                <div className="pl-[68px] sm:pl-[106px] space-y-20">
                  {section.items.map((item, iIdx) => (
                    <div key={iIdx} className="relative group/item">
                      <div className="mb-6">
                        <h3 className="text-xl sm:text-2xl font-black text-white/90 mb-3 group-hover/item:text-white transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm sm:text-base text-white/40 leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>

                      {/* Premium Code Card */}
                      <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/5 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] group-hover/item:border-white/10 transition-all duration-500">
                        {/* Title Bar */}
                        <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                          <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-white/30">
                            <FiCode size={10} />
                            <span>Snippet</span>
                          </div>
                        </div>
                        
                        {/* Code Content */}
                        <div className="p-6 sm:p-8 overflow-x-auto no-scrollbar">
                          <pre className="font-mono text-xs sm:text-sm leading-relaxed text-white/70">
                            <code>{item.code}</code>
                          </pre>
                        </div>

                        {/* Hover Overlay Light */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global CTA */}
        <div className="max-w-4xl mx-auto mt-40">
          <div className="relative p-8 sm:p-12 rounded-[2rem] bg-white text-black overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tighter leading-none mb-4">
                  READY TO BUILD?
                </h3>
                <p className="text-black/60 font-bold text-sm sm:text-base">
                  Put your fundamental knowledge <br /> to use in real projects.
                </p>
              </div>
              <a 
                href="/cheatsheets" 
                className="inline-flex items-center gap-4 px-10 py-5 bg-black text-white rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl"
              >
                Explore Docs
                <FiArrowRight />
              </a>
            </div>
            {/* Background Decoration */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-black/[0.03] rounded-full group-hover:scale-150 transition-transform duration-1000" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Fundamentals;
