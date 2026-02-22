import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Globe,
  Lightning,
  Code,
  Cpu,
  Brain,
  GitBranch,
  Terminal,
  Robot
} from '@phosphor-icons/react';
import profileImage from '@/assets/profiiii.png';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Python', icon: Terminal },
  { name: 'Scikit-learn', icon: Brain },
  { name: 'FastAPI', icon: Lightning },
  { name: 'REST APIs', icon: Globe },
  { name: 'Prompt Eng', icon: Robot },
  { name: 'AI Agents', icon: Cpu },
  { name: 'React', icon: Code },
  { name: 'GitHub', icon: GitBranch },
];

const paragraphs = [
  "I am an AI & ML intern focused on building practical machine-learning solutions and AI voice agents. I work primarily with Python and classical ML techniques, and I use prompt engineering to design effective AI workflows.",
  "Alongside AI/ML, I build clean web interfaces using AI-assisted development and have foundational backend experience for integrating models into applications. I actively contribute to open-source programs like Social Winter of Code and Elite Winter of Code.",
  "My goal is to grow into a strong AI/ML engineer by working on real problems, not just tutorials."
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [activePara, setActivePara] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const skillsContainer = skillsRef.current;

    if (!section || !image || !content || !skillsContainer) return;

    // Image animation
    gsap.fromTo(image,
      { opacity: 0, x: -100, filter: 'blur(10px)' },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        }
      }
    );

    // Content animation
    gsap.fromTo(content,
      { opacity: 0, y: 50, filter: 'blur(5px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        }
      }
    );

    // Skills stagger animation
    const skillItems = skillsContainer.querySelectorAll('.skill-card');
    gsap.fromTo(skillItems,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: skillsContainer,
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
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      {/* Floating dots */}
      <div className="absolute top-1/4 right-1/3 w-3 h-3 rounded-full bg-[hsl(280,70%,50%)] opacity-60 animate-float" />
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-primary opacity-50 animate-float animation-delay-200" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Profile image - CENTERED */}
          <div ref={imageRef} className="relative flex justify-center items-end h-[400px] md:h-[580px] w-full max-w-[500px] mx-auto">
            {/* 
              Background Circle. 
              This represents the "base" of the circle shape. 
            */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[340px] h-[340px] md:w-[480px] md:h-[480px] bg-[#1a1a24] rounded-full -z-10 border border-white/5 shadow-2xl" />

            {/* 
              Profile Profile Container with complex clipping/masking.
              We want the bottom half to be perfectly circular (matching the background circle), 
              but the top half needs to break free of the circle.
            */}
            <div className="relative w-full h-full flex justify-center items-end pb-8 z-10 transition-transform duration-700 hover:-translate-y-2"
              style={{
                // This mask creates a shape that is rectangular at the top and circular at the bottom.
                // The bottom part of the mask is an ellipse that matches the shape of our circular background.
                // The top part is a rectangle that allows the head and shoulders to pop out.
                maskImage: 'radial-gradient(ellipse 50% 50% at 50% auto, black 100%, transparent 100%), linear-gradient(black, black)',
                maskSize: '100% 340px, 100% calc(100% - 170px)', // Bottom circle height, Top rectangle height
                maskPosition: 'bottom center, top center',
                maskRepeat: 'no-repeat',
                WebkitMaskImage: 'radial-gradient(170px 170px at 50% calc(100% - 170px), black 100%, transparent 100%), linear-gradient(black, black)',
                WebkitMaskSize: '100% 100%, 100% calc(100% - 170px)',
                WebkitMaskPosition: 'bottom center, top center',
                WebkitMaskRepeat: 'no-repeat',
              }}>
              {/* For mobile md breakpoint adjust sizes */}
              <style suppressHydrationWarning>{`
                    @media (min-width: 768px) {
                      .profile-mask-container {
                         -webkit-mask-image: radial-gradient(240px 240px at 50% calc(100% - 240px), black 100%, transparent 100%), linear-gradient(black, black) !important;
                         -webkit-mask-size: 100% 100%, 100% calc(100% - 240px) !important;
                      }
                    }
                 `}</style>

              <div className="profile-mask-container w-full h-full flex justify-center items-end"
                style={{
                  WebkitMaskImage: 'radial-gradient(170px 170px at 50% calc(100% - 170px), black 100%, transparent 100%), linear-gradient(black, black)',
                  WebkitMaskSize: '100% 100%, 100% calc(100% - 170px)',
                  WebkitMaskPosition: 'bottom center, top center',
                  WebkitMaskRepeat: 'no-repeat',
                }}>

                <img
                  src={profileImage}
                  alt="Nimmanagoti Tharun Kumar - AI & ML Engineer"
                  className="w-[340px] md:w-[480px] h-[380px] md:h-[540px] object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0"
                />
              </div>

            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="space-y-8">
            {/* Title */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                <span className="text-foreground">About </span>
                <span className="bg-gradient-to-r from-primary to-[hsl(280,70%,50%)] bg-clip-text text-transparent">Me</span>
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full" />
            </div>

            {/* Bio text - Click to glow */}
            <div className="space-y-4">
              {paragraphs.map((text, index) => (
                <p
                  key={index}
                  onClick={() => setActivePara(activePara === index ? null : index)}
                  className={`leading-relaxed cursor-pointer transition-all duration-500 ${activePara === index
                    ? 'text-foreground font-medium drop-shadow-[0_0_10px_hsl(185,85%,50%)]'
                    : 'text-muted-foreground hover:text-muted-foreground/80'
                    }`}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-primary to-[hsl(280,70%,50%)] bg-clip-text text-transparent">
                Tech Stack
              </h3>
              <div ref={skillsRef} className="grid grid-cols-4 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-card glass flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 group"
                  >
                    <skill.icon
                      size={24}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                      weight="light"
                    />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="px-6 py-3 rounded-full border border-primary/30 text-primary text-sm font-medium">
                Open Source Contributor
              </div>
              <div className="px-6 py-3 rounded-full bg-primary/10 border border-primary/50 text-primary text-sm font-medium">
                AI/ML Intern
              </div>
              <div className="px-6 py-3 rounded-full border border-[hsl(280,70%,50%)]/30 text-[hsl(280,70%,50%)] text-sm font-medium">
                Full Stack Developer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
