
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projects } from '../data/blueprints';
import { FiChevronDown, FiCpu, FiLayers, FiCode, FiActivity, FiCreditCard, FiServer, FiDatabase } from 'react-icons/fi';

const TechCard = ({ tech }) => (
  <div className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/5 rounded-xl hover:border-ossium-accent/40 hover:bg-white/10 transition-all group">
    <div className="text-3xl mb-2 text-gray-400 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110">
      {tech.icon}
    </div>
    <span className="text-xs font-bold text-gray-300 group-hover:text-ossium-accent">{tech.name}</span>
    <span className="text-[10px] text-ossium-muted uppercase tracking-wider mt-1">{tech.type}</span>
  </div>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">
    <Icon className="text-ossium-accent" />
    {title}
  </h3>
);

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`relative bg-[#121212] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 ${expanded ? 'border-ossium-accent/30' : 'hover:border-ossium-accent/30'}`}>

      {/* Blueprint Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

      {/* Card Header / Summary */}
      <div
        className="relative z-10 p-6 sm:p-8 cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-8 bg-ossium-accent rounded-full" />
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight group-hover:text-ossium-accent transition-colors">
                {project.title}
              </h2>
            </div>
            <p className="text-ossium-muted text-base md:text-lg max-w-3xl leading-relaxed pl-5">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 pl-5 pt-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] uppercase font-bold tracking-wider text-ossium-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 pl-5 md:pl-0">
            <span className="text-xs font-bold text-ossium-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
              {expanded ? 'Close Blueprint' : 'View Architecture'}
            </span>
            <button className={`w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 group-hover:border-ossium-accent/50 group-hover:bg-ossium-accent/10 ${expanded ? 'rotate-180 bg-ossium-accent text-black' : ''}`}>
              <FiChevronDown size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <div className={`grid transition-all duration-500 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="p-6 sm:p-8 border-t border-white/5 bg-black/20">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

              {/* Left Column: Tech & Connections */}
              <div className="lg:col-span-7 space-y-10">

                {/* Tech Stack Grid */}
                <div>
                  <SectionHeader icon={FiLayers} title="Core Tech Stack" />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {project.techStack.map((tech, idx) => (
                      <TechCard key={idx} tech={tech} />
                    ))}
                  </div>
                </div>

                {/* Integrations & Services */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <SectionHeader icon={FiServer} title="External Services & APIs" />
                    <ul className="space-y-4">
                      {project.apis.map((api, idx) => (
                        <li key={idx} className="relative pl-6 text-sm text-ossium-muted">
                          <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full border border-ossium-accent" />
                          <strong className="text-gray-200 block mb-0.5">{api.name}</strong>
                          {api.description}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <SectionHeader icon={FiCreditCard} title="Monetization Logic" />
                    <div className="bg-white/5 border border-white/5 p-5 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gray-500/10 rounded-lg text-gray-400">
                          <FiActivity />
                        </div>
                        <span className="font-bold text-white">{project.payment.provider}</span>
                      </div>
                      <p className="text-xs text-ossium-muted leading-relaxed">
                        {project.payment.details}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Workflow Description */}
                <div>
                  <SectionHeader icon={FiCpu} title="System Flow" />
                  <div className="bg-white/5 border border-white/5 p-5 rounded-xl">
                    <p className="text-sm text-gray-300 leading-relaxed font-light">
                      {project.howItWorks}
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: File Structure - The "Blueprint" */}
              <div className="lg:col-span-5">
                <SectionHeader icon={FiCode} title="Project Structure" />
                <div className="relative group">
                  {/* Decorative window controls */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 rounded-t-xl border-b border-white/5 flex items-center px-4 gap-2 z-10">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-gray-500/80" />
                    <div className="ml-auto text-[10px] font-mono text-ossium-muted">explorer</div>
                  </div>

                  {/* Code Block */}
                  <div className="bg-[#0a0a0a] border border-white/5 rounded-xl pt-12 pb-4 px-4 overflow-x-auto h-full min-h-[400px] shadow-2xl">
                    <pre className="font-mono text-xs md:text-sm text-gray-400 leading-6 whitespace-pre">
                      {project.fileStructure}
                    </pre>
                  </div>

                  {/* Reflection Effect */}
                  <div className="absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Roadmap = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-ossium-darker pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="mb-16 text-center">
            <div className="inline-block p-2 px-4 rounded-full bg-ossium-accent/10 border border-ossium-accent/20 text-ossium-accent text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in-up">
              Architecture Patterns
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight animate-fade-in-up leading-tight">
              Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-ossium-accent to-gray-400">Blueprints</span>
            </h1>
            <p className="text-ossium-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
              Dissecting modern web applications. Explore the full-stack architecture, file systems, and integration patterns of production-grade software.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-20 py-12 border-t border-white/5 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Want a custom blueprint?</h3>
            <p className="text-ossium-muted mb-8 max-w-md">Request a specific architecture breakdown and we will add it to the library.</p>
            <button className="px-8 py-3 bg-[#1A1A1A] border border-white/10 text-white font-bold rounded-lg hover:bg-white/5 hover:border-ossium-accent/50 transition-all flex items-center gap-2">
              <FiDatabase /> Request Architecture
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Roadmap;
