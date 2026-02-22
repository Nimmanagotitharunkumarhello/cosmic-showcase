import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe } from 'lucide-react';

import project1 from '@/assets/ai agent.webp';
import project3 from '@/assets/image.webp';
import project2 from '@/assets/book p3.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Ai VOICE AGENT',
    description: 'End-to-end AI voice system with speech recognition, text-to-speech, and intelligent intent handling. Designed for modern startups and futuristic digital products, it features immersive UI and a dynamic tone.',
    image: project1,
    tags: ['Speech Recognition', 'NLP', 'AI Integration', 'Voice Agent', 'LiveKit'],
    githubLink: 'https://github.com/Nimmanagotitharunkumarhello/ai_voice_agent.git',
    liveLink: 'https://github.com/Nimmanagotitharunkumarhello/ai_voice_agent.git'
  },
  {
    id: 2,
    title: 'Fake News Detector',
    description: 'A supervised learning model with TF-IDF feature extraction. Built to reimagined content verification and user experience - all in one easy-to-use interface.',
    image: project3,
    tags: ['Python', 'Scikit-learn', 'NLP'],
    githubLink: 'https://github.com/Nimmanagotitharunkumarhello/fake_news_detection.git',
    liveLink: 'https://github.com/Nimmanagotitharunkumarhello/fake_news_detection.git'
  },
  {
    id: 3,
    title: 'LLM Semantic Book Recommendation System',
    description: 'AI-powered search engine that uses Large Language Models and vector embeddings to recommend books based on their deep thematic meaning, emotional "vibe," and natural language descriptions.',
    image: project2, // Using the new image format
    tags: ['Python', 'OpenAI API', 'ChromaDB'],
    githubLink: 'https://github.com/Nimmanagotitharunkumarhello/LLM-Semantic-Book-Recommendation-System',
    liveLink: 'https://llm-semantic-book-recommendation-sy-three.vercel.app/?_vercel_share=yJYZLcZCfwPwusSpqD24GGUc24TJRk7i'
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const projectsContainer = projectsContainerRef.current;

    if (!section || !header || !projectsContainer) return;

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

    // Projects stagger animation
    const projectElements = projectsContainer.querySelectorAll('.project-item');
    projectElements.forEach((el, index) => {
      const isEven = index % 2 === 1;
      gsap.fromTo(el,
        { opacity: 0, x: isEven ? 50 : -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 overflow-hidden bg-background"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header optionally can be displayed, but kept hidden to match mockup without global header */}
        <div ref={headerRef} className="text-center mb-16 hidden">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Featured Projects
          </h2>
        </div>

        {/* Projects Stack Layout */}
        <div ref={projectsContainerRef} className="flex flex-col gap-24 md:gap-40 max-w-6xl mx-auto pt-10">
          {projects.map((project, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={project.id}
                className={`project-item relative flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-0`}
              >
                {/* Project Content */}
                <div className={`w-full lg:w-1/2 flex flex-col ${isEven ? 'lg:items-end lg:text-right z-10' : 'lg:items-start lg:text-left z-10'}`}>
                  <span className="text-[hsl(280,70%,60%)] font-bold mb-4 tracking-wide text-sm md:text-base">Featured Project</span>
                  <h3 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white mb-6 max-w-lg leading-tight tracking-tight">
                    {project.title}
                  </h3>

                  <div className={`glass p-6 md:p-8 rounded-2xl max-w-xl shadow-2xl backdrop-blur-xl bg-[#1A1A24]/60 border border-white/5 ${isEven ? 'lg:-ml-16' : 'lg:-mr-16'} z-20`}>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base font-medium">
                      {project.description}
                    </p>
                  </div>

                  <div className={`flex items-center gap-4 mt-6 ${isEven ? 'justify-end' : 'justify-start'}`}>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-white/10"
                    >
                      <Globe className="w-5 h-5 md:w-6 md:h-6" />
                    </a>
                  </div>
                </div>

                {/* Project Image */}
                <div className="w-full lg:w-[60%] relative group z-0">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[16/10] bg-secondary/10 border border-white/5">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Bottom Blur Overlay */}
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none backdrop-blur-[2px]"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
