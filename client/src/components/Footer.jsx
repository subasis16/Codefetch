import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-ossium-darker border-t border-white/5 py-12 sm:py-16 px-4 sm:px-6 relative z-10 safe-area-bottom">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">

        {/* Brand */}
        <div className="col-span-2 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6 w-max">
            <div className="w-6 h-6 bg-ossium-accent rounded flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg">CodeFetch</span>
          </Link>
          <p className="text-ossium-muted max-w-sm mb-6">
            The developer companion. Recall syntax, patterns, and docs in seconds. Built for the modern web.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/subasis16" target="_blank" rel="noopener noreferrer" className="text-white hover:text-ossium-accent transition-colors text-sm font-medium">GitHub</a>
            <a href="https://www.linkedin.com/in/subasis-panigrahi-66a6b1352/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-ossium-accent transition-colors text-sm font-medium">LinkedIn</a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="text-white font-bold mb-6">Platform</h4>
          <ul className="space-y-4 text-sm text-ossium-muted">
            <li><Link to="/cheatsheets" className="hover:text-white transition-colors">Cheat Sheets</Link></li>
            <li><Link to="/languages" className="hover:text-white transition-colors">Languages</Link></li>
            <li><Link to="/roadmap" className="hover:text-white transition-colors">Project Blueprints</Link></li>
            <li><Link to="/errors" className="hover:text-white transition-colors">Bugs & Fixes</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="text-white font-bold mb-6">Resources</h4>
          <ul className="space-y-4 text-sm text-ossium-muted">
            <li><Link to="/ai" className="hover:text-white transition-colors">AI Workflows</Link></li>
            <li><Link to="/tools" className="hover:text-white transition-colors">Developer Tools</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contribute</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-ossium-muted gap-4">
        <p>&copy; {new Date().getFullYear()} CodeFetch. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
