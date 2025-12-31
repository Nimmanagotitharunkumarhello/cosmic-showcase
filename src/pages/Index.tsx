import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Preloader from '@/components/Preloader';
import EnterScreen from '@/components/EnterScreen';
import MouseCursor from '@/components/MouseCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showEnterScreen, setShowEnterScreen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    setShowEnterScreen(true);
  }, []);

  const handleEnter = useCallback(() => {
    setShowEnterScreen(false);
    setHasEntered(true);
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

      {/* Mouse cursor - show on enter screen and after */}
      {(showEnterScreen || hasEntered) && <MouseCursor />}

      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Enter Screen */}
      {showEnterScreen && <EnterScreen onEnter={handleEnter} />}

      {/* Main content */}
      <div className={`transition-opacity duration-500 ${hasEntered ? 'opacity-100' : 'opacity-0'}`}>
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
