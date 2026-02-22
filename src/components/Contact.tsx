import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GithubLogo,
  LinkedinLogo
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;

    if (!section || !header) return;

    // Header animation
    gsap.fromTo(header,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl z-0" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div ref={headerRef} className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-foreground tracking-tight">
            Contact
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mb-8 leading-relaxed max-w-xl font-medium">
            I'm currently looking to join a cross-functional team that values improving people's lives through accessible design, or have a project in mind? Let's connect.
          </p>

          <a href="mailto:nimmanagotitarunkumar@gmail.com" className="text-lg md:text-xl font-bold text-foreground hover:text-primary transition-colors mb-12 inline-block tracking-wide">
            nimmanagotitarunkumar@gmail.com
          </a>

          {/* Social links */}
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/Nimmanagotitharunkumarhello"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <GithubLogo size={20} weight="fill" className="md:w-6 md:h-6" />
            </a>
            <a
              href="https://linkedin.com/in/tharun-kumar-"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <LinkedinLogo size={20} weight="fill" className="md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-3/4 max-w-4xl h-px bg-white/5 mt-24"></div>
    </section>
  );
};

export default Contact;
