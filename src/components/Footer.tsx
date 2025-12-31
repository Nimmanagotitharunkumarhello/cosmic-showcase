import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, GithubLogo, LinkedinLogo } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    const particles = particlesRef.current;

    if (!footer || !content || !particles) return;

    // Content animation
    gsap.fromTo(content,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
        }
      }
    );

    // Create floating particles
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-primary/20';
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particles.appendChild(particle);

      // Animate each particle
      gsap.to(particle, {
        y: -30 - Math.random() * 20,
        x: (Math.random() - 0.5) * 20,
        opacity: Math.random() * 0.5 + 0.2,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: Math.random() * 2,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (particles) {
        particles.innerHTML = '';
      }
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      ref={footerRef} 
      className="relative py-12 overflow-hidden border-t border-border/30"
    >
      {/* Particles container */}
      <div 
        ref={particlesRef} 
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />

      <div 
        ref={contentRef}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & copyright */}
          <div className="text-center md:text-left">
            <a 
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              className="text-2xl font-bold gradient-text inline-block mb-2"
            >
              TK
            </a>
            <p className="text-muted-foreground text-sm flex items-center gap-1 justify-center md:justify-start">
              Made with <Heart size={14} weight="fill" className="text-destructive" /> by Tharun Kumar
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex items-center gap-6">
            {['Home', 'About', 'Projects', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(`#${link.toLowerCase()}`); }}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <GithubLogo size={20} weight="light" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <LinkedinLogo size={20} weight="light" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
