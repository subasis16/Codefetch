import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ossium-darker text-white font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          Terms of Service
        </h1>

        <div className="space-y-8 text-ossium-text leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using CodeFetch, you accept and agree to be bound by the terms and provision of this agreement.
              In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
            <p>
              CodeFetch provides users with access to a collection of resources, including developer cheat sheets, language guides, and tools.
              You understand and agree that the Service is provided "AS-IS" and that CodeFetch assumes no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Account</h2>
            <p>
              If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p>
              All content included on this site, such as text, graphics, logos, button icons, images, is the property of CodeFetch or its content suppliers and protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Termination</h2>
            <p>
              We may terminate your access to the Site, without cause or notice, which may result in the forfeiture and destruction of all information associated with you. All provisions of this Agreement that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <div className="pt-8 border-t border-white/5 text-sm text-ossium-muted">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
