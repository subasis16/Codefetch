import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchModal from './components/SearchModal';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CheatSheets from './pages/CheatSheets';
import CheatSheetDetail from './pages/CheatSheetDetail';
import Languages from './pages/Languages';
import LanguageNotes from './pages/LanguageNotes';
import Errors from './pages/Errors';
import Tools from './pages/Tools';
import Roadmap from './pages/Roadmap';
import AIWorkflow from './pages/AIWorkflow';
import Setup from './pages/Setup';
import Fundamentals from './pages/Fundamentals';
import About from './pages/About';
import Login from './pages/Login';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider, useSearch } from './context/SearchContext';

import ScrollToTop from './components/ScrollToTop';

// Search Modal integration component
const GlobalSearch = () => {
  const { isSearchOpen, closeSearch } = useSearch();
  return <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <ScrollToTop />
          <GlobalSearch />
          <div className="min-h-screen bg-ossium-darker text-white overflow-x-hidden selection:bg-ossium-accent selection:text-ossium-darker font-sans">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cheatsheets" element={<CheatSheets />} />
              <Route path="/cheatsheets/:id" element={<CheatSheetDetail />} />
              <Route path="/languages" element={<Languages />} />
              <Route path="/languages/:id" element={<LanguageNotes />} />
              <Route path="/errors" element={<Errors />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/fundamentals" element={<Fundamentals />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/ai" element={<AIWorkflow />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </div>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
