import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { fundamentalsData } from '../data/fundamentals';
import { FiCode, FiArrowRight, FiBookOpen } from 'react-icons/fi';

const Fundamentals = () => {
  const [activeSection, setActiveSection] = useState(fundamentalsData[0].id);

  const activeData = fundamentalsData.find(s => s.id === activeSection) || fundamentalsData[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-32 px-4 sm:px-6 pb-32">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-24 text-center">
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
            PROGRAMMING <br />
            <span className="text-white/20">FUNDAMENTALS</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            The architectural pillars of software engineering. Master these patterns to navigate any codebase with confidence.
          </p>
        </div>

        {/* Tabs Navigation (Pills format) */}
        <div className="max-w-[1400px] mx-auto mb-16">
          <div className="flex sm:flex-wrap sm:justify-center gap-3 overflow-x-auto sm:overflow-x-visible pb-6 px-1 sm:pb-0 scrollbar-hide">
            {fundamentalsData.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 border whitespace-nowrap shrink-0 ${
                  activeSection === section.id
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.25)] sm:scale-105 z-10'
                    : 'bg-[#111] text-white/70 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/10'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section for Active Tab */}
        <div className="max-w-4xl mx-auto relative animate-fade-in-down" key={activeSection}>

          <div className="space-y-32">
            <div className="relative group">
                
                {/* Section Header */}
                <div className="mb-12">
                  <div className="pt-2">
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-4 transition-all duration-500 text-white translate-x-1">
                      {activeData.title}
                    </h2>
                    <p className="text-base sm:text-lg max-w-2xl leading-relaxed transition-all duration-500 text-white/60">
                      {activeData.description}
                    </p>
                  </div>
                </div>

                {/* Sub-items list */}
                <div className="space-y-20">
                  {activeData.items.map((item, iIdx) => (
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
                          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-white/30">
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
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Fundamentals;
