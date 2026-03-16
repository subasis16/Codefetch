import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiGrid, FiCode, FiStar, FiBook, FiSettings, FiBox, FiCpu, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/useAuth';

const Sidebar = ({ activeTab, onTabChange, isOpen, onClose }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiGrid size={20} />, path: '/dashboard' },
    { id: 'snippets', label: 'My Snippets', icon: <FiCode size={20} /> },
    { id: 'docs', label: 'Documentation', icon: <FiBook size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="w-8 h-8 bg-ossium-accent rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(202,255,51,0.4)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2V8H20" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 13H8" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 17H8" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 9H8" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-white text-lg tracking-tight">CodeFetch</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => (
            item.path ? (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => onTabChange && onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === item.id
                  ? 'bg-white/5 text-ossium-accent border border-white/5'
                  : 'text-ossium-muted hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => onTabChange && onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === item.id
                  ? 'bg-white/5 text-ossium-accent border border-white/5'
                  : 'text-ossium-muted hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            )
          ))}
        </nav>


        <div className="p-4 mt-auto border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <FiLogOut size={20} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
