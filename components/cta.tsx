"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// useInView hook — такой же, как в сервисах
function useInView(threshold = 0.3) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

const mainFaq = [
  {
    question: "Почему вам стоит дать мне шанс?",
    answer:
      "Я — молодой специалист с отличными теоретическими знаниями, большой личной мотивацией и свежим подходом к современным веб-технологиям. В каждом проекте стремлюсь создавать не просто красивый, но и удобный, быстрый, технологичный продукт. Готов быстро учиться и решать любые новые задачи.",
  },
  {
    question: "Какой у меня опыт в программировании?",
    answer:
      "Я выпускник Минского радиотехнического колледжа БГУИР (2022–2025), дипломированный специалист в сфере веб-разработки. Уже в колледже реализовывал учебные и личные проекты на HTML5, CSS3, JavaScript, Vue.js, React и других современных технологиях. Умею работать с git, адаптивной вёрсткой, системами сборки и дизайном интерфейса.",
  },
  {
    question: "Что меня отличает как фронтенд-разработчика?",
    answer:
      "Я не устаю учиться и всегда слежу за трендами. Стремлюсь разбираться в технологиях глубже — даже вне учебной программы. Мои проекты показывают стремление изучать новое, внимание к деталям и хорошую коммуникацию.",
  },
];

const allFaq = [
  {
    question: "На каких технологиях я специализируюсь?",
    answer:
      "HTML5, CSS3/TailwindCSS, JavaScript, Vue.js, React, TypeScript, Webpack, Git — открыто изучаю новые и готов быстро осваивать корпоративные стандарты.",
  },
  {
    question: "Где я живу и ищу работу?",
    answer:
      "Я живу в России и открыт для переезда или работы на удалёнке. Активно ищу работу в аккредитованной айти-компании, где смогу профессионально расти в команде.",
  },
  {
    question: "Где можно посмотреть мои проекты?",
    answer:
      "Некоторые учебные и личные проекты опубликованы в портфолио на этом сайте и на моём GitHub.",
  },
  {
    question: "Сколько времени я уделяю обучению?",
    answer:
      "Постоянно. Программирование и веб-дизайн — мой настоящий интерес, по 3-4 часа ежедневно работаю над новыми навыками и pet-проектами.",
  },
  {
    question: "Почему я хочу работать именно фронтенд-разработчиком?",
    answer:
      "Обожаю видеть быстрый результат своей работы, люблю проектировать интерфейсы и приносить пользу с помощью современных технологий. В команде хочу расти как специалист и быть причастным к большим задачам.",
  },
  {
    question: "Какие проекты меня вдохновляют?",
    answer:
      "Современные веб-сервисы, удобные UI для обычных людей, даже простые «одностраничники», если они сделаны с душой, — всё, что делает интернет чуть лучше.",
  },
  {
    question: "Как со мной связаться?",
    answer:
      "Связаться со мной можно по e-mail, через Telegram или форму на сайте. Буду рад новым предложениям и открыт для технического диалога!",
  },
  {
    question: "Сколько вам лет?",
    answer: "Мне 20 лет.",
  },
  {
    question: "Можете ли работать полный день?",
    answer: "Да, готов работать полный рабочий день и стажироваться.",
  },
  {
    question: "Какая зарплата вас интересует?",
    answer: "Готов обсудить это при интервью, ориентирован на развитие и старт в IT-команде.",
  },
];

export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [sectionRef, inView] = useInView(0.25);

  const handleToggle = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx)
        ? prev.filter((i) => i !== idx)
        : [...prev, idx]
    );
  };

  // Лесенка: отступы вправо и вниз
  const steps = [
    { ml: "ml-0", mt: "mt-0" },
    { ml: "ml-8 md:ml-14", mt: "mt-4" },
    { ml: "ml-16 md:ml-28", mt: "mt-8" },
  ];

  return (
    <section ref={sectionRef} className="max-w-3xl mx-auto px-4 py-12">
      <h2
        id="faq"
        className="text-3xl font-bold mb-8 text-center scroll-mt-32 md:scroll-mt-24"
      >
        Вопросы и ответы 
      </h2>

      {/* Первые три вопроса-ответа, лесенкой, с номером и анимацией */}
      <div className="mb-10">
        {mainFaq.map((item, i) => (
          <div
            key={i}
            className={`
              relative flex items-start
              ${steps[i].mt} ${steps[i].ml}
              transition-all duration-700 ease-out
              ${inView
                ? "opacity-100 translate-y-0 rotate-0"
                : "opacity-0 -translate-y-10 -rotate-6"
              }
            `}
            style={{
              transitionDelay: inView ? `${i * 130 + 100}ms` : "0ms"
            }}
          >
            {/* Иконка номера слева */}
            <span
              className={`
                flex-shrink-0 w-10 h-10 rounded-full bg-blue-900/60 
                flex items-center justify-center mr-4 mt-0.5
                text-xl font-bold text-white select-none
                shadow-lg
                `}
              style={{ filter: "blur(0.2px)" }}
              aria-hidden
            >
              {i + 1}
            </span>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-purple-700">{item.question}</h3>
              <p className="text-neutral-800">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      
    </section>
  );
}