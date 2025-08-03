"use client";

import { useEffect, useRef, useState, RefObject } from "react";

const facts = [
  {
    title: "Стремлюсь к постоянному развитию",
    description:
      "Уже сейчас ставлю перед собой цель — за ближайшие десять месяцев выйти на уровень middle frontend-разработчика и реализовать несколько серьёзных проектов. Я совершенствую навыки, отслеживаю тренды и внедряю их в реальных задачах.",
  },
  {
    title: "Широкий технический кругозор",
    description:
      "Мой опыт охватывает классический фроненд (HTML, CSS, JS, React), а также основы Python, Django, Figma и Git. Это помогает быстрее находить эффективные решения и понимать задачи бизнеса.",
  },
  {
    title: "Открыт к вызовам и экспериментам",
    description:
      "В своих учебных и личных проектах пробую новые технологии и командные подходы. Получил сертификаты 1C-Битрикс, опыт работы в команде (“Alavir”). Убеждён: брать ответственность — ключ к профросту.",
  },
];

// Хук с правильной типизацией
function useInView<T extends HTMLElement = HTMLElement>(threshold = 0.3) {
  const [inView, setInView] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as [RefObject<T>, boolean];
}

export default function About() {
  // Используем дженерик <HTMLElement>
  const [containerRef, inView] = useInView<HTMLElement>(0.25);

  // Смотрим, смонтирован ли компонент на клиенте
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setIsMobile(window.innerWidth < 768);
    // слушаем resize и обновляем isMobile
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    // Автоскролл к секции на мобильных после mount
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Смещения выбираем только после монтирования
  const desktopPosY = [0, 200, 0];
  const desktopStartY = [-70, -260, -70];
  const mobilePosY = [0, 70, 0];
  const mobileStartY = [-30, -100, -30];

  // По умолчанию (SSR) — десктопные стили (иначе гидрация будет мигать)
  const posY = hasMounted && isMobile ? mobilePosY : desktopPosY;
  const startY = hasMounted && isMobile ? mobileStartY : desktopStartY;

  return (
    <section
      id="about"
      ref={containerRef}
      className="max-w-2xl md:max-w-6xl mx-auto px-2 md:px-4 py-10 md:py-24 pb-16 md:pb-32"
    >
      <h2 className="text-3xl font-bold mb-8 text-center mt-32 md:mt-0 scroll-mt-24 md:scroll-mt-40">
        Обо&nbsp;мне
      </h2>
      <header className="mb-8 md:mb-12 text-center">
        <p className="text-base md:text-lg text-white text-slate-200">
          Frontend-разработчик, открыт для работы в IT-компании.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8 mb-12 md:mb-16 relative">
        {facts.map((fact, idx) => {
  const style: React.CSSProperties = {
    background: "transparent",
    border: "none",
    boxShadow: "none",
    opacity: inView ? 1 : 0,
    transform: inView
      ? `translateY(${posY[idx]}px)`
      : `translateY(${startY[idx]}px)`,
    transition: "all 0.85s cubic-bezier(.43,.13,.23,1)",
    position: "relative",
    zIndex: 1,
  };
  return (
    <div
      key={idx}
      style={style}
      className="rounded-2xl group px-3 py-5 sm:px-4 sm:py-6 md:px-0 md:py-0 min-h-[180px] md:min-h-[240px] flex flex-col justify-center"
    >
      <h3 className="font-bold mb-2 md:mb-3 text-lg md:text-xl text-purple-600 text-center drop-shadow-[0_2px_8px_rgba(157,47,255,0.10)]">
        {fact.title}
      </h3>
      <p className="text-white text-center leading-relaxed text-sm md:text-base drop-shadow-[0_1px_8px_rgba(0,0,0,0.15)]">
        {fact.description}
      </p>
    </div>
  );
})}
      </div>
    </section>
  );
}