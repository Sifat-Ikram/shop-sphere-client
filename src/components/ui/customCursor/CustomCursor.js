"use client";
import { useEffect } from "react";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className =
      "fixed w-12 h-12 rounded-full dark:border-white border-[#624108] border-2 border-solid pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[9999] flex items-center justify-center";

    const dot = document.createElement("div");
    dot.className =
      "w-1.5 h-1.5 rounded-full bg-[#624108] dark:bg-white relative transition-transform duration-150 ease-out";

    cursor.appendChild(dot);
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const updateMousePosition = (e) => {
      // Update mouse position
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursorAndDot = () => {
      // Calculate the distance from the circle to the mouse position
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Smooth the cursor (circle) movement
      cursorX += dx * 0.1;
      cursorY += dy * 0.1;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      // Move the dot towards the cursor within the circle
      const dotDx = mouseX - cursorX;
      const dotDy = mouseY - cursorY;
      const dotDistance = Math.sqrt(dotDx * dotDx + dotDy * dotDy);

      // Move the dot only within the bounds of the circle (radius of 18px)
      const maxDotDistance = 18;
      if (dotDistance > maxDotDistance) {
        // Normalize the direction and move the dot
        const angle = Math.atan2(dotDy, dotDx);
        dotX = cursorX + Math.cos(angle) * maxDotDistance;
        dotY = cursorY + Math.sin(angle) * maxDotDistance;
      } else {
        dotX = mouseX;
        dotY = mouseY;
      }

      dot.style.transform = `translate(${dotX - cursorX}px, ${
        dotY - cursorY
      }px)`;

      requestAnimationFrame(animateCursorAndDot);
    };

    window.addEventListener("mousemove", updateMousePosition);
    requestAnimationFrame(animateCursorAndDot);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
};

export default CustomCursor;
