import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MouseCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Set initial position off-screen, will move on first mouse/touch event
    gsap.set(cursor, { x: -100, y: -100 });
    gsap.set(dot, { x: -100, y: -100 });

    const moveCursor = (clientX: number, clientY: number) => {
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        x: clientX,
        y: clientY,
        duration: 0.08,
        ease: 'none',
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      moveCursor(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        moveCursor(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
    };
  }, []);

  return (
    <>
      <style suppressHydrationWarning>{`
        @media (max-width: 768px) {
          .custom-cursor {
            mix-blend-mode: normal !important; /* Disable expensive blend mode on mobile */
          }
        }
      `}</style>

      {/* Outer circle */}
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-8 h-8 md:w-10 md:h-10 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)', willChange: 'transform' }}
      >
        <div className="w-full h-full rounded-full border border-white/80" />
      </div>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)', willChange: 'transform' }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </div>
    </>
  );
};

export default MouseCursor;
