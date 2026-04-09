
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiSearch, FiDownload, FiActivity } from 'react-icons/fi';
import { toolsData } from '../data/tools';

const Tools = () => {
  const [search, setSearch] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');

  // get unique categories
  const categories = ['All', ...new Set(toolsData.map(tool => tool.category))].sort();

  const filteredTools = toolsData.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-ossium-darker text-ossium-text font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 px-6 pb-20 w-full max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
            Developer <span className="text-ossium-muted text-3xl font-normal">&</span> Tools
          </h1>
          <p className="text-ossium-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Essential software, extensions, and utilities for the modern stack.
          </p>

          <div className="mt-10 max-w-lg mx-auto relative group">
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full bg-[#121212] border border-white/5 rounded-full py-4 px-12 text-white placeholder-ossium-muted focus:outline-none focus:border-ossium-accent/50 focus:bg-[#1a1a1a] transition-all duration-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-ossium-muted group-focus-within:text-ossium-accent transition-colors" size={20} />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                  ? 'bg-ossium-accent text-ossium-darker font-bold shadow-[0_0_10px_rgba(202,255,51,0.3)]'
                  : 'bg-[#121212] border border-white/5 text-ossium-muted hover:text-white hover:border-white/10 hover:bg-white/5'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6 hover:border-ossium-accent/20 transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full"
            >

              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white/5 flex items-center justify-center text-3xl group-hover:bg-white/10 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{item.name}</h3>
                    <span className="text-xs text-ossium-muted font-medium uppercase tracking-wide bg-[#161616] px-1.5 py-0.5 rounded border border-white/5 mt-1 inline-block">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 flex-1 flex flex-col">
                <p className="text-sm text-gray-400 leading-relaxed min-h-[40px]">
                  {item.desc}
                </p>

                <div className="mt-auto space-y-3">
                  <div className="bg-[#161616] p-3 rounded border border-white/5 group-hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <FiDownload className="text-ossium-muted" size={12} />
                      <p className="text-[10px] uppercase text-ossium-muted font-bold tracking-wider">Install</p>
                    </div>
                    <code className="text-xs font-mono text-ossium-accent/90 block truncate">
                      {item.install}
                    </code>
                  </div>

                  <div className="bg-[#161616] p-3 rounded border border-white/5 group-hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <FiActivity className="text-ossium-muted" size={12} />
                      <p className="text-[10px] uppercase text-ossium-muted font-bold tracking-wider">Workflow</p>
                    </div>
                    <code className="text-xs font-mono text-gray-400 block break-words">
                      {item.workflow}
                    </code>
                  </div>
                </div>
              </div>

            </a>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20 text-ossium-muted">
            <p className="text-xl">No tools found.</p>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default Tools;
