import React, { useState } from 'react';
import { usePdiStore } from '../store/usePdiStore';
import { Plus, Trash2, ArrowUpCircle, ArrowDownCircle, Users } from 'lucide-react';

export const Passo5CampoForcas: React.FC = () => {
  const { campoDeForcas, updateCampoDeForcas } = usePdiStore();
  const [novaImpulsionadora, setNovaImpulsionadora] = useState('');
  const [novaRestritiva, setNovaRestritiva] = useState('');

  const addImpulsionadora = () => {
    const texto = novaImpulsionadora.trim();
    if (!texto) return;
    updateCampoDeForcas({
      impulsionadoras: [...(campoDeForcas.impulsionadoras ?? []), texto],
    });
    setNovaImpulsionadora('');
  };

  const addRestritiva = () => {
    const texto = novaRestritiva.trim();
    if (!texto) return;
    updateCampoDeForcas({
      restritivas: [...(campoDeForcas.restritivas ?? []), texto],
    });
    setNovaRestritiva('');
  };

  const removeForca = (texto: string, tipo: 'impulsionadora' | 'restritiva') => {
    if (tipo === 'impulsionadora') {
      updateCampoDeForcas({
        impulsionadoras: (campoDeForcas.impulsionadoras ?? []).filter(f => f !== texto),
      });
    } else {
      updateCampoDeForcas({
        restritivas: (campoDeForcas.restritivas ?? []).filter(f => f !== texto),
      });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">
        Análise do Campo de Forças
      </h2>
      <p className="text-gray-600 dark:text-slate-400 mb-8">
        Mapeie os fatores de sucesso (o que vai te ajudar) e os fatores de insucesso (obstáculos e
        resistências). Avalie quem são seus aliados nesta jornada.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* ── Forças Impulsionadoras ── */}
        <div className="bg-emerald-50/60 dark:bg-emerald-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <ArrowUpCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300">
              Forças Impulsionadoras
            </h3>
          </div>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 -mt-2">
            Fatores que <strong>favorecem</strong> o seu desenvolvimento.
          </p>

          {/* Input próprio */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ex: Facilidade para aprender tecnologias"
              value={novaImpulsionadora}
              onChange={e => setNovaImpulsionadora(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addImpulsionadora()}
              className="flex-grow px-3 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={addImpulsionadora}
              disabled={!novaImpulsionadora.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 dark:disabled:bg-slate-600 text-white font-medium px-4 py-2.5 rounded-xl flex items-center gap-1.5 text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>

          {/* Lista */}
          <ul className="space-y-2 flex-1">
            {(campoDeForcas.impulsionadoras ?? []).map((f, i) => (
              <li
                key={i}
                className="flex items-start justify-between bg-white dark:bg-slate-800 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800/50 shadow-sm"
              >
                <span className="text-emerald-800 dark:text-emerald-300 text-sm font-medium leading-snug pr-2">
                  {f}
                </span>
                <button
                  onClick={() => removeForca(f, 'impulsionadora')}
                  className="text-emerald-300 hover:text-rose-500 transition-colors shrink-0 mt-0.5"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
            {(campoDeForcas.impulsionadoras ?? []).length === 0 && (
              <li className="text-emerald-500/50 dark:text-emerald-600 text-sm py-2 text-center">
                Nenhuma força mapeada ainda.
              </li>
            )}
          </ul>
        </div>

        {/* ── Forças Restritivas ── */}
        <div className="bg-rose-50/60 dark:bg-rose-900/20 rounded-2xl p-6 border border-rose-200 dark:border-rose-800 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <ArrowDownCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0" />
            <h3 className="text-lg font-bold text-rose-900 dark:text-rose-300">
              Forças Restritivas
            </h3>
          </div>
          <p className="text-xs text-rose-700 dark:text-rose-400 -mt-2">
            Obstáculos e resistências que podem <strong>dificultar</strong> o seu avanço.
          </p>

          {/* Input próprio */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ex: Falta de tempo aos finais de semana"
              value={novaRestritiva}
              onChange={e => setNovaRestritiva(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addRestritiva()}
              className="flex-grow px-3 py-2.5 rounded-xl border border-rose-200 dark:border-rose-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              onClick={addRestritiva}
              disabled={!novaRestritiva.trim()}
              className="bg-rose-600 hover:bg-rose-700 disabled:bg-gray-300 dark:disabled:bg-slate-600 text-white font-medium px-4 py-2.5 rounded-xl flex items-center gap-1.5 text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>

          {/* Lista */}
          <ul className="space-y-2 flex-1">
            {(campoDeForcas.restritivas ?? []).map((f, i) => (
              <li
                key={i}
                className="flex items-start justify-between bg-white dark:bg-slate-800 p-3 rounded-lg border border-rose-100 dark:border-rose-800/50 shadow-sm"
              >
                <span className="text-rose-800 dark:text-rose-300 text-sm font-medium leading-snug pr-2">
                  {f}
                </span>
                <button
                  onClick={() => removeForca(f, 'restritiva')}
                  className="text-rose-300 hover:text-rose-600 transition-colors shrink-0 mt-0.5"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
            {(campoDeForcas.restritivas ?? []).length === 0 && (
              <li className="text-rose-500/50 dark:text-rose-600 text-sm py-2 text-center">
                Nenhuma resistência mapeada ainda.
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* ── Alianças ── */}
      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-slate-700 dark:text-slate-300" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Alianças e Fechamento</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Para concluir as ações e lidar com os problemas (seus e da empresa), de que alianças você
          necessita?
        </p>
        <textarea
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none text-sm"
          placeholder="Ex: Preciso estreitar o relacionamento com a gerente do financeiro (Joana) e com meu professor de arquitetura de software (Marcos)..."
          value={campoDeForcas.aliancas}
          onChange={e => updateCampoDeForcas({ aliancas: e.target.value })}
        />
      </div>
    </div>
  );
};
