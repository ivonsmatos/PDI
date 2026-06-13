import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Star, TrendingUp, Target, BookOpen,
  Users, FileText, GitCompareArrows, Award, Share2,
  ChevronDown, Zap, Shield, Heart, BarChart3, Map,
  CheckSquare, Bell, Menu, X,
} from 'lucide-react';

/* ── Dados ──────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <Target className="w-6 h-6" />,
    color: 'from-indigo-500 to-blue-500',
    bg: 'bg-indigo-50',
    title: 'Objetivos com propósito',
    desc: 'Defina objetivos educacionais, funcionais e pessoais com prazos e justificativas. Nada fica vago ou esquecido.',
  },
  {
    icon: <Map className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    title: 'Trilha personalizada',
    desc: 'Atividades de desenvolvimento sob medida: cursos, certificações, projetos e mentorias alinhados à sua área e nível.',
  },
  {
    icon: <CheckSquare className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    title: 'Plano de ação concreto',
    desc: 'Cada objetivo vira ações com prazos e recursos. Acompanhe o status e veja seu progresso em tempo real.',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50',
    title: 'Diário de progresso',
    desc: 'Registre reflexões e conquistas semanalmente. Crie um histórico poderoso e tangível do seu crescimento.',
  },
  {
    icon: <GitCompareArrows className="w-6 h-6" />,
    color: 'from-rose-500 to-pink-500',
    bg: 'bg-rose-50',
    title: 'Comparador de nível',
    desc: 'Veja exatamente quais skills faltam para ir de Pleno para Sênior, ou de Júnior para Pleno. Baseado em dados reais.',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    title: 'Currículo de competências',
    desc: 'Exporte um PDF profissional com radar de habilidades, certificações e evolução documentada. Ideal para processos seletivos.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Rafael Mendes',
    role: 'Desenvolvedor → Tech Lead',
    company: 'Fintech, São Paulo',
    photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=120&q=80',
    text: 'Em 3 meses com o Meu PDI, finalmente entendi o que me separava do nível Sênior. Montei o plano, executei e fui promovido 4 meses depois. O comparador de nível foi decisivo.',
    stars: 5,
  },
  {
    name: 'Camila Torres',
    role: 'Analista de R&S',
    company: 'Consultoria de Talentos',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=120&q=80',
    text: 'Quando um candidato chega com o link do PDI estruturado, ele já sai na frente. Consigo ver a evolução real, não só o que ele diz ter feito. Recomendo para todos os meus candidatos.',
    stars: 5,
  },
  {
    name: 'Lucas Ferreira',
    role: 'Gerente de Pessoas',
    company: 'Varejo Nacional',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80',
    text: 'Uso com minha equipe de 12 pessoas. As conversas de carreira ficaram muito mais objetivas. A liderança enxerga evolução concreta, não só intenção. Reduziu o turnover em 30%.',
    stars: 5,
  },
];

const PROS = [
  { label: 'Plano claro com objetivos e ações concretas' },
  { label: 'Diário documentando cada conquista e aprendizado' },
  { label: 'Comparador mostra exatamente o gap para o próximo nível' },
  { label: 'Currículo de competências pronto para entrevistas' },
  { label: 'PDPs baseados em dados reais de evolução' },
  { label: 'Progressão de carreira com intenção e evidência' },
];

const CONS = [
  { label: 'Desenvolvimento disperso e sem foco claro' },
  { label: 'Conquistas não documentadas — invisíveis para o mercado' },
  { label: 'Sem clareza sobre o que falta para subir de nível' },
  { label: 'Entrevistas baseadas em memória, não em evidências' },
  { label: 'Feedback de performance sem base objetiva' },
  { label: 'Sensação de estagnação sem entender o motivo' },
];

/* ── Componente ─────────────────────────────────────────────── */
export const LandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="font-sans text-slate-800 bg-white overflow-x-hidden">

      {/* ── Navbar ──────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-xl font-black bg-gradient-to-r from-indigo-500 to-blue-400 bg-clip-text text-transparent">
            Meu PDI
          </span>
          <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors ${
            scrolled ? 'text-slate-600' : 'text-white/80'
          }`}>
            <a href="#funcionalidades" className={`transition-colors ${scrolled ? 'hover:text-indigo-600' : 'hover:text-white'}`}>Funcionalidades</a>
            <a href="#para-rh" className={`transition-colors ${scrolled ? 'hover:text-indigo-600' : 'hover:text-white'}`}>Para RH</a>
            <a href="#depoimentos" className={`transition-colors ${scrolled ? 'hover:text-indigo-600' : 'hover:text-white'}`}>Depoimentos</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className={`text-sm font-semibold transition-colors px-4 py-2 ${
              scrolled ? 'text-slate-600 hover:text-indigo-600' : 'text-white/80 hover:text-white'
            }`}>
              Entrar
            </Link>
            <Link
              to="/login"
              className={`text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg ${
                scrolled
                  ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                  : 'text-indigo-700 bg-white hover:bg-indigo-50'
              }`}
            >
              Começar grátis →
            </Link>
          </div>
          <button
            className={`md:hidden p-2 transition-colors ${scrolled ? 'text-slate-600' : 'text-white/80'}`}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-3">
            {[['#funcionalidades','Funcionalidades'],['#para-rh','Para RH'],['#depoimentos','Depoimentos']].map(([href,label]) => (
              <a key={href} href={href} onClick={() => setMobileMenu(false)} className="block py-2 text-white/80 font-medium text-sm">{label}</a>
            ))}
            <Link to="/login" onClick={() => setMobileMenu(false)} className="block mt-2 text-center py-3 bg-indigo-600 text-white font-bold rounded-xl text-sm">
              Criar conta grátis
            </Link>
          </div>
        )}
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 overflow-hidden pt-16">
        {/* Orbs decorativos */}
        <div className="absolute -top-48 -right-48 w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-48 -left-24 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Texto */}
          <div>
            <div className="inline-flex items-center gap-2.5 bg-indigo-500/20 border border-indigo-400/30 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-indigo-200 tracking-wide">100% gratuito · Sem cartão · LGPD</span>
            </div>

            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-7">
              Seu PDI.<br />
              <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">Estruturado.</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Vivo.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-lg">
              A ferramenta gratuita que profissionais usam para planejar,
              acompanhar e <strong className="text-white">evidenciar</strong> seu
              desenvolvimento de carreira — com estrutura real e humanidade.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold rounded-2xl shadow-2xl shadow-indigo-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] text-lg"
              >
                Criar meu PDI grátis <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#funcionalidades"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 transition-all text-lg"
              >
                Ver como funciona
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {[
                  'photo-1531427186611-ecfd6d936c79',
                  'photo-1573497019940-1c28c88b4f3e',
                  'photo-1560250097-0b93528c311a',
                  'photo-1438761681033-6461ffad8d80',
                  'photo-1507003211169-0a1dd7228f2d',
                ].map((id) => (
                  <img
                    key={id}
                    src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=80&q=80`}
                    alt=""
                    className="w-9 h-9 rounded-full border-2 border-indigo-900 object-cover"
                  />
                ))}
              </div>
              <div className="text-sm text-slate-400">
                <span className="text-white font-bold">+2.400 profissionais</span> já têm seu PDI estruturado
              </div>
            </div>
          </div>

          {/* Foto + cards flutuantes */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85"
                alt="Profissional usando o Meu PDI"
                className="w-full object-cover aspect-[3/4]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-transparent to-transparent" />
            </div>

            {/* Card Score */}
            <div className="absolute -left-10 top-20 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100" style={{ animation: 'float 3.2s ease-in-out infinite' }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Saúde do PDI</p>
                  <p className="text-2xl font-black text-emerald-600">87%</p>
                </div>
              </div>
            </div>

            {/* Card Conquista */}
            <div className="absolute -right-10 top-1/2 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100" style={{ animation: 'float 4s ease-in-out infinite 0.8s' }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Conquista</p>
                  <p className="text-sm font-bold text-amber-700">Pleno → Sênior 🎉</p>
                </div>
              </div>
            </div>

            {/* Card compartilhar */}
            <div className="absolute -left-10 bottom-20 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100" style={{ animation: 'float 3.5s ease-in-out infinite 0.4s' }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Perfil público</p>
                  <p className="text-xs font-bold text-indigo-600">meupdi.app.br/p/abc</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="#sobre" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/70 transition-colors" style={{ animation: 'bounce 2s infinite' }}>
          <ChevronDown className="w-8 h-8" />
        </a>
      </section>

      {/* ── Trust strip ──────────────────────────────────────── */}
      <section id="sobre" className="bg-white border-b border-slate-100 py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              { icon: <Zap className="w-4 h-4 text-amber-500" />,    text: '100% Gratuito' },
              { icon: <Shield className="w-4 h-4 text-emerald-500" />, text: 'LGPD Compliant' },
              { icon: <BarChart3 className="w-4 h-4 text-indigo-500" />, text: '26 Áreas Profissionais' },
              { icon: <TrendingUp className="w-4 h-4 text-blue-500" />,  text: '6 Níveis de Carreira' },
              { icon: <Bell className="w-4 h-4 text-violet-500" />,   text: 'Notificações de Prazo' },
              { icon: <Heart className="w-4 h-4 text-rose-500" />,    text: 'Sem cartão de crédito' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                {item.icon} {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problema ─────────────────────────────────────────── */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(79,70,229,0.15),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-indigo-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">A realidade de quem não tem PDI</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            Você sabe onde quer chegar.<br />
            <span className="text-slate-400">Mas não tem um plano claro.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
            Sem estrutura, o desenvolvimento fica disperso. As conquistas se perdem.
            Na hora da entrevista, você não consegue demonstrar sua evolução com evidências.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { stat: '73%', label: 'dos profissionais não têm um plano de desenvolvimento documentado', accent: 'text-rose-400' },
              { stat: '68%', label: 'sente que não evolui na velocidade que poderia evoluir', accent: 'text-amber-400' },
              { stat: '12%', label: 'consegue demonstrar evidências concretas de crescimento em entrevistas', accent: 'text-sky-400' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-7 text-left backdrop-blur-sm hover:bg-white/[0.07] transition-colors">
                <p className={`text-5xl font-black mb-3 ${item.accent}`}>{item.stat}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section id="funcionalidades" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-bold text-xs uppercase tracking-[0.2em] mb-3">Para profissionais</p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-5 leading-tight">
              Tudo que você precisa para<br />
              <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">evoluir com intenção</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Não é mais um formulário de RH que ninguém abre.
              É um sistema vivo que você usa toda semana.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="group p-7 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 bg-white"
              >
                <div className={`w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Extras */}
          <div className="mt-10 p-8 rounded-3xl bg-gradient-to-br from-indigo-50 via-blue-50 to-white border border-indigo-100">
            <p className="font-bold text-indigo-800 mb-6 text-center text-lg">E muito mais, tudo gratuito:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                'Check-in semanal guiado','Modo escuro automático',
                'Funciona offline (PWA)','Sincronização em nuvem',
                'Perfil público compartilhável','Gamificação e conquistas',
                'Histórico de ciclos','Notificações de prazo',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-medium text-indigo-700">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Como funciona ────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-indigo-600 font-bold text-xs uppercase tracking-[0.2em] mb-3">Como funciona</p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-5">
            Do zero ao PDI em <span className="text-indigo-600">30 minutos</span>
          </h2>
          <p className="text-slate-500 text-lg mb-16 max-w-xl mx-auto">
            Um wizard guiado leva você passo a passo, sem complicação.
            Você sai com um plano completo e acionável.
          </p>

          <div className="grid sm:grid-cols-3 gap-10 relative">
            <div className="hidden sm:block absolute top-[46px] left-[calc(50%/3+48px)] right-[calc(50%/3+48px)] h-0.5 bg-gradient-to-r from-indigo-200 via-blue-300 to-emerald-200" />
            {[
              {
                n: '01', color: 'from-indigo-500 to-blue-500',
                icon: <Users className="w-7 h-7" />,
                title: 'Configure seu perfil',
                desc: 'Escolha sua área, nível atual e auto-avalie suas competências hard e soft. Leva 10 minutos.',
              },
              {
                n: '02', color: 'from-blue-500 to-cyan-500',
                icon: <Target className="w-7 h-7" />,
                title: 'Monte seu plano',
                desc: 'Defina objetivos claros e crie ações com prazos. O Campo de Forças identifica aliados e obstáculos.',
              },
              {
                n: '03', color: 'from-emerald-500 to-teal-500',
                icon: <TrendingUp className="w-7 h-7" />,
                title: 'Acompanhe e compartilhe',
                desc: 'Registre progresso semanalmente. Compartilhe com RH ou gestor. Exporte seu currículo de competências.',
              },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`relative w-24 h-24 rounded-3xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-2xl mb-6`}>
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-[11px] font-black text-slate-600">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <Link
            to="/login"
            className="inline-flex items-center gap-2.5 mt-16 px-10 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-2xl shadow-2xl shadow-indigo-200 transition-all hover:scale-[1.02] text-lg"
          >
            Criar meu PDI agora — grátis <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── Comparador callout ───────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_80%_50%,rgba(255,255,255,0.08),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
            <GitCompareArrows className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              "O que falta para eu ser Sênior?"
            </h3>
            <p className="text-indigo-200 text-lg leading-relaxed">
              O Comparador de Nível cruza suas competências atuais com a matriz do próximo nível
              e mostra exatamente quais skills desenvolver — sem achismo.
            </p>
          </div>
          <Link
            to="/login"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 transition-colors shadow-xl text-sm whitespace-nowrap"
          >
            Descobrir meus gaps <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Para RH ──────────────────────────────────────────── */}
      <section id="para-rh" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Foto */}
            <div className="relative order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=85"
                  alt="Equipe de RH em reunião"
                  className="w-full object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent rounded-3xl" />
              </div>
              {/* Badge flutuante */}
              <div className="absolute -bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-72 bg-white rounded-2xl p-5 shadow-2xl border border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                    <Share2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-0.5">Perfil público verificável</p>
                    <p className="text-sm font-bold text-slate-800">meupdi.app.br/p/rafael-mendes</p>
                    <p className="text-xs text-indigo-600 mt-1">↗ Radar de skills · Histórico · Ciclos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 mb-6">
                <Users className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700">Para RH, Headhunters e Gestores</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Candidatos com<br />
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  evidências, não promessas
                </span>
              </h2>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                Quando um profissional usa o Meu PDI, você acessa um histórico real de
                desenvolvimento — não apenas o que ele diz, mas o que ele <strong className="text-slate-700">efetivamente fez</strong>.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: <FileText className="w-5 h-5 text-emerald-600" />,
                    bg: 'bg-emerald-50 border-emerald-100',
                    title: 'Currículo de competências estruturado',
                    desc: 'Candidatos exportam um PDF com radar de skills, certificações e evolução documentada por ciclos.',
                  },
                  {
                    icon: <Share2 className="w-5 h-5 text-blue-600" />,
                    bg: 'bg-blue-50 border-blue-100',
                    title: 'Link de perfil público verificável',
                    desc: 'Cada profissional tem uma URL com radar de competências e progresso. Você avalia antes da entrevista.',
                  },
                  {
                    icon: <TrendingUp className="w-5 h-5 text-violet-600" />,
                    bg: 'bg-violet-50 border-violet-100',
                    title: 'Evidências concretas de evolução',
                    desc: 'O diário e histórico de ciclos mostram como a pessoa realmente se desenvolveu — não só o que ela "sabe fazer".',
                  },
                  {
                    icon: <Users className="w-5 h-5 text-indigo-600" />,
                    bg: 'bg-indigo-50 border-indigo-100',
                    title: 'PDPs e conversas de carreira mais eficazes',
                    desc: 'Para gestores: use o PDI estruturado nas 1:1s e PDPs. Menos suposição, mais clareza e engajamento.',
                  },
                ].map((item, i) => (
                  <div key={i} className={`flex gap-4 p-4 rounded-2xl border ${item.bg}`}>
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1 text-sm">{item.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                <p className="text-sm text-emerald-800 leading-relaxed">
                  <span className="font-bold">Dica para headhunters:</span> Recomende o Meu PDI para seus candidatos antes de apresentá-los ao cliente. Candidatos com PDI estruturado chegam mais preparados e têm taxas de aprovação significativamente maiores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Depoimentos ──────────────────────────────────────── */}
      <section id="depoimentos" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-bold text-xs uppercase tracking-[0.2em] mb-3">Depoimentos</p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              Quem usa, recomenda
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Profissionais de diferentes áreas compartilham como o Meu PDI mudou sua trajetória.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed flex-1 mb-6 text-[15px] italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100"
                  />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                    <p className="text-xs text-indigo-600 font-semibold">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparação ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              A diferença é clara
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Profissionais com PDI estruturado são mais reconhecidos, promovidos mais rápido e
              chegam mais preparados em processos seletivos.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-rose-50 border border-rose-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 font-black text-sm">✕</div>
                <h3 className="font-black text-rose-700 text-xl">Sem PDI estruturado</h3>
              </div>
              <ul className="space-y-3">
                {CONS.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-rose-800">
                    <span className="w-4 h-4 rounded-full bg-rose-200 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-rose-600">✕</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-black text-sm">✓</div>
                <h3 className="font-black text-emerald-700 text-xl">Com Meu PDI</h3>
              </div>
              <ul className="space-y-3">
                {PROS.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Final ────────────────────────────────────────── */}
      <section className="py-28 bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-5 py-2 mb-8">
            <Heart className="w-4 h-4 text-rose-300" />
            <span className="text-white text-sm font-semibold">Feito com cuidado para quem quer crescer</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05]">
            Comece hoje.<br />
            Grátis.<br />
            <span className="text-indigo-200">Para sempre.</span>
          </h2>
          <p className="text-indigo-200 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Não precisa de cartão de crédito. Não existe versão paga.
            Seus dados são seus. Crie sua conta em menos de 2 minutos.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-3 px-12 py-6 bg-white hover:bg-slate-50 text-indigo-700 font-black rounded-2xl shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] text-xl"
          >
            Criar meu PDI agora <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="mt-6 text-indigo-300 text-sm">
            Já tem conta?{' '}
            <Link to="/login" className="text-white font-bold hover:underline">Fazer login →</Link>
          </p>

          {/* Mini stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { n: '2 min', label: 'para criar a conta' },
              { n: '30 min', label: 'para ter seu PDI completo' },
              { n: '100%', label: 'gratuito para sempre' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black text-white mb-1">{s.n}</p>
                <p className="text-indigo-300 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xl font-black bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Meu PDI
              </span>
              <p className="text-slate-500 text-sm mt-1">Plano de Desenvolvimento Individual gratuito</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-500">
              <Link to="/privacidade" className="hover:text-white transition-colors">Privacidade & LGPD</Link>
              <a href="#funcionalidades" className="hover:text-white transition-colors">Funcionalidades</a>
              <a href="#para-rh" className="hover:text-white transition-colors">Para RH</a>
              <a href="mailto:contato@meupdi.app.br" className="hover:text-white transition-colors">Contato</a>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
            <span>© 2026 Meu PDI · Todos os dados protegidos pela LGPD · Nenhum dado vendido ou compartilhado com terceiros</span>
            <span className="shrink-0">
              Desenvolvido por{' '}
              <a
                href="https://scaledata.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-indigo-400 font-semibold transition-colors"
              >
                Scaledata
              </a>
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(-8px); }
        }
      `}</style>
    </div>
  );
};
