import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSearch, 
  FiFileText, 
  FiLayout, 
  FiServer, 
  FiCpu, 
  FiGitBranch, 
  FiTerminal, 
  FiArrowRight,
  FiBox,
  FiMap,
  FiSettings,
  FiInfo,
  FiCommand,
  FiX
} from 'react-icons/fi';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // Search Data with proper icons
  const searchData = [
    { title: 'Dashboard', type: 'Platform', path: '/dashboard', icon: <FiBox /> },
    { title: 'Cheat Sheets', type: 'Reference', path: '/cheatsheets', icon: <FiFileText /> },
    { title: 'Languages', type: 'Guide', path: '/languages', icon: <FiTerminal /> },
    { title: 'Tools & Utilities', type: 'Resource', path: '/tools', icon: <FiSettings /> },
    { title: 'Bugs & Fixes', type: 'Database', path: '/errors', icon: <FiCpu /> },
    { title: 'Blueprint / Roadmap', type: 'Planning', path: '/roadmap', icon: <FiMap /> },
    { title: 'Environment Setup', type: 'Configuration', path: '/setup', icon: <FiServer /> },
    { title: 'Core Fundamentals', type: 'Academic', path: '/fundamentals', icon: <FiLayout /> },
    { title: 'About CodeFetch', type: 'Information', path: '/about', icon: <FiInfo /> },
  ];

  const filteredResults = searchData.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % filteredResults.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
      }
      if (e.key === 'Enter' && filteredResults[activeIndex]) {
        handleNavigate(filteredResults[activeIndex].path);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, filteredResults, activeIndex]);

  if (!isOpen) return null;

  const handleNavigate = (path) => {
    navigate(path);
    setQuery('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh] px-4 sm:px-6">
      {/* Backdrop with heavy blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[12px] animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_32px_128px_rgba(0,0,0,0.8)] overflow-hidden animate-zoom-in">
        
        {/* Search Header */}
        <div className="relative flex items-center gap-3 px-4 sm:px-6 py-4 sm:py-5 border-b border-white/5">
          <FiSearch className="w-4 h-4 sm:w-5 sm:h-5 text-white/40" />
          <input
            type="text"
            autoFocus
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-white text-base sm:text-lg placeholder-white/20 focus:outline-none font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* Desktop Close Hint */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-white/30 tracking-tighter uppercase font-mono">
            ESC
          </div>
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="sm:hidden text-white/30 hover:text-white p-1"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[50vh] overflow-y-auto p-3 custom-scrollbar">
          {filteredResults.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 pb-2 pt-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                Navigation Results
              </div>
              {filteredResults.map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavigate(result.path)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl group transition-all duration-200 text-left relative ${
                    activeIndex === idx ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  {/* Icon Container */}
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300 ${
                    activeIndex === idx 
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'bg-white/5 border-white/5 text-white/40'
                  }`}>
                    {React.cloneElement(result.icon, { size: 18 })}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 overflow-hidden">
                    <h4 className={`text-sm font-bold transition-colors ${
                      activeIndex === idx ? 'text-white' : 'text-white/60'
                    }`}>
                      {result.title}
                    </h4>
                    <p className={`text-[10px] uppercase tracking-widest font-black mt-0.5 transition-colors ${
                      activeIndex === idx ? 'text-white/40' : 'text-white/20'
                    }`}>
                      {result.type}
                    </p>
                  </div>

                  {/* Arrow or Hint */}
                  <div className={`transition-all duration-300 ${
                    activeIndex === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  }`}>
                    <FiArrowRight className="text-white/40" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center px-10">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/20 mb-4 border border-white/5">
                <FiSearch size={24} />
              </div>
              <h3 className="text-white font-bold mb-1">No results matching "{query}"</h3>
              <p className="text-white/30 text-sm">Try searching for topics like "blueprint", "setup" or "languages".</p>
            </div>
          )}
        </div>

        {/* Premium Footer */}
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-tighter">
              <span className="flex items-center gap-1">
                <kbd className="min-w-[20px] h-5 flex items-center justify-center bg-white/10 rounded border border-white/10 pt-0.5">↑</kbd>
                <kbd className="min-w-[20px] h-5 flex items-center justify-center bg-white/10 rounded border border-white/10 pt-0.5">↓</kbd>
              </span>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-tighter">
              <kbd className="min-w-[20px] h-5 flex items-center justify-center bg-white/10 rounded border border-white/10 pt-0.5 font-mono">↵</kbd>
              <span>Select</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between w-full sm:w-auto gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <FiCommand size={10} />
              <span>Search Tool</span>
            </div>
            <span className="sm:hidden text-white/10">v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
