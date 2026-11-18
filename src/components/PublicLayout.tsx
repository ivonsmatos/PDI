import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import { GuiaNavDropdown, GUIA_MENU_GROUPS } from './GuiaNavDropdown';
import { PublicFooter } from './PublicFooter';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGuiaOpen, setMobileGuiaOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#017AA1] rounded-lg">
            <img src="/meu-pdi-logo.png" alt="Meu PDI" className="h-9 w-auto object-contain" />
          </Link>
          <nav aria-label="Navegação pública" className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <GuiaNavDropdown />
            <Link to="/exemplo" className="hover:text-[#017AA1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#017AA1] rounded">Exemplo</Link>
            <Link to="/para-rh" className="hover:text-[#017AA1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#017AA1] rounded">Para RH e Gestores</Link>
            <Link to="/certificacoes-gratuitas" className="hover:text-[#017AA1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#017AA1] rounded">Cursos e recursos</Link>
            <Link to="/sobre" className="hover:text-[#017AA1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#017AA1] rounded">Sobre</Link>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#017AA1] rounded px-2 py-1">
              Entrar
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 bg-[#017AA1] hover:bg-[#016384] text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#017AA1]"
            >
              Criar PDI grátis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-600"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 max-h-[82vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setMobileGuiaOpen(!mobileGuiaOpen)}
              className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-800"
            >
              <span>Guia</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileGuiaOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileGuiaOpen && (
              <div className="pl-3 pb-2 space-y-3 border-l-2 border-[#017AA1]/30">
                {GUIA_MENU_GROUPS.map(g => (
                  <div key={g.titulo} className="space-y-1">
                    <p className="text-[11px] font-bold uppercase text-[#51266E]">{g.titulo}</p>
                    {g.itens.map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1 text-xs text-slate-600 hover:text-[#017AA1]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link
                  to="/guias"
                  onClick={() => setMobileOpen(false)}
                  className="block text-xs font-bold text-[#017AA1] pt-1"
                >
                  Ver todos os guias →
                </Link>
              </div>
            )}
            <Link to="/exemplo" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Exemplo</Link>
            <Link to="/para-rh" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Para RH e Gestores</Link>
            <Link to="/certificacoes-gratuitas" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Cursos e recursos</Link>
            <Link to="/sobre" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Sobre</Link>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block mt-2 text-center py-3 bg-[#017AA1] text-white font-bold rounded-xl text-sm"
            >
              Criar PDI grátis →
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <PublicFooter />
    </div>
  );
};
