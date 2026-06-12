import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import { ExternalLink, AlertTriangle } from 'lucide-react';

/* ── Tipos ─────────────────────────────────────────────────────── */
export type PublicProfileData = {
  nome: string;
  area: string;       // label legível, ex: "💻 Tecnologia / Desenvolvimento"
  nivel: string;      // label legível, ex: "Pleno"
  hardSkills: { skill: string; nivelAtual: number; nivelDesejado: number }[];
  softFortes: string[];
  softMelhoria: string[];
  objetivosCount: number;
  acoesConcluidasCount: number;
  ciclosCount: number;
  dataGeracao: string; // ISO string
};

/* ── Encode / Decode helpers (exportados para uso no AppLayout) ── */
export function encodeProfile(data: PublicProfileData): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}

export function decodeProfile(encoded: string): PublicProfileData | null {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded)))) as PublicProfileData;
  } catch {
    return null;
  }
}

/* ── Componente ─────────────────────────────────────────────────── */
export const PerfilPublico: React.FC = () => {
  const { encoded } = useParams<{ encoded: string }>();

  const perfil = useMemo(
    () => (encoded ? decodeProfile(encoded) : null),
    [encoded],
  );

  if (!perfil) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-700 mb-2">Link inválido ou expirado</h2>
          <p className="text-slate-500 text-sm mb-6">
            O link de perfil não é válido. Peça ao profissional um novo link gerado pelo Meu PDI.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Criar meu PDI
          </Link>
        </div>
      </div>
    );
  }

  const radarData = perfil.hardSkills.map(s => ({
    subject: s.skill.length > 14 ? s.skill.slice(0, 14) + '…' : s.skill,
    atual: s.nivelAtual,
    meta: s.nivelDesejado,
    fullMark: 5,
  }));

  const dataFormatada = new Date(perfil.dataGeracao).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  const firstName = perfil.nome.split(' ')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white text-2xl font-black mb-3">
                {firstName.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-2xl font-extrabold text-slate-800">{perfil.nome}</h1>
              <p className="text-slate-500 text-sm mt-0.5">
                {perfil.area} · <span className="font-semibold text-indigo-600">{perfil.nivel}</span>
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Gerado em</p>
              <p className="text-xs text-slate-500 font-semibold">{dataFormatada}</p>
            </div>
          </div>

          {/* Métricas resumo */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { label: 'Objetivos', value: perfil.objetivosCount },
              { label: 'Ações concluídas', value: perfil.acoesConcluidasCount },
              { label: 'Ciclos fechados', value: perfil.ciclosCount },
            ].map(m => (
              <div
                key={m.label}
                className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100"
              >
                <p className="text-2xl font-black text-indigo-600">{m.value}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Radar de Hard Skills */}
        {radarData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <h2 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-widest">
              Radar de Hard Skills
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
                <Tooltip
                  formatter={(v, name) => [
                    v,
                    name === 'atual' ? 'Nível atual' : 'Meta',
                  ]}
                />
                <Radar name="meta" dataKey="meta" stroke="#c7d2fe" fill="#c7d2fe" fillOpacity={0.3} />
                <Radar name="atual" dataKey="atual" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" /> Nível atual
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-3 h-3 rounded-full bg-indigo-200 inline-block" /> Meta
              </div>
            </div>
          </motion.div>
        )}

        {/* Soft Skills */}
        {(perfil.softFortes.length > 0 || perfil.softMelhoria.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <h2 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-widest">
              Soft Skills
            </h2>
            {perfil.softFortes.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-semibold text-emerald-600 mb-2">✓ Pontos fortes</p>
                <div className="flex flex-wrap gap-2">
                  {perfil.softFortes.map(s => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {perfil.softMelhoria.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-amber-600 mb-2">⚠ Em desenvolvimento</p>
                <div className="flex flex-wrap gap-2">
                  {perfil.softMelhoria.map(s => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Rodapé */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-center py-4"
        >
          <p className="text-xs text-slate-400 mb-2">
            Este perfil foi gerado pelo <span className="font-semibold text-indigo-600">Meu PDI</span> — plataforma de desenvolvimento profissional.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-600 font-semibold hover:underline"
          >
            Criar meu próprio PDI <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};
