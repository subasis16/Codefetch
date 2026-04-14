import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { SiTailwindcss, SiReact, SiNodedotjs, SiPython, SiTypescript, SiDocker, SiGit, SiMongodb, SiGo, SiRust, SiGraphql, SiSvelte, SiPostgresql, SiRedis, SiVercel, SiKubernetes, SiFirebase, SiSupabase } from 'react-icons/si';
import { FiSearch, FiLayout, FiZap, FiBookOpen, FiArrowRight } from 'react-icons/fi';

const documentationLinks = [
  { name: 'Tailwind CSS', url: 'https://tailwindcss.com/docs', icon: <SiTailwindcss className="text-[#06B6D4]" />, desc: 'Utility-first CSS framework.' },
  { name: 'React', url: 'https://react.dev', icon: <SiReact className="text-[#61DAFB]" />, desc: 'The library for web and native user interfaces.' },
  { name: 'Node.js', url: 'https://nodejs.org/en/docs', icon: <SiNodedotjs className="text-[#339933]" />, desc: 'JavaScript runtime built on Chrome\'s V8 engine.' },
  { name: 'Vite', url: 'https://vitejs.dev/guide/', icon: <FiZap className="text-[#646CFF]" />, desc: 'Next Generation Frontend Tooling.' },
  { name: 'Next.js', url: 'https://nextjs.org/docs', icon: <FiLayout className="text-white" />, desc: 'The React Framework for the Web.' },
  { name: 'Vue.js', url: 'https://vuejs.org/guide/introduction.html', icon: <FiLayout className="text-[#4FC08D]" />, desc: 'The Progressive JavaScript Framework.' },
  { name: 'Python', url: 'https://docs.python.org/3/', icon: <SiPython className="text-[#3776AB]" />, desc: 'The Python Language Reference.' },
  { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: <FiBookOpen className="text-white" />, desc: 'Resources for developers, by developers.' },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org/docs/', icon: <SiTypescript className="text-[#3178C6]" />, desc: 'Typed JavaScript at Any Scale.' },
  { name: 'Docker', url: 'https://docs.docker.com/', icon: <SiDocker className="text-[#2496ED]" />, desc: 'Platform for developing, shipping, and running applications.' },
  { name: 'Git', url: 'https://git-scm.com/doc', icon: <SiGit className="text-[#F05032]" />, desc: 'Free and open source distributed version control system.' },
  { name: 'MongoDB', url: 'https://www.mongodb.com/docs/', icon: <SiMongodb className="text-[#47A248]" />, desc: 'The developer data platform.' },
  { name: 'Go', url: 'https://go.dev/doc/', icon: <SiGo className="text-[#00ADD8]" />, desc: 'Open source programming language.' },
  { name: 'Rust', url: 'https://doc.rust-lang.org/', icon: <SiRust className="text-white" />, desc: 'A language empowering everyone to build reliable software.' },
  { name: 'GraphQL', url: 'https://graphql.org/learn/', icon: <SiGraphql className="text-[#E10098]" />, desc: 'A query language for your API.' },
  { name: 'Svelte', url: 'https://svelte.dev/docs', icon: <SiSvelte className="text-[#FF3E00]" />, desc: 'Cybernetically enhanced web apps.' },
  { name: 'PostgreSQL', url: 'https://www.postgresql.org/docs/', icon: <SiPostgresql className="text-[#4169E1]" />, desc: 'The world\'s most advanced open source relational database.' },
  { name: 'Redis', url: 'https://redis.io/docs/', icon: <SiRedis className="text-[#DC382D]" />, desc: 'The open source, in-memory data store.' },
  { name: 'Vercel', url: 'https://vercel.com/docs', icon: <SiVercel className="text-white" />, desc: 'The Frontend Cloud. Build and deploy instantly.' },
  { name: 'Kubernetes', url: 'https://kubernetes.io/docs/home/', icon: <SiKubernetes className="text-[#326CE5]" />, desc: 'Production-Grade Container Orchestration.' },
  { name: 'Firebase', url: 'https://firebase.google.com/docs', icon: <SiFirebase className="text-[#FFCA28]" />, desc: 'An app development platform that helps you build and grow.' },
  { name: 'Supabase', url: 'https://supabase.com/docs', icon: <SiSupabase className="text-[#3ECF8E]" />, desc: 'The open source Firebase alternative.' },
];

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO title="Documentation" />
      <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-white selection:text-black">
        <Navbar />

        <main className="flex-1 pt-32 sm:pt-40 px-4 sm:px-6 pb-20 w-full max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
              OFFICIAL <br />
              <span className="text-white/20">DOCUMENTATION</span>
            </h1>
            <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Direct access to the official guides and references for the modern development stack.
            </p>
            
            <div className="relative max-w-xl mx-auto group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white/60 transition-colors" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-base text-white focus:outline-none focus:border-white/30 transition-all font-medium placeholder:text-white/20"
              />
            </div>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {documentationLinks
              .filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((doc) => (
                <a
                  key={doc.name}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 hover:bg-[#111] hover:-translate-y-1 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] flex flex-col h-full"
                >
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-14 h-14 rounded-[1rem] bg-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                      {doc.icon}
                    </div>
                    <h3 className="text-xl font-black text-white group-hover:text-white/80 transition-colors">
                      {doc.name}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-white/40 leading-relaxed mb-8 flex-grow font-medium">
                    {doc.desc}
                  </p>

                  <div className="flex items-center text-xs font-black tracking-widest uppercase text-white/30 group-hover:text-white transition-colors">
                    Read Documentation <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </a>
              ))}
          </div>

          {documentationLinks.filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/30 text-lg font-medium">No documentation found matching "{searchQuery}".</p>
            </div>
          )}

          {/* Global CTA */}
          <div className="max-w-6xl mx-auto mt-40 px-6">
            <div className="relative p-8 sm:py-8 sm:px-14 rounded-[1.5rem] bg-white text-black overflow-hidden group border border-white/10 shadow-2xl">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tighter leading-tight mb-4">
                    NEED MORE TOOLS?
                  </h3>
                  <p className="text-black/60 font-bold text-sm sm:text-base">
                    Discover platforms and software <br className="hidden sm:block" /> to supercharge your workflow.
                  </p>
                </div>
                <a 
                  href="/tools" 
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-10 sm:py-5 bg-black text-white rounded-full font-black uppercase tracking-widest text-[10px] sm:text-sm hover:scale-105 transition-all shadow-2xl w-full sm:w-auto text-center shrink-0"
                >
                  Explore Developer Tools
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
    </>
  );
};

export default Documentation;
