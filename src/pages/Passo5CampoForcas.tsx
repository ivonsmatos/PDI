import React, { useState } from 'react';
import { usePdiStore } from '../store/usePdiStore';
import { Plus, Trash2, ArrowUpCircle, ArrowDownCircle, Users } from 'lucide-react';

export const Passo5CampoForcas: React.FC = () => {
  const { campoDeForcas, updateCampoDeForcas } = usePdiStore();
  const [novaForca, setNovaForca] = useState('');
  const [tipoForca, setTipoForca] = useState<'impulsionadora' | 'restritiva'>('impulsionadora');

  const addForca = () => {
    if (!novaForca) return;

    if (tipoForca === 'impulsionadora') {
      updateCampoDeForcas({ impulsionadoras: [...campoDeForcas.impulsionadoras, novaForca] });
    } else {
      updateCampoDeForcas({ restritivas: [...campoDeForcas.restritivas, novaForca] });
    }
    setNovaForca('');
  };

  const removeForca = (texto: string, tipo: 'impulsionadora' | 'restritiva') => {
    if (tipo === 'impulsionadora') {
      updateCampoDeForcas({ impulsionadoras: campoDeForcas.impulsionadoras.filter(f => f !== texto) });
    } else {
      updateCampoDeForcas({ restritivas: campoDeForcas.restritivas.filter(f => f !== texto) });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Análise do Campo de Forças</h2>
      <p className="text-gray-600 mb-8">
        Mapeie os fatores de sucesso (o que vai te ajudar) e os fatores de insucesso (obstáculos e resistências). Avalie quem são seus aliados nesta jornada.
      </p>

      {/* Input Unificado */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row gap-4">
          <select 
            value={tipoForca}
            onChange={e => setTipoForca(e.target.value as 'impulsionadora' | 'restritiva')}
            className={`px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 font-medium ${tipoForca === 'impulsionadora' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-500' : 'bg-rose-50 text-rose-700 border-rose-200 focus:ring-rose-500'}`}
          >
            <option value="impulsionadora">Força Impulsionadora (+)</option>
            <option value="restritiva">Força Restritiva (-)</option>
          </select>
          
          <input 
            type="text" 
            placeholder={tipoForca === 'impulsionadora' ? "Ex: Facilidade para aprender tecnologia nova" : "Ex: Falta de tempo aos finais de semana"}
            value={novaForca}
            onChange={e => setNovaForca(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addForca()}
            className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          
          <button 
            onClick={addForca}
            disabled={!novaForca}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-medium px-6 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Adicionar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Impulsionadoras */}
        <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
          <div className="flex items-center gap-2 mb-4">
            <ArrowUpCircle className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-bold text-emerald-900">Forças Impulsionadoras</h3>
          </div>
          <ul className="space-y-3">
            {campoDeForcas.impulsionadoras.map((f, i) => (
              <li key={i} className="flex items-start justify-between bg-white p-3 rounded-lg border border-emerald-100 shadow-sm">
                <span className="text-emerald-800 text-sm font-medium">{f}</span>
                <button onClick={() => removeForca(f, 'impulsionadora')} className="text-emerald-300 hover:text-emerald-600"><Trash2 className="w-4 h-4" /></button>
              </li>
            ))}
            {campoDeForcas.impulsionadoras.length === 0 && <li className="text-emerald-500/50 text-sm py-2">Nenhuma força mapeada.</li>}
          </ul>
        </div>

        {/* Restritivas */}
        <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-100">
          <div className="flex items-center gap-2 mb-4">
            <ArrowDownCircle className="w-6 h-6 text-rose-600" />
            <h3 className="text-lg font-bold text-rose-900">Forças Restritivas</h3>
          </div>
          <ul className="space-y-3">
             {campoDeForcas.restritivas.map((f, i) => (
              <li key={i} className="flex items-start justify-between bg-white p-3 rounded-lg border border-rose-100 shadow-sm">
                <span className="text-rose-800 text-sm font-medium">{f}</span>
                <button onClick={() => removeForca(f, 'restritiva')} className="text-rose-300 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
              </li>
            ))}
            {campoDeForcas.restritivas.length === 0 && <li className="text-rose-500/50 text-sm py-2">Nenhuma resistência mapeada.</li>}
          </ul>
        </div>
      </div>

      {/* Alianças */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900">Alianças e Fechamento</h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">Para concluir as ações e lidar com os problemas (seus e da empresa), de que alianças você necessita?</p>
        <textarea 
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
          placeholder="Ex: Preciso estreitar o relacionamento com a gerente do financeiro (Joana) e com meu professor de arquitetura de software (Marcos)..."
          value={campoDeForcas.aliancas}
          onChange={e => updateCampoDeForcas({ aliancas: e.target.value })}
        />
      </div>

    </div>
  );
};
