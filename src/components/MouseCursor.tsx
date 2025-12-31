import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MouseCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Set initial position off-screen, will move on first mouse event
    gsap.set(cursor, { x: -100, y: -100 });
    gsap.set(dot, { x: -100, y: -100 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'none',
      });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      {/* Outer circle */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full rounded-full border border-white/80" />
      </div>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </div>
    </>
  );
};

export default MouseCursor;
