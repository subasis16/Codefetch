
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { errorsData } from '../data/errors';

const Errors = () => {
  const [search, setSearch] = useState('');

  const [selectedTech, setSelectedTech] = useState('All');
  const techs = ['All', ...new Set(errorsData.map(e => e.tech))].sort();

  const filteredErrors = errorsData.filter(item => {
    const matchesSearch = item.error.toLowerCase().includes(search.toLowerCase()) ||
      item.tech.toLowerCase().includes(search.toLowerCase()) ||
      item.level.toLowerCase().includes(search.toLowerCase());
    const matchesTech = selectedTech === 'All' || item.tech === selectedTech;
    return matchesSearch && matchesTech;
  });

  // Helper for badges
  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Expert': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-white/5 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-ossium-darker text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-6 pb-20 max-w-6xl mx-auto w-full">

        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Bugs & <span className="text-red-400">Fixes</span>
          </h1>
          <p className="text-ossium-muted text-lg max-w-2xl mx-auto">
            Don't let errors stop your flow. Solutions ranked by difficulty.
          </p>

          {/* Search Input */}
          <div className="mt-8 max-w-2xl mx-auto relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-ossium-accent/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search error, tech, or difficulty..."
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-ossium-muted/50 focus:outline-none focus:ring-1 focus:ring-ossium-accent/30 transition-shadow shadow-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg className="w-5 h-5 text-ossium-muted absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {techs.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedTech === tech
                  ? 'bg-ossium-accent text-ossium-darker font-bold shadow-[0_0_10px_rgba(202,255,51,0.3)]'
                  : 'bg-[#121212] border border-white/5 text-ossium-muted hover:text-white hover:border-white/10 hover:bg-white/5'
                  }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid - Simplified Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredErrors.map(item => (
            <div key={item.id} className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all duration-200 group flex flex-col">

              {/* Card Header */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <span className={`text-2xl ${item.color}`}>{item.icon}</span>
                  <span className="font-bold text-base text-gray-200">{item.tech}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${getLevelColor(item.level)}`}>
                  {item.level}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 gap-6">

                {/* The Bug */}
                <div>
                  <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> The Bug
                  </h3>
                  <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3 font-mono text-xs text-red-200/90 leading-relaxed">
                    {item.error}
                  </div>
                </div>

                {/* The Why */}
                <div className="pl-3 border-l-2 border-white/10">
                  <p className="text-sm text-ossium-muted leading-relaxed">
                    <span className="text-gray-400 font-medium">Why? </span>
                    {item.cause}
                  </p>
                </div>

                {/* The Fix */}
                <div className="mt-auto">
                  <h3 className="text-xs font-bold text-ossium-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ossium-accent"></span> The Fix
                  </h3>
                  <div className="bg-ossium-accent/10 border border-ossium-accent/20 rounded-lg p-3 font-mono text-xs text-gray-100 leading-relaxed shadow-sm">
                    &gt; {item.fix}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {filteredErrors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-ossium-muted">No fixes found for "{search}".</p>
            <button className="mt-4 text-sm text-ossium-accent hover:underline">Submit a new error?</button>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default Errors;
