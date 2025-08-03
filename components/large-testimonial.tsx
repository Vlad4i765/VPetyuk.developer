"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaStar, FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// useInView Hook
function useInView(
  threshold = 0.3
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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

// Project types
interface Project {
  title: string;
  subtitle: string;
  description: string;
  result?: string;
  review?: string;
  details?: string;
  image?: string | string[];
  github?: string;
}

const projects: Project[] = [
  {
    title: "BABY – Десктоп-игра (Пакмен)",
    subtitle: "Курсовой проект",
    description:
      "Разработал desktop-игру типа Pacman как курсовой проект. Реализована вся игровая логика и управление. Использовался JavaScript и основы ООП.",
    result: "Оценка: 5/5",
    review:
      "“Владислав зарекомендовал себя ответственным и инициативным студентом, всегда выполнял задания в срок.” — Иван Иванов, куратор практики.",
    details:
      "В этой игре реализованы анимация, управление персонажем, столкновения с объектами, учёт очков и простая архитектура. Проект защищён на отлично.",
    image: [
      "/images/projects/baby.png",
      "/images/projects/baby2.png",
      "/images/projects/baby3.png",
    ],
    github: "https://github.com/Vlad4i765/BABY-game.git",
  },
  {
    title: "Адаптивный лендинг визитка",
    subtitle: "Учебный pet-проект",
    description:
      "Создан современный лендинг для личного промо. Продемонстрирован навык pixel-perfect верстки, адаптивности, интеграции с Figma и анимаций.",
    result: "Оценка: отлично",
    review:
      "Демонстрируется высокий уровень технической аккуратности и работа с макетами.",
    details:
      "Лендинг собирался с использованием HTML5, CSS3, TailwindCSS, grid/flexbox, с адаптацией под различные устройства, реализована плавная навигация и красивые эффекты появления элементов.",
    image: [
      "/images/projects/landing.png",
      "/images/projects/landing2.png",
            "/images/projects/landing3.png",

    ],
    github: "https://github.com/Vlad4i765/VPetyuk.developer.git",
  },
  {
    title: "AurumMultum — Веб-аукцион",
    subtitle: "Дипломный проект",
    description:
      "Полноценная платформа аукциона: регистрация пользователей, лоты, ставки, история торгов. Реализация на React/Django, интеграция с сервером.",
    result: "Оценка: 8/10",
    review: "Работу отличает структурированный код и качественная интерактивность.",
    details:
      "Реализована инфраструктура бэкенда (Django, Rest API) и фронтенда (React), защищены основные сценарии ввода, динамически обновляющиеся карточки лотов, валидация и слежение за изменениями в реальном времени.",
    image: [
      "/images/projects/aurummultum.png",
      "/images/projects/aurummultum2.png",
            "/images/projects/aurummultum3.png",

    ],
    github: "https://github.com/Vlad4i765/aurummultum.git",
  },
  
 {
    title: "Приложение Аукцион",
    subtitle: "Курсовой проект",
    description:
      "Десктоп-приложение аукциона. Реализация на связке C# + MySQL и вёрстка на современном HTML, CSS.",
    result: "Оценка: 7/10",
    review:
      "Проект выполнен в срок, все основные требования реализованы, отмечена хорошая командная работа.",
    details:
      "Были сложности с архитектурой, но решение найдено. Реализовано несколько пользовательских сценариев, cron-рассылки и финальная сдача закрыта на положительную оценку.",
    image: [
      "/images/projects/auction-app.png",
      "/images/projects/auction-app2.png",
      "/images/projects/auction-app3.png"
    ],
    github: "https://github.com/Vlad4i765/auction_app.gitp",
  },
];

// Слайдер картинок
function ProjectImageSlider({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length === 1) return;
    const timer = setTimeout(() => {
      setIdx((idx + 1) % images.length);
    }, 3500);
    return () => clearTimeout(timer);
  }, [idx, images]);

  if (images.length === 0) return null;
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <Image
        key={images[idx]}
        src={images[idx]}
        alt="Слайд проекта"
        width={480}
        height={270}
        className="object-cover w-full h-full transition-opacity duration-500 max-h-52 sm:max-h-[180px] md:max-h-[240px] rounded"
        priority={idx === 0}
        loading={idx === 0 ? undefined : "lazy"}
      />
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow"
            onClick={e => { e.stopPropagation(); setIdx((idx - 1 + images.length) % images.length); }}
            aria-label="Предыдущий слайд"
          >
            <FaChevronLeft className="text-purple-600" />
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow"
            onClick={e => { e.stopPropagation(); setIdx((idx + 1) % images.length); }}
            aria-label="Следующий слайд"
          >
            <FaChevronRight className="text-purple-600" />
          </button>
          <div className="absolute bottom-2 left-0 right-0 text-center">
            {images.map((_, i) => (
              <span
                key={i}
                className={`inline-block h-2 w-2 mx-0.5 rounded-full ${i === idx ? 'bg-purple-600' : 'bg-purple-300'} opacity-80`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Основной блок
export default function Features() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [sectionRef, inView] = useInView(0.3);

  // ! Главный "хак", чтобы якорь точно работал:
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#projects") {
      setTimeout(() => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
      }, 80); // время можно увеличить, если вдруг не срабатывает из-за ленивых виджетов
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-5xl mx-auto px-2 xs:px-1 sm:px-4 py-6 sm:py-10 overflow-x-hidden">
      <h2
        id="projects"
        className="text-3xl font-bold mb-8 text-center scroll-mt-40 md:scroll-mt-44"
      >
        Топовые проекты и учебные кейсы
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
        {projects.map((proj, idx) => {
          const imagesArr = Array.isArray(proj.image)
            ? proj.image
            : proj.image
            ? [proj.image]
            : [];

          const shown = inView;
          const isEven = idx % 2 === 0;
          const animateClass = shown
            ? "opacity-100 translate-x-0"
            : isEven
            ? "-translate-x-8 opacity-0"
            : "translate-x-8 opacity-0";

          return (
            <div
              key={proj.title}
              className={`
                rounded-xl bg-slate-50 bg-opacity-90 border-2 border-purple-400
                shadow-lg p-2 sm:p-4 md:p-6 flex flex-col justify-between
                hover:shadow-2xl transition
                min-w-0
                ${animateClass}
              `}
              style={{
                transition: "all 0.8s cubic-bezier(.42,0,.58,1)",
                transitionDelay: shown ? `${idx * 120}ms` : "0ms",
              }}
            >
              {imagesArr.length > 0 && (
                <div className="mb-2 sm:mb-3 md:mb-4 w-full aspect-video bg-slate-200 rounded overflow-hidden flex items-center justify-center relative max-w-full">
                  <ProjectImageSlider images={imagesArr} />
                </div>
              )}
              <div>
                <div className="flex items-center mb-2 gap-2">
                  <FaStar className="text-purple-600 text-base sm:text-lg" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-800">
                    {proj.title}
                  </h3>
                </div>
                <div className="mb-1 text-[13px] sm:text-xs text-purple-700 font-semibold">
                  {proj.subtitle}
                </div>
                <div className="mb-3 text-xs sm:text-base text-neutral-700">{proj.description}</div>
                {proj.result && (
                  <div className="text-[11px] sm:text-xs mb-2 italic text-slate-500">
                    {proj.result}
                  </div>
                )}
                {proj.details && (
                  <button
                    className="mb-2 text-purple-600 underline hover:text-purple-900 transition text-[12px]"
                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    aria-expanded={openIdx === idx}
                  >
                    {openIdx === idx ? "Скрыть детали" : "Показать подробнее"}
                  </button>
                )}
                {openIdx === idx && proj.details && (
                  <div className="mb-2 text-[11px] sm:text-xs bg-white border rounded px-3 py-2 shadow">
                    {proj.details}
                  </div>
                )}
              </div>
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold text-xs sm:text-sm shadow transition"
                >
                  <FaGithub />
                  Смотреть на GitHub
                </a>
              )}
              {proj.review && (
                <div className="mt-4 py-2 px-3 bg-purple-50 border-l-4 border-purple-400 text-[11px] sm:text-xs text-slate-700 italic">
                  {proj.review}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}