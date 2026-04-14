import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiArrowLeft, FiCode, FiTerminal, FiSearch, FiInfo } from 'react-icons/fi';
import { SiJavascript, SiReact, SiPython, SiGo, SiRust, SiCplusplus, SiTypescript, SiPhp, SiRuby, SiSwift, SiKotlin, SiPostgresql, SiVuedotjs } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import notesMap from '../data/notes/index.js';

const languageMeta = {
  javascript: { name: 'JavaScript', icon: <SiJavascript />, color: 'text-yellow-400', description: 'The programming language of the Web. A high-level, just-in-time compiled language that conforms to the ECMAScript standard.' },
  react: { name: 'React', icon: <SiReact />, color: 'text-cyan-400', description: 'A JavaScript library for building user interfaces with a component-based architecture and virtual DOM.' },
  python: { name: 'Python', icon: <SiPython />, color: 'text-blue-500', description: 'An interpreted, high-level, general-purpose programming language emphasizing code readability and simplicity.' },
  typescript: { name: 'TypeScript', icon: <SiTypescript />, color: 'text-blue-600', description: 'A syntactic superset of JavaScript which adds static typing for safer, more scalable code.' },
  go: { name: 'Go', icon: <SiGo />, color: 'text-cyan-300', description: 'A statically typed, compiled language designed at Google for simplicity, concurrency, and performance.' },
  rust: { name: 'Rust', icon: <SiRust />, color: 'text-orange-500', description: 'A multi-paradigm language designed for performance and safety, especially safe concurrency without garbage collection.' },
  sql: { name: 'SQL', icon: <SiPostgresql />, color: 'text-blue-300', description: 'A domain-specific language for managing and querying data in relational database management systems.' },
  java: { name: 'Java', icon: <FaJava />, color: 'text-orange-600', description: 'A high-level, class-based, object-oriented language designed for portability across platforms via the JVM.' },
  cpp: { name: 'C++', icon: <SiCplusplus />, color: 'text-blue-700', description: 'A high-level, general-purpose language with low-level memory manipulation capabilities for systems programming.' },
  'vue.js': { name: 'Vue.js', icon: <SiVuedotjs />, color: 'text-green-500', description: 'A progressive framework for building user interfaces, designed to be incrementally adoptable.' },
  vuejs: { name: 'Vue.js', icon: <SiVuedotjs />, color: 'text-green-500', description: 'A progressive framework for building user interfaces, designed to be incrementally adoptable.' },
  php: { name: 'PHP', icon: <SiPhp />, color: 'text-indigo-400', description: 'A popular general-purpose scripting language especially suited to server-side web development.' },
  ruby: { name: 'Ruby', icon: <SiRuby />, color: 'text-red-500', description: 'A dynamic, open source language with a focus on simplicity, productivity, and elegant syntax.' },
  swift: { name: 'Swift', icon: <SiSwift />, color: 'text-orange-500', description: 'A powerful and intuitive programming language for Apple platforms and beyond.' },
  kotlin: { name: 'Kotlin', icon: <SiKotlin />, color: 'text-purple-500', description: 'A cross-platform, statically typed language with type inference, fully interoperable with Java.' },
};

const LanguageNotes = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNoteTitle, setActiveNoteTitle] = useState('');
  
  // Normalize key to find in meta and notesMap
  const idLower = id?.toLowerCase() || '';
  const langKey = idLower.replace('c++', 'cpp').replace('.', '').replace(' ', '-');
  
  const meta = languageMeta[idLower] || languageMeta[langKey] || {
    name: id,
    icon: <FiCode />,
    color: 'text-white',
    description: 'Detailed notes coming soon for this language.',
  };

  const allNotes = notesMap ? (notesMap[langKey] || notesMap[idLower] || []) : [];

  const filteredNotes = searchQuery.trim()
    ? allNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allNotes;

  useEffect(() => {
    window.scrollTo(0, 0);
    setSearchQuery('');
  }, [id]);

  useEffect(() => {
    if (filteredNotes.length > 0 && (!activeNoteTitle || !filteredNotes.find(n => n.title === activeNoteTitle))) {
      setActiveNoteTitle(filteredNotes[0].title);
    }
  }, [filteredNotes, activeNoteTitle]);

  const activeNote = filteredNotes.find(n => n.title === activeNoteTitle) || filteredNotes[0];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-32 px-4 sm:px-6 pb-20 w-full max-w-[1400px] mx-auto">
        <Link to="/languages" className="inline-flex items-center gap-2 text-white/30 hover:text-white mb-6 sm:mb-8 transition-all group text-xs sm:text-sm font-bold uppercase tracking-widest">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Languages
        </Link>

        {/* Header Section */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 mb-12 sm:mb-16 border-b border-white/5 pb-10 sm:pb-16 text-center">
          <div className={`p-6 sm:p-8 rounded-[2rem] bg-white/5 border border-white/10 ${meta.color} text-5xl sm:text-7xl shadow-2xl inline-flex justify-center`}>
            {meta.icon}
          </div>
          <div className="max-w-3xl flex flex-col items-center">
            <h1 className="text-4xl sm:text-7xl font-black mb-4 tracking-tighter leading-tight">
              {meta.name} <span className="text-white/20 block sm:inline">Notes</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/40 leading-relaxed max-w-2xl font-medium">
              {meta.description}
            </p>
          </div>
        </div>



        {/* Tabs Navigation (Pills format) */}
        {filteredNotes.length > 0 && (
          <div className="max-w-[1400px] mx-auto mb-16 px-4">
            <div className="flex sm:flex-wrap sm:justify-center gap-3 overflow-x-auto sm:overflow-x-visible pb-6 px-1 sm:pb-0 scrollbar-hide">
              {filteredNotes.map((note) => (
                <button
                  key={note.title}
                  onClick={() => setActiveNoteTitle(note.title)}
                  className={`px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 border whitespace-nowrap shrink-0 ${
                    activeNoteTitle === note.title
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.25)] sm:scale-105 z-10'
                      : 'bg-[#111] text-white/70 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {note.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Sections */}
        {activeNote ? (
          <div className="relative animate-fade-in-down" key={activeNote.title}>
            <div className="relative group">
              <div className="pt-2 sm:pt-4">
                  <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 sm:mb-6 tracking-tight">
                    {activeNote.title}
                  </h2>

                  <p className="text-white/60 mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed max-w-3xl font-medium">
                    {activeNote.content}
                  </p>

                  {activeNote.code && (
                    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a0a] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] transition-all duration-500">
                      {/* Terminal Header */}
                      <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.02] border-b border-white/5">
                        <div className="flex gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
                        </div>
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Code Example</span>
                      </div>

                      <div className="p-6 sm:p-8 overflow-x-auto no-scrollbar">
                        <pre className="font-mono text-xs sm:text-sm text-white/80 leading-relaxed">
                          <code>{activeNote.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        ) : searchQuery ? (
          <div className="bg-white/5 border border-white/5 rounded-[2rem] p-12 sm:p-20 text-center">
            <FiSearch className="mx-auto text-white/10 mb-8" size={64} />
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">No Results</h3>
            <p className="text-white/30 max-w-md mx-auto font-medium">
              No notes match "{searchQuery}". Try a different search term.
            </p>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/5 rounded-[2rem] p-12 sm:p-20 text-center">
            <FiTerminal className="mx-auto text-white/10 mb-8" size={64} />
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">Documentation Pending</h3>
            <p className="text-white/30 max-w-md mx-auto font-medium px-4">
              We're currently compiling the master notes for {meta.name}. 
              <br className="hidden sm:block" /> Check back soon for deep dives and patterns.
            </p>
            {!notesMap && (
              <div className="mt-8 flex items-center justify-center gap-2 text-red-500/50 text-xs font-mono">
                <FiInfo /> Data source unavailable
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LanguageNotes;
