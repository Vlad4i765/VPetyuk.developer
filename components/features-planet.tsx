"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaPython } from "react-icons/fa";
import { SiDjango, SiFigma, Si1Password } from "react-icons/si";

const skills = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-600" />, level: 5 },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-600" />, level: 5 },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" />, level: 4 },
  { name: "React", icon: <FaReact className="text-cyan-400" />, level: 4 },
  { name: "Python", icon: <FaPython className="text-blue-400" />, level: 3 },
  { name: "Django", icon: <SiDjango className="text-green-800" />, level: 3 },
  { name: "Figma", icon: <SiFigma className="text-pink-500" />, level: 4 },
  { name: "Git", icon: <FaGitAlt className="text-orange-400" />, level: 4 },
  { name: "1C-Битрикс", icon: <Si1Password className="text-red-400" />, level: 3 },
];

const services = [
  {
    title: "Frontend Development",
    points: [
      "Pixel-perfect, адаптивная верстка",
      "Разработка интерактивных React-компонентов",
      "Добавление эффектных анимаций и динамики",
      "Быстрая интеграция макетов из Figma",
    ],
  },
  {
    title: "Командная работа",
    points: [
      "Опыт работы с Git и системами контроля версий",
      "Умелое использование Agile-методов (scrum, kanban)",
      "Эффективная коммуникация в команде",
      "Реальный опыт в проектной команде (Alavir)",
    ],
  },
  {
    title: "Обучение и рост",
    points: [
      "Прохождение сертификаций (1C-Битрикс)",
      "Постоянное освоение новых технологий",
      "Готовность быстро учиться и внедрять лучшие решения",
      "Портфолио реальных и учебных проектов",
    ],
  },
];
function useInView<T extends HTMLElement = HTMLElement>(threshold = 0.3): [RefObject<T | null>, boolean] {
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

  return [ref, inView];
}

export default function Services() {
  const [sectionRef, inView] = useInView<HTMLElement>(0.3);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="max-w-5xl mx-auto px-4 py-12 pt-20"
    >
      <h2 className="text-3xl font-bold mb-8 text-center scroll-mt-24 md:scroll-mt-40">
        Что я умею
      </h2>

      {/* Блок навыков */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-6 text-slate-800">Мой стек и навыки</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
          {skills.map(({ name, icon, level }, i) => (
            <div
              key={name}
              className={`
                flex flex-col items-center bg-transparent rounded-lg p-4
                transition-all duration-700
                border border-[1.5px] border-[#6d28d9]
                shadow
                hover:scale-105
                ${inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
                }
              `}
              style={{
                transitionDelay: inView ? `${i * 80}ms` : "0ms"
              }}
            >
              <div className="text-4xl mb-2">{icon}</div>
              <span className="font-medium text-slate-700 mb-2">{name}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((j) => (
                  <span
                    key={j}
                    className={`w-2.5 h-2.5 rounded-full ${
                      j <= level ? "bg-purple-600" : "bg-purple-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Карточки сервисов / навыков */}
      <div id="services" className="grid gap-6 md:grid-cols-3">
        {services.map((service, i) => (
          <div
            key={service.title}
            className={`
              rounded-xl 
              p-6 flex flex-col
              transition-all duration-700
              ${inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
              }
              bg-transparent shadow-none border-none
            `}
            style={{
              transitionDelay: inView ? `${400 + i * 120}ms` : "0ms"
            }}
          >
            <h4 className="font-semibold text-lg mb-2 text-purple-700 text-center">{service.title}</h4>
            <ul className="list-disc pl-5 flex-1 space-y-2 text-neutral-100 text-center">
              {service.points.map((point, idx) => (
                <li key={idx} className="text-center">{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Блок качества */}
      <div 
        className={`
          mt-10 text-center text-lg text-white font-medium
          transition-all duration-700
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        style={{
          transitionDelay: inView ? "900ms" : "0ms"
        }}
      >
        <span>
          <b>Ключевые качества:</b> ответственность, быстрая адаптация, внимательность к деталям, умение работать в команде.
        </span>
      </div>
    </section>
  );
}