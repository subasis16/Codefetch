
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Notes from '../components/Notes';
import { SiTailwindcss, SiReact, SiNodedotjs, SiPython } from 'react-icons/si';
import { FiSearch, FiBook, FiLayout, FiZap, FiMenu, FiUser, FiLogOut, FiShield, FiClock } from 'react-icons/fi';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState(location.state?.tab || 'dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (location.state?.tab) {
      setCurrentTab(location.state.tab); // eslint-disable-line react-hooks/set-state-in-effect
    } else if (location.pathname === '/dashboard' && !location.state?.tab) {
      // Intentionally do nothing here to allow internal state to persist
      // unless we specifically want to reset on navigation
    }
  }, [location.state, location.pathname]);

  const documentationLinks = [
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com/docs', icon: <SiTailwindcss />, desc: 'Utility-first CSS framework.' },
    { name: 'React', url: 'https://react.dev', icon: <SiReact />, desc: 'The library for web and native user interfaces.' },
    { name: 'Node.js', url: 'https://nodejs.org/en/docs', icon: <SiNodedotjs />, desc: 'JavaScript runtime built on Chrome\'s V8 engine.' },
    { name: 'Vite', url: 'https://vitejs.dev/guide/', icon: <FiZap />, desc: 'Next Generation Frontend Tooling.' },
    { name: 'Next.js', url: 'https://nextjs.org/docs', icon: <FiLayout />, desc: 'The React Framework for the Web.' },
    { name: 'Vue.js', url: 'https://vuejs.org/guide/introduction.html', icon: <FiLayout />, desc: 'The Progressive JavaScript Framework.' },
    { name: 'Python', url: 'https://docs.python.org/3/', icon: <SiPython />, desc: 'The Python Language Reference.' },
    { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: <FiBook />, desc: 'Resources for developers, by developers.' },
  ];

  if (!user && currentTab !== 'docs') {
    // If not logged in and not looking at docs, show the login prompt nicely
    // tailored for the dashboard home
  }

  return (
    <div className="min-h-screen bg-ossium-darker text-ossium-text flex">
      <Sidebar
        activeTab={currentTab}
        onTabChange={setCurrentTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 w-full min-w-0 md:ml-64 ml-0 p-4 md:p-8 transition-all duration-300">
        {/* Search & Header */}
        <div className="sticky top-0 z-30 bg-ossium-darker/80 backdrop-blur-md pb-6 pt-2">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  className="md:hidden text-white p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <FiMenu size={24} />
                </button>
                <h1 className="text-2xl font-bold capitalize text-white">{currentTab === 'docs' ? 'Documentation' : (currentTab === 'dashboard' ? 'My Profile' : currentTab)}</h1>
              </div>

              {currentTab === 'docs' && (
                <div className="relative w-full sm:w-64 md:w-96 group">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ossium-muted group-focus-within:text-ossium-accent transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search docs..."
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-ossium-accent/50 transition-colors placeholder:text-ossium-muted/50 cursor-pointer text-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto mt-4">

          {/* User Profile / Dashboard Home */}
          {currentTab === 'dashboard' && (
            <div className="flex flex-col items-center justify-center py-10">
              {user ? (
                <div className="w-full max-w-4xl space-y-12">
                  {/* Classic Profile Header */}
                  <div className="flex flex-col md:flex-row items-center gap-8 pb-12 border-b border-white/5">
                    <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-4xl font-light text-white overflow-hidden shadow-2xl">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-center md:text-left space-y-1">
                      <p className="text-white/40 font-mono text-sm tracking-widest">{user.email}</p>
                    </div>
                  </div>

                  {/* Clean Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Last Active Session</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-white">{new Date(user.last_sign_in_at).toLocaleDateString()}</span>
                        <span className="text-sm font-mono text-white/40">{new Date(user.last_sign_in_at).toLocaleTimeString()}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Unique Identifier</p>
                      <p className="font-mono text-xs text-white/60 bg-white/5 px-4 py-2 rounded-lg border border-white/5 break-all">
                        {user.id}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-[#121212] border border-white/5 rounded-xl p-8">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-ossium-muted">
                    <FiUser size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Login to Dashboard</h2>
                  <p className="text-ossium-muted max-w-md mb-8">
                    Access your profile, manage your settings, and view your personal snippets.
                  </p>
                  <Link
                    to="/login"
                    className="px-8 py-3 bg-ossium-accent text-ossium-darker font-bold rounded-lg hover:bg-ossium-accent-hover transition-all"
                  >
                    Log In to Continue
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Documentation Grid */}
          {currentTab === 'docs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {documentationLinks
                .filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((doc) => (
                  <a
                    key={doc.name}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-[#121212] border border-white/5 rounded-xl p-6 hover:border-ossium-accent/30 transition-all duration-300 hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform text-white">
                        {doc.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-ossium-accent transition-colors">
                        {doc.name}
                      </h3>
                    </div>

                    <p className="text-sm text-ossium-muted mb-4 leading-relaxed h-10">
                      {doc.desc}
                    </p>

                    <div className="flex items-center text-xs font-mono text-ossium-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      Read Documentation &rarr;
                    </div>
                  </a>
                ))}
            </div>
          )}


          {/* Notes / Snippets Section */}
          {(currentTab === 'snippets' || currentTab === 'notes') && (
            user ? (
              <Notes />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-ossium-muted">
                  <FiBook size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Login to access Notes</h2>
                <p className="text-ossium-muted max-w-md mb-8">
                  Create, save, and manage your personal coding snippets and cheat sheets securely in the cloud.
                </p>
                <Link
                  to="/login"
                  className="px-8 py-3 bg-ossium-accent text-ossium-darker font-bold rounded-lg hover:bg-ossium-accent-hover transition-all"
                >
                  Log In to Continue
                </Link>
              </div>
            )
          )}

          {/* Work in progress placeholder for other tabs */}
          {currentTab !== 'dashboard' && currentTab !== 'docs' && currentTab !== 'snippets' && currentTab !== 'notes' && (
            <div className="flex flex-col items-center justify-center py-20 text-ossium-muted">
              <h3 className="text-xl font-bold text-white mb-2">Work in Progress</h3>
              <p>The {currentTab} section is currently under development.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
