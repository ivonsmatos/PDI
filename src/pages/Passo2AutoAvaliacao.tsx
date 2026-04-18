import React, { useState } from 'react';
import { usePdiStore } from '../store/usePdiStore';
import { matrizDeCompetencias } from '../data/matrizCompetencias';

const atributosEmpregabilidade = [
  "Capacidade de estabelecer network",
  "Capacidade de lidar com ambiguidade",
  "Inteligência Emocional",
  "Capacidade de aprender",
  "Capacidade de mudar (Adaptabilidade)",
  "Trabalho em Equipe",
  "Proatividade",
  "Comunicação",
  "Visão Sistêmica"
];

const areaOptions = [
  { value: 'tecnologia', label: 'Tecnologia' },
  { value: 'administracao', label: 'Administração' },
  { value: 'gestao', label: 'Gestão' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'vendas', label: 'Vendas' },
  { value: 'recursos_humanos', label: 'Recursos Humanos' },
  { value: 'financas', label: 'Finanças' },
  { value: 'logistica_supply_chain', label: 'Logística & Supply Chain' },
  { value: 'design', label: 'Design' },
  { value: 'saude', label: 'Saúde' },
  { value: 'educacao', label: 'Educação' },
  { value: 'direito', label: 'Direito' },
  { value: 'engenharia', label: 'Engenharia' },
  { value: 'customer_success', label: 'Customer Success' },
  { value: 'gestao_de_produto', label: 'Gestão de Produto' },
  { value: 'ciencia_de_dados', label: 'Ciência de Dados' }
];

const nivelOptions = [
  { value: 'estagiario', label: 'Estagiário / Aprendiz' },
  { value: 'junior', label: 'Júnior' },
  { value: 'pleno', label: 'Pleno' },
  { value: 'senior', label: 'Sênior' },
  { value: 'especialista', label: 'Especialista' },
  { value: 'gestor', label: 'Gestor' }
];

export const Passo2AutoAvaliacao: React.FC = () => {
  const { inventario, setStoreItem } = usePdiStore();
  const [activeTab, setActiveTab] = useState<'hard' | 'soft'>('soft');
  
  // States para os seletores de área e nível
  const [area, setArea] = useState<keyof typeof matrizDeCompetencias | ''>('');
  const [nivel, setNivel] = useState<string>('');

  const handleSoftSkillToggle = (atributo: string, avaliacao: 'Forte' | 'Melhoria') => {
    let newSofts = [...inventario.softSkills];
    const index = newSofts.findIndex(s => s.atributo === atributo);
    
    if (index >= 0) {
      if (newSofts[index].pontoForteOuMelhoria === avaliacao) {
        newSofts.splice(index, 1);
      } else {
        newSofts[index].pontoForteOuMelhoria = avaliacao;
      }
    } else {
      newSofts.push({ atributo, pontoForteOuMelhoria: avaliacao, exemplo: '' });
    }
    
    setStoreItem('inventario', { ...inventario, softSkills: newSofts });
  };

  const handleHardSkillChange = (skill: string, type: 'nivelAtual' | 'nivelDesejado', value: number) => {
    let newHards = [...inventario.hardSkills];
    const index = newHards.findIndex(s => s.skill === skill);
    
    if (index >= 0) {
      newHards[index][type] = value;
    } else {
      const newSkill = { skill, nivelAtual: 0, nivelDesejado: 0 };
      newSkill[type] = value;
      newHards.push(newSkill);
    }
    
    setStoreItem('inventario', { ...inventario, hardSkills: newHards });
  };

  const getHardSkillsData = () => {
    if (!area || !nivel) return null;
    const a = matrizDeCompetencias[area];
    if (!a) return null;
    const n = a[nivel as keyof typeof a];
    return n;
  };

  const currentLevelData = getHardSkillsData();

  const renderRatingGroup = (skillName: string) => {
    const skillData = inventario.hardSkills.find(s => s.skill === skillName);
    const atual = skillData?.nivelAtual || 0;
    const desejado = skillData?.nivelDesejado || 0;

    return (
      <div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border border-gray-100 rounded-xl bg-white shadow-sm mt-3 gap-6">
        <div className="font-semibold text-indigo-900 w-full sm:w-1/3 text-sm md:text-base">
          {skillName}
        </div>
        
        <div className="flex flex-col gap-3 w-full sm:w-2/3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 w-24">Nível Atual:</span>
            <div className="flex gap-1 flex-grow">
               {[1, 2, 3, 4, 5].map(v => (
                 <button 
                  key={`atual-${v}`}
                  onClick={() => handleHardSkillChange(skillName, 'nivelAtual', v)}
                  className={`flex-1 h-8 rounded-md text-xs font-bold transition-all ${atual >= v ? 'bg-amber-400 text-amber-900 shadow-inner' : 'bg-gray-100 text-gray-400 hover:bg-amber-100'}`}
                 >
                   {v}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-indigo-500 w-24">Meta Desejada:</span>
            <div className="flex gap-1 flex-grow">
               {[1, 2, 3, 4, 5].map(v => (
                 <button 
                  key={`meta-${v}`}
                  onClick={() => handleHardSkillChange(skillName, 'nivelDesejado', v)}
                  className={`flex-1 h-8 rounded-md text-xs font-bold transition-all ${desejado >= v ? 'bg-indigo-600 text-white shadow-inner' : 'bg-gray-100 text-gray-400 hover:bg-indigo-100'}`}
                 >
                   {v}
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Auto-Avaliação</h2>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Faça um inventário sincero das suas competências. Classifique o que você já domina e o que precisa desenvolver.
      </p>

      <div className="flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => setActiveTab('soft')}
          className={`pb-4 px-6 font-medium text-sm sm:text-base border-b-2 transition-colors ${activeTab === 'soft' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Soft Skills
        </button>
        <button 
          onClick={() => setActiveTab('hard')}
          className={`pb-4 px-6 font-medium text-sm sm:text-base border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'hard' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Hard Skills <span className="bg-indigo-100 text-indigo-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Novo</span>
        </button>
      </div>

      {activeTab === 'soft' ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 font-medium mb-4">Selecione como você se auto-avalia nos atributos abaixo:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {atributosEmpregabilidade.map((atributo) => {
              const currentItem = inventario.softSkills.find(s => s.atributo === atributo);
              const avaliacaoAtual = currentItem?.pontoForteOuMelhoria;

              return (
                <div key={atributo} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors gap-3 shadow-sm">
                  <span className="font-medium text-gray-700">{atributo}</span>
                  <div className="flex gap-2 shrink-0">
                    <button 
                      onClick={() => handleSoftSkillToggle(atributo, 'Melhoria')}
                      className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${avaliacaoAtual === 'Melhoria' ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-500/50' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      A Melhorar
                    </button>
                    <button 
                      onClick={() => handleSoftSkillToggle(atributo, 'Forte')}
                      className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${avaliacaoAtual === 'Forte' ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500/50' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      Forte
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wider">Configure seu Perfil Analítico</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Qual é a sua Área?</label>
                <select 
                  value={area}
                  onChange={(e) => setArea(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="" disabled>Selecione a área...</option>
                  {areaOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Qual nível deseja analisar?</label>
                <select 
                  value={nivel}
                  onChange={(e) => setNivel(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="" disabled>Selecione o nível...</option>
                  {nivelOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>
            
            {currentLevelData && (
              <div className="mt-5 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                <span className="block text-xs font-bold text-indigo-500 uppercase mb-1">Expectativa do Mercado:</span>
                <p className="text-indigo-900 text-sm font-medium leading-relaxed">{currentLevelData.expectativa}</p>
              </div>
            )}
          </div>

          {!currentLevelData ? (
             <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl">
               <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
               </div>
               <h3 className="text-lg font-semibold text-gray-600">Selecione Área e Nível acima</h3>
               <p className="text-gray-400 mt-2 max-w-sm mx-auto text-sm">
                 Para visualizarmos as competências técnicas cruciais (Hard Skills), precisamos primeiro saber onde você está ou onde quer chegar.
               </p>
             </div>
          ) : (
            <div className="space-y-2 mt-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Avalie suas Competências Técnicas (1 a 5)</h4>
              {currentLevelData.hardSkills.map(skill => renderRatingGroup(skill))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
