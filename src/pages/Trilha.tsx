import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import {
  BookOpen, Dumbbell, Video, Users, FolderKanban,
  CheckCircle2, Circle, Award, Briefcase, Lightbulb,
} from 'lucide-react';
import {
  HARD_SKILL_TEMPLATES, SOFT_ATIVIDADES,
  type TipoAtividade, type Atividade,
} from '../data/trilhaTemplates';
import { matrizDeCompetencias } from '../data/matrizCompetencias';
import {
  getCertificacoesPorArea, getCertificacoesPorSkill,
  type Certificacao,
} from '../data/certificacoesGratuitas';

// ── Ícones e cores por tipo ────────────────────────────────────────────────────
const TIPO_ICON: Record<TipoAtividade, React.ReactNode> = {
  leitura:      <BookOpen className="w-3.5 h-3.5" />,
  pratica:      <Dumbbell className="w-3.5 h-3.5" />,
  curso:        <Video className="w-3.5 h-3.5" />,
  mentoria:     <Users className="w-3.5 h-3.5" />,
  projeto:      <FolderKanban className="w-3.5 h-3.5" />,
  certificacao: <Award className="w-3.5 h-3.5" />,
  portfolio:    <Briefcase className="w-3.5 h-3.5" />,
};

const TIPO_COLOR: Record<TipoAtividade, string> = {
  leitura:      'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
  pratica:      'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300',
  curso:        'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300',
  mentoria:     'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300',
  projeto:      'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300',
  certificacao: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  portfolio:    'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300',
};

/** Retorna rótulo legível da área de atuação */
const AREA_LABEL: Record<string, string> = {
  tecnologia: 'Tecnologia / Desenvolvimento',
  devops_infraestrutura: 'DevOps & Infraestrutura',
  seguranca_informacao: 'Segurança da Informação',
  qualidade_qa: 'Qualidade / QA',
  ciencia_de_dados: 'Ciência de Dados / BI',
  gestao_de_produto: 'Gestão de Produto',
  inovacao_transformacao_digital: 'Inovação & Transformação Digital',
  administracao: 'Administração',
  gestao: 'Gestão & Liderança',
  financas: 'Finanças',
  contabilidade: 'Contabilidade',
  compras_procurement: 'Compras & Procurement',
  logistica_supply_chain: 'Logística & Supply Chain',
  recursos_humanos: 'Recursos Humanos',
  marketing: 'Marketing',
  vendas: 'Vendas',
  customer_success: 'Customer Success',
  comunicacao_relacoes_publicas: 'Comunicação & Relações Públicas',
  design: 'Design / UX-UI',
  saude: 'Saúde',
  educacao: 'Educação',
  direito: 'Direito',
  engenharia: 'Engenharia',
  sustentabilidade_esg: 'Sustentabilidade & ESG',
  agronegocio: 'Agronegócio',
  varejo: 'Varejo & E-commerce',
};

const NIVEL_LABEL: Record<string, string> = {
  estagiario: 'Estagiário',
  junior: 'Júnior',
  pleno: 'Pleno',
  senior: 'Sênior',
  especialista: 'Especialista',
  gestor: 'Gestor',
};

/** Busca atividades específicas por nome de skill (keyword match) */
function getAtividadesHard(skill: string, nivelAtual: number, nivelDesejado: number): Atividade[] {
  const skillLower = skill.toLowerCase();
  const found = HARD_SKILL_TEMPLATES.find(t =>
    t.keywords.some(kw => skillLower.includes(kw))
  );
  if (found) return found.atividades;

  const gap = nivelDesejado - nivelAtual;
  return [
    {
      tipo: 'curso',
      titulo: `Curso focado em: ${skill}`,
      descricao: `Busque um curso ${gap >= 2 ? 'intermediário/avançado' : 'introdutório/prático'} em "${skill}". Plataformas: Alura, Udemy, Coursera, LinkedIn Learning.`,
      tempo: gap >= 2 ? '10–20h' : '4–8h',
      headhunterDica: 'Adicione o certificado ao LinkedIn em Licenças e Certificados com data de conclusão.',
    },
    {
      tipo: 'portfolio',
      titulo: `Projeto prático demonstrando ${skill}`,
      descricao: `Crie ou contribua com um projeto real que exija "${skill}". Publique no GitHub com README claro mostrando o problema resolvido e o resultado.`,
      tempo: '2h/semana por 4 semanas',
      headhunterDica: 'Repositório público com resultado mensurável. Cole o link no LinkedIn e na candidatura.',
    },
    {
      tipo: 'mentoria',
      titulo: `Feedback de um especialista em ${skill}`,
      descricao: `Identifique alguém no ambiente que já domina "${skill}" e peça para revisar seu trabalho apontando lacunas específicas.`,
      tempo: '1h',
      headhunterDica: 'Solicite um recommendation no LinkedIn sobre sua evolução nessa competência.',
    },
  ];
}

// ── Componente ─────────────────────────────────────────────────────────────────
export const Trilha: React.FC = () => {
  const { inventario, trilhaProgresso, toggleTrilhaItem, usuario } = usePdiStore();

  const areaLabel = AREA_LABEL[usuario.areaAtuacao] ?? '';
  const nivelLabel = NIVEL_LABEL[usuario.nivelCarreira] ?? '';

  /** Soft skills recomendadas pela matriz para a área+nível do usuário */
  const softSkillsDaMatriz = useMemo<string[]>(() => {
    if (!usuario.areaAtuacao || !usuario.nivelCarreira) return [];
    const matriz = matrizDeCompetencias as Record<string, Record<string, { softSkills: string[] }>>;
    const area = matriz[usuario.areaAtuacao];
    if (!area) return [];
    const nivel = area[usuario.nivelCarreira];
    if (!nivel) return [];
    return nivel.softSkills ?? [];
  }, [usuario.areaAtuacao, usuario.nivelCarreira]);

  const trilha = useMemo(() => {
    const itens: { id: string; skill: string; categoria: string; atividades: Atividade[]; certs: Certificacao[] }[] = [];

    // Hard Skills com gap
    inventario.hardSkills
      .filter(s => s.nivelAtual < s.nivelDesejado)
      .forEach(s => {
        itens.push({
          id: `hard::${s.skill}`,
          skill: s.skill,
          categoria: `Hard Skill — gap ${s.nivelDesejado - s.nivelAtual} nível${s.nivelDesejado - s.nivelAtual > 1 ? 'is' : ''}`,
          atividades: getAtividadesHard(s.skill, s.nivelAtual, s.nivelDesejado),
          certs: getCertificacoesPorSkill(s.skill, usuario.areaAtuacao).slice(0, 3),
        });
      });

    // Soft Skills marcadas como "A Melhorar"
    inventario.softSkills
      .filter(s => s.pontoForteOuMelhoria === 'Melhoria')
      .forEach(s => {
        const atividades = SOFT_ATIVIDADES[s.atributo] ?? [
          { tipo: 'leitura' as TipoAtividade, titulo: `Pesquise sobre: ${s.atributo}`, descricao: 'Leia 2 artigos ou 1 capítulo de livro sobre este atributo.', tempo: '1h' },
          { tipo: 'pratica' as TipoAtividade, titulo: `Exercite ${s.atributo} em situação real`, descricao: 'Aplique conscientemente este atributo na próxima semana e anote o resultado.', tempo: '1 semana', headhunterDica: 'Documente o resultado no Diário e use como exemplo em entrevistas.' },
          { tipo: 'mentoria' as TipoAtividade, titulo: `Converse com quem você admira neste atributo`, descricao: 'Aprenda como essa pessoa desenvolveu essa competência ao longo do tempo.', tempo: '30 min' },
        ];
        itens.push({
          id: `soft::${s.atributo}`,
          skill: s.atributo,
          categoria: 'Soft Skill — área de melhoria',
          atividades,
          certs: [],
        });
      });

    return itens;
  }, [inventario, usuario.areaAtuacao]);

  /** Certificações gratuitas gerais da área (excluindo as já mostradas nos cards de skill) */
  const certsArea = useMemo(() => {
    const jaMostradas = new Set(
      trilha.flatMap(g => g.certs.map(c => c.url)),
    );
    return getCertificacoesPorArea(usuario.areaAtuacao)
      .filter(c => !jaMostradas.has(c.url));
  }, [trilha, usuario.areaAtuacao]);

  /** Soft skills recomendadas pela matriz mas ainda não avaliadas — sugestões inteligentes */
  const softSugeridas = useMemo(() => {
    const avaliadas = new Set(inventario.softSkills.map(s => s.atributo));
    return softSkillsDaMatriz.filter(s => !avaliadas.has(s)).slice(0, 4);
  }, [softSkillsDaMatriz, inventario.softSkills]);

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
          Nenhuma gap de skill identificada. Complete o inventário no Passo 2 com pelo menos uma hard skill abaixo do nível desejado ou uma soft skill marcada como "A Melhorar".
        </p>
      </div>
    );
  }

  return (
    <div className="pb-24 lg:pb-0">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">Trilha de Desenvolvimento</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Gerada com base nas suas gaps de skill. Recursos reais e curados. Marque conforme for concluindo.
        </p>
      </motion.div>

      {/* Banner de contexto de carreira */}
      {(areaLabel || nivelLabel) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3"
        >
          <span className="text-indigo-600 dark:text-indigo-300 text-lg">🧭</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-0.5">
              Trilha personalizada para
            </p>
            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100">
              {[areaLabel, nivelLabel].filter(Boolean).join(' · ')}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 rounded-xl px-3 py-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
              Certificações e portfólio marcados 🏅 = visíveis para headhunters
            </span>
          </div>
        </motion.div>
      )}

      {/* Sugestões de soft skills da matriz */}
      {softSugeridas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl p-4 mb-6"
        >
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span>⚡</span> Soft skills recomendadas pelo mercado para {areaLabel || 'sua área'} que ainda não avaliou
          </p>
          <div className="flex flex-wrap gap-2">
            {softSugeridas.map(s => (
              <span key={s} className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-full font-medium">
                {s}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-amber-600 dark:text-amber-500 mt-2">
            Avalie essas competências no Passo 2 → Auto-Avaliação → Soft Skills para adicioná-las à trilha.
          </p>
        </motion.div>
      )}

      {/* Barra de progresso */}
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
          const temCertOuPortfolio = grupo.atividades.some(a => a.tipo === 'certificacao' || a.tipo === 'portfolio');

          return (
            <motion.div
              key={grupo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.06 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                      {grupo.categoria}
                    </span>
                    {temCertOuPortfolio && (
                      <span className="text-[10px] bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-bold px-1.5 py-0.5 rounded-full">
                        🏅 Visível para headhunters
                      </span>
                    )}
                  </div>
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
                  const isHighlight = atv.tipo === 'certificacao' || atv.tipo === 'portfolio';
                  return (
                    <button
                      key={ai}
                      onClick={() => toggleTrilhaItem(key)}
                      className={`w-full flex items-start gap-4 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${done ? 'opacity-60' : ''} ${isHighlight && !done ? 'bg-yellow-50/40 dark:bg-yellow-900/10' : ''}`}
                    >
                      {done
                        ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                        : <Circle className="w-5 h-5 shrink-0 mt-0.5 text-slate-300 dark:text-slate-600" />
                      }
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${TIPO_COLOR[atv.tipo]}`}>
                            {TIPO_ICON[atv.tipo]}
                            {atv.tipo === 'certificacao' ? 'certificação' : atv.tipo === 'portfolio' ? 'portfólio' : atv.tipo}
                          </span>
                          <span className="text-[10px] text-slate-400">⏱ {atv.tempo}</span>
                          {isHighlight && !done && (
                            <span className="text-[10px] text-yellow-600 dark:text-yellow-400 font-bold">🏅 headhunter signal</span>
                          )}
                        </div>
                        <p className={`text-sm font-semibold mb-0.5 ${done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                          {atv.titulo}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{atv.descricao}</p>

                        {/* Dica headhunter */}
                        {atv.headhunterDica && !done && (
                          <p className="text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg px-2 py-1 mt-1">
                            💼 <strong>Para recrutadores:</strong> {atv.headhunterDica}
                          </p>
                        )}

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

              {/* Certificações gratuitas que casam com esta skill */}
              {grupo.certs.length > 0 && (
                <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-700 bg-emerald-50/40 dark:bg-emerald-900/10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> Certificações gratuitas para esta skill
                  </p>
                  <div className="space-y-1.5">
                    {grupo.certs.map(cert => (
                      <a
                        key={cert.url}
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-800/40 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{cert.nome}</p>
                          <p className="text-[10px] text-slate-400">{cert.provedor} · grátis</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:translate-x-0.5 transition-transform">
                          Acessar →
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Seção: certificações gratuitas da área */}
      {certsArea.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
        >
          <div className="p-5 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" /> Certificações gratuitas para {areaLabel || 'sua área'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Credenciais reconhecidas, 100% gratuitas. Conclua e adicione ao seu LinkedIn e ao Currículo de Competências.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 divide-slate-100 dark:divide-slate-700">
            {certsArea.map(cert => (
              <a
                key={cert.url}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 p-4 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors group border-slate-100 dark:border-slate-700 sm:border-b sm:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{cert.nome}</p>
                    <p className="text-[10px] text-slate-400">{cert.provedor} · grátis</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:translate-x-0.5 transition-transform">
                  Acessar →
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
