"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Avatar from "@/public/images/your-photo.jpg";

// --- useInView хук:
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

export default function HeroHome() {
  const [sectionRef, inView] = useInView(0.2);

  // Управление stagger для разных строк
  const items = [
    {
      key: "title",
      text: (
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl mb-3 text-blue-600">
          Молодой и мотивированный
          <br />
          <span className="text-purple-400">Frontend-разработчик</span>
        </h1>
      ),
      direction: "left",
    },
    {
      key: "desc",
      text: (
        <p className="text-lg md:text-xl text-white mx-auto max-w-2xl mb-4">
          Мне 20 лет, выпускник МРК БГУИР, прошёл практику в команде{" "}
          <span className="font-semibold text-purple-400">Alavir</span>. Владею{" "}
          <b>HTML</b>, <b>CSS</b>, <b>JavaScript</b>, <b>React</b>, <b>Django</b>, работаю с <b>Figma</b> и <b>Git</b>.
          Ответственный, быстро учусь и стремлюсь дорасти до Middle-разработчика и приносить пользу команде.
        </p>
      ),
      direction: "right"
    },
    // CTA
    {
      key: "cta",
      text: (
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-3">
          <a
            href="#projects"
            className="inline-block px-6 py-3 bg-purple-200 text-blue-900 font-semibold rounded-xl shadow hover:bg-purple-300 transition"
          >
            Смотреть мои проекты
          </a>
          <a
            href="/resume-vladislav-petyuk.pdf"
            download
            className="inline-block px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Скачать резюме PDF
          </a>
        </div>
      ),
      direction: "bottom"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-start justify-center overflow-x-hidden overflow-y-hidden bg-hero-image"
    >
      <div className="mx-auto max-w-4xl px-4 pt-24 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Фото (можно с fade-in как обычно) */}
          <div
            className="animate-fade-in mb-6"
            style={{ animationDelay: "0.22s", animationFillMode: "both" }}
          >
            <Image
              src={Avatar}
              width={128}
              height={200}
              alt="Владислав Петюк"
              priority
              className="rounded-full border-4 border-blue-600 shadow-xl mx-auto bg-purple-200"
            />
          </div>
          {/* Текстовые блоки со "вылетом" */}
          {items.map((item, idx) => (
            <div
              key={item.key}
              className={
                `carousel-fly-base ` +
                (inView
                  ? `carousel-fly-in carousel-fly-${item.direction}`
                  : `carousel-fly-init carousel-fly-${item.direction}`)
              }
              style={{
                animationDelay: inView ? `${0.27 + idx * 0.17}s` : undefined,
                animationFillMode: "both"
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeInPhoto 1.1s both;
        }
        @keyframes fadeInPhoto {
          from { opacity: 0; transform: translateY(35px); }
          to { opacity: 1; transform: none; }
        }
        /* ------ Carousel fly animation base ------- */
        .carousel-fly-base {
          will-change: transform, opacity;
        }
        .carousel-fly-init { opacity: 0; }
        /* Вылет сверху, снизу, слева, справа */
        .carousel-fly-top    { transform: translateY(-70px) scale(.98) rotate(-8deg);}
        .carousel-fly-bottom { transform: translateY(90px) scale(.98) rotate(7deg);}
        .carousel-fly-left   { transform: translateX(-90px) scale(.98) rotate(-12deg);}
        .carousel-fly-right  { transform: translateX(80px) scale(.98) rotate(11deg);}
        /* Анимация появления в ноль */
        .carousel-fly-in     {
          opacity: 1;
          animation: carouselFlyIn 0.85s cubic-bezier(.19,1,.42,1.12) both;
        }
        /* В зависимости от направления сдвиги разные */
        .carousel-fly-in.carousel-fly-top    { animation-name: carouselFlyInTop; }
        .carousel-fly-in.carousel-fly-bottom { animation-name: carouselFlyInBottom; }
        .carousel-fly-in.carousel-fly-left   { animation-name: carouselFlyInLeft; }
        .carousel-fly-in.carousel-fly-right  { animation-name: carouselFlyInRight; }

        @keyframes carouselFlyInTop {
          0% { opacity:0; transform: translateY(-70px) scale(.97) rotate(-8deg);}
          85% { opacity:1; transform: translateY(8px) scale(1.04) rotate(1deg);}
          100% { opacity:1; transform: none;}
        }
        @keyframes carouselFlyInBottom {
          0% { opacity:0; transform: translateY(90px) scale(.97) rotate(7deg);}
          85% { opacity:1; transform: translateY(-8px) scale(1.03) rotate(-1deg);}
          100% { opacity:1; transform: none;}
        }
        @keyframes carouselFlyInLeft {
          0% { opacity:0; transform: translateX(-90px) scale(.97) rotate(-12deg);}
          85% { opacity:1; transform: translateX(7px) scale(1.04) rotate(3deg);}
          100% { opacity:1; transform: none;}
        }
        @keyframes carouselFlyInRight {
          0% { opacity:0; transform: translateX(80px) scale(.97) rotate(11deg);}
          85% { opacity:1; transform: translateX(-8px) scale(1.04) rotate(-2deg);}
          100% { opacity:1; transform: none;}
        }
      `}</style>
    </section>
  );
}