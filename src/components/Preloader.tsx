import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress bar
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: function() {
        const currentProgress = Math.round(this.progress() * 100);
        setProgress(currentProgress);
      }
    });

    // Fade out text and progress bar
    tl.to([textRef.current, progressRef.current?.parentElement], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in',
    });

    // Scale and fade out preloader
    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="glow-orb w-96 h-96 top-1/4 left-1/4 animate-float opacity-30" />
      <div className="glow-orb w-64 h-64 bottom-1/4 right-1/4 animate-float animation-delay-400 opacity-20" />
      
      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
          Tharun Kumar
        </h1>
        <p className="text-muted-foreground text-lg tracking-widest uppercase">
          AI & ML Engineer
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 mt-12 flex flex-col items-center">
        <div className="progress-bar-container">
          <div ref={progressRef} className="progress-bar" />
        </div>
        <span ref={percentRef} className="text-primary mt-4 text-sm font-medium tracking-wider">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
