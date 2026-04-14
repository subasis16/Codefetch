import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-ossium-darker border-t border-white/5 py-12 sm:py-16 px-4 sm:px-6 relative z-10 safe-area-bottom">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">

        {/* Brand */}
        <div className="col-span-2 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6 w-max">
            <span className="text-white font-black text-xl tracking-tight">CODEFETCH</span>
          </Link>
          <p className="text-ossium-muted max-w-sm mb-6">
            The architectural companion for developers. Master syntax, system design, and engineering patterns in seconds.
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
            <li><Link to="/fundamentals" className="hover:text-white transition-colors">Fundamentals</Link></li>
            <li><Link to="/languages" className="hover:text-white transition-colors">Language Notes</Link></li>
            <li><Link to="/system-design" className="hover:text-white transition-colors">System Design</Link></li>
            <li><Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition-colors">My Notes</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="text-white font-bold mb-6">Resources</h4>
          <ul className="space-y-4 text-sm text-ossium-muted">
            <li><Link to="/cheatsheets" className="hover:text-white transition-colors">Cheat Sheets</Link></li>
            <li><Link to="/ai" className="hover:text-white transition-colors">AI Engineering</Link></li>
            <li><Link to="/errors" className="hover:text-white transition-colors">Bugs & Fixes</Link></li>
            <li><Link to="/tools" className="hover:text-white transition-colors">Developer Tools</Link></li>
            <li><Link to="/setup" className="hover:text-white transition-colors">Setup Guides</Link></li>
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
