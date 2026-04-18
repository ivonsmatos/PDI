import React, { useState } from 'react';
import { usePdiStore } from '../store/usePdiStore';
import type { ObjetivoCategoria } from '../store/usePdiStore';
import { Plus, Trash2, Clock } from 'lucide-react';

const prazoLabels = {
  curto: { label: 'Curto Prazo', sub: 'até 3 meses', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  medio: { label: 'Médio Prazo', sub: '3 a 12 meses', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  longo: { label: 'Longo Prazo', sub: 'acima de 1 ano', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
};

const categoriaLabels: Record<string, { emoji: string; label: string; color: string }> = {
  funcional:   { emoji: '💼', label: 'Funcional',   color: 'bg-blue-100 text-blue-700' },
  educacional: { emoji: '🎓', label: 'Educacional', color: 'bg-amber-100 text-amber-700' },
  pessoal:     { emoji: '🧘', label: 'Pessoal',     color: 'bg-rose-100 text-rose-700' },
};

export const Passo3Objetivos: React.FC = () => {
  const { objetivos, setStoreItem } = usePdiStore();
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novaCategoria, setNovaCategoria] = useState<ObjetivoCategoria>('');
  const [novoPrazo, setNovoPrazo] = useState<'curto' | 'medio' | 'longo' | ''>('');
  const [novaJustificativa, setNovaJustificativa] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!novaCategoria) e.categoria = 'Selecione a área do objetivo.';
    if (!novaDescricao.trim()) e.descricao = 'Descreva o objetivo.';
    if (!novoPrazo) e.prazo = 'Escolha um horizonte de tempo.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const addObjetivo = () => {
    if (!validate()) return;
    if (objetivos.length >= 4) {
      alert('Aconselha-se manter no máximo 4 objetivos simultâneos para manter o foco.');
      return;
    }
    setStoreItem('objetivos', [
      ...objetivos,
      {
        id: Date.now().toString(),
        descricao: novaDescricao,
        prazo: novoPrazo as 'curto' | 'medio' | 'longo',
        justificativa: novaJustificativa,
        categoria: novaCategoria,
      },
    ]);
    setNovaDescricao('');
    setNovaCategoria('');
    setNovoPrazo('');
    setNovaJustificativa('');
    setErrors({});
  };

  const removeObjetivo = (id: string) => {
    setStoreItem('objetivos', objetivos.filter(o => o.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">
        Estabelecimento de Objetivos
      </h2>
      <p className="text-gray-600 dark:text-slate-400 mb-8">
        Os objetivos devem ser poucos (máx. 4), realísticos e desafiadores. Defina prazo e justificativa para cada um.
      </p>

      {/* Formulário */}
      <div className="bg-indigo-50/60 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800 mb-8 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-widest mb-2">Novo Objetivo</h3>

        {/* Linha 1: Categoria + Prazo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1">Área do Objetivo</label>
            <select
              value={novaCategoria}
              onChange={e => setNovaCategoria(e.target.value as ObjetivoCategoria)}
              className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.categoria ? 'border-red-400' : 'border-gray-200 dark:border-slate-600'}`}
            >
              <option value="" disabled>Escolha a Área...</option>
              <option value="funcional">💼 Funcional (Trabalho/Promoção)</option>
              <option value="educacional">🎓 Educacional (Cursos/Leituras)</option>
              <option value="pessoal">🧘 Pessoal (Lazer/Saúde/Família)</option>
            </select>
            {errors.categoria && <p className="text-xs text-red-500 mt-1">{errors.categoria}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1">Horizonte de Tempo</label>
            <div className="flex gap-2">
              {(['curto', 'medio', 'longo'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setNovoPrazo(p)}
                  className={`flex-1 py-3 px-2 rounded-xl border text-xs font-semibold transition-all ${
                    novoPrazo === p
                      ? prazoLabels[p].color + ' ring-2 ring-offset-1 ring-indigo-400'
                      : 'bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Clock className="w-3 h-3 mx-auto mb-0.5" />
                  {prazoLabels[p].label}
                  <br />
                  <span className="font-normal text-[10px]">{prazoLabels[p].sub}</span>
                </button>
              ))}
            </div>
            {errors.prazo && <p className="text-xs text-red-500 mt-1">{errors.prazo}</p>}
          </div>
        </div>

        {/* Linha 2: Descrição */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1">O que você quer alcançar?</label>
          <input
            type="text"
            placeholder="Ex: Obter a certificação AWS Solutions Architect"
            value={novaDescricao}
            onChange={e => setNovaDescricao(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.descricao ? 'border-red-400' : 'border-gray-200 dark:border-slate-600'}`}
          />
          {errors.descricao && <p className="text-xs text-red-500 mt-1">{errors.descricao}</p>}
        </div>

        {/* Linha 3: Justificativa */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1">Por que este objetivo é importante? <span className="font-normal text-gray-400">(opcional)</span></label>
          <textarea
            rows={2}
            placeholder="Ex: É necessário para ser promovido ao cargo de Arquiteto de Soluções"
            value={novaJustificativa}
            onChange={e => setNovaJustificativa(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        <div className="flex justify-between items-center pt-1">
          <span className="text-xs text-gray-400 dark:text-slate-500">{objetivos.length}/4 objetivos criados</span>
          <button
            onClick={addObjetivo}
            disabled={objetivos.length >= 4}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-slate-600 text-white font-medium px-6 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" /> Adicionar Objetivo
          </button>
        </div>
      </div>

      {/* Lista de Objetivos */}
      <div className="space-y-4">
        {objetivos.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl text-gray-400 dark:text-slate-500">
            Nenhum objetivo listado ainda. Comece a criar o seu plano acima!
          </div>
        ) : (
          objetivos.map((obj, i) => {
            const cat = categoriaLabels[obj.categoria] || { emoji: '📌', label: obj.categoria, color: 'bg-gray-100 text-gray-600' };
            const prazoInfo = obj.prazo ? prazoLabels[obj.prazo] : null;
            return (
              <div key={obj.id} className="relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shrink-0 mt-1">
                  {i + 1}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cat.color}`}>
                      {cat.emoji} {cat.label}
                    </span>
                    {prazoInfo && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${prazoInfo.color}`}>
                        <Clock className="w-3 h-3 inline mr-1" />{prazoInfo.label}
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-base text-gray-800 dark:text-slate-100">{obj.descricao}</h4>
                  {obj.justificativa && (
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 italic">"{obj.justificativa}"</p>
                  )}
                </div>
                <button
                  onClick={() => removeObjetivo(obj.id)}
                  className="text-gray-300 dark:text-slate-600 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
