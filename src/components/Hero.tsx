import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from '@phosphor-icons/react';

const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.2 });

    // Animate headline
    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    // Animate subtitle
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );

    // Animate CTA
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Animate Spline container
    tl.fromTo(splineRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
      '-=1'
    );

    // Floating orbs animation
    if (orbsRef.current) {
      const orbs = orbsRef.current.querySelectorAll('.glow-orb');
      orbs.forEach((orb, index) => {
        gsap.to(orb, {
          y: -30,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
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
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Light beam from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[800px] opacity-30" style={{
        background: 'conic-gradient(from 90deg at 50% 0%, transparent 60deg, hsl(185 85% 50% / 0.1) 90deg, transparent 120deg)',
      }} />

      {/* Decorative X marks like reference */}
      <div className="absolute top-1/4 left-[15%] text-border/30 text-6xl font-thin select-none">×</div>
      <div className="absolute top-1/4 right-[15%] text-border/30 text-6xl font-thin select-none">×</div>
      <div className="absolute bottom-1/3 left-[10%] text-border/20 text-4xl font-thin select-none">×</div>
      <div className="absolute bottom-1/4 right-[10%] text-border/20 text-4xl font-thin select-none">×</div>
      
      {/* Floating glow orbs */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="glow-orb w-96 h-96 -top-20 -left-20 opacity-40" />
        <div className="glow-orb w-64 h-64 top-1/3 right-1/4 opacity-30" />
        <div className="glow-orb w-48 h-48 bottom-1/4 left-1/3 opacity-25" style={{ background: 'radial-gradient(circle, hsl(260 80% 60% / 0.3), transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-primary/80 text-sm tracking-widest uppercase">Introducing</span>
            </div>
            <h1 
              ref={headlineRef} 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight opacity-0"
            >
              <span className="text-foreground">Hi, I'm </span>
              <span className="gradient-text block">Nimmanagoti</span>
              <span className="gradient-text block">Tharun Kumar</span>
              <span className="block text-2xl sm:text-3xl md:text-4xl font-light text-muted-foreground mt-4">
                AI & ML Engineer
              </span>
            </h1>

            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed opacity-0"
            >
              Building intelligent solutions with machine learning, AI voice agents, 
              and clean web interfaces. Turning complex problems into elegant code.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
              <button onClick={scrollToContact} className="btn-glow text-primary-foreground">
                Say Hello 👋
              </button>
              <button onClick={scrollToProjects} className="btn-outline-glow">
                View Projects
              </button>
            </div>
          </div>

          {/* Right content - Spline 3D */}
          <div 
            ref={splineRef}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] opacity-0"
          >
            <iframe 
              src='https://my.spline.design/orb-x3KbIiv7mkMK8ZOPA59TUCpF/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="rounded-2xl"
              title="3D Orb Animation"
            />
            {/* Glow effect behind spline */}
            <div className="absolute inset-0 -z-10 rounded-2xl" style={{ 
              background: 'radial-gradient(circle at center, hsl(185 85% 50% / 0.2), transparent 60%)',
              filter: 'blur(40px)'
            }} />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-muted-foreground text-sm">Scroll</span>
          <ArrowDown size={20} className="text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
