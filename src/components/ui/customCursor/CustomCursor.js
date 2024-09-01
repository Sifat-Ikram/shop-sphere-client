"use client";
import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-12 h-12 rounded-full border-[#725523] border-2 border-solid pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[9999] flex items-center justify-center';

    const dot = document.createElement('div');
    dot.className = 'w-1.5 h-1.5 rounded-full bg-[#725523]';

    cursor.appendChild(dot);
    document.body.appendChild(cursor);

    const updateCursorPosition = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
};

export default CustomCursor;
