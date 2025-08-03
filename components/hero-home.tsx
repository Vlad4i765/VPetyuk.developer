"use client";

import Image from "next/image";
import PageIllustration from "@/components/page-illustration";
import Avatar from "@/public/images/your-photo.jpg"; // Замени путь на своё фото

export default function HeroHome() {
  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-x-hidden overflow-y-hidden bg-hero-image">

      {/* Фоновая иллюстрация (если нужна поверх фоновой картинки) */}
      {/* Можно оставить, если иллюстрация прозрачная и нужна поверх фото */}

      <div className="mx-auto max-w-4xl px-4 pt-24 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Фотография */}
          <div
            className="animate-fade-in mb-6"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <Image
              src={Avatar}
              width={128}
              height={128}
              alt="Владислав Петюк"
              priority
              className="rounded-full border-4 border-blue-600 shadow-xl mx-auto bg-purple-200"
            />
          </div>

          {/* SEO-лозунг */}
          <p className="text-blue-700 font-semibold tracking-wider text-sm uppercase mb-3 animate-fade-in">
            Frontend Developer / Минск, Москва – работаю удалённо
          </p>

          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl mb-3 text-blue-600 animate-appear">
            Молодой и мотивированный<br />
            <span className="text-purple-400">Frontend-разработчик</span>
          </h1>
          <p className="text-lg md:text-xl text-white mx-auto max-w-2xl mb-4 animate-fade-in [animation-delay:0.35s]">
            Мне 20 лет, выпускник МРТК БГУИР, прошёл практику в команде <span className="font-semibold text-purple-400">Alavir</span>. Владею <b>HTML</b>, <b>CSS</b>, <b>JavaScript</b>, <b>React</b>, <b>Django</b>, работаю с <b>Figma</b> и <b>Git</b>. Ответственный, быстро учусь и стремлюсь дорасти до Middle-разработчика и приносить пользу вашей команде.
          </p>

          {/* CTA-кнопки */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-3 animate-buttons [animation-delay:0.5s]">
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

          {/* Контакты */}

        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fade-in {
          animation: fade-in 0.9s;
        }
        @keyframes appear {
          0% { opacity: 0; scale: 0.8;}
          100% { opacity: 1; scale: 1;}
        }
        .animate-appear {
          animation: appear 1s;
        }
        .animate-buttons {
          animation: fade-in 1s;
        }

        /* СТИЛИ ФОНОВОГО ИЗОБРАЖЕНИЯ */

      `}</style>
    </section>
  );
}