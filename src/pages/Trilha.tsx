import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import {
  BookOpen, Dumbbell, Video, Users, FolderKanban,
  CheckCircle2, Circle, Award, Briefcase, Lightbulb,
} from 'lucide-react';
import type { TipoAtividade } from '../data/trilhaTemplates';
import { gerarTrilha, contarProgressoTrilha } from '../lib/trilha';
import { matrizDeCompetencias } from '../data/matrizCompetencias';
import {
  getCertificacoesPorArea,
  type Certificacao,
} from '../data/certificacoesGratuitas';
import {
  ACESSO_INFO, CREDENCIAL_LABEL, CATALOGO_REVISADO_EM, formatarDataBR,
  reportarRecursoUrl, inferirAcessoAtividade,
} from '../lib/recursos';
import { trackEvent } from '../lib/analytics';
import { OBJETIVOS_CARREIRA } from '../data/careerMetadata';

/** Selo de acesso (o que é gratuito / pago / a confirmar) */
const SeloAcesso: React.FC<{ acesso: keyof typeof ACESSO_INFO }> = ({ acesso }) => (
  <span
    title={ACESSO_INFO[acesso].descricao}
    className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-full ${ACESSO_INFO[acesso].className}`}
  >
    {ACESSO_INFO[acesso].label}
  </span>
);

/** Card de curso/credencial externo com fonte, classificação e canal de reporte */
const CertLink: React.FC<{ cert: Certificacao; tambemPara?: string[]; compact?: boolean }> = ({ cert, tambemPara, compact }) => (
  <div className={`rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-800/40 ${compact ? 'p-2.5' : 'p-4'}`}>
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <p className={`${compact ? 'text-xs' : 'text-sm'} font-semibold text-slate-700 dark:text-slate-200`}>{cert.nome}</p>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
          Fonte: {cert.provedor} · {CREDENCIAL_LABEL[cert.credencial]} · Idioma: {cert.idioma.toUpperCase()}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 mt-1">
          <SeloAcesso acesso={cert.acesso} />
          {tambemPara && tambemPara.length > 0 && (
            <span className="text-[10px] text-indigo-600 dark:text-indigo-300">
              também desenvolve: {tambemPara.join(', ')}
            </span>
          )}
        </div>
      </div>
      <a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('course_opened', { nome: cert.nome, origin: 'trilha' })}
        aria-label={`Abrir ${cert.nome} no site oficial (nova aba)`}
        className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 shrink-0 hover:underline"
      >
        Site oficial ↗
      </a>
    </div>
    <a
      href={reportarRecursoUrl(cert.nome, cert.url)}
      className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline mt-1 inline-block"
    >
      Reportar link ou informação incorreta
    </a>
  </div>
);

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

const TIPO_LABEL: Record<TipoAtividade, string> = {
  leitura: 'leitura', pratica: 'prática', curso: 'curso', mentoria: 'mentoria',
  projeto: 'projeto', certificacao: 'certificação', portfolio: 'portfólio',
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

import { AREA_LABEL_MAP as AREA_LABEL } from '../data/areas';

const NIVEL_LABEL: Record<string, string> = {
  estagiario: 'Estagiário',
  junior: 'Júnior',
  pleno: 'Pleno',
  senior: 'Sênior',
  especialista: 'Especialista',
  gestor: 'Gestor',
};

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

  const trilha = useMemo(
    () => gerarTrilha(inventario, usuario.areaAtuacao),
    [inventario, usuario.areaAtuacao],
  );

  /** Cursos e credenciais gerais da área (excluindo os já mostrados nos cards de competência) */
  const certsArea = useMemo(() => {
    const jaMostradas = new Set(
      trilha.flatMap(g => g.certs.map(c => c.cert.url)),
    );
    return getCertificacoesPorArea(usuario.areaAtuacao)
      .filter(c => !jaMostradas.has(c.url));
  }, [trilha, usuario.areaAtuacao]);

  /** Soft skills recomendadas pela matriz mas ainda não avaliadas - sugestões inteligentes */
  const softSugeridas = useMemo(() => {
    const avaliadas = new Set(inventario.softSkills.map(s => s.atributo));
    return softSkillsDaMatriz.filter(s => !avaliadas.has(s)).slice(0, 4);
  }, [softSkillsDaMatriz, inventario.softSkills]);

  const { total: totalAtividades, concluidas: concluidasTotal } = contarProgressoTrilha(trilha, trilhaProgresso);
  const pct = totalAtividades > 0 ? Math.round((concluidasTotal / totalAtividades) * 100) : 0;

  if (trilha.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🎯</div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Trilha não gerada</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">
          Nenhuma lacuna de competência identificada. Complete a autoavaliação no Passo 2 com pelo menos uma habilidade técnica abaixo do nível desejado ou uma habilidade comportamental marcada como "A Melhorar".
        </p>
      </div>
    );
  }

  return (
    <div className="pb-24 lg:pb-0">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">Trilha de Desenvolvimento</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
          Gerada a partir das lacunas da sua autoavaliação. Marque as atividades conforme for concluindo.
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">
          Classificação de custo e credencial revisada em {formatarDataBR(CATALOGO_REVISADO_EM)}. Condições de provedores externos mudam - confirme no site oficial antes de se inscrever.
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
              {[areaLabel, usuario.especialidade, nivelLabel].filter(Boolean).join(' · ')}
            </p>
            {usuario.objetivoCarreira && (() => {
              const obj = OBJETIVOS_CARREIRA.find(o => o.id === usuario.objetivoCarreira);
              return obj ? (
                <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">
                  <strong>Objetivo ({obj.label}):</strong> {obj.focoTrilha}
                </p>
              ) : null;
            })()}
          </div>
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 rounded-xl px-3 py-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
              🏅 = gera uma evidência que você pode incluir no currículo ou perfil. Nada fica público até você compartilhar.
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
            <span>⚡</span> Habilidades comportamentais recomendadas para {areaLabel || 'sua área'} que você ainda não avaliou
          </p>
          <div className="flex flex-wrap gap-2">
            {softSugeridas.map(s => (
              <span key={s} className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-full font-medium">
                {s}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-amber-600 dark:text-amber-500 mt-2">
            Avalie essas competências no Passo 2 → Autoavaliação → Soft skills (comportamentais) para adicioná-las à trilha.
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

      {/* Cards por competência */}
      <div className="space-y-6">
        {trilha.map((grupo, gi) => {
          const concluidas = grupo.atividades.filter(({ ai }) => trilhaProgresso[`${grupo.id}::${ai}`]).length;
          const pctGrupo = grupo.atividades.length > 0 ? Math.round((concluidas / grupo.atividades.length) * 100) : 0;
          const temCertOuPortfolio = grupo.atividades.some(({ atv }) => atv.tipo === 'certificacao' || atv.tipo === 'portfolio');

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
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                      {grupo.categoria}
                    </span>
                    {temCertOuPortfolio && (
                      <span className="text-[10px] bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-bold px-1.5 py-0.5 rounded-full">
                        🏅 Gera evidência para currículo
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">{grupo.skill}</h3>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-sm font-black text-indigo-600 dark:text-indigo-400">{pctGrupo}%</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{concluidas}/{grupo.atividades.length}</div>
                </div>
              </div>

              {/* Atividades */}
              <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                {grupo.atividades.map(({ atv, ai, tambemPara }) => {
                  const key = `${grupo.id}::${ai}`;
                  const done = !!trilhaProgresso[key];
                  const isHighlight = atv.tipo === 'certificacao' || atv.tipo === 'portfolio';
                  const acesso = inferirAcessoAtividade(atv.tipo, atv.url, atv.descricao, atv.titulo);
                  return (
                    <li
                      key={ai}
                      className={`flex items-start gap-4 p-4 ${done ? 'opacity-60' : ''} ${isHighlight && !done ? 'bg-yellow-50/40 dark:bg-yellow-900/10' : ''}`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleTrilhaItem(key)}
                        aria-pressed={done}
                        aria-label={done ? `Desmarcar "${atv.titulo}" como concluída` : `Marcar "${atv.titulo}" como concluída`}
                        className="shrink-0 mt-0.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      >
                        {done
                          ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          : <Circle className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                        }
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${TIPO_COLOR[atv.tipo]}`}>
                            {TIPO_ICON[atv.tipo]}
                            {TIPO_LABEL[atv.tipo]}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">⏱ {atv.tempo}</span>
                          {acesso && <SeloAcesso acesso={acesso} />}
                          {isHighlight && !done && (
                            <span className="text-[10px] text-yellow-700 dark:text-yellow-400 font-bold">🏅 sinal para recrutadores</span>
                          )}
                        </div>
                        <p className={`text-sm font-semibold mb-0.5 ${done ? 'line-through text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                          {atv.titulo}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{atv.descricao}</p>

                        {tambemPara.length > 0 && (
                          <p className="text-[10px] text-indigo-600 dark:text-indigo-300 mb-1">
                            Também desenvolve: {tambemPara.join(', ')}
                          </p>
                        )}

                        {/* Dica para recrutadores */}
                        {atv.headhunterDica && !done && (
                          <p className="text-[10px] text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg px-2 py-1 mt-1">
                            💼 <strong>Para recrutadores:</strong> {atv.headhunterDica}
                          </p>
                        )}

                        {atv.url && !done && (
                          <div className="flex flex-wrap items-center gap-3 mt-1">
                            <a
                              href={atv.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Abrir ${atv.titulo} no site oficial (nova aba)`}
                              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                              Site oficial ↗
                            </a>
                            <a
                              href={reportarRecursoUrl(atv.titulo, atv.url)}
                              className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline"
                            >
                              Reportar link incorreto
                            </a>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Atividades que já aparecem em outra competência */}
              {grupo.compartilhadas.length > 0 && (
                <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                  <p className="font-semibold mb-1">Também ajudam nesta competência (já listadas acima):</p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {grupo.compartilhadas.map(c => (
                      <li key={c.titulo}>{c.titulo} <span className="text-slate-400">- em {c.skillDona}</span></li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cursos e credenciais que casam com esta competência */}
              {grupo.certs.length > 0 && (
                <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-700 bg-emerald-50/40 dark:bg-emerald-900/10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> Cursos e credenciais para esta competência
                  </p>
                  <div className="space-y-1.5">
                    {grupo.certs.map(({ cert, tambemPara }) => (
                      <CertLink key={cert.url} cert={cert} tambemPara={tambemPara} compact />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Seção: cursos e credenciais da área */}
      {certsArea.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
        >
          <div className="p-5 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" /> Cursos e credenciais para {areaLabel || 'sua área'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Cada item indica o que é gratuito (curso, certificado ou exame) e o tipo de credencial. Badges e certificados de conclusão
              não têm o mesmo peso de uma certificação por exame. O Meu PDI organiza seus registros, mas não autentica a competência.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 p-4">
            {certsArea.map(cert => (
              <CertLink key={cert.url} cert={cert} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
