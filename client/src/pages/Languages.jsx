
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FiSearch, FiAlertTriangle, FiCode, FiLayers, FiZap } from 'react-icons/fi';
import { languagesData } from '../data/languages';

const Languages = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const types = ['All', 'Language', 'Framework'];

  const filteredLanguages = languagesData.filter(lang => {
    const matchesSearch = lang.name.toLowerCase().includes(search.toLowerCase()) ||
      lang.purpose.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === 'All' || lang.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-ossium-darker text-ossium-text font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 px-6 pb-20 w-full max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
            Languages <span className="text-ossium-muted text-3xl font-normal">&</span> Frameworks
          </h1>
          <p className="text-ossium-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Technical usage guides, syntax references, and structural patterns.
          </p>

          {/* Minimal Search */}
          <div className="mt-10 max-w-lg mx-auto relative group">
            <input
              type="text"
              placeholder="Search stack..."
              className="w-full bg-[#121212] border border-white/5 rounded-full py-4 px-12 text-white placeholder-ossium-muted focus:outline-none focus:border-ossium-accent/50 focus:bg-[#1a1a1a] transition-all duration-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-ossium-muted group-focus-within:text-ossium-accent transition-colors" size={20} />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedType === type
                  ? 'bg-ossium-accent text-ossium-darker font-bold shadow-[0_0_10px_rgba(202,255,51,0.3)]'
                  : 'bg-[#121212] border border-white/5 text-ossium-muted hover:text-white hover:border-white/10 hover:bg-white/5'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLanguages.map(item => (
            <Link
              to={`/languages/${item.name.toLowerCase().replace(' ', '-')}`}
              key={item.id}
              className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6 hover:border-ossium-accent/20 transition-all duration-300 group hover:-translate-y-1 block"
            >

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-white/5 ${item.color} text-3xl transition-transform group-hover:scale-110 duration-300`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{item.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      {item.type === 'Language' ? <FiCode size={12} className="text-ossium-muted" /> : <FiLayers size={12} className="text-ossium-muted" />}
                      <span className="text-xs text-ossium-muted font-medium uppercase tracking-wide">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 bg-[#161616] p-3 rounded border border-white/5">
                    <p className="text-[10px] uppercase text-ossium-muted font-bold tracking-wider mb-1">Purpose</p>
                    <p className="text-xs text-gray-300 leading-relaxed">{item.purpose}</p>
                  </div>
                  <div className="col-span-2 bg-[#161616] p-3 rounded border border-white/5">
                    <p className="text-[10px] uppercase text-ossium-muted font-bold tracking-wider mb-1">Structure</p>
                    <p className="text-xs font-mono text-ossium-accent/90 truncate">{item.structure}</p>
                  </div>
                </div>

                <div className="bg-[#161616] p-3 rounded border border-white/5 group-hover:border-white/10 transition-colors">
                  <p className="text-[10px] uppercase text-ossium-muted font-bold tracking-wider mb-2">Syntax</p>
                  <code className="text-xs font-mono text-gray-400 block break-words">
                    {item.syntax}
                  </code>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <FiAlertTriangle className="text-red-400 shrink-0 mt-0.5" size={14} />
                  <div>
                    <p className="text-[10px] uppercase text-red-400 font-bold tracking-wider mb-0.5">Watch Out</p>
                    <p className="text-xs text-ossium-muted">{item.mistakes}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 mt-3 border-t border-white/5 bg-yellow-500/5 p-2 rounded">
                  <FiZap className="text-yellow-400 shrink-0 mt-0.5" size={14} />
                  <div>
                    <p className="text-[10px] uppercase text-yellow-400 font-bold tracking-wider mb-0.5">Pro Tip</p>
                    <p className="text-xs text-ossium-muted">{item.expert_tip}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-ossium-accent group-hover:text-white transition-colors duration-300">
                  <span className="text-sm font-medium">View Guide & Notes</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredLanguages.length === 0 && (
          <div className="text-center py-20 text-ossium-muted">
            <p className="text-xl">No matching stack found.</p>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default Languages;
