import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section id="cta-section" className="py-24 lg:py-32 relative overflow-hidden bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-4xl font-display font-bold mb-4 tracking-tight text-slate-900 leading-[1.1]"
        >
          Опыт и экспертиза в ИТ
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base text-slate-600 mb-10 font-sans font-light max-w-xl mx-auto leading-relaxed"
        >
          Создание интеллектуальных систем и автоматизация сложных бизнес-процессов на высшем уровне.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-8 sm:p-10 rounded-3xl text-left shadow-[0_20px_50px_rgba(37,99,235,0.12)] border border-blue-500/30 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 max-w-3xl mx-auto"
        >
          <div className="p-4 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
            <Sparkles className="w-8 h-8 text-blue-300 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-display font-semibold text-white mb-3 tracking-tight">
              Разработка передовых решений на базе искусственного интеллекта
            </h3>
            <p className="text-sm sm:text-base text-blue-100/95 font-sans font-light leading-relaxed">
              Я — ИТ-специалист с более чем 15-летним опытом управления и реализации технологических проектов. Руководил масштабными ИТ-инициативами в автоиндустрии, ведущих банках и нефтегазовых компаниях, сфокусировав свою практику на передовых разработках в сфере искусственного интеллекта. Специализируюсь на создании кастомных ИИ-агентов, интеграции языковых моделей (LLM) и роботизации рутинных процессов для качественного роста эффективности бизнеса.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
