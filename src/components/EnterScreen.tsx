import { useRef } from 'react';
import gsap from 'gsap';

interface EnterScreenProps {
  onEnter: () => void;
}

const EnterScreen = ({ onEnter }: EnterScreenProps) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleEnter = () => {
    const tl = gsap.timeline();
    
    tl.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
    });
    
    tl.to(screenRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        if (screenRef.current) {
          screenRef.current.style.display = 'none';
        }
        onEnter();
      }
    });
  };

  return (
    <div 
      ref={screenRef}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
    >
      {/* Circle with dot - top left */}
      <div className="absolute top-16 left-16">
        <div className="relative w-12 h-12">
          <div className="w-full h-full rounded-full border border-white/30" />
          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-white" />
        </div>
      </div>

      {/* Enter button */}
      <button
        ref={buttonRef}
        onClick={handleEnter}
        className="px-16 py-4 border border-white/50 rounded-lg text-white font-mono text-lg tracking-[0.3em] uppercase transition-all duration-300 hover:border-white hover:bg-white/5 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
      >
        ENTER
      </button>
    </div>
  );
};

export default EnterScreen;
