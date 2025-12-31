import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.2 });

    // Animate tagline
    tl.fromTo('.hero-tagline',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    // Animate headline
    tl.fromTo('.hero-headline',
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
      '-=0.3'
    );

    // Animate subtitle
    tl.fromTo('.hero-subtitle',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );

    // Animate description
    tl.fromTo('.hero-description',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Animate buttons
    tl.fromTo('.hero-buttons',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    // Floating dots animation
    if (dotsRef.current) {
      const dots = dotsRef.current.querySelectorAll('.floating-dot');
      dots.forEach((dot, index) => {
        gsap.to(dot, {
          y: -20 + Math.random() * 40,
          x: -10 + Math.random() * 20,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.2,
        });
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fullscreen Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/orb-x3KbIiv7mkMK8ZOPA59TUCpF/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="scale-125"
          title="3D Orb Animation"
          style={{ pointerEvents: 'none' }}
        />
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
      </div>

      {/* Floating dots */}
      <div ref={dotsRef} className="absolute inset-0 pointer-events-none z-10">
        {/* Cyan dots */}
        <div className="floating-dot absolute w-3 h-3 rounded-full bg-primary top-[20%] left-[25%] opacity-80" />
        <div className="floating-dot absolute w-2 h-2 rounded-full bg-primary top-[60%] left-[15%] opacity-60" />
        <div className="floating-dot absolute w-4 h-4 rounded-full bg-primary/80 bottom-[35%] right-[20%] opacity-70" />
        
        {/* Purple/Pink dots */}
        <div className="floating-dot absolute w-2 h-2 rounded-full bg-[hsl(280,80%,60%)] top-[15%] left-[40%] opacity-60" />
        <div className="floating-dot absolute w-3 h-3 rounded-full bg-[hsl(320,80%,60%)] top-[25%] right-[30%] opacity-50" />
        <div className="floating-dot absolute w-2 h-2 rounded-full bg-[hsl(280,70%,50%)] bottom-[40%] left-[35%] opacity-40" />
        
        {/* Green dots */}
        <div className="floating-dot absolute w-3 h-3 rounded-full bg-emerald-400 top-[30%] right-[25%] opacity-70" />
        <div className="floating-dot absolute w-2 h-2 rounded-full bg-emerald-500 bottom-[30%] right-[35%] opacity-50" />
      </div>

      {/* Centered content */}
      <div 
        ref={contentRef}
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Tagline */}
        <p className="hero-tagline text-primary text-sm md:text-base tracking-[0.3em] uppercase mb-6 opacity-0">
          Welcome To My World
        </p>

        {/* Main headline */}
        <h1 className="hero-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 opacity-0">
          <span className="text-foreground">Hi, I'm </span>
          <span className="bg-gradient-to-r from-[hsl(280,80%,60%)] via-[hsl(320,80%,55%)] to-primary bg-clip-text text-transparent">
            Tharun
          </span>
        </h1>

        {/* Subtitle */}
        <h2 className="hero-subtitle text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 opacity-0">
          AI & ML Engineer
        </h2>

        {/* Description */}
        <p className="hero-description text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 opacity-0">
          Crafting intelligent solutions that inspire and engage through innovative 
          AI and cutting-edge technology. Specializing in machine learning with a 
          passion for creating impactful applications.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons flex flex-wrap items-center justify-center gap-4 opacity-0">
          <button 
            onClick={scrollToProjects}
            className="px-8 py-4 rounded-full border border-border/50 text-foreground font-medium transition-all duration-300 hover:bg-card/50 hover:border-border"
          >
            View My Work
          </button>
          <button 
            onClick={scrollToContact}
            className="px-8 py-4 rounded-full font-medium transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, hsl(185 85% 45%), hsl(185 85% 55%))',
              color: 'hsl(220 30% 6%)',
              boxShadow: '0 0 30px hsl(185 85% 50% / 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 50px hsl(185 85% 50% / 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 30px hsl(185 85% 50% / 0.4)';
            }}
          >
            Hire Me Now
          </button>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent z-10" />
    </section>
  );
};

export default Hero;
