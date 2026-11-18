import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Coluna 1: Institucional com Logo */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center bg-white/95 px-3 py-1.5 rounded-xl shadow-sm">
              <img src="/meu-pdi-logo.png" alt="Meu PDI" className="h-8 w-auto object-contain" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Plataforma gratuita para estruturar e acompanhar seu Plano de Desenvolvimento Individual com matrizes de 40 áreas, metas claras e evidências verificáveis.
            </p>
            <ul className="space-y-2 text-xs pt-1">
              <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre o Meu PDI</Link></li>
              <li><Link to="/por-que-criamos-o-meu-pdi" className="hover:text-white transition-colors">Por que criamos o Meu PDI</Link></li>
              <li><Link to="/diario-de-construcao-meu-pdi" className="hover:text-white transition-colors">Diário de construção</Link></li>
              <li><Link to="/privacidade" className="hover:text-white transition-colors">Privacidade & LGPD</Link></li>
              <li><a href="mailto:contato@meupdi.app.br" className="hover:text-white transition-colors">Contato (contato@meupdi.app.br)</a></li>
            </ul>
          </div>

          {/* Coluna 2: Para quem quer fazer o PDI */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Para fazer seu PDI
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/o-que-e-pdi" className="hover:text-white transition-colors">O que é PDI e como funciona</Link></li>
              <li><Link to="/como-fazer-um-pdi" className="hover:text-white transition-colors">Como fazer um PDI em 5 passos</Link></li>
              <li><Link to="/exemplo" className="hover:text-white transition-colors">Exemplo de PDI preenchido</Link></li>
              <li><Link to="/pdi-e-curriculo" className="hover:text-white transition-colors">PDI não é currículo: entenda a diferença</Link></li>
              <li><Link to="/hard-skills-e-soft-skills" className="hover:text-white transition-colors">Hard skills e soft skills: como avaliar</Link></li>
              <li><Link to="/pdi-transicao-de-carreira" className="hover:text-white transition-colors">PDI para transição de carreira</Link></li>
              <li><Link to="/como-registrar-evidencias-profissionais" className="hover:text-white transition-colors">Como registrar evidências profissionais</Link></li>
              <li><Link to="/certificacoes-gratuitas" className="hover:text-white transition-colors">Cursos e credenciais gratuitas</Link></li>
              <li className="pt-1">
                <Link to="/guias" className="inline-flex items-center gap-1 font-bold text-[#539CBD] hover:text-white transition-colors">
                  Central com todos os guias <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Para RH e Liderança */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Para RH e Liderança
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/para-rh" className="hover:text-white transition-colors">Solução Meu PDI para RH e Gestores</Link></li>
              <li><Link to="/pdi-ou-pdp" className="hover:text-white transition-colors">PDI ou PDP: qual termo usar?</Link></li>
              <li><Link to="/reuniao-1-on-1-com-evidencias" className="hover:text-white transition-colors">Reunião 1:1 baseada em evidências</Link></li>
              <li><Link to="/matriz-de-competencias-por-area-e-senioridade" className="hover:text-white transition-colors">Matriz por área e senioridade</Link></li>
              <li><Link to="/pdi-no-onboarding-de-colaboradores" className="hover:text-white transition-colors">PDI no onboarding de colaboradores</Link></li>
              <li><Link to="/conversas-de-feedback-com-evidencias" className="hover:text-white transition-colors">Conversas de feedback com evidências</Link></li>
              <li><Link to="/evitar-pdi-esquecido" className="hover:text-white transition-colors">Como evitar que o PDI seja esquecido</Link></li>
              <li><Link to="/privacidade-e-lgpd-no-desenvolvimento" className="hover:text-white transition-colors">Privacidade e LGPD no desenvolvimento</Link></li>
              <li><Link to="/templates-pdi-1on1-feedback-onboarding" className="hover:text-white transition-colors">Templates gratuitos (1:1, feedback e onboarding)</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© 2026 Meu PDI · Todos os dados protegidos pela LGPD · Nenhum dado vendido ou compartilhado com terceiros</span>
          <span className="shrink-0">
            Desenvolvido por{' '}
            <a
              href="https://scaledata.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-[#539CBD] font-semibold transition-colors"
            >
              Scaledata
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
