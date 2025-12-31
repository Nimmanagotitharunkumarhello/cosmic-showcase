import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  PaperPlaneTilt, 
  GithubLogo, 
  LinkedinLogo,
  Envelope,
  User,
  ChatCircle
} from '@phosphor-icons/react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const header = headerRef.current;

    if (!section || !form || !header) return;

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

    // Form inputs animation
    const inputs = form.querySelectorAll('.input-glow, button[type="submit"]');
    gsap.fromTo(inputs,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: form,
          start: 'top 75%',
        }
      }
    );

    // Social icons animation
    const socialIcons = section.querySelectorAll('.social-icon');
    gsap.fromTo(socialIcons,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Button bounce animation
    const submitBtn = formRef.current?.querySelector('button[type="submit"]');
    if (submitBtn) {
      gsap.to(submitBtn, {
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    }

    toast.success('Message sent successfully!', {
      description: 'I\'ll get back to you as soon as possible.',
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Contact
          </span>
          <h2 className="section-heading">Get In Touch</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
            Have a project in mind or just want to say hello? 
            Drop me a message and I'll get back to you soon.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" weight="light" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="input-glow pl-12"
              />
            </div>

            <div className="relative">
              <Envelope size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" weight="light" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="input-glow pl-12"
              />
            </div>

            <div className="relative">
              <ChatCircle size={20} className="absolute left-4 top-6 text-muted-foreground" weight="light" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={5}
                className="input-glow pl-12 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-glow w-full flex items-center justify-center gap-3 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <PaperPlaneTilt size={20} weight="fill" />
                </>
              )}
            </button>
          </form>

          {/* Contact info & social */}
          <div className="flex flex-col justify-center items-center lg:items-start space-y-8">
            <div className="glass rounded-2xl p-8 w-full max-w-sm">
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Let's Connect
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, 
                or opportunities to be part of your vision.
              </p>
              
              {/* Social links */}
              <div className="flex gap-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <GithubLogo size={24} weight="light" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <LinkedinLogo size={24} weight="light" />
                </a>
                <a 
                  href="mailto:hello@example.com"
                  className="social-icon w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <Envelope size={24} weight="light" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
