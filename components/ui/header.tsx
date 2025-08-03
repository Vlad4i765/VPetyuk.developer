import Image from "next/image";
import { useState, useEffect } from "react";
import { FaTelegramPlane, FaLinkedin, FaInstagram, FaVk } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { label: "Домой", href: "#home" },
  { label: "Обо мне", href: "#about" },
  { label: "Навыки", href: "#skills" },
  { label: "Проекты", href: "#projects" },
  { label: "FAQ", href: "#faq" },
  { label: "Блог", href: "#news" },
  { label: "Подвал", href: "#footer" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("scrollToTopAfterReload") === "true") {
      window.scrollTo(0, 0);
      sessionStorage.removeItem("scrollToTopAfterReload");
    }
  }, []);

  // ЯВНО УКАЗЫВАЕМ ТИПЫ ПАРАМЕТРОВ
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    sessionStorage.setItem("scrollToTopAfterReload", "true");
    window.location.reload();
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="headerInner">
        <a
          href="#"
          className="logoLink"
          onClick={handleLogoClick}
        >
          <Image
            src="/images/logo.svg"
            alt="VPetyuk Logo"
            width={48}
            height={48}
            priority
            className="logoImg"
          />
          <span className="logoText">
            VPetyuk.<span className="logoTextPurple">developer</span>
          </span>
        </a>

        <nav className="desktopNav">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="navLink"
              onClick={e => handleAnchorClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="desktopSocials">
          <a href="https://t.me/vunpun" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="socialLink" style={{ color: "#6b7280" }}>
            <FaTelegramPlane />
          </a>
          <a href="https://www.instagram.com/midmooder?igsh=cDE0MGRqb3R6OGwz&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="socialLink" style={{ color: "#6b7280" }}>
            <FaInstagram />
          </a>
          <a href="https://vk.com/fisifruxxydud" target="_blank" rel="noopener noreferrer" aria-label="VK" className="socialLink" style={{ color: "#6b7280" }}>
            <FaVk />
          </a>
        </div>

        <button
          type="button"
          className="btnMenu"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Открыть меню"
        >
          {menuOpen ? (
            <FiX style={{ fontSize: "28px" }} />
          ) : (
            <FiMenu style={{ fontSize: "28px" }} />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="menuDropdownOuter">
          <nav className="menuDropdown">
            <ul className="menuList">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="menuNavLink"
                    onClick={e => handleAnchorClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="menuSocials">
                <a href="https://t.me/vunpun" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="menuSocialLink" style={{ color: "#6b7280" }}><FaTelegramPlane /></a>
                <a href="https://www.instagram.com/midmooder?igsh=cDE0MGRqb3R6OGwz&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="menuSocialLink" style={{ color: "#6b7280" }}><FaInstagram /></a>
                <a href="https://vk.com/fisifruxxydud" target="_blank" rel="noopener noreferrer" aria-label="VK" className="menuSocialLink" style={{ color: "#6b7280" }}><FaVk /></a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}