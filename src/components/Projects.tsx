import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    title: '3D Gaming Interface',
    description: 'Next-level gaming UI with immersive 3D elements and real-time animations',
    image: project2,
    tags: ['React', 'Three.js', 'GSAP'],
  },
  {
    id: 2,
    title: '3D Portfolio Website',
    description: 'Modern portfolio with Spline 3D integration and smooth animations',
    image: project3,
    tags: ['React', 'Spline', 'GSAP'],
  },
  {
    id: 3,
    title: 'Gaming Platform',
    description: 'Complete gaming website with character profiles and interactive elements',
    image: project4,
    tags: ['React', 'CSS3', 'JavaScript'],
  },
  {
    id: 4,
    title: 'Creative Portfolio',
    description: 'Animated portfolio with step-by-step tutorials and modern design',
    image: project6,
    tags: ['React', 'GSAP', 'CSS3'],
  },
  {
    id: 5,
    title: 'Animation Tools',
    description: 'Web animation tools platform with learn-by-doing approach',
    image: project5,
    tags: ['React', 'GSAP', 'WebGL'],
  },
  {
    id: 6,
    title: '3D Interactive Web',
    description: 'Interactive 3D web experience with email development tools',
    image: project1,
    tags: ['React', 'Three.js', 'Node.js'],
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
        stagger: 0.12,
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
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-card/20" />
      
      {/* Top divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Featured </span>
            <span className="bg-gradient-to-r from-[hsl(280,70%,50%)] to-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore my latest work showcasing cutting-edge web technologies, 3D interactions, 
            and immersive user experiences.
          </p>
        </div>

        {/* Projects grid - 3x2 layout */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(var(--primary)/0.2)] group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60" />
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full bg-[hsl(280,70%,50%)]/10 text-[hsl(280,70%,50%)] border border-[hsl(280,70%,50%)]/20 transition-all duration-300 hover:bg-[hsl(280,70%,50%)]/20"
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
