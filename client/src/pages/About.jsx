import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const techStack = [
    'React', 'Vite', 'Tailwind CSS', 'React Router', 'React Icons'
  ];

  return (
    <div className="min-h-screen bg-ossium-darker text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-6 pb-20 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              About <span className="text-ossium-accent">The Dev</span>
            </h1>
            <p className="text-ossium-muted text-lg">A solo developer passionate about solving real problems</p>
          </div>

          <div className="bg-white rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transform hover:-translate-y-1 transition-transform duration-300 animate-scale-in">

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Subasis Panigrahi</h3>
              <p className="text-orange-500 font-bold mb-6 font-mono text-base">Founder & Full Stack Developer</p>

              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Building CodeFetch from ground up — designing, coding, and shipping every feature. Passionate about creating technology that empowers developers and streamlines their workflow.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
                <a href="https://github.com/subasis16" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.398.1 2.651.64.7 1.028 1.597 1.028 2.688 0 3.848-2.339 4.685-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.775.688.48C19.139 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/subasis-panigrahi-66a6b1352/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#0077b5] text-white font-bold rounded-lg hover:bg-[#006399] transition-colors shadow-[4px_4px_0px_0px_rgba(0,119,181,0.3)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,119,181,0.3)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  LinkedIn
                </a>
              </div>

              {/* Tech Stack Section */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Built With</h4>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded border border-gray-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
