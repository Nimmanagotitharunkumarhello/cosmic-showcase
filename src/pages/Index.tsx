import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <Helmet>
        <title>Nimmanagoti Tharun Kumar | AI & ML Engineer Portfolio</title>
        <meta 
          name="description" 
          content="AI & ML Engineer specializing in machine learning solutions, AI voice agents, and web development. Explore my projects and get in touch." 
        />
        <meta name="keywords" content="AI, ML, Machine Learning, Python, React, Portfolio, Developer" />
        <meta property="og:title" content="Nimmanagoti Tharun Kumar | AI & ML Engineer" />
        <meta property="og:description" content="Building intelligent solutions with machine learning and AI." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/" />
      </Helmet>

      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main content */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
