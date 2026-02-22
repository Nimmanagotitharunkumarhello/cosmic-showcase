import { useState, useEffect } from 'react';
import { List, X } from '@phosphor-icons/react';
import gsap from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-menu',
        { opacity: 0, x: '100%' },
        { opacity: 1, x: '0%', duration: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo('.mobile-menu-link',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-strong py-4' : 'bg-transparent py-6'
        }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/Gemini_Generated_Image_glpvfiglpvfiglpv.png"
              alt="Logo"
              className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-lg shadow-sm shadow-primary/20"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
            className="hidden md:flex items-center px-6 py-2.5 rounded-full border border-primary text-primary text-sm font-medium transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
          >
            Hire Me
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu fixed inset-0 z-40 glass-strong md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="mobile-menu-link text-3xl font-light text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
              className="mobile-menu-link btn-glow text-lg mt-4"
            >
              Say Hello
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
