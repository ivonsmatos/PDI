/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, BookOpen } from 'lucide-react';

export const GUIA_MENU_GROUPS = [
  {
    titulo: 'Comece por aqui',
    itens: [
      { label: 'O que é PDI?', to: '/o-que-e-pdi' },
      { label: 'Como fazer um PDI em 5 passos', to: '/como-fazer-um-pdi' },
      { label: 'PDI não é currículo', to: '/pdi-e-curriculo' },
      { label: 'Hard skills e soft skills', to: '/hard-skills-e-soft-skills' },
      { label: 'Como definir objetivos claros', to: '/como-definir-objetivos-profissionais' },
      { label: 'Glossário do PDI', to: '/glossario' },
    ],
  },
  {
    titulo: 'Por momento de carreira',
    itens: [
      { label: 'PDI para primeiro emprego', to: '/pdi-primeiro-emprego' },
      { label: 'PDI para Júnior', to: '/pdi-profissional-junior' },
      { label: 'PDI para Pleno', to: '/pdi-profissional-pleno' },
      { label: 'PDI para Sênior', to: '/pdi-profissional-senior' },
      { label: 'Transição de carreira', to: '/pdi-transicao-de-carreira' },
      { label: 'PDI para promoção', to: '/pdi-para-promocao' },
      { label: 'Onboarding 30, 60 e 90 dias', to: '/pdi-onboarding-30-60-90' },
    ],
  },
  {
    titulo: 'Evidências, IA, RH e Liderança',
    itens: [
      { label: 'Como registrar evidências', to: '/como-registrar-evidencias-profissionais' },
      { label: 'IA no desenvolvimento profissional', to: '/ia-no-desenvolvimento-profissional' },
      { label: 'PDI para liderança', to: '/pdi-para-lideranca' },
      { label: 'Reunião 1:1 com evidências', to: '/reuniao-1-on-1-com-evidencias' },
      { label: 'Matriz por área e senioridade', to: '/matriz-de-competencias-por-area-e-senioridade' },
      { label: 'Templates gratuitos (1:1 e feedback)', to: '/templates-pdi-1on1-feedback-onboarding' },
    ],
  },
];

interface Props {
  lightText?: boolean;
}

export const GuiaNavDropdown: React.FC<Props> = ({ lightText = false }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        className={`inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#017AA1] rounded ${
          lightText ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-[#017AA1]'
        }`}
      >
        <span>Guia</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 pt-3 w-[680px] max-w-[92vw] z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 text-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {GUIA_MENU_GROUPS.map(group => (
                <div key={group.titulo} className="space-y-2">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#51266E]">
                    {group.titulo}
                  </p>
                  <ul className="space-y-1.5">
                    {group.itens.map(item => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="block text-xs font-medium text-slate-600 hover:text-[#017AA1] hover:translate-x-0.5 transition-all py-0.5"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#017AA1]" />
                Biblioteca completa com 46 guias práticos por senioridade, competência e RH
              </span>
              <Link
                to="/guias"
                onClick={() => setOpen(false)}
                className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-[#017AA1] hover:underline"
              >
                Ver todos os guias <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
