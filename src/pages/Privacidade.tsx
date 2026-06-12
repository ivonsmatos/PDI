import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Gift, Lock, UserCheck, Trash2, Mail, BookOpen, Target, TrendingUp, CheckSquare } from 'lucide-react';

export const Privacidade: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Meu PDI
          </span>
          <h1 className="mt-3 text-2xl font-bold text-slate-800 dark:text-slate-100">
            Privacidade, LGPD e Como Usar
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Última atualização: maio de 2026
          </p>
        </div>

        {/* É gratuito */}
        <Section icon={<Gift className="w-5 h-5 text-emerald-500" />} title="É 100% gratuito">
          <p>
            O Meu PDI é gratuito e assim pretende permanecer. Não há planos pagos,
            cobrança de assinatura ou funcionalidades escondidas atrás de paywall.
            Você cria sua conta, monta seu plano de desenvolvimento e usa à vontade —
            sem pagar nada.
          </p>
        </Section>

        {/* Quais dados coletamos */}
        <Section icon={<Lock className="w-5 h-5 text-indigo-500" />} title="Quais dados coletamos">
          <p className="mb-3">Coletamos somente o necessário para que a ferramenta funcione:</p>
          <ul className="space-y-2 text-sm">
            <Item>
              <strong>Nome e e-mail</strong> — para identificar sua conta e personalizar a experiência.
            </Item>
            <Item>
              <strong>Dados do seu PDI</strong> — objetivos, plano de ação, autoavaliação de competências,
              diário de bordo e histórico de ciclos. Tudo o que você digita fica salvo na sua conta.
            </Item>
            <Item>
              <strong>Preferências</strong> — como modo escuro, área de atuação e nível de carreira.
            </Item>
          </ul>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Não coletamos localização, dispositivo, comportamento de navegação nem qualquer
            dado sensível.
          </p>
        </Section>

        {/* Como usamos os dados */}
        <Section icon={<Shield className="w-5 h-5 text-blue-500" />} title="Como usamos seus dados">
          <p className="mb-3 font-medium text-slate-700 dark:text-slate-300">
            Seus dados são seus. Ponto.
          </p>
          <ul className="space-y-2 text-sm">
            <Item>Usamos seus dados <strong>exclusivamente</strong> para salvar e sincronizar seu PDI entre dispositivos.</Item>
            <Item><strong>Nunca</strong> vendemos, alugamos ou compartilhamos seus dados com terceiros.</Item>
            <Item><strong>Nunca</strong> usamos seus dados para marketing, publicidade ou análise comercial.</Item>
            <Item><strong>Nunca</strong> enviamos e-mails promocionais ou notificações não solicitadas.</Item>
            <Item>O único e-mail que você pode receber é o de recuperação de senha, caso você solicite.</Item>
          </ul>
        </Section>

        {/* LGPD */}
        <Section icon={<UserCheck className="w-5 h-5 text-purple-500" />} title="Seus direitos — LGPD (Lei 13.709/2018)">
          <p className="mb-3">
            A Lei Geral de Proteção de Dados garante que você tem controle total sobre
            suas informações. Você pode, a qualquer momento:
          </p>
          <ul className="space-y-2 text-sm">
            <Item><strong>Acessar</strong> todos os dados que temos sobre você.</Item>
            <Item><strong>Corrigir</strong> dados incompletos, inexatos ou desatualizados.</Item>
            <Item><strong>Excluir</strong> sua conta e todos os seus dados permanentemente.</Item>
            <Item><strong>Portabilidade</strong> — solicitar seus dados em formato legível.</Item>
            <Item><strong>Revogar consentimento</strong> a qualquer momento, sem ônus.</Item>
          </ul>
          <p className="mt-4 text-sm">
            Para exercer qualquer um desses direitos, entre em contato pelo e-mail abaixo.
            Respondemos em até 72 horas.
          </p>
        </Section>

        {/* Exclusão de conta */}
        <Section icon={<Trash2 className="w-5 h-5 text-red-500" />} title="Exclusão de conta e dados">
          <p>
            Para excluir sua conta e todos os dados associados permanentemente,
            envie um e-mail com o assunto <strong>"Excluir minha conta"</strong> para
            o endereço abaixo. Seus dados serão removidos do Firestore em até 5 dias úteis
            e não há possibilidade de recuperação após esse processo.
          </p>
        </Section>

        {/* Contato */}
        <Section icon={<Mail className="w-5 h-5 text-slate-500" />} title="Contato e encarregado de dados (DPO)">
          <p>
            E-mail:{' '}
            <a href="mailto:contato@meupdi.app.br" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              contato@meupdi.app.br
            </a>
          </p>
        </Section>

        {/* Divisor */}
        <hr className="my-10 border-slate-200 dark:border-slate-700" />

        {/* Como usar */}
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
          Como usar o Meu PDI
        </h2>

        <div className="grid gap-4">

          <HowToCard
            step="1"
            icon={<BookOpen className="w-5 h-5 text-indigo-500" />}
            title="Complete o Wizard de configuração"
            desc="Ao criar sua conta, um assistente guiado vai te ajudar a preencher seu perfil, autoavaliar suas competências (hard e soft skills), definir objetivos e montar seu primeiro plano de ação. Leva entre 15 e 30 minutos."
          />

          <HowToCard
            step="2"
            icon={<Target className="w-5 h-5 text-emerald-500" />}
            title="Acesse sua Trilha de Desenvolvimento"
            desc='Na seção "Trilha", a ferramenta sugere atividades personalizadas (cursos, projetos, certificações, mentorias) com base nas suas competências e na sua área de atuação. Cada atividade inclui uma dica de como torná-la visível para recrutadores.'
          />

          <HowToCard
            step="3"
            icon={<CheckSquare className="w-5 h-5 text-blue-500" />}
            title="Gerencie seu Plano de Ação"
            desc='No "Plano", você acompanha cada ação definida nos seus objetivos. Marque como Pendente, Em andamento ou Concluído. O progresso é calculado automaticamente.'
          />

          <HowToCard
            step="4"
            icon={<BookOpen className="w-5 h-5 text-amber-500" />}
            title="Mantenha um Diário de Bordo"
            desc='Registre reflexões, aprendizados e conquistas no "Diário". Você pode vincular cada entrada a um objetivo específico para ter rastreabilidade do seu desenvolvimento ao longo do tempo.'
          />

          <HowToCard
            step="5"
            icon={<TrendingUp className="w-5 h-5 text-purple-500" />}
            title="Acompanhe sua Evolução"
            desc='A seção "Evolução" mostra gráficos do seu score de saúde do PDI, histórico de ciclos e progresso das competências. Use para revisões mensais ou trimestrais.'
          />

          <HowToCard
            step="6"
            icon={<Target className="w-5 h-5 text-rose-500" />}
            title="Inicie um Novo Ciclo"
            desc='Ao final de cada período (trimestral ou semestral), use o botão "Novo Ciclo" para registrar uma retrospectiva, salvar o ciclo atual no histórico e começar um novo plano com aprendizados renovados.'
          />

        </div>

        <div className="mt-10 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 text-sm text-slate-600 dark:text-slate-400">
          <strong className="text-indigo-700 dark:text-indigo-300">Dica para headhunters e gestores:</strong>{' '}
          As seções de Trilha e Evolução mostram evidências concretas do desenvolvimento —
          certificações, projetos e progressão de competências documentadas. Ideal para
          apresentar em processos seletivos e avaliações de desempenho.
        </div>

        <p className="mt-10 text-center text-xs text-slate-400 dark:text-slate-500 pb-8">
          © 2026 Meu PDI · Todos os direitos reservados
        </p>
      </div>
    </div>
  );
};

// ── Componentes auxiliares ────────────────────────────────────────────────────

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="mb-8 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h2 className="font-bold text-slate-800 dark:text-slate-100">{title}</h2>
    </div>
    <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
      {children}
    </div>
  </div>
);

const Item: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex gap-2 items-start">
    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
    <span>{children}</span>
  </li>
);

const HowToCard: React.FC<{ step: string; icon: React.ReactNode; title: string; desc: string }> = ({ step, icon, title, desc }) => (
  <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
    <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 flex items-center justify-center text-white text-xs font-bold">
      {step}
    </div>
    <div>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100">{title}</h3>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);
