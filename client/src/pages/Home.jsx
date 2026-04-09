import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryCards from '../components/CategoryCards';
import Workflow from '../components/Workflow';
import CoreConceptsOverview from '../components/CoreConceptsOverview';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

function Home() {
  return (
    <>
      <SEO title="Home" />
      <Navbar />
      <main className="bg-black">
        <Hero />
        <CategoryCards />
        <Workflow />
        <CoreConceptsOverview />
      </main>
      <Footer />
    </>
  );
}

export default Home;
