import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-slate-900 tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A9C] rounded-lg">
            <span className="w-8 h-8 rounded-xl bg-[#159A9C] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </span>
            <span>Meu PDI</span>
          </Link>
          <nav aria-label="Navegação pública" className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/o-que-e-pdi" className="hover:text-[#159A9C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A9C] rounded">O que é PDI</Link>
            <Link to="/exemplo" className="hover:text-[#159A9C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A9C] rounded">Exemplo</Link>
            <Link to="/para-rh" className="hover:text-[#159A9C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A9C] rounded">Para RH e Gestores</Link>
            <Link to="/certificacoes-gratuitas" className="hover:text-[#159A9C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A9C] rounded">Cursos e recursos</Link>
            <Link to="/privacidade" className="hover:text-[#159A9C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A9C] rounded">Privacidade</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A9C] rounded px-1">
              Entrar
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 bg-[#159A9C] hover:bg-[#117e80] text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#159A9C]"
            >
              Criar PDI grátis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-slate-950 text-slate-400 py-10 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-sm">
          <div>
            <p className="text-white font-bold">Meu PDI — Plano de Desenvolvimento Individual</p>
            <p className="text-xs text-slate-500 mt-1">Atendimento em português brasileiro para profissionais, gestores e RH no Brasil.</p>
          </div>
          <div className="flex flex-wrap gap-5 text-xs">
            <Link to="/" className="hover:text-white transition-colors">Início</Link>
            <Link to="/o-que-e-pdi" className="hover:text-white transition-colors">O que é PDI</Link>
            <Link to="/como-fazer-um-pdi" className="hover:text-white transition-colors">Como fazer um PDI</Link>
            <Link to="/exemplo" className="hover:text-white transition-colors">Exemplo</Link>
            <Link to="/para-rh" className="hover:text-white transition-colors">Para RH</Link>
            <Link to="/certificacoes-gratuitas" className="hover:text-white transition-colors">Cursos curados</Link>
            <Link to="/sobre" className="hover:text-white transition-colors">Sobre</Link>
            <Link to="/privacidade" className="hover:text-white transition-colors">Privacidade & LGPD</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

