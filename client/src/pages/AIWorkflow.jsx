import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  FiCopy, 
  FiInfo, 
  FiGrid, 
  FiShield, 
  FiTerminal, 
  FiZap,
  FiLayers,
  FiUserCheck,
  FiMessageSquare,
  FiTarget,
  FiHelpCircle,
  FiLock,
  FiCheck
} from 'react-icons/fi';

const aiWorkflowData = {
  prompts: [
    {
      title: "Component Refactoring",
      desc: "Split large, monolithic files into maintainable sub-components with shared logic.",
      code: "Source: [FILE_CONTENT]\nTask: Extract UI into functional components. Keep hooks in the parent.",
      icon: FiGrid
    },
    {
      title: "Type Safety Generation",
      desc: "Automatically generate Zod schemas or TypeScript interfaces from raw JSON data.",
      code: "Input: [DATA_SAMPLE]\nTask: Generate a strict Zod schema and export a TypeScript inferred type.",
      icon: FiShield
    },
    {
      title: "Root Cause Debugging",
      desc: "Deep-dive into stack traces to identify environmental or logic-based race conditions.",
      code: "Error: [ERROR_LOG]\nContext: Next.js App Router\nTask: Locate the source of the hydration error.",
      icon: FiTerminal
    },
    {
      title: "Performance Optimization",
      desc: "Identify rendering bottlenecks and optimize React component lifecycles.",
      code: "Component: [FILE_CONTENT]\nTask: Identify unnecessary re-renders and implement useMemo/useCallback where appropriate.",
      icon: FiZap
    }
  ],
  guidelines: [
    { title: "Iterative Prompting", desc: "Don't prompt for a full feature at once. Build the interface, then the business logic, then the tests.", icon: FiLayers },
    { title: "Review as a Senior", desc: "Treat AI output like a PR from a junior developer. Read every line before merging into main.", icon: FiUserCheck },
    { title: "Context Management", desc: "Keep conversations short. Once a feature is done, start a new thread to avoid hallucination.", icon: FiMessageSquare },
    { title: "Explicit Constraints", desc: "Always define boundaries. Specify what NOT to change to prevent the AI from refactoring working code.", icon: FiTarget },
    { title: "Ask for Explanations", desc: "If you don't understand the generated code, ask the AI to break it down before implementing it.", icon: FiHelpCircle },
    { title: "Secure by Default", desc: "Never paste API keys, environment variables, or sensitive PII into AI chat prompts.", icon: FiLock }
  ]
};

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-md transition-all opacity-0 group-hover/code:opacity-100 flex items-center justify-center border border-white/10"
      title="Copy prompt"
    >
      {copied ? <FiCheck className="text-green-400" size={16} /> : <FiCopy className="text-ossium-muted" size={16} />}
    </button>
  );
};

const AIWorkflow = () => {
  return (
    <div className="min-h-screen bg-ossium-darker text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 px-6 pb-32 max-w-6xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="text-center mb-24 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">
            AI <span className="text-ossium-accent">Workflow</span>
          </h1>
          <p className="text-ossium-muted text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            High-velocity strategies for modern software engineering. 
            Ship faster by treating AI as a high-speed collaborator.
          </p>
        </div>

        <div className="space-y-32">
          
          {/* Section: Patterns */}
          <section className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] flex-1 bg-white/10"></div>
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white">
                Prompt Patterns
              </h2>
              <div className="h-[1px] flex-1 bg-white/10"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {aiWorkflowData.prompts.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:-translate-y-1 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.02)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.08)] flex flex-col h-full group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <Icon className="text-ossium-accent" size={24} />
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tight">{item.title}</h3>
                    </div>
                    <p className="text-gray-400 text-base leading-relaxed mb-8 flex-1">{item.desc}</p>
                    
                    <div className="relative group/code rounded-lg border border-white/5 bg-black/60 overflow-hidden mt-auto">
                      <div className="absolute top-0 left-0 w-1 h-full bg-ossium-accent/50"></div>
                      <CopyButton text={item.code} />
                      <pre className="p-6 pt-7 font-mono text-sm text-ossium-accent/80 whitespace-pre-wrap">
                        {item.code}
                      </pre>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Guidelines */}
          <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] flex-1 bg-white/10"></div>
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white">
                Core Fundamentals
              </h2>
              <div className="h-[1px] flex-1 bg-white/10"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(255,255,255,0.02)]">
              {aiWorkflowData.guidelines.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="p-8 border-b md:even:border-l border-white/10 last:border-b-0 md:[&:nth-last-child(1)]:border-b-0 md:[&:nth-last-child(2)]:border-b-0 hover:bg-white/[0.02] transition-colors relative group">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ossium-accent/0 group-hover:via-ossium-accent/20 to-transparent transition-all"></div>
                    <div className="flex items-start gap-5">
                      <div className="mt-1 p-2 bg-white/5 rounded-md border border-white/5">
                        <Icon className="text-ossium-muted group-hover:text-white transition-colors" size={20} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-ossium-accent transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default AIWorkflow;

