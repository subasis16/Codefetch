import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SearchModal from './components/SearchModal';
const Home = React.lazy(() => import('./pages/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const CheatSheets = React.lazy(() => import('./pages/CheatSheets'));
const CheatSheetDetail = React.lazy(() => import('./pages/CheatSheetDetail'));
const Languages = React.lazy(() => import('./pages/Languages'));
const LanguageNotes = React.lazy(() => import('./pages/LanguageNotes'));
const Errors = React.lazy(() => import('./pages/Errors'));
const Tools = React.lazy(() => import('./pages/Tools'));
const Roadmap = React.lazy(() => import('./pages/Roadmap'));
const AIWorkflow = React.lazy(() => import('./pages/AIWorkflow'));
const Setup = React.lazy(() => import('./pages/Setup'));
const Fundamentals = React.lazy(() => import('./pages/Fundamentals'));
const About = React.lazy(() => import('./pages/About'));
const Login = React.lazy(() => import('./pages/Login'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
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
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <SearchProvider>
            <ScrollToTop />
            <GlobalSearch />
            <div className="min-h-screen bg-ossium-darker text-white w-full max-w-[100vw] overflow-x-hidden selection:bg-ossium-accent selection:text-ossium-darker font-sans">
              <React.Suspense fallback={<div className="min-h-screen bg-ossium-darker w-full h-full"></div>}>
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
                  <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
              </React.Suspense>
            </div>
          </SearchProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
