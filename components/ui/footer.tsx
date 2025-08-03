"use client";

import { useCallback, useState } from "react";
import { FaTelegramPlane, FaInstagram, FaVk, FaPlay } from "react-icons/fa";

const navigation = [
  { name: "Домой", href: "#home" },
  { name: "Обо мне", href: "#about" },
  { name: "Навыки", href: "#skills" },
  { name: "Проекты", href: "#projects" },
  { name: "FAQ", href: "#faq" },
  { name: "Блог", href: "#news" },
  { name: "Подвал", href: "#footer" },
];

export default function Footer() {
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href === "#home") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (href.startsWith("#")) {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    []
  );

  // Состояние для "показа" видео на мобильном
  const [mobileVideoActive, setMobileVideoActive] = useState(false);

  // Функция-обработчик: активировать видео на мобильных
  const handleVideoClick = useCallback(() => {
    if (window.innerWidth < 768) setMobileVideoActive(true);
  }, []);

  return (
    <footer id="footer" className="border-t border-neutral-200 text-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 md:gap-0">
        {/* Меню */}
        <nav className="w-full md:w-2/5 mb-6 md:mb-0">
          <span className="font-bold text-lg block mb-3">Навигация</span>
          <ul className="flex flex-wrap md:block gap-x-4 gap-y-1 md:gap-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-1 transition hover:text-white"
                  onClick={e => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Контакты и соцсети */}
        <div className="w-full md:w-2/5 mb-6 md:mb-0">
          <span className="font-bold text-lg block mb-3">Контакты</span>
          <ul className="space-y-1 text-base">
            <li>
              <a
                href="mailto:vlad.petyuk@icloud.com"
                className="transition hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                vlad.petyuk@icloud.com
              </a>
            </li>
            <li>
              <a
                href="https://t.me/vunpun"
                className="transition hover:text-white inline-flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane /> @vunpun
              </a>
            </li>
            <li className="flex gap-4 mt-2">
              <a
                href="https://www.instagram.com/midmooder?igsh=cDE0MGRqb3R6OGwz&utm_source=qr"
                aria-label="Instagram"
                className="transition text-lg hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://vk.com/fisifruxxydud"
                aria-label="VK"
                className="transition text-lg hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaVk />
              </a>
            </li>
          </ul>
          <div className="mt-4">
            <a
              href="/resume-vladislav-petyuk.pdf"
              download
              className="inline-block px-4 py-2 border border-purple-600 text-purple-600 rounded-lg shadow hover:bg-purple-600 hover:text-white transition"
            >
              Скачать резюме (PDF)
            </a>
          </div>
        </div>

        {/* Пасхалка: Видео для мобильных и десктопа */}
        <div className="w-full md:w-1/5 flex justify-center items-center">
          <div className="w-full flex flex-col items-center group">
            <div
              className="
                relative w-full max-w-[180px] aspect-square rounded-2xl overflow-hidden
                flex justify-center items-center
                cursor-pointer
                group
              "
              // обработчик только на мобильных
              onClick={handleVideoClick}
            >
              <video
                src="/videos/easter-egg.mp4"
                poster="/images/video-poster.png"
                className={`
                  w-full h-full object-cover rounded-2xl
                  transition duration-500
                  ${mobileVideoActive ? "" : "blur-md pointer-events-none"}
                  md:group-hover:blur-none md:group-hover:pointer-events-auto
                `}
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Для мобильных: затемнение и "play", если видео не активно */}
              {!mobileVideoActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center md:hidden bg-black/40 transition">
                  <FaPlay className="w-12 h-12 text-white opacity-80 mb-2" />
                  <span className="text-white text-xs">Нажмите для просмотра</span>
                </div>
              )}
            </div>
            <p
              className={`
                text-xs mt-2 text-center text-blue-500 font-medium
                transition duration-300
                ${mobileVideoActive ? "block" : ""}
                hidden md:group-hover:block
              `}
            >
              Пасхалка для внимательных :)
            </p>
          </div>
        </div>
      </div>
      {/* Копирайт */}
      <div className="text-center py-4 border-t border-neutral-200 text-white text-sm ">
        &copy; {new Date().getFullYear()} Владислав Валентинович Петюк. Все права защищены.
      </div>
    </footer>
  );
}