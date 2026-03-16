import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiArrowRight, FiSearch } from 'react-icons/fi';
import { useAuth } from '../context/useAuth';
import { useSearch } from '../context/SearchContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { openSearch } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? 'text-ossium-accent' : 'text-ossium-muted hover:text-white';
  };

  return (
    <>
    <nav
      className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-between font-black tracking-widest
        ${scrolled
          ? 'top-4 w-[95%] max-w-6xl h-14 bg-white/10 backdrop-blur-xl rounded-full px-8 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
          : 'top-0 w-full h-20 bg-transparent px-6 md:px-12 border-transparent rounded-none'
        }`}
    >
      <Link to="/" className="flex items-center cursor-pointer shrink-0">
        <span className={`text-white font-black transition-all duration-500 ${scrolled ? 'text-xl' : 'text-2xl'} tracking-tight`}>
          CODEFETCH
        </span>
      </Link>

      {/* Centered Desktop Navigation */}
      <div className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-7 text-[10px] uppercase text-white/70 transition-all duration-500 ${scrolled ? 'top-[70%] opacity-100 scale-95' : 'top-[64%] opacity-80'}`}>
        <Link to="/cheatsheets" className={`transition-colors whitespace-nowrap hover:text-white ${location.pathname === '/cheatsheets' ? 'text-white' : ''}`}>Cheat Sheets +</Link>
        <Link to="/languages" className={`transition-colors whitespace-nowrap hover:text-white ${location.pathname === '/languages' ? 'text-white' : ''}`}>Languages +</Link>
        <Link to="/roadmap" className={`transition-colors whitespace-nowrap hover:text-white ${location.pathname === '/roadmap' ? 'text-white' : ''}`}>Blueprint +</Link>
        <Link to="/setup" className={`transition-colors whitespace-nowrap hover:text-white ${location.pathname === '/setup' ? 'text-white' : ''}`}>Setup</Link>
        <Link to="/errors" className={`transition-colors whitespace-nowrap hover:text-white ${location.pathname === '/errors' ? 'text-white' : ''}`}>Bugs & Fixes</Link>
        <Link to="/tools" className={`transition-colors whitespace-nowrap hover:text-white ${location.pathname === '/tools' ? 'text-white' : ''}`}>Tools</Link>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden md:flex items-center gap-4">
          {/* Search Trigger (Desktop) */}
          <button 
            onClick={openSearch}
            className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group"
          >
            <FiSearch className="text-white/40 group-hover:text-white transition-colors" size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors">
              Cmd + K
            </span>
          </button>

          <Link
            to={user ? "/dashboard" : "/login"}
            state={user ? { tab: 'snippets' } : {}}
            className={`bg-white text-black rounded-full font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all shadow-xl flex items-center justify-center
              ${scrolled ? 'px-6 py-2 text-[9px]' : 'px-8 py-2.5 text-[10px]'}
            `}
          >
            {user ? "Snippets" : "Login"}
          </Link>
        </div>


        {/* Mobile Search Trigger */}
        <button 
          onClick={openSearch}
          className="md:hidden text-white/60 p-2 hover:text-white transition-colors"
        >
          <FiSearch size={20} />
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

    </nav>

    {/* Mobile Menu Overlay */}
    {mobileMenuOpen && (
      <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[100] flex flex-col items-center justify-center p-8 lg:hidden animate-fade-in overflow-y-auto">
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
        >
          <FiX size={32} />
        </button>
        
        <div className="flex flex-col items-center gap-8 text-center py-20">
          <Link to="/cheatsheets" className="text-2xl font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all" onClick={() => setMobileMenuOpen(false)}>Cheat Sheets</Link>
          <Link to="/languages" className="text-2xl font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all" onClick={() => setMobileMenuOpen(false)}>Languages</Link>
          <Link to="/roadmap" className="text-2xl font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all" onClick={() => setMobileMenuOpen(false)}>Blueprint</Link>
          <Link to="/setup" className="text-2xl font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all" onClick={() => setMobileMenuOpen(false)}>Setup</Link>
          <Link to="/errors" className="text-2xl font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all" onClick={() => setMobileMenuOpen(false)}>Bugs & Fixes</Link>
          <Link to="/tools" className="text-2xl font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all" onClick={() => setMobileMenuOpen(false)}>Tools</Link>
          
          <div className="h-px bg-white/10 w-24 my-4"></div>
          
          <Link 
            to={user ? "/dashboard" : "/login"} 
            state={user ? { tab: 'snippets' } : {}} 
            className="bg-white text-black px-12 py-4 rounded-full font-black uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 transition-transform"
            onClick={() => setMobileMenuOpen(false)}
          >
            {user ? "Snippets" : "Login"}
          </Link>
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;
