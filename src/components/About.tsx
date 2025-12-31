import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GithubLogo, 
  Lightning,
  Robot,
  Brain,
  Code,
  Cpu,
  Globe,
  Terminal,
  Flask
} from '@phosphor-icons/react';
import profileImage from '@/assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Python', icon: Terminal },
  { name: 'Scikit-learn', icon: Flask },
  { name: 'FastAPI', icon: Lightning },
  { name: 'REST APIs', icon: Globe },
  { name: 'Prompt Engineering', icon: Robot },
  { name: 'AI Voice Agents', icon: Cpu },
  { name: 'React', icon: Code },
  { name: 'Git & GitHub', icon: GithubLogo },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const skillsContainer = skillsRef.current;

    if (!section || !image || !content || !skillsContainer) return;

    // Section fade in
    gsap.fromTo(section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

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
    const skillItems = skillsContainer.querySelectorAll('.skill-badge');
    gsap.fromTo(skillItems,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            About Me
          </span>
          <h2 className="section-heading">Who I Am</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile image */}
          <div ref={imageRef} className="relative mx-auto lg:mx-0">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full animate-spin-slow opacity-60" style={{
                background: 'conic-gradient(from 0deg, hsl(185 85% 50% / 0.5), hsl(260 80% 60% / 0.3), hsl(185 85% 50% / 0.5))',
                filter: 'blur(20px)',
              }} />
              
              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden glass border-2 border-primary/30 group">
                <img 
                  src={profileImage} 
                  alt="Nimmanagoti Tharun Kumar - AI & ML Engineer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary animate-float" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-glow-purple animate-float animation-delay-400" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed">
              I am an AI & ML intern focused on building practical machine-learning solutions 
              and AI voice agents. I work primarily with Python and classical ML techniques, 
              and I use prompt engineering to design effective AI workflows.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Alongside AI/ML, I build clean web interfaces using AI-assisted development and 
              have foundational backend experience for integrating models into applications. 
              I actively contribute to open-source programs like Social Winter of Code and 
              Elite Winter of Code, where I collaborate, learn from reviews, and ship real code.
            </p>
            <p className="text-foreground text-lg font-medium">
              My goal is to grow into a strong AI/ML engineer by working on real problems, 
              not just tutorials.
            </p>

            {/* Skills */}
            <div ref={skillsRef} className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <div key={skill.name} className="skill-badge">
                    <skill.icon size={18} className="text-primary" weight="light" />
                    <span className="text-foreground">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
