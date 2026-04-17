import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { systemDesignData } from '../data/systemDesign';
import { FiArrowRight, FiServer, FiLayers } from 'react-icons/fi';
import ArchitectureBuilder from '../components/ArchitectureBuilder';

const SystemDesign = () => {
  const { hash } = useLocation();
  const [activeSection, setActiveSection] = useState(systemDesignData[0].id);
  const [activeItemId, setActiveItemId] = useState(systemDesignData[0].items[0].name);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      if (systemDesignData.find(s => s.id === id)) {
        setActiveSection(id);
      }
      setTimeout(() => {
        const element = document.getElementById('content-area');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  const activeData = systemDesignData.find(s => s.id === activeSection) || systemDesignData[0];
  const activeItem = activeData.items.find(i => i.name === activeItemId) || activeData.items[0];

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    const section = systemDesignData.find(s => s.id === sectionId);
    if (section && section.items.length > 0) {
      setActiveItemId(section.items[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-40 pb-32">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-24 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
            SYSTEM <br />
            <span className="text-white/20">DESIGN</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            The blueprint of scalable architecture. Master these distributed concepts to build robust systems capable of large-scale traffic.
          </p>
        </div>

        {/* Tabs Navigation (Pills format) */}
        <div className="max-w-5xl mx-auto mb-16 px-6" id="content-area">
          <div className="flex sm:flex-wrap sm:justify-center gap-3 overflow-x-auto sm:overflow-x-visible pb-6 px-1 sm:pb-0 scrollbar-hide">
            {systemDesignData.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
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

        {/* Dashboard Full Canvas View Component - Expanded to Full Width */}
        <div className="w-full mt-8 mb-24 animate-fade-in-down" key={activeData.id}>
          <div className="flex flex-col-reverse lg:block relative w-full group bg-[#050505] overflow-hidden shadow-2xl lg:h-[800px]">
            
            {/* Main Interactive Canvas */}
            <ArchitectureBuilder 
              key={activeItem.name} 
              initialNodesProp={activeItem.nodes} 
              initialEdgesProp={activeItem.edges} 
              minimal={false} 
            />

            <div className="relative lg:absolute lg:top-8 lg:left-8 w-full lg:max-w-[380px] bg-[#0a0a0a] lg:bg-[#0a0a0ae6] backdrop-blur-xl border-b lg:border border-white/10 lg:rounded-2xl flex flex-col z-20 shadow-2xl overflow-hidden h-[400px] lg:h-fit lg:max-h-[calc(100%-64px)]">
              
              {/* Section Header */}
              <div className="p-6 border-b border-white/5 shrink-0 bg-gradient-to-br from-white/[0.05] to-transparent">
                <h2 className="text-2xl font-black tracking-tighter text-white mb-2 leading-none">
                  {activeData.title}
                </h2>
                <p className="text-xs text-white/50 leading-relaxed font-semibold">
                  {activeData.description}
                </p>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-3">
                {activeData.items.map((item, idx) => {
                  const isActive = activeItemId === item.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveItemId(item.name)}
                      className={`w-full text-left p-5 rounded-xl transition-all duration-300 relative group/btn ${
                        isActive 
                        ? 'bg-white/[0.05]' 
                        : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      <h3 className={`text-base font-black mb-1.5 transition-colors ${isActive ? 'text-white' : 'text-white/40 group-hover/btn:text-white/60'}`}>
                        {item.name}
                      </h3>
                      <p className={`text-[11px] leading-relaxed mb-3 ${isActive ? 'text-white/60 font-medium' : 'text-white/20'}`}>
                        {item.desc}
                      </p>
                      
                      {isActive && (
                        <div className="mt-4 pt-4 border-t border-white/5 animate-fade-in">
                          <p className="text-[10px] leading-relaxed text-white/40 font-medium italic">
                            {item.def}
                          </p>
                        </div>
                      )}
                    </button>
                  );
                })}

                {/* Summary / Insight section */}
                <div className="mt-8 pt-8 border-t border-white/5 pb-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4 px-2">Architectural Note</h4>
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 relative overflow-hidden group/card text-[11px] text-white/50 leading-relaxed font-medium">
                    {activeData.id === 'networking' 
                      ? 'Optimizing for low latency often means trading off reliability—choose the protocol that fits the user experience.' 
                      : 'Always design for failure. In distributed systems, anything that can go wrong, will go wrong at scale.'}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

        {/* Global CTA */}
        <div className="max-w-6xl mx-auto mt-40 px-6">
          <div className="relative p-8 sm:py-8 sm:px-14 rounded-[1.5rem] bg-white text-black overflow-hidden group border border-white/10 shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
              <div>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tighter leading-tight mb-4">
                  READY FOR SCALE?
                </h3>
                <p className="text-black/60 font-bold text-sm sm:text-base">
                  Apply these design patterns <br className="hidden sm:block" /> in your next distributed project.
                </p>
              </div>
              <a 
                href="/roadmap" 
                className="inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-10 sm:py-5 bg-black text-white rounded-full font-black uppercase tracking-widest text-[10px] sm:text-sm hover:scale-105 transition-all shadow-2xl w-full sm:w-auto text-center shrink-0"
              >
                View Architecture Blueprints
                <FiArrowRight size={16} className="shrink-0" />
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

export default SystemDesign;
