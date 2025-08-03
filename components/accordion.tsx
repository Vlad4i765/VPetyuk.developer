"use client";

import { useState } from "react";
import { FaTelegramPlane, FaEnvelope, FaLinkedin, FaInstagram, FaVk, FaDownload } from "react-icons/fa";

const socials = [
  {
    name: "Telegram",
    href: "https://t.me/vunpun",
    icon: <FaTelegramPlane className="text-cyan-600" />,
  },
  {
    name: "Email",
    href: "mailto:vlad.petyuk@icloud.com",
    icon: <FaEnvelope className="text-orange-400" />,
  },
    {
    name: "Instagram",
    href: "https://www.instagram.com/midmooder?igsh=cDE0MGRqb3R6OGwz&utm_source=qr", // Укажи свою личную ссылку!
    icon: <FaInstagram className="text-pink-500" />,
  },
  {
    name: "VK",
    href: "https://vk.com/fisifruxxydud", // Укажи свою личную ссылку!
    icon: <FaVk className="text-blue-500" />,
  },
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Пример интеграции — просто алерт вместо отправки.
  // Для настоящей отправки нужен API endpoint / Telegram-bot / FormSubmit / SMTP.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Место под твой API–endpoint (замени на реальный handler!)
    try {
      // Ниже пример для https://formsubmit.co — простой анонимный почтовик:
      // await fetch("https://formsubmit.co/ajax/vlad.petyuk@icloud.com", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      // });

      // Или твой Telegram-bot  (например через Pabbly, zapier или node сервер)

      // Здесь просто имитируем успешную отправку
      setTimeout(() => {
        setStatus({ ok: true, message: "Спасибо, сообщение отправлено!" });
        setForm({ name: "", email: "", message: "" });
        setLoading(false);
      }, 1300);
    } catch (e) {
      setStatus({ ok: false, message: "Ошибка при отправке. Попробуйте позже." });
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Связаться со мной</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Социальные контакты */}
        <div className="flex flex-col items-center md:items-start justify-center space-y-5">
          <div className="flex flex-col gap-2 w-full">
            <span className="font-medium text-lg text-slate-700">Контакты:</span>
            <div className="flex flex-wrap gap-3">
              {socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-sm transition"
                  title={soc.name}
                >
                 {soc.icon} {soc.name}
                </a>
              ))}
            </div>
          </div>
          {/* Кнопка для скачивания резюме */}
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md transition shadow mt-5"
          >
            <FaDownload /> Скачать резюме (PDF)
          </a>
        </div>

        {/* Форма */}
        <form
          className="bg-white rounded-xl shadow-xl p-8 space-y-6"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div>
            <label htmlFor="name" className="block font-medium text-sm text-slate-700 mb-1">
              Ваше имя
            </label>
            <input
              type="text"
              id="name"
              className="w-full border rounded px-4 py-2 bg-slate-50 focus:outline-none focus:border-purple-400 transition"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              placeholder="Ваше имя"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-sm text-slate-700 mb-1">
              Email для обратной связи
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded px-4 py-2 bg-slate-50 focus:outline-none focus:border-purple-400 transition"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium text-sm text-slate-700 mb-1">
              Сообщение
            </label>
            <textarea
              id="message"
              className="w-full border rounded px-4 py-2 bg-slate-50 focus:outline-none focus:border-purple-400 transition resize-none h-28"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              required
              placeholder="Введите текст сообщения…"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md py-2 transition mt-2"
          >
            {loading ? "Отправка..." : "Отправить"}
          </button>
          {status && (
            <div
              className={
                "mt-2 text-center text-sm " +
                (status.ok
                  ? "text-green-600"
                  : "text-red-600")
              }
            >
              {status.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}