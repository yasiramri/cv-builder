import React from 'react';
import Navbar from '../components/Navbar';
import TypingBanner from '../components/TypingBanner';
import KeyFeatures from '../components/KeyFeatures';
import CVSection from '../components/CVSection';
import Footer from '../components/Footer';
import CVBuilderPage from './CVBuilderPage';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <TypingBanner />
      <KeyFeatures />
      <CVSection />
      <CVBuilderPage />
      <Footer />
    </>
  );
};

export default HomePage;
