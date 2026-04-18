import React, { useState, useEffect } from 'react';
import { usePdiStore } from '../store/usePdiStore';
import type { PlanoAcaoItem } from '../store/usePdiStore';
import { Plus, Trash2, Calendar, Target } from 'lucide-react';

export const Passo4PlanoAcao: React.FC = () => {
  const { objetivos, planoDeAcao, setStoreItem } = usePdiStore();
  
  const [objetivoSelecionado, setObjetivoSelecionado] = useState<string>('');
  const [novaAcao, setNovaAcao] = useState('');
  const [novoPrazo, setNovoPrazo] = useState('');
  const [novosRecursos, setNovosRecursos] = useState('');

  // Sincroniza com o store — corrige bug quando objetivos são criados antes de montar este componente
  useEffect(() => {
    if (objetivos.length > 0 && !objetivoSelecionado) {
      setObjetivoSelecionado(objetivos[0].id);
    }
  }, [objetivos, objetivoSelecionado]);


  const addAcao = () => {
    if (!objetivoSelecionado || !novaAcao || !novoPrazo) return;

    const newAcao: PlanoAcaoItem = {
      id: Date.now().toString(),
      objetivoId: objetivoSelecionado,
      acao: novaAcao,
      prazoData: novoPrazo,
      recursos: novosRecursos || 'Nenhum recurso extra necessário'
    };

    setStoreItem('planoDeAcao', [...planoDeAcao, newAcao]);
    setNovaAcao('');
    setNovoPrazo('');
    setNovosRecursos('');
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
               value={objetivoSelecionado} 
               onChange={e => setObjetivoSelecionado(e.target.value)}
               className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
             >
               {objetivos.map(obj => (
                 <option key={obj.id} value={obj.id}>{obj.descricao}</option>
               ))}
             </select>
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
                {acoesDesteObj.map(acao => (
                  <div key={acao.id} className="p-4 flex items-start gap-4">
                     <div className="flex-grow">
                       <p className="font-medium text-gray-800">{acao.acao}</p>
                       <div className="flex items-center gap-4 mt-2 text-sm">
                         <span className="flex items-center gap-1 text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded">
                           <Calendar className="w-4 h-4" /> {new Date(acao.prazoData).toLocaleDateString('pt-BR')}
                         </span>
                         <span className="text-gray-500">
                           <span className="font-semibold text-gray-400">Recursos:</span> {acao.recursos}
                         </span>
                       </div>
                     </div>
                     <button 
                        onClick={() => removeAcao(acao.id)}
                        className="text-gray-400 hover:text-red-500 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
