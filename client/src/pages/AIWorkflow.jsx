import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  SiAnthropic, 
  SiOpenai, 
  SiPerplexity,
  SiX
} from 'react-icons/si';
import { FiCpu } from 'react-icons/fi';

const aiWorkflowData = {
  aiTools: [
    { name: "Claude", logo: <SiAnthropic />, color: "#d97757", link: "https://claude.ai" },
    { name: "ChatGPT", logo: <SiOpenai />, color: "#74aa9c", link: "https://chatgpt.com" },
    { name: "Perplexity", logo: <SiPerplexity />, color: "#00deff", link: "https://perplexity.ai" },
    { name: "Grok", logo: <SiX />, color: "#ffffff", link: "https://x.ai" },
    { name: "DeepSeek", logo: <FiCpu />, color: "#4d6bff", link: "https://deepseek.com" }
  ],
  promptFormat: [
    {
      step: "Role / Persona",
      content: "Act as a Senior [Tech Stack] Engineer with 10+ years of experience in [Domain].",
      desc: "Sets the tone and quality of established patterns the AI should follow."
    },
    {
      step: "Context",
      content: "I am working on a [Project Name] built with [Frameworks]. Here is the related folder structure and existing code: [PASTE_CODE].",
      desc: "Gives the AI the 'Map' so it doesn't hallucinate non-existent files or patterns."
    },
    {
      step: "Task",
      content: "Modify the [Component] to include [Feature]. Refactor the existing [Function] to improve [Metric].",
      desc: "The specific action you want the AI to take. Be extremely direct."
    },
    {
      step: "Constraints",
      content: "Do not use external libraries. Stick to Tailwind CSS. Keep the component under 100 lines. Use TypeScript strictly.",
      desc: "Crucial for preventing the AI from 'over-engineering' or using tools you don't want."
    },
    {
      step: "Format / Goal",
      content: "Return only the component code without explanation. Or: Provide a markdown table comparing the two approaches.",
      desc: "Saves time by removing unnecessary conversational fluff from the response."
    }
  ],
  prompts: [
    {
      title: "Component Refactoring",
      desc: "Split monolithic files into clean, maintainable sub-components with shared hooks.",
      code: "Source: [PASTE_FILE]\nTask: Extract this into separate components.\nRules:\n- Keep all hooks in the parent\n- Each child must accept only the props it needs\n- Use TypeScript interfaces for all props\n- Preserve existing class names exactly"
    },
    {
      title: "Type Safety from JSON",
      desc: "Generate Zod schemas or TypeScript interfaces from any raw API response.",
      code: "Input JSON:\n[PASTE_API_RESPONSE]\n\nTask: Generate:\n1. A strict Zod schema with proper validations\n2. An inferred TypeScript type using z.infer\n3. A parsing utility function with error handling"
    },
    {
      title: "Debug Stack Traces",
      desc: "Paste an error stack trace and get the root cause with a step-by-step fix.",
      code: "Error:\n[PASTE_STACK_TRACE]\n\nContext:\n- Framework: [React/Next.js/Express/etc.]\n- Node version: [VERSION]\n- Last change: [WHAT_YOU_CHANGED]\n\nTask: Identify the root cause and give me\nthe exact fix with code."
    },
    {
      title: "Performance Audit",
      desc: "Find rendering bottlenecks, memory leaks, and unnecessary re-renders.",
      code: "Component: [PASTE_CODE]\n\nTask: Audit this for performance issues.\nCheck for:\n- Unnecessary re-renders\n- Missing memoization (useMemo/useCallback)\n- Expensive computations in render\n- Memory leaks in useEffect\n- Bundle size impact of imports"
    },
    {
      title: "API Route Generator",
      desc: "Generate complete REST or GraphQL endpoints from a data model description.",
      code: "Model: User\nFields: id, email, name, role, createdAt\nDatabase: PostgreSQL with Prisma\n\nTask: Generate:\n1. Prisma schema\n2. CRUD API routes (Next.js App Router)\n3. Input validation with Zod\n4. Error handling middleware\n5. TypeScript types for request/response"
    },
    {
      title: "Database Query Builder",
      desc: "Convert plain English into optimized SQL or NoSQL queries with indexes.",
      code: "Database: [PostgreSQL/MongoDB/MySQL]\n\nRequirement: Find all users who signed up\nin the last 30 days, have made at least\n3 purchases, and haven't logged in this week.\n\nTask: Write the query, suggest indexes,\nand explain the execution plan."
    },
    {
      title: "Test Suite Generator",
      desc: "Create unit tests, integration tests, and edge case coverage from existing code.",
      code: "Source: [PASTE_FUNCTION_OR_COMPONENT]\nFramework: [Jest/Vitest/Playwright]\n\nTask: Generate tests covering:\n1. Happy path scenarios\n2. Edge cases (null, empty, boundary)\n3. Error handling paths\n4. Mock external dependencies\n5. Type assertion checks"
    },
    {
      title: "Code Review Prompt",
      desc: "Get a senior-level code review with actionable feedback on any PR diff.",
      code: "Diff:\n[PASTE_GIT_DIFF]\n\nTask: Review this like a senior engineer.\nCheck for:\n- Security vulnerabilities\n- Performance issues\n- Code style / naming\n- Missing error handling\n- Race conditions\n- Better patterns available\nRate severity: Critical / Warning / Nit"
    },
    {
      title: "Documentation Writer",
      desc: "Auto-generate JSDoc, README sections, or architectural docs from source code.",
      code: "Source: [PASTE_CODE]\n\nTask: Generate documentation including:\n1. JSDoc comments for all exports\n2. A README section explaining usage\n3. Example code snippets\n4. Parameter descriptions\n5. Return type explanations"
    },
    {
      title: "Migration Assistant",
      desc: "Convert code between frameworks, languages, or major version upgrades.",
      code: "Current: [PASTE_CODE]\nFrom: [React Class Components / Express 4 / etc.]\nTo: [React Hooks / Express 5 / etc.]\n\nTask: Migrate this code preserving:\n- All existing functionality\n- Error handling\n- Type safety\n- Performance characteristics\nHighlight breaking changes."
    },
    {
      title: "Regex Pattern Builder",
      desc: "Generate and explain complex regex patterns from plain English descriptions.",
      code: "Need: A regex that matches email addresses\nthat are from company domains only\n(not gmail, yahoo, hostmail)\n\nTask:\n1. Write the regex pattern\n2. Explain each part step by step\n3. Provide test cases (valid + invalid)\n4. Show usage in JavaScript\n5. Note any edge cases it misses"
    },
    {
      title: "CI/CD Pipeline Builder",
      desc: "Generate GitHub Actions, GitLab CI, or Jenkins pipelines from project requirements.",
      code: "Project: [React/Node.js/Python] app\nDeployment: [Vercel/AWS/Docker]\n\nTask: Create a CI/CD pipeline that:\n1. Runs linting and type checking\n2. Runs test suite\n3. Builds production bundle\n4. Deploys to staging on PR\n5. Deploys to production on main merge\n6. Sends Slack notification on failure"
    },
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
      className="absolute top-0 right-0 p-2 transition-all opacity-0 group-hover/code:opacity-100"
      title="Copy prompt"
    >
      <span className={`text-[9px] font-black tracking-[0.2em] uppercase ${copied ? 'text-green-400' : 'text-white/30 hover:text-white'}`}>
        {copied ? 'COPIED' : 'COPY'}
      </span>
    </button>
  );
};

const AIWorkflow = () => {
  return (
    <div className="min-h-screen bg-ossium-darker text-white font-sans flex flex-col selection:bg-ossium-accent selection:text-black">
      <Navbar />

      <main className="flex-1 pt-32 px-6 pb-32 max-w-[1400px] mx-auto w-full">
        
        {/* Header Section */}
        <div className="mb-24 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
            AI ENGINEERING
          </h1>
          <p className="text-ossium-muted text-sm font-light leading-relaxed max-w-3xl mb-8">
            Strategic prompt engineering framework and essential templates for modern developers working with:
          </p>
          
          {/* Integrated AI Logos */}
          <div className="flex items-center gap-6 opacity-60">
            {aiWorkflowData.aiTools.map((tool, idx) => (
              <a
                key={idx}
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl transition-all hover:scale-110 hover:opacity-100"
                style={{ color: tool.color }}
                title={tool.name}
              >
                {tool.logo}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-32">
          
          {/* Main Content: Prompt Engineering Framework */}
          <section className="animate-fade-in-up">
            <div className="mb-12">
              <h3 className="text-lg font-black text-white mb-1 uppercase tracking-widest">Anatomy of a Perfect Prompt</h3>
              <p className="text-ossium-muted text-xs">Standardize your interactions for zero-hallucination code generation.</p>
            </div>
            
            <div className="space-y-12">
              {aiWorkflowData.promptFormat.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-6 md:gap-12 items-start group/code">
                  <div className="md:w-1/4">
                    <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-2">
                      <span className="text-ossium-accent mr-3">{String(idx + 1).padStart(2, '0')}</span>
                      {item.step}
                    </h4>
                    <p className="text-white/40 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex-1 w-full relative group/code bg-[#0a0a0a] border border-white/10 rounded-lg p-5">
                    <CopyButton text={item.content} />
                    <pre className="font-mono text-[11px] leading-relaxed text-white/70 whitespace-pre-wrap pr-8">
                      {item.content}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Prompt Templates */}
          <section className="animate-fade-in-up">
            <div className="mb-12">
              <h3 className="text-lg font-black text-white mb-1 uppercase tracking-widest">Action Templates</h3>
              <p className="text-ossium-muted text-xs">Ready-to-use structures for common development tasks.</p>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-16">
              {aiWorkflowData.prompts.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-6 items-start pb-16 border-b border-white/5 xl:border-b-0 xl:pb-0">
                  <div className="w-full">
                    <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-3">{item.title}</h3>
                    <p className="text-white/40 text-[11px] leading-relaxed mb-4">{item.desc}</p>
                  </div>
                  <div className="flex-1 w-full relative group/code bg-[#0a0a0a] border border-white/10 rounded-lg p-5">
                    <CopyButton text={item.code} />
                    <pre className="font-mono text-[11px] leading-relaxed text-ossium-accent/80 whitespace-pre-wrap pr-8">
                      {item.code}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIWorkflow;
