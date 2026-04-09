import React from 'react';

const Workflow = () => {
  return (
    <section className="py-24 px-6 border-y border-white/5 bg-[#080808] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-32 bg-ossium-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* Text Content */}
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-ossium-accent to-white/50">Vibe Coders</span>.
          </h2>
          <p className="text-lg text-ossium-muted leading-relaxed font-light">
            Designed for high-velocity engineering. Access comprehensive documentation, troubleshoot errors instantly, and maintain your personal knowledge base—all in one secure platform.
          </p>

          <ul className="space-y-4 pt-4">
            {[
              'Comprehensive Syntax Cheat Sheets',
              'Common Bugs & Fixes Database',
              'Personal Cloud Developer Notes',
              'Architecture Blueprints & Roadmaps'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-ossium-muted hover:text-white transition-colors">
                <div className="h-5 w-5 rounded-full bg-ossium-accent/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-ossium-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual/Image Placeholder */}
        <div className="flex-1 w-full">
          <div className="relative rounded-xl bg-ossium-card border border-white/10 p-4 shadow-2xl skew-y-1 transform hover:skew-y-0 transition-transform duration-500">
            {/* Fake Code Window */}
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-gray-500/50"></div>
              <div className="ml-auto text-xs text-ossium-muted font-mono">search.tsx</div>
            </div>

            <div className="space-y-3 font-mono text-sm opacity-90">
              <div className="flex">
                <span className="text-pink-500 mr-2">const</span>
                <span className="text-blue-400 mr-2">VibeMode</span>
                <span className="text-white">=</span>
                <span className="text-yellow-300 ml-2">()</span>
                <span className="text-white ml-2">=&gt;</span>
                <span className="text-white ml-2">{'{'}</span>
              </div>
              <div className="pl-4">
                <span className="text-pink-500">return</span>
                <span className="text-white ml-2">(</span>
              </div>
              <div className="pl-8 text-gray-400">
                &lt;FlowState speed={'{100}'} /&gt;
              </div>
              <div className="pl-4 text-white">);</div>
              <div className="text-white">{'}'};</div>

              <div className="h-4"></div>
              <div className="flex items-center gap-2 p-2 bg-[#2a2a2a] rounded text-xs border border-ossium-accent/30 text-ossium-accent w-max animate-pulse">
                <span>⚡</span>
                <span>Optimized for speed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
