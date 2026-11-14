import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Shield, Target, BarChart3, CheckCircle2 } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';
import { usePageMeta } from '../hooks/usePageMeta';

export const ParaRh: React.FC = () => {
  usePageMeta({
    title: 'PDI para RH e gestores: desenvolvimento com evidências — Meu PDI',
    description:
      'Estruture PDPs, conduza conversas 1:1 mais objetivas e acompanhe ciclos de desenvolvimento profissional com privacidade e controle do titular.',
    canonicalPath: '/para-rh',
  });

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <header className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Para RH, People &amp; Gestores</p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Desenvolvimento profissional com clareza de competências e evidências reais
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            Substitua planilhas estáticas e formulários esquecidos por um fluxo estruturado que ajuda cada colaborador a mapear lacunas, definir ações com prazo e levar evidências concretas para as reuniões 1:1.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl transition-colors"
            >
              Testar gratuitamente <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/o-que-e-pdi"
              className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              Ler guia sobre PDI e PDP
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              icon: <Target className="w-5 h-5 text-indigo-600" />,
              title: 'Matriz de competências por área',
              desc: 'Hard skills e soft skills organizadas por senioridade, facilitando a conversa entre onde a pessoa está e o próximo nível.',
            },
            {
              icon: <BarChart3 className="w-5 h-5 text-emerald-600" />,
              title: 'Ciclos comparáveis e histórico',
              desc: 'Cada ciclo encerrado salva um retrato das competências e aprendizados, evitando avaliações baseadas apenas na memória recente.',
            },
            {
              icon: <Users className="w-5 h-5 text-sky-600" />,
              title: 'Compartilhamento sob controle do titular',
              desc: 'O profissional escolhe quando gerar um link público ou PDF para o gestor/RH e pode revogar o acesso a qualquer momento.',
            },
            {
              icon: <Shield className="w-5 h-5 text-amber-600" />,
              title: 'Privacidade e LGPD por padrão',
              desc: 'Notas do diário e dados privados ficam isolados na conta do usuário. Nada é publicado automaticamente sem ação explícita.',
            },
          ].map(card => (
            <div key={card.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                {card.icon}
              </div>
              <h2 className="font-bold text-slate-900 text-lg">{card.title}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900">Como equipes usam na prática</h2>
          <ul className="space-y-2.5 text-sm text-slate-600">
            {[
              'Onboarding de 30–90 dias com objetivos iniciais claros e acompanhamento quinzenal.',
              'Preparação para conversas de feedback e calibração com evidências documentadas.',
              'Planos individuais de transição técnica ou desenvolvimento de liderança.',
              'Exportação em PDF estruturado ou backup JSON portátil sem aprisionamento de dados.',
            ].map(item => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PublicLayout>
  );
};

