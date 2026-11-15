import React, { useState } from 'react';
import { usePdiStore } from '../store/usePdiStore';
import type { PlanoAcaoItem, TipoMetaAcao } from '../store/usePdiStore';
import { Plus, Trash2, Calendar, Target } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

const TIPO_META_OPTIONS: { value: TipoMetaAcao; label: string; hint: string; badge: string }[] = [
  { value: 'resultado', label: 'Resultado (Impacto)', hint: 'Reduzir custos, aumentar conversão, produtividade ou receita', badge: 'bg-emerald-100 text-emerald-700' },
  { value: 'entrega', label: 'Entrega (Projeto)', hint: 'Implementar um projeto, processo ou funcionalidade', badge: 'bg-indigo-100 text-indigo-700' },
  { value: 'evidencia', label: 'Evidência (Comprovação)', hint: 'Documento, indicador medido ou validação de gestor/par', badge: 'bg-purple-100 text-purple-700' },
  { value: 'atividade', label: 'Atividade (Estudo)', hint: 'Concluir um curso, leitura ou mentoria', badge: 'bg-slate-100 text-slate-700' },
];

export const Passo4PlanoAcao: React.FC = () => {
  const { objetivos, planoDeAcao, setStoreItem, updatePlanoAcaoItem } = usePdiStore();
  
  const [objetivoSelecionado, setObjetivoSelecionado] = useState<string>('');
  const [novaAcao, setNovaAcao] = useState('');
  const [novoPrazo, setNovoPrazo] = useState('');
  const [novosRecursos, setNovosRecursos] = useState('');
  const [tipoMeta, setTipoMeta] = useState<TipoMetaAcao>('entrega');
  const [resultadoEsperado, setResultadoEsperado] = useState('');

  const objetivoAtivo = objetivoSelecionado || objetivos[0]?.id || '';

  const hoje = new Date().toISOString().split('T')[0];

  const addAcao = () => {
    if (!objetivoAtivo || !novaAcao || !novoPrazo) return;
    if (novoPrazo < hoje) return; // data no passado - bloqueado pelo input min também

    const newAcao: PlanoAcaoItem = {
      id: Date.now().toString(),
      objetivoId: objetivoAtivo,
      acao: novaAcao,
      prazoData: novoPrazo,
      recursos: novosRecursos || 'Nenhum recurso extra necessário',
      tipoMeta,
      resultadoEsperado: resultadoEsperado.trim() || undefined,
    };

    setStoreItem('planoDeAcao', [...planoDeAcao, newAcao]);
    trackEvent('action_created', { tipo_meta: tipoMeta });
    setNovaAcao('');
    setNovoPrazo('');
    setNovosRecursos('');
    setResultadoEsperado('');
  };

  const removeAcao = (id: string) => {
    setStoreItem('planoDeAcao', planoDeAcao.filter(a => a.id !== id));
  };

  if (objetivos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Target className="w-16 h-16 mx-auto opacity-50" />
        </div>
        <h3 className="text-xl font-bold text-gray-700">Sem objetivos definidos</h3>
        <p className="text-gray-500 mt-2">Você precisa criar ao menos um objetivo no passo anterior para poder traçar um plano de ação.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Plano de Ação</h2>
      <p className="text-gray-600 mb-8">
        Traduza seus objetivos em ações táticas. Defina os passos, os prazos e o que será necessário. Sem um deadline, um objetivo é apenas um desejo.
      </p>

      {/* Formulário de Ação */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wider">Adicionar Nova Ação Tática</h3>
        
        <div className="space-y-4">
          <div>
             <label className="block text-xs font-semibold text-gray-600 mb-1">Para qual objetivo?</label>
             <select 
               value={objetivoAtivo}  
               onChange={e => setObjetivoSelecionado(e.target.value)}
               className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
             >
               {objetivos.map(obj => (
                 <option key={obj.id} value={obj.id}>{obj.descricao}</option>
               ))}
             </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Tipo de meta (Impacto vs. Atividade)</label>
              <select
                value={tipoMeta}
                onChange={e => setTipoMeta(e.target.value as TipoMetaAcao)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#017AA1] bg-white text-sm"
              >
                {TIPO_META_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label} - {opt.hint}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Resultado / entrega esperada (opcional)</label>
              <input
                type="text"
                placeholder="Ex: Reduzir tempo de deploy em 30% ou entregar dashboard"
                value={resultadoEsperado}
                onChange={e => setResultadoEsperado(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#017AA1]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">O que vou fazer? (Ação)</label>
              <input 
                type="text" 
                placeholder="Ex: Fazer a inscrição no curso de liderança" 
                value={novaAcao}
                onChange={e => setNovaAcao(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Até quando? (Deadline)</label>
              <input
                type="date"
                value={novoPrazo}
                min={hoje}
                onChange={e => setNovoPrazo(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
              />
            </div>

             <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Recursos necessários?</label>
              <input 
                type="text" 
                placeholder="Ex: R$ 500,00 ou Ajuda do Gestor" 
                value={novosRecursos}
                onChange={e => setNovosRecursos(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addAcao()}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button 
              onClick={addAcao}
              disabled={!novaAcao || !novoPrazo}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-medium px-6 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" /> Inserir Ação na Rota
            </button>
          </div>
        </div>
      </div>

      {/* Ações Mapeadas (Agrupadas por Objetivo) */}
      <div className="space-y-6">
        {objetivos.map(obj => {
          const acoesDesteObj = planoDeAcao.filter(a => a.objetivoId === obj.id);
          
          if (acoesDesteObj.length === 0) return null;

          return (
            <div key={obj.id} className="border border-indigo-100 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-indigo-50/50 px-5 py-3 border-b border-indigo-100 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-500" />
                <h4 className="font-semibold text-indigo-900">{obj.descricao}</h4>
              </div>
              <div className="divide-y divide-gray-100 bg-white">
                {acoesDesteObj.map(acao => {
                  const metaInfo = TIPO_META_OPTIONS.find(m => m.value === (acao.tipoMeta ?? 'atividade'));
                  return (
                  <div key={acao.id} className="p-4 flex items-start gap-4">
                     <div className="flex-grow">
                       <div className="flex flex-wrap items-center gap-2">
                         <p className="font-medium text-gray-800">{acao.acao}</p>
                         {metaInfo && (
                           <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${metaInfo.badge}`}>
                             {metaInfo.label}
                           </span>
                         )}
                       </div>
                       {acao.resultadoEsperado && (
                         <p className="text-xs text-[#017AA1] font-medium mt-1">
                           Impacto esperado: {acao.resultadoEsperado}
                         </p>
                       )}
                       <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                         <span className="flex items-center gap-1 text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded">
                           <Calendar className="w-4 h-4" /> {new Date(acao.prazoData).toLocaleDateString('pt-BR')}
                         </span>
                         <span className="text-gray-500">
                           <span className="font-semibold text-gray-400">Recursos:</span> {acao.recursos}
                         </span>
                       </div>
                       <div className="mt-2.5 flex items-center gap-2 text-xs">
                         <span className="font-semibold text-gray-500 shrink-0">Objetivo vinculado:</span>
                         <select
                           value={acao.objetivoId}
                           onChange={(e) => updatePlanoAcaoItem(acao.id, { objetivoId: e.target.value })}
                           className="rounded-lg border border-gray-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 max-w-md"
                         >
                           {objetivos.map(o => (
                             <option key={o.id} value={o.id}>{o.descricao}</option>
                           ))}
                         </select>
                       </div>
                     </div>
                     <button 
                        onClick={() => removeAcao(acao.id)}
                        className="text-gray-400 hover:text-red-500 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                  </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {(() => {
          const objIds = new Set(objetivos.map(o => o.id));
          const orfas = planoDeAcao.filter(a => !objIds.has(a.objetivoId));
          if (orfas.length === 0) return null;
          return (
            <div className="border-2 border-rose-300 bg-rose-50/70 rounded-xl p-4 space-y-3">
              <div className="text-sm font-bold text-rose-800">
                Ações sem objetivo válido associado ({orfas.length})
              </div>
              <p className="text-xs text-rose-700">
                Vincule cada ação abaixo a um objetivo ativo para que ela seja contabilizada no Dashboard e na Saúde do Plano:
              </p>
              {orfas.map(acao => (
                <div key={acao.id} className="bg-white border border-rose-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-800">{acao.acao}</span>
                  <div className="flex items-center gap-2">
                    <select
                      value=""
                      onChange={(e) => updatePlanoAcaoItem(acao.id, { objetivoId: e.target.value })}
                      className="rounded-lg border border-rose-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      <option value="" disabled>Selecionar objetivo correto...</option>
                      {objetivos.map(o => (
                        <option key={o.id} value={o.id}>{o.descricao}</option>
                      ))}
                    </select>
                    <button onClick={() => removeAcao(acao.id)} className="text-gray-400 hover:text-red-500 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
};
