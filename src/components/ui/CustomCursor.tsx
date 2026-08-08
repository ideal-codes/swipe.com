import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on desktop with coarse mouse capability
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.onclick !== null ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.classList.contains('cursor-pointer');
        setIsPointer(!!isClickable);
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer Crimson Glow Ring */}
      <div
        className="fixed pointer-events-none z-50 rounded-full transition-transform duration-100 ease-out border border-[#E61E4D]/60"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isPointer ? '44px' : '24px',
          height: isPointer ? '44px' : '24px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: isPointer ? 'rgba(230, 30, 77, 0.15)' : 'transparent',
          boxShadow: isPointer ? '0 0 20px rgba(230, 30, 77, 0.4)' : 'none',
        }}
      />

      {/* Center Precision Dot */}
      <div
        className="fixed pointer-events-none z-50 rounded-full bg-[#FF2D55]"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '5px',
          height: '5px',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};
