import React from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiLayout, FiServer, FiCpu, FiGitBranch, FiTerminal, FiArrowRight } from 'react-icons/fi';

const categories = [
  { id: 'cheatsheets', name: 'Cheat Sheets', icon: <FiFileText />, desc: 'Quick references, Syntax guides', path: '/cheatsheets' },
  { id: 'frontend', name: 'Frontend', icon: <FiLayout />, desc: 'React, Vue, Tailwind', path: '/languages' },
  { id: 'backend', name: 'Backend', icon: <FiServer />, desc: 'Node, Go, Python', path: '/languages' },
  { id: 'ai', name: 'AI Engineering', icon: <FiCpu />, desc: 'LLMs, RAG, LangChain', path: '/ai' },
  { id: 'git', name: 'Git & DevOps', icon: <FiGitBranch />, desc: 'Commands, Workflows', path: '/cheatsheets' },
  { id: 'terminal', name: 'Terminal', icon: <FiTerminal />, desc: 'Zsh, Bash, Powershell', path: '/cheatsheets' },
];

const CategoryCards = () => {
  return (
    <section className="pt-8 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Quick Access</h2>
            <p className="text-ossium-muted text-base sm:text-lg">Essential resources for your daily workflow.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className="group relative p-6 sm:p-8 bg-[#0f0f0f] rounded-xl border border-white/5 hover:border-ossium-accent/30 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="text-ossium-accent mb-4 sm:mb-6 text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300 origin-left">
                    {category.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-ossium-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-ossium-muted leading-relaxed">
                    {category.desc}
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 flex items-center gap-2 text-sm font-medium text-white group-hover:text-ossium-accent transition-colors">
                  Explore
                  <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
