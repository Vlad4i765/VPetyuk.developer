"use client";

import { useState } from "react";
import { FaTelegramPlane, FaEnvelope, FaLinkedin, FaInstagram, FaVk, FaDownload, FaTimes, FaComments } from "react-icons/fa";

const socials = [
  { name: "Telegram", href: "https://t.me/vunpun", icon: <FaTelegramPlane className="text-cyan-300 text-xl" /> },
  { name: "Email", href: "mailto:vlad.petyuk@icloud.com", icon: <FaEnvelope className="text-orange-200 text-xl" /> },
  { name: "Instagram", href: "https://www.instagram.com/midmooder?igsh=cDE0MGRqb3R6OGwz&utm_source=qr", icon: <FaInstagram className="text-pink-200 text-xl" /> },
  { name: "VK", href: "https://vk.com/fisifruxxydud", icon: <FaVk className="text-blue-300 text-xl" /> },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setTimeout(() => {
      setStatus({ ok: true, message: "Спасибо, сообщение отправлено!" });
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="fixed z-[1200] bottom-6 right-6">
      {/* Кнопка */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Связаться со мной"
        className={`
          bg-purple-700 hover:bg-purple-800 text-white rounded-full
          shadow-lg p-4 transition-all
          flex items-center justify-center
          focus:outline-none
          ${open ? "ring-2 ring-purple-600" : ""}
        `}
        style={{ boxShadow: "0 6px 22px rgba(50,21,80,0.25)" }}
      >
        {open ? <FaTimes className="text-xl" /> : <FaComments className="text-xl" />}
      </button>

      {/* Плавающая панель */}
      <div
        className={`
          transition-all duration-500
          ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "pointer-events-none opacity-0 translate-y-6"}
          fixed bottom-20 right-6 md:right-10 w-[92vw] max-w-xs sm:max-w-sm z-50
        `}
        style={{
          boxShadow: open ? "0 8px 34px rgba(61,0,135,0.15)" : "none",
        }}
      >
        <div className="bg-blue-900/80 border-2 border-[#4b186d] rounded-2xl p-5 shadow-xl overflow-hidden backdrop-blur-md">
          <h3 className="text-lg font-bold mb-4 text-white text-center">Связаться со мной</h3>
          <div className="flex flex-col gap-2 items-center mb-3">
            <div className="flex flex-wrap gap-3 justify-center">
              {socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition"
                  title={soc.name}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
            
          </div>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full text-sm border border-[#4b186d] rounded px-3 py-2 bg-white/90 focus:outline-none focus:border-[#4b186d] focus:ring-1 focus:ring-[#4b186d] transition text-gray-900"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Ваше имя"
              required
              autoComplete="off"
            />
            <input
              type="email"
              className="w-full text-sm border border-[#4b186d] rounded px-3 py-2 bg-white/90 focus:outline-none focus:border-[#4b186d] focus:ring-1 focus:ring-[#4b186d] transition text-gray-900"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="Email для ответа"
              required
              autoComplete="off"
            />
            <textarea
              className="w-full text-sm border border-[#4b186d] rounded px-3 py-2 bg-white/90 focus:outline-none focus:border-[#4b186d] focus:ring-1 focus:ring-[#4b186d] transition resize-none h-20 text-gray-900"
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Ваше сообщение…"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md py-2 transition text-sm"
            >
              {loading ? "Отправка..." : "Отправить"}
            </button>
            {status && (
              <div
                className={
                  "mt-1 text-center text-xs " +
                  (status.ok ? "text-green-400" : "text-red-300")
                }
              >
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}