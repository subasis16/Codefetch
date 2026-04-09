
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiCommand, FiCheckCircle, FiSettings } from 'react-icons/fi';
import { guidesData } from '../data/guides';

const GuideCard = ({ guide }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-ossium-accent/30 transition-all duration-300">
      <div
        className="p-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <div className="text-3xl text-white">
              {guide.icon}
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-white max-w-[80%]">{guide.title}</h3>
              <button
                className={`p-2 rounded-full border border-white/10 transition-transform duration-300 text-white ${expanded ? 'rotate-180 bg-white/10' : 'hover:bg-white/5'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <p className="text-ossium-muted text-sm mb-4 leading-relaxed">{guide.description}</p>

            <div className="flex flex-wrap gap-2">
              {guide.tags.map((tag, index) => (
                <span key={index} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] uppercase font-bold tracking-wider text-ossium-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-6 pb-8 pt-2 border-t border-white/5 bg-black/20">
          <div className="space-y-8 mt-4">

            {/* Steps */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <FiCheckCircle className="text-ossium-accent" /> Setup Steps
              </h4>
              <div className="space-y-4">
                {guide.steps.map((step, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-white/10 last:border-0 pb-1">
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-ossium-accent ring-4 ring-[#121212]" />
                    <h5 className="text-white font-semibold text-sm mb-1">{step.title}</h5>
                    <p className="text-ossium-muted text-sm mb-3">{step.desc}</p>
                    {step.code && (
                      <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-3 font-mono text-xs text-gray-300 relative group">
                        <pre className="whitespace-pre-wrap break-all">{step.code}</pre>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(step.code);
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-white/10 rounded hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="text-[10px] text-white">Copy</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration / Notes */}
            {guide.config && (
              <div>
                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                  <FiSettings className="text-ossium-accent" /> Configuration
                </h4>
                <div className="bg-[#0f111a] p-4 rounded-lg border border-white/10 font-mono text-xs text-blue-300 overflow-x-auto">
                  <pre className="whitespace-pre">{guide.config}</pre>
                </div>
              </div>
            )}

            {/* Resources / Links */}
            {guide.resources && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guide.resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-4 bg-white/5 border border-white/5 rounded-lg hover:border-ossium-accent/30 hover:bg-white/10 transition-all group"
                  >
                    <div className="font-bold text-white text-sm mb-1 group-hover:text-ossium-accent transition-colors">{res.title}</div>
                    <div className="text-xs text-ossium-muted">{res.desc}</div>
                  </a>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

const Setup = () => {
  return (
    <div className="min-h-screen bg-ossium-darker flex flex-col font-sans">
      <Navbar />
      <div className="pt-24 pb-20 px-6 md:px-12 flex-1 max-w-7xl mx-auto w-full">

        <div className="mb-16 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Setup <span className="text-ossium-accent">Guides</span>
          </h1>
          <p className="text-ossium-muted text-lg max-w-2xl leading-relaxed">
            Essential configuration guides for modern development stacks.
            From authentication and payments to server environments and styling.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {guidesData.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Setup;
