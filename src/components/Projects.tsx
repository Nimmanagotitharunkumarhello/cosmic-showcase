import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from '@phosphor-icons/react';

import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';
import project5 from '@/assets/project-5.png';
import project6 from '@/assets/project-6.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: '3D Interactive Web',
    description: 'Email platform for developers with React, Three.js & Spline integration',
    image: project1,
    tags: ['React', 'Spline', 'GSAP'],
  },
  {
    id: 2,
    title: 'Gaming UI Platform',
    description: 'Next-level gaming interface with 3D characters and NFT store integration',
    image: project2,
    tags: ['React', 'Three.js', 'Web3'],
  },
  {
    id: 3,
    title: '3D Portfolio',
    description: 'Creative developer portfolio with immersive UI/UX and Spline models',
    image: project3,
    tags: ['Spline', 'React', 'CSS'],
  },
  {
    id: 4,
    title: 'Gaming Website',
    description: 'Modern gaming website with vibrant visuals and anime-style graphics',
    image: project4,
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 5,
    title: 'Web Animation Tools',
    description: 'Portfolio showcasing animation tools with Locomotive Scroll integration',
    image: project5,
    tags: ['React', 'Tailwind', 'GSAP'],
  },
  {
    id: 6,
    title: 'Animated Portfolio',
    description: 'Step-by-step animated portfolio with smooth transitions and modern design',
    image: project6,
    tags: ['CSS', 'JavaScript', 'GSAP'],
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!section || !header || !cardsContainer) return;

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

    // Cards stagger animation
    const cards = cardsContainer.querySelectorAll('.project-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsContainer,
          start: 'top 75%',
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
      id="projects" 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
            A collection of my recent work showcasing web development, 
            3D design, and interactive experiences.
          </p>
        </div>

        {/* Projects grid - Bento style */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card glow-border ${
                index === 0 || index === 3 ? 'lg:col-span-2 lg:row-span-1' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <button className="flex-shrink-0 w-10 h-10 rounded-full glass flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group">
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
