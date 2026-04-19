import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import { BookOpen, Dumbbell, Video, Users, FolderKanban, CheckCircle2, Circle } from 'lucide-react';

// ── Base de atividades por skill ──────────────────────────────────────────────
type TipoAtividade = 'leitura' | 'pratica' | 'curso' | 'mentoria' | 'projeto';

interface Atividade {
  titulo: string;
  descricao: string;
  tipo: TipoAtividade;
  tempo: string;
  url?: string;
}

const TIPO_ICON: Record<TipoAtividade, React.ReactNode> = {
  leitura:  <BookOpen className="w-4 h-4" />,
  pratica:  <Dumbbell className="w-4 h-4" />,
  curso:    <Video className="w-4 h-4" />,
  mentoria: <Users className="w-4 h-4" />,
  projeto:  <FolderKanban className="w-4 h-4" />,
};

const TIPO_COLOR: Record<TipoAtividade, string> = {
  leitura:  'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
  pratica:  'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300',
  curso:    'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300',
  mentoria: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300',
  projeto:  'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300',
};

// Atividades sugeridas para Soft Skills
const SOFT_ATIVIDADES: Record<string, Atividade[]> = {
  'Inteligência Emocional': [
    { tipo: 'leitura',  titulo: 'Livro: Inteligência Emocional — Daniel Goleman', descricao: 'Fundamento teórico sobre reconhecer e gerir emoções.', tempo: '3h' },
    { tipo: 'pratica',  titulo: 'Diário de Emoções (30 dias)', descricao: 'Antes de dormir, escreva 3 emoções que sentiu e o que as causou.', tempo: '5 min/dia' },
    { tipo: 'mentoria', titulo: 'Conversa com alguém que você admira emocionalmente', descricao: 'Agende um café e pergunte como essa pessoa lida com situações difíceis.', tempo: '1h' },
  ],
  'Comunicação': [
    { tipo: 'leitura',  titulo: 'Livro: Comunicação Não-Violenta — Marshall Rosenberg', descricao: 'Aprenda a fazer pedidos e dar feedback sem agressividade.', tempo: '4h' },
    { tipo: 'pratica',  titulo: 'Estruture 1 comunicação por semana com o modelo FINI', descricao: 'Fato → Impacto → Necessidade → pedido (Intenção). Aplique em e-mails ou conversas.', tempo: '15 min/semana' },
    { tipo: 'curso',    titulo: 'Curso: Comunicação Assertiva (Coursera/LinkedIn Learning)', descricao: 'Exercícios práticos de clareza e concisão.', tempo: '6h', url: 'https://www.linkedin.com/learning' },
  ],
  'Trabalho em Equipe': [
    { tipo: 'pratica',  titulo: '1:1 Informal com colega diferente a cada 2 semanas', descricao: 'Agende 15 minutos só para ouvir — sem agenda, sem julgamento.', tempo: '15 min/quinzenal' },
    { tipo: 'projeto',  titulo: 'Voluntarie-se para um projeto multidisciplinar', descricao: 'Escolha um projeto fora da sua área de conforto que envolva outros times.', tempo: '2h/semana' },
    { tipo: 'leitura',  titulo: 'Livro: Os 5 Desafios das Equipes — Patrick Lencioni', descricao: 'Entenda os padrões que destroem e os que constroem equipes de alta performance.', tempo: '3h' },
  ],
  'Proatividade': [
    { tipo: 'pratica',  titulo: 'Regra dos 2 Minutos (GTD)', descricao: 'Se leva menos de 2 min, faça agora. Para o resto, reserve 1h/semana para agir em coisas que importam.', tempo: 'Diário' },
    { tipo: 'curso',    titulo: 'Método GTD — Getting Things Done', descricao: 'Sistema completo de organização pessoal para ser mais proativo.', tempo: '4h', url: 'https://gettingthingsdone.com' },
    { tipo: 'projeto',  titulo: 'Identifique e resolva 1 problema da equipe por mês sem ser solicitado', descricao: 'Mapeie um gargalo visível e proponha uma solução concreta.', tempo: '2h/mês' },
  ],
  'Visão Sistêmica': [
    { tipo: 'pratica',  titulo: 'Leia os OKRs da empresa e do seu gestor', descricao: 'Entenda como o seu trabalho conecta aos objetivos estratégicos.', tempo: '1h' },
    { tipo: 'leitura',  titulo: 'Livro: A Quinta Disciplina — Peter Senge', descricao: 'Pensamento sistêmico aplicado às organizações.', tempo: '5h' },
    { tipo: 'mentoria', titulo: 'Shadow (sombra) de um executivo por um dia', descricao: 'Peça para acompanhar alguém de nível acima por um dia para entender a visão macro.', tempo: '8h' },
  ],
  'Capacidade de aprender': [
    { tipo: 'pratica',  titulo: 'Técnica Feynman — Explique o que aprendeu para alguém', descricao: 'Após estudar algo, tente explicar como se fosse para uma criança de 12 anos.', tempo: '20 min/semana' },
    { tipo: 'curso',    titulo: 'Aprendendo a Aprender (Coursera — Barbara Oakley)', descricao: 'Técnicas científicas de memorização, foco e aprendizagem eficaz.', tempo: '8h', url: 'https://www.coursera.org/learn/learning-how-to-learn' },
    { tipo: 'pratica',  titulo: 'Estude 1 assunto novo por mês com documentação pública', descricao: 'Escolha um tema relevante para a sua área e gaste 30 min/dia por 4 semanas.', tempo: '30 min/dia' },
  ],
  'Capacidade de mudar (Adaptabilidade)': [
    { tipo: 'leitura',  titulo: 'Livro: Mindset — Carol Dweck', descricao: 'A diferença entre mentalidade fixa e de crescimento.', tempo: '3h' },
    { tipo: 'pratica',  titulo: 'Experimento de 30 dias: faça algo diferente todo dia', descricao: 'Pequenas mudanças de rotina fortalecem o músculo da adaptabilidade.', tempo: '5 min/dia' },
    { tipo: 'pratica',  titulo: 'Substitua "não consigo" por "ainda não consigo"', descricao: 'Prática de linguagem que muda o cérebro ao longo do tempo.', tempo: 'Contínuo' },
  ],
  'Capacidade de lidar com ambiguidade': [
    { tipo: 'pratica',  titulo: 'Técnica da Única Métrica', descricao: 'Quando tudo for incerto, defina qual é a ÚNICA métrica que importa agora.', tempo: '30 min/decisão' },
    { tipo: 'leitura',  titulo: 'Livro: Thinking in Bets — Annie Duke', descricao: 'Como tomar boas decisões mesmo com informações incompletas.', tempo: '4h' },
    { tipo: 'pratica',  titulo: 'Pré-mortem em projetos importantes', descricao: 'Antes de executar, imagine que falhou: o que causou a falha? Documente e mitigue.', tempo: '1h/projeto' },
  ],
  'Capacidade de estabelecer network': [
    { tipo: 'pratica',  titulo: 'Reconecte 2 contatos por mês', descricao: 'Envie uma mensagem genuína — compartilhe um artigo ou parabenize por uma conquista.', tempo: '20 min/mês' },
    { tipo: 'pratica',  titulo: 'Participe de 1 evento da sua área por trimestre', descricao: 'Meetups, webinars ou conferências. Fale com pelo menos 3 pessoas novas.', tempo: '4h/trimestre' },
    { tipo: 'curso',    titulo: 'Personal Branding no LinkedIn', descricao: 'Otimize seu perfil e publique 2x por mês sobre sua área.', tempo: '3h', url: 'https://www.linkedin.com/learning' },
  ],
};

// Atividades sugeridas para Hard Skills (genéricas baseadas no gap)
function gerarAtividadesHard(skill: string, nivelAtual: number, nivelDesejado: number): Atividade[] {
  const gap = nivelDesejado - nivelAtual;
  const atividades: Atividade[] = [
    {
      tipo: 'curso',
      titulo: `Curso focado em: ${skill}`,
      descricao: `Busque um curso intermediário/avançado focado especificamente em "${skill}". Plataformas: Alura, Udemy, Coursera, LinkedIn Learning.`,
      tempo: gap >= 2 ? '10–20h' : '4–8h',
    },
    {
      tipo: 'pratica',
      titulo: `Projeto prático usando ${skill}`,
      descricao: `Crie ou contribua com um projeto real que exija o uso de "${skill}". Aprender na prática consolida 3× mais rápido do que só assistir.`,
      tempo: '2h/semana por 4 semanas',
    },
    {
      tipo: 'mentoria',
      titulo: `Peça feedback de alguém sênior em ${skill}`,
      descricao: `Identifique alguém no seu ambiente que já domina "${skill}" e peça para revisar seu trabalho e apontar lacunas.`,
      tempo: '1h',
    },
  ];
  return atividades;
}

// ── Componente ────────────────────────────────────────────────────────────────
export const Trilha: React.FC = () => {
  const { inventario, trilhaProgresso, toggleTrilhaItem } = usePdiStore();

  const trilha = useMemo(() => {
    const itens: { id: string; skill: string; categoria: string; atividades: Atividade[] }[] = [];

    // Hard Skills com gap
    inventario.hardSkills
      .filter(s => s.nivelAtual < s.nivelDesejado)
      .forEach(s => {
        itens.push({
          id: `hard::${s.skill}`,
          skill: s.skill,
          categoria: `Hard Skill — gap ${s.nivelDesejado - s.nivelAtual} nível${s.nivelDesejado - s.nivelAtual > 1 ? 'is' : ''}`,
          atividades: gerarAtividadesHard(s.skill, s.nivelAtual, s.nivelDesejado),
        });
      });

    // Soft Skills a melhorar
    inventario.softSkills
      .filter(s => s.pontoForteOuMelhoria === 'Melhoria')
      .forEach(s => {
        itens.push({
          id: `soft::${s.atributo}`,
          skill: s.atributo,
          categoria: 'Soft Skill — área de melhoria',
          atividades: SOFT_ATIVIDADES[s.atributo] ?? [
            { tipo: 'leitura', titulo: `Pesquise sobre: ${s.atributo}`, descricao: 'Leia 2 artigos ou 1 capítulo de livro sobre este atributo.', tempo: '1h' },
            { tipo: 'pratica', titulo: `Exercite ${s.atributo} em uma situação real`, descricao: 'Aplique conscientemente este atributo na próxima semana.', tempo: '1 semana' },
            { tipo: 'mentoria', titulo: `Converse com quem você admira neste atributo`, descricao: 'Aprenda como essa pessoa desenvolveu essa competência.', tempo: '30 min' },
          ],
        });
      });

    return itens;
  }, [inventario]);

  const totalAtividades = trilha.reduce((acc, t) => acc + t.atividades.length, 0);
  const concluidasTotal = trilha.reduce((acc, t) =>
    acc + t.atividades.filter((_, ai) => trilhaProgresso[`${t.id}::${ai}`]).length, 0
  );
  const pct = totalAtividades > 0 ? Math.round((concluidasTotal / totalAtividades) * 100) : 0;

  if (trilha.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🎯</div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Trilha não gerada</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">
          Nenhuma gap de skill identificada. Ou todas as suas hard skills estão no nível desejado e não há soft skills a melhorar — ou o inventário não foi preenchido.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-24 lg:pb-0">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">Trilha de Desenvolvimento</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
          Gerada automaticamente com base nas suas gaps de skill. Marque cada atividade conforme for concluindo.
        </p>
      </motion.div>

      {/* Barra de progresso geral */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm mb-8 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
            <span>Progresso geral</span>
            <span>{concluidasTotal}/{totalAtividades} atividades</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
        <span className="text-2xl font-black text-blue-600 dark:text-blue-400 shrink-0">{pct}%</span>
      </div>

      {/* Cards por skill */}
      <div className="space-y-6">
        {trilha.map((grupo, gi) => {
          const concluidas = grupo.atividades.filter((_, ai) => trilhaProgresso[`${grupo.id}::${ai}`]).length;
          const pctGrupo = Math.round((concluidas / grupo.atividades.length) * 100);

          return (
            <motion.div
              key={grupo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.06 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
            >
              {/* Header do grupo */}
              <div className="flex items-start justify-between p-5 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 block mb-1">
                    {grupo.categoria}
                  </span>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">{grupo.skill}</h3>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-sm font-black text-indigo-600 dark:text-indigo-400">{pctGrupo}%</div>
                  <div className="text-[10px] text-slate-400">{concluidas}/{grupo.atividades.length}</div>
                </div>
              </div>

              {/* Atividades */}
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {grupo.atividades.map((atv, ai) => {
                  const key = `${grupo.id}::${ai}`;
                  const done = !!trilhaProgresso[key];

                  return (
                    <button
                      key={ai}
                      onClick={() => toggleTrilhaItem(key)}
                      className={`w-full flex items-start gap-4 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${done ? 'opacity-60' : ''}`}
                    >
                      {done
                        ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                        : <Circle className="w-5 h-5 shrink-0 mt-0.5 text-slate-300 dark:text-slate-600" />
                      }
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${TIPO_COLOR[atv.tipo]}`}>
                            {TIPO_ICON[atv.tipo]} {atv.tipo}
                          </span>
                          <span className="text-[10px] text-slate-400">⏱ {atv.tempo}</span>
                        </div>
                        <p className={`text-sm font-semibold mb-0.5 ${done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                          {atv.titulo}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{atv.descricao}</p>
                        {atv.url && !done && (
                          <a
                            href={atv.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-1 inline-block"
                          >
                            Acessar recurso →
                          </a>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
