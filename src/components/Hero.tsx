import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Hero() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-50">
      {/* Avant-garde Technological & Showroom Background Asset */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img 
          src="/images/hero_automotive_ai_ru.jpg?v=17" 
          alt="High-Tech AI Car Dealership Showroom Background" 
          className="w-full h-full object-cover object-center opacity-15 contrast-[1.05] saturate-[1.0] brightness-[1.05] scale-[1.02] transition-transform duration-1000 ease-out"
        />
        {/* Subtle architectural gradient masks for seamless flow integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-slate-50/80 to-slate-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/40 via-transparent to-blue-50/5" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-600 text-xs font-semibold tracking-wide uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            AI-инновации в автобизнесе
          </div>

          <h1 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
            AI-проекты для <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">автодилеров</span>
          </h1>
          
          <p className="text-base text-slate-600 mb-8 leading-relaxed font-sans font-normal max-w-xl">
            Разрабатываем и бесплатно внедряем (для последующей подписки) передовые решения на базе искусственного интеллекта для дилерских центров. Оптимизируем продажи, автоматизируем работу с сервисом и улучшаем репутацию.
          </p>

          {/* Interactive catalog breakdown of 15 projects */}
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xl shadow-slate-100/70">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <h3 className="text-sm sm:text-base font-display font-bold text-slate-900 tracking-wide">
                Готовая библиотека: 15 ИИ-проектов
              </h3>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-500 font-sans mb-5 leading-relaxed">
              Мы упаковали 15 специализированных ИИ-продуктов для дилерских сетей, разделенных по приоритету внедрения и окупаемости:
            </p>

            <div className="flex flex-col gap-3">
              {[
                { 
                  category: 'must-have', 
                  title: '5 Решений с высокой окупаемостью', 
                  desc: 'Мгновенный запуск и окупаемость в первые 30 дней — главный приоритет собственника', 
                  icon: '📈'
                },
                { 
                  category: 'desirable', 
                  title: '5 Рекомендуемых проектов', 
                  desc: 'Глубокая автоматизация процессов (оценка trade-in по фото, автодокументы, ИИ-копилот)', 
                  icon: '⭐️'
                },
                { 
                  category: 'perspective', 
                  title: '5 Перспективных инноваций', 
                  desc: 'Цифровые ИИ-двойники менеджеров, голосовой ресепшн, аналитика оттока', 
                  icon: '🚀'
                },
              ].map((cat, i) => (
                <motion.a
                  key={cat.category}
                  href="#projects-catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    const catalogEl = document.getElementById('projects-catalog');
                    if (catalogEl) {
                      catalogEl.scrollIntoView({ behavior: 'smooth' });
                      const tabButton = document.querySelector(`button[data-category="${cat.category}"]`) as HTMLButtonElement;
                      if (tabButton) tabButton.click();
                    }
                  }}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
                  whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: 'rgba(59, 130, 246, 0.2)' }}
                  className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-100 bg-slate-50/40 transition-all hover:border-slate-200/80 cursor-pointer group"
                >
                  <div className="text-lg shrink-0 mt-0.5">{cat.icon}</div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-display font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {cat.title}
                      </span>
                      <span className="text-[10px] font-sans font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                        Смотреть решения →
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-sans mt-0.5 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative group lg:-mt-6 flex flex-col gap-6"
        >
          {/* Glass Card frame wrapper */}
          <div className="absolute -inset-4 rounded-[36px] bg-slate-100/60 backdrop-blur-md border border-slate-200/80 shadow-2xl shadow-slate-200/80 -z-10 transition-transform duration-500 group-hover:scale-[1.01]" />
          
          {/* Main Hero Image - set with a majestic aspect ratio for maximum presence */}
          <div className="rounded-[24px] overflow-hidden aspect-[16/11] bg-white border border-slate-200/80 shadow-xl">
            <img 
              src="/images/hero_automotive_ai_ru.jpg?v=17" 
              alt="AI in dealership" 
              className="w-full h-full object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out" 
            />
          </div>

          {/* Elegant connection form right under the picture */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-6 sm:p-8 rounded-2xl shadow-[0_15px_45px_rgba(37,99,235,0.15)] border border-blue-500/30">
            <h3 className="text-sm font-display font-semibold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
              Запись на демонстрацию
            </h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <input 
                  type="text" 
                  placeholder="Имя" 
                  required 
                  className="w-full p-3 text-sm rounded-xl border border-blue-400/30 bg-blue-950/45 focus:ring-4 focus:ring-blue-300/20 focus:border-blue-300 focus:bg-blue-950/60 transition-all outline-none font-sans text-white placeholder:text-blue-200/60" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, введите ваше имя.')}
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <input 
                  type="tel" 
                  placeholder="Телефон" 
                  required 
                  className="w-full p-3 text-sm rounded-xl border border-blue-400/30 bg-blue-950/45 focus:ring-4 focus:ring-blue-300/20 focus:border-blue-300 focus:bg-blue-950/60 transition-all outline-none font-sans text-white placeholder:text-blue-200/60" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, введите ваш номер телефона.')}
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  required 
                  className="w-full p-3 text-sm rounded-xl border border-blue-400/30 bg-blue-950/45 focus:ring-4 focus:ring-blue-300/20 focus:border-blue-300 focus:bg-blue-950/60 transition-all outline-none font-sans text-white placeholder:text-blue-200/60" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, введите ваш адрес электронной почты.')}
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                />
              </div>
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="sm:col-span-2 bg-white text-blue-700 hover:bg-blue-50 py-3.5 rounded-xl font-display font-semibold text-sm hover:shadow-[0_8px_25px_-8px_rgba(255,255,255,0.4)] hover:shadow-[0_15px_35px_-6px_rgba(255,255,255,0.3)] transition-all duration-300 border border-transparent relative overflow-hidden group disabled:opacity-50 cursor-pointer text-center"
              >
                {/* Dynamic Sweep Light Effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-600/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                {status === 'submitting' ? 'Отправка...' : 'Записаться на демонстрацию'}
              </button>
            </form>
            
            {status === 'success' && (
              <p className="text-xs text-emerald-300 mt-3 text-center font-medium transition-all">
                ✓ Спасибо! Мы скоро с вами свяжемся.
              </p>
            )}
            {status === 'error' && (
              <p className="text-xs text-rose-300 mt-3 text-center font-medium transition-all">
                ✕ Произошла ошибка. Попробуйте еще раз.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
