"use client";
import { useEffect } from "react";
import "./bubble.css"; // путь смотри по месту!

export default function BubbleBackground() {
  useEffect(() => {
    const interBubble = document.querySelector<HTMLDivElement>(".interactive");
    if (!interBubble) return;
    let curX = 0, curY = 0, tgX = 0, tgY = 0, running = true;

    const move = () => {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      if (running) requestAnimationFrame(move);
    };
    window.addEventListener("mousemove", (e) => {
      tgX = e.clientX; tgY = e.clientY;
    });
    move();

    return () => { running = false; };
  }, []);

  return (
    <div className="gradient-bg pointer-events-none fixed inset-0 w-screen h-screen z-0">
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
        <div className="interactive"></div>
      </div>
    </div>
  );
}