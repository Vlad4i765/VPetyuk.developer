"use client";

import { useState, useRef, useEffect } from "react";
import { FaArrowRight, FaBookOpen } from "react-icons/fa";

// useInView hook
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

const posts = [
  {
    title: "Как эффективно искать первую работу фронтендеру",
    slug: "find-job-first-frontend",
    excerpt: "Мой опыт поиска позиции junior frontend developer. Реальные советы новичкам: как готовиться к собеседованиям, на что делать акцент в портфолио, где искать вакансии и как не сдаваться.",
    date: "2025-07-20",
    tags: ["поиск работы", "советы", "frontend"],
    readingTime: "5 мин",
    cover: "/images/blog/job-search.jpeg",
    url: "#",
  },
  {
    title: "Как собрать портфолио на Next.js и TailwindCSS — свежие подходы",
    slug: "portfolio-next-tailwind",
    excerpt: "Рассказываю по шагам, как собрать личный сайт-визитку: архитектура, лучшие UI-решения для начинающих, где брать компоненты и как выгодно презентовать свои проекты.",
    date: "2025-07-10",
    tags: ["портфолио", "next.js", "tailwind"],
    readingTime: "4 мин",
    cover: "/images/blog/portfolio-next.jpeg",
    url: "#",
  },
  {
    title: "Первые ошибки в больших пет-проектах и как их избежать",
    slug: "pet-mistakes",
    excerpt: "На своих ошибках учатся — вот топ самых частых промахов, которые допускают все джуны: архитектура, дедлайны, отзывчивость и работа с заказчиком.",
    date: "2025-06-27",
    tags: ["pet-проекты", "ошибки", "junior"],
    readingTime: "6 мин",
    cover: "/images/blog/pet-mistakes.jpeg",
    url: "#",
  },
];

export default function News() {
  const [sectionRef, inView] = useInView(0.2);

  return (
    <section ref={sectionRef} className="py-12 px-4 max-w-3xl mx-auto">
      <h2
        id="news"
        className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2 scroll-mt-32 md:scroll-mt-24"
      >
        <FaBookOpen className="text-purple-600" />
        Блог: мои заметки
      </h2>
      <div className="flex flex-col gap-8">
        {posts.map((post, idx) => (
          <div
            key={post.slug}
            className={
              `border-2 border-purple-400
              rounded-xl shadow-lg p-5 flex flex-col justify-between
              hover:shadow-2xl transition
              ${inView ? "animate-newsAppear" : "opacity-0 scale-95"}`
            }
            style={{
              animationDelay: inView ? `${idx * 130 + 100}ms` : "0ms",
            }}
          >
            <div>
              {post.cover && (
                <img
                  src={post.cover}
                  alt={post.title}
                  className="rounded-lg mb-3 object-cover w-full h-36"
                  loading="lazy"
                />
              )}
              <div className="text-xs text-slate-500 mb-2 flex gap-2 items-center">
                <span>{new Date(post.date).toLocaleDateString("ru-RU", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-purple-800">{post.title}</h3>
              <p className="text-sm text-neutral-700 mb-3">{post.excerpt}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <a
              href={post.url}
              className="group inline-flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900 transition"
              target="_blank"
              rel="noopener noreferrer"
              title="Читать полностью"
            >
              Читать полностью
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes newsAppear {
          0% {
            opacity: 0;
            transform: scale(0.95) rotate(-7deg);
            box-shadow: 0 2px 20px 0 rgba(124, 58, 237, 0.14);
          }
          60% {
            opacity: 0.6;
            transform: scale(1.02) rotate(2deg);
            box-shadow: 0 4px 35px 0 rgba(124, 58, 237, 0.35);
          }
          90% {
            opacity: 1;
            transform: scale(0.98) rotate(-1deg);
            box-shadow: 0 4px 24px 0 rgba(124, 58, 237, 0.25);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            box-shadow: 0 6px 32px 0 rgba(124, 58, 237, 0.18), 0 0 0 0;
          }
        }
        .animate-newsAppear {
          animation: newsAppear 0.88s cubic-bezier(0.23, 0.7, 0.47, 1.41) both;
        }
      `}</style>
    </section>
  );
}