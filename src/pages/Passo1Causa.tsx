import React, { useState } from 'react';
import { usePdiStore } from '../store/usePdiStore';
import { HelpCircle, Zap } from 'lucide-react';
import { TemplateSelector } from '../components/TemplateSelector';

export const Passo1Causa: React.FC = () => {
  const { usuario, updateUsuario } = usePdiStore();
  const [showTemplate, setShowTemplate] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <TemplateSelector open={showTemplate} onClose={() => setShowTemplate(false)} />

      <div className="flex items-start justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          A Base: Qual é a sua Causa?
        </h2>
        <button
          onClick={() => setShowTemplate(true)}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-xs font-bold transition-colors"
        >
          <Zap className="w-3.5 h-3.5" /> Template por profissão
        </button>
      </div>
      
      <p className="text-gray-600 mb-8 leading-relaxed">
        Bem-vindo ao terceiro tempo do seu desenvolvimento profissional. 
        O primeiro passo é identificar a força motriz por trás do seu esforço diário.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="nome" className="block text-sm font-semibold text-gray-700">Nome Completo</label>
            <input 
              type="text" 
              id="nome" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm" 
              placeholder="Ex: João da Silva"
              value={usuario.nome}
              onChange={(e) => updateUsuario({ nome: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Profissional</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm" 
              placeholder="joao@empresa.com"
              value={usuario.email}
              onChange={(e) => updateUsuario({ email: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2 relative pt-4">
          <div className="flex items-center gap-2">
            <label htmlFor="causa" className="block text-sm font-semibold text-gray-700">A Sua Causa (Propósito)</label>
            <div className="group relative">
              <HelpCircle className="w-4 h-4 text-indigo-400 cursor-help" />
              <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-64 p-3 bg-indigo-900 text-white text-xs rounded-lg shadow-xl z-10">
                A causa é aquilo que mobiliza sua energia, criatividade e ação no enfrentamento de dificuldades. Ex: "Transformar a educação no Brasil" ou "Ser o melhor gestor para meu time".
              </div>
            </div>
          </div>
          <textarea 
            id="causa" 
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm resize-none" 
            placeholder="O que te faz levantar da cama todos os dias com brilho no olho? Qual problema complexo você quer ajudar a resolver?"
            value={usuario.causa}
            onChange={(e) => updateUsuario({ causa: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
