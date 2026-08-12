import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { Check, ArrowRight, X, Sparkles, Zap, Shield, TrendingUp, Cpu, Eye } from 'lucide-react';

interface ProjectSectionProps {
  projectsList: Project[];
}

export default function ProjectSection({ projectsList }: ProjectSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'must-have' | 'desirable' | 'perspective'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Modal form states
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const filteredProjects = activeTab === 'all'
    ? projectsList
    : projectsList.filter(p => p.category === activeTab);

  const tabs = [
    { id: 'all', label: 'Все решения', count: projectsList.length, icon: Cpu },
    { id: 'must-have', label: '📈 Высокая окупаемость (Приоритет №1)', count: projectsList.filter(p => p.category === 'must-have').length, icon: TrendingUp },
    { id: 'desirable', label: '⭐️ Рекомендуемые', count: projectsList.filter(p => p.category === 'desirable').length, icon: Sparkles },
    { id: 'perspective', label: '🚀 Перспективные', count: projectsList.filter(p => p.category === 'perspective').length, icon: Shield },
  ] as const;

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          project: selectedProject?.title || 'Общий запрос'
        }),
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', email: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <section id="projects-catalog" className="py-16 lg:py-24 relative scroll-mt-10 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-600 text-xs font-semibold tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3 h-3" />
            Интерфейсы ИИ-решений для дилеров
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight"
          >
            15 ИИ-проектов для автобизнеса
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 font-sans font-light leading-relaxed"
          >
            Компактные интерактивные карточки с демо-скриншотами интерфейсов. Нажмите на любое решение для просмотра детальных функций и бизнес-эффекта.
          </motion.p>
        </div>

        {/* Tab Filter Bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap md:flex-nowrap gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200/60 max-w-full overflow-x-auto shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-category={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-display font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-bg-v2"
                      className="absolute inset-0 bg-white rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-200/75 text-slate-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid: 1 column of large, spacious horizontal-split cards (making each card much larger, showcasing images beautifully and fitting ~2 projects on one screen vertically) */}
        <motion.div 
          layout
          className="grid grid-cols-1 gap-8 max-w-5xl mx-auto mb-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.02 }}
                whileHover={{ y: -4 }}
                className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/70 shadow-[0_4px_20px_rgba(15,23,42,0.015)] hover:shadow-[0_12px_32px_rgba(59,130,246,0.05)] hover:border-blue-200 transition-all duration-300 flex flex-col-reverse md:flex-row items-stretch overflow-hidden relative group"
              >
                {/* Content Half Frame (Now on the left, extra spacious padding) */}
                <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-slate-600 font-sans font-light leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Key Advantages Checklist - spacious and fully legible */}
                    <ul className="space-y-2 mb-6">
                      {project.advantages.slice(0, 4).map((adv, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center mr-2 mt-0.5 shrink-0 border border-blue-500/15">
                            <Check className="w-2.5 h-2.5 text-blue-600" />
                          </div>
                          <span className="text-xs sm:text-[13px] font-sans font-normal text-slate-600 leading-normal">{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Compact Bottom Section: Business Value Tag & Action */}
                  <div className="space-y-4 pt-3 border-t border-slate-100">
                    {project.valueTag && (
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                        <p className="text-xs font-sans font-medium text-slate-600 leading-tight">
                          {project.valueTag}
                        </p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setFormStatus('idle');
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-display font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-sm cursor-pointer"
                    >
                      Открыть подробности о проекте
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Visual Half Frame (Now on the right) */}
                <div className="relative md:w-1/2 shrink-0 min-h-[240px] md:min-h-full bg-slate-100 border-b md:border-b-0 md:border-l border-slate-200/60 overflow-hidden">
                  <img 
                    src={project.imagePath} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category overlay */}
                  <div className="absolute top-3 left-3 flex gap-1 z-10">
                    <span className={`text-[9px] font-display font-bold px-2.5 py-1 rounded-full text-white shadow-sm uppercase tracking-wider ${
                      project.category === 'must-have' ? 'bg-amber-500' :
                      project.category === 'desirable' ? 'bg-blue-500' :
                      'bg-indigo-600'
                    }`}>
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Elegant interactive glass hover effect showing view icon */}
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="bg-white/95 text-slate-900 rounded-full p-2 text-xs font-display font-semibold flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      Интерфейс
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Catalog Statistics Footer Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          {[
            { value: '15', label: 'Готовых ИИ-интерфейсов' },
            { value: '24/7', label: 'Автономная обработка' },
            { value: '< 5 сек', label: 'Быстрота ответа ИИ' },
            { value: '100%', label: 'CRM / 1С Интеграция' }
          ].map((stat, i) => (
            <div key={i} className="text-center lg:text-left border-r border-slate-800 last:border-0 pr-2">
              <div className="text-2xl lg:text-3xl font-display font-bold text-blue-400 mb-0.5">{stat.value}</div>
              <div className="text-[10px] text-slate-400 font-sans uppercase tracking-wider font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>

      {/* Elegant Pop-up Modal for Project Details & Form */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-950/45 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: 'spring', duration: 0.45 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Open in new tab button */}
              <a
                href={selectedProject.imagePath}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-14 z-20 h-8 px-3 rounded-full bg-white/95 hover:bg-slate-100 text-slate-700 hover:text-slate-950 flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer border border-slate-200 text-[11px] font-display font-bold"
                title="Открыть скриншот в оригинальном размере в новом окне"
              >
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>Открыть скриншот ↗</span>
              </a>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-slate-100 text-slate-750 hover:text-slate-950 flex items-center justify-center transition-colors shadow-sm cursor-pointer border border-slate-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto flex-grow">
                {/* Top visual banner */}
                <div className="relative aspect-[21/9] bg-slate-50 border-b border-slate-100 overflow-hidden">
                  <img 
                    src={selectedProject.imagePath} 
                    alt={selectedProject.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex items-end p-6 sm:p-8">
                    <div>
                      <span className="text-[9px] font-display font-extrabold tracking-wider bg-blue-500 text-white px-2.5 py-1 rounded-full uppercase mb-2 inline-block shadow-sm">
                        {selectedProject.categoryLabel}
                      </span>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white tracking-tight">
                        {selectedProject.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="p-6 sm:p-8 lg:p-10 grid md:grid-cols-12 gap-8 lg:gap-10">
                  
                  {/* Left Column: Details */}
                  <div className="md:col-span-7 space-y-6">
                    <div>
                      <p className="text-sm text-slate-600 font-sans font-light leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Task Solved & What is Created Panels */}
                    <div className="space-y-4">
                      {selectedProject.taskSolved && (
                        <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-5">
                          <h4 className="text-xs font-display font-bold text-amber-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Проблема дилера
                          </h4>
                          <p className="text-xs sm:text-sm font-sans text-slate-700 font-normal leading-relaxed">
                            {selectedProject.taskSolved}
                          </p>
                        </div>
                      )}

                      {selectedProject.whatWeCreate && (
                        <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-5">
                          <h4 className="text-xs font-display font-bold text-blue-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            Что мы внедряем
                          </h4>
                          <p className="text-xs sm:text-sm font-sans text-slate-700 font-normal leading-relaxed">
                            {selectedProject.whatWeCreate}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Advantages */}
                    <div>
                      <h4 className="text-xs font-display font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Преимущества решения
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {selectedProject.advantages.map((adv, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center mr-2 mt-0.5 shrink-0 border border-blue-500/20">
                              <Check className="w-2.5 h-2.5 text-blue-600" />
                            </div>
                            <span className="text-xs font-sans text-slate-700 leading-tight">{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Value Tag */}
                    {selectedProject.valueTag && (
                      <div className="bg-slate-900 text-white rounded-2xl p-5 flex items-start gap-3 border border-slate-800">
                        <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <h5 className="text-[10px] font-display font-bold text-blue-400 uppercase tracking-widest mb-0.5">Бизнес-эффект</h5>
                          <p className="text-xs sm:text-sm font-sans text-slate-200 font-normal leading-relaxed">
                            {selectedProject.valueTag}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Demo Form Frame */}
                  <div className="md:col-span-5 bg-slate-50 border border-slate-200/50 p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-display font-bold text-slate-900 mb-1 tracking-tight">Запрос на демонстрацию</h4>
                      <p className="text-[11px] text-slate-500 mb-5 leading-normal">
                        Запишитесь, чтобы протестировать интерактивный интерфейс <strong>{selectedProject.title}</strong> на тестовом стенде.
                      </p>

                      <form onSubmit={handleModalSubmit} className="space-y-3">
                        <input
                          type="text"
                          placeholder="Ваше имя"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-sans text-slate-900 placeholder:text-slate-400 transition-all"
                        />
                        <input
                          type="tel"
                          placeholder="Номер телефона"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-sans text-slate-900 placeholder:text-slate-400 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Ваш E-mail"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-sans text-slate-900 placeholder:text-slate-400 transition-all"
                        />
                        <button
                          type="submit"
                          disabled={formStatus === 'submitting'}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-display font-semibold text-xs transition-all duration-300 shadow-sm cursor-pointer disabled:opacity-50"
                        >
                          {formStatus === 'submitting' ? 'Отправка...' : 'Обсудить внедрение'}
                        </button>
                      </form>
                    </div>

                    {/* Form feedbacks */}
                    <div className="mt-4">
                      {formStatus === 'success' && (
                        <p className="text-xs text-emerald-600 font-medium bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl text-center">
                          ✓ Успешно! Мы перезвоним вам в течение 15 минут.
                        </p>
                      )}
                      {formStatus === 'error' && (
                        <p className="text-xs text-rose-600 font-medium bg-rose-50 border border-rose-100 p-2.5 rounded-xl text-center">
                          ✕ Ошибка отправки. Попробуйте еще раз.
                        </p>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
