import React, { useState } from 'react';
import { Compass, FileCheck2, Plus, Trash2, Sparkles } from 'lucide-react';
import { usePdiStore, type CompetenciaEvidencia } from '../store/usePdiStore';
import { matrizDeCompetencias } from '../data/matrizCompetencias';
import { AREA_OPTIONS as areaOptions } from '../data/areas';
import {
  COMPETENCIAS_COMPORTAMENTAIS_CONTEXTO,
  OBJETIVOS_CARREIRA,
  getEspecialidadesParaArea,
  type ResultadoRecomendador,
} from '../data/careerMetadata';
import { AreaRecommenderModal } from '../components/AreaRecommenderModal';
import { trackEvent } from '../lib/analytics';

const atributosEmpregabilidade = [
  'Capacidade de estabelecer network',
  'Capacidade de lidar com ambiguidade',
  'Inteligência Emocional',
  'Capacidade de aprender',
  'Capacidade de mudar (Adaptabilidade)',
  'Trabalho em Equipe',
  'Proatividade',
  'Comunicação',
  'Visão Sistêmica',
];

const nivelOptions = [
  { value: 'estagiario', label: 'Estagiário / Aprendiz' },
  { value: 'junior', label: 'Júnior' },
  { value: 'pleno', label: 'Pleno' },
  { value: 'senior', label: 'Sênior' },
  { value: 'especialista', label: 'Especialista' },
  { value: 'gestor', label: 'Gestor' },
];

export const Passo2AutoAvaliacao: React.FC = () => {
  const { inventario, setStoreItem, usuario, updateUsuario } = usePdiStore();
  const [activeTab, setActiveTab] = useState<'soft' | 'hard'>('soft');
  const [recommenderOpen, setRecommenderOpen] = useState(false);
  const [naoListada, setNaoListada] = useState(Boolean(usuario.areaPersonalizada));
  const [expandedEvidenceSkill, setExpandedEvidenceSkill] = useState<string | null>(null);
  const [evForm, setEvForm] = useState({
    situacao: '',
    acao: '',
    resultado: '',
    indicador: '',
    link: '',
    data: new Date().toISOString().slice(0, 10),
    validadoPor: '',
  });

  const area = (usuario.areaAtuacao as keyof typeof matrizDeCompetencias) || '';
  const nivel = usuario.nivelCarreira || '';
  const areasComplementares = usuario.areasComplementares ?? [];
  const competenciasContexto = usuario.competenciasContexto ?? [];

  const handleAreaSelect = (val: string) => {
    if (val === '__outra__') {
      setNaoListada(true);
      return;
    }
    setNaoListada(false);
    const especialidades = getEspecialidadesParaArea(val);
    updateUsuario({
      areaAtuacao: val,
      areaPersonalizada: '',
      especialidade: especialidades.includes(usuario.especialidade ?? '') ? usuario.especialidade : especialidades[0],
    });
  };

  const handleNivelChange = (val: string) => {
    updateUsuario({ nivelCarreira: val });
  };

  const toggleAreaComplementar = (areaKey: string) => {
    if (areaKey === area) return;
    const exists = areasComplementares.includes(areaKey);
    const next = exists
      ? areasComplementares.filter(a => a !== areaKey)
      : [...areasComplementares, areaKey].slice(0, 3);
    updateUsuario({ areasComplementares: next });
  };

  const toggleCompetenciaContexto = (id: string) => {
    const exists = competenciasContexto.includes(id);
    const next = exists
      ? competenciasContexto.filter(c => c !== id)
      : [...competenciasContexto, id];
    updateUsuario({ competenciasContexto: next });
  };

  const handleApplyRecommendation = (res: ResultadoRecomendador) => {
    setNaoListada(false);
    updateUsuario({
      areaAtuacao: res.areaPrincipal,
      especialidade: res.especialidade,
      areasComplementares: res.areasTransicao.slice(0, 2).map(a => a.key),
    });
    setActiveTab('hard');
  };

  const handleSoftSkillToggle = (atributo: string, avaliacao: 'Forte' | 'Melhoria') => {
    const newSofts = [...inventario.softSkills];
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
    const newHards = [...inventario.hardSkills];
    const index = newHards.findIndex(s => s.skill === skill);

    if (index >= 0) {
      newHards[index] = { ...newHards[index], [type]: value };
    } else {
      newHards.push({
        skill,
        nivelAtual: type === 'nivelAtual' ? value : 0,
        nivelDesejado: type === 'nivelDesejado' ? value : 0,
      });
    }

    setStoreItem('inventario', { ...inventario, hardSkills: newHards });
  };

  const handleAddEvidence = (skillName: string) => {
    if (!evForm.situacao.trim() || !evForm.acao.trim() || !evForm.resultado.trim()) return;
    const novaEvidencia: CompetenciaEvidencia = {
      id: Date.now().toString(),
      situacao: evForm.situacao.trim(),
      acao: evForm.acao.trim(),
      resultado: evForm.resultado.trim(),
      indicador: evForm.indicador.trim() || undefined,
      link: evForm.link.trim() || undefined,
      data: evForm.data || undefined,
      validadoPor: evForm.validadoPor.trim() || undefined,
    };

    const newHards = [...inventario.hardSkills];
    const index = newHards.findIndex(s => s.skill === skillName);
    if (index >= 0) {
      newHards[index] = {
        ...newHards[index],
        evidencias: [...(newHards[index].evidencias ?? []), novaEvidencia],
      };
    } else {
      newHards.push({
        skill: skillName,
        nivelAtual: 3,
        nivelDesejado: 4,
        evidencias: [novaEvidencia],
      });
    }

    setStoreItem('inventario', { ...inventario, hardSkills: newHards });
    trackEvent('evidence_added', { skill: skillName, has_validator: Boolean(novaEvidencia.validadoPor) });
    setEvForm({
      situacao: '',
      acao: '',
      resultado: '',
      indicador: '',
      link: '',
      data: new Date().toISOString().slice(0, 10),
      validadoPor: '',
    });
  };

  const handleRemoveEvidence = (skillName: string, evId: string) => {
    const newHards = inventario.hardSkills.map(s =>
      s.skill === skillName
        ? { ...s, evidencias: (s.evidencias ?? []).filter(e => e.id !== evId) }
        : s
    );
    setStoreItem('inventario', { ...inventario, hardSkills: newHards });
  };

  const getHardSkillsData = () => {
    if (!area || !nivel) return null;
    const a = matrizDeCompetencias[area];
    if (!a) return null;
    return a[nivel as keyof typeof a];
  };

  const currentLevelData = getHardSkillsData();
  const especialidades = area ? getEspecialidadesParaArea(area) : [];

  const renderRatingGroup = (skillName: string) => {
    const skillData = inventario.hardSkills.find(s => s.skill === skillName);
    const atual = skillData?.nivelAtual || 0;
    const desejado = skillData?.nivelDesejado || 0;
    const evidencias = skillData?.evidencias ?? [];
    const isExpanded = expandedEvidenceSkill === skillName;

    return (
      <div key={skillName} className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm mt-3 space-y-3">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="w-full sm:w-1/3">
            <div className="font-semibold text-indigo-900 text-sm md:text-base">{skillName}</div>
            <button
              type="button"
              onClick={() => setExpandedEvidenceSkill(isExpanded ? null : skillName)}
              className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#017AA1] hover:underline"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              {evidencias.length > 0
                ? `${evidencias.length} evidência(s) registrada(s)`
                : 'Adicionar ficha de evidência'}
            </button>
          </div>

          <div className="flex flex-col gap-3 w-full sm:w-2/3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 w-32">Nível de Proficiência:</span>
              <div className="flex gap-1 flex-grow">
                {[1, 2, 3, 4, 5].map(v => (
                  <button
                    key={`atual-${v}`}
                    type="button"
                    onClick={() => handleHardSkillChange(skillName, 'nivelAtual', v)}
                    className={`flex-1 h-8 rounded-md text-xs font-bold transition-all ${atual >= v ? 'bg-amber-400 text-amber-900 shadow-inner' : 'bg-gray-100 text-gray-400 hover:bg-amber-100'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#017AA1] w-32">Nível-Alvo:</span>
              <div className="flex gap-1 flex-grow">
                {[1, 2, 3, 4, 5].map(v => (
                  <button
                    key={`meta-${v}`}
                    type="button"
                    onClick={() => handleHardSkillChange(skillName, 'nivelDesejado', v)}
                    className={`flex-1 h-8 rounded-md text-xs font-bold transition-all ${desejado >= v ? 'bg-[#51266E] text-white shadow-inner' : 'bg-gray-100 text-gray-400 hover:bg-[#51266E]/10'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="pt-3 border-t border-slate-100 space-y-3 bg-slate-50/70 rounded-xl p-3">
            {evidencias.length > 0 && (
              <div className="space-y-2">
                {evidencias.map(ev => (
                  <div key={ev.id} className="bg-white border border-slate-200 rounded-lg p-3 text-xs space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-[#51266E]">
                        {ev.data || 'Sem data'} {ev.validadoPor ? `· Validado por: ${ev.validadoPor}` : ''}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEvidence(skillName, ev.id)}
                        className="text-slate-400 hover:text-rose-600"
                        title="Remover evidência"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p><strong>Situação:</strong> {ev.situacao}</p>
                    <p><strong>Ação:</strong> {ev.acao}</p>
                    <p><strong>Resultado:</strong> {ev.resultado}</p>
                    {ev.indicador && <p><strong>Indicador/Métrica:</strong> {ev.indicador}</p>}
                    {ev.link && (
                      <p>
                        <strong>Comprovação:</strong>{' '}
                        <a href={ev.link} target="_blank" rel="noopener noreferrer" className="text-[#017AA1] underline break-all">
                          {ev.link}
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                placeholder="Situação (contexto/desafio) *"
                value={evForm.situacao}
                onChange={(e) => setEvForm(f => ({ ...f, situacao: e.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-2"
              />
              <input
                type="text"
                placeholder="Ação realizada *"
                value={evForm.acao}
                onChange={(e) => setEvForm(f => ({ ...f, acao: e.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-2"
              />
              <input
                type="text"
                placeholder="Resultado alcançado *"
                value={evForm.resultado}
                onChange={(e) => setEvForm(f => ({ ...f, resultado: e.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-2"
              />
              <input
                type="text"
                placeholder="Indicador ou métrica (ex: -22% tempo)"
                value={evForm.indicador}
                onChange={(e) => setEvForm(f => ({ ...f, indicador: e.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-2"
              />
              <input
                type="url"
                placeholder="Link ou documento comprobatório"
                value={evForm.link}
                onChange={(e) => setEvForm(f => ({ ...f, link: e.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-2"
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  value={evForm.data}
                  onChange={(e) => setEvForm(f => ({ ...f, data: e.target.value }))}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-2 w-36"
                />
                <input
                  type="text"
                  placeholder="Validado por (gestor/mentor/colega)"
                  value={evForm.validadoPor}
                  onChange={(e) => setEvForm(f => ({ ...f, validadoPor: e.target.value }))}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 flex-1"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleAddEvidence(skillName)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#017AA1] text-white text-xs font-bold hover:bg-[#016384]"
            >
              <Plus className="w-3.5 h-3.5" /> Salvar ficha de evidência
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Auto-Avaliação</h2>
      <p className="text-gray-600 mb-6 max-w-3xl">
        Faça um inventário sincero das suas competências. Classifique seu nível de proficiência, defina seu nível-alvo e registre evidências concretas.
      </p>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('soft')}
          className={`pb-4 px-6 font-medium text-sm sm:text-base border-b-2 transition-colors ${activeTab === 'soft' ? 'border-[#017AA1] text-[#017AA1]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Soft Skills & Contexto
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('hard')}
          className={`pb-4 px-6 font-medium text-sm sm:text-base border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'hard' ? 'border-[#017AA1] text-[#017AA1]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Hard Skills & Evidências
          <span className="bg-[#51266E]/10 text-[#51266E] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">40 áreas</span>
        </button>
      </div>

      {activeTab === 'soft' ? (
        <div className="space-y-6">
          <div>
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
                        type="button"
                        onClick={() => handleSoftSkillToggle(atributo, 'Melhoria')}
                        className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${avaliacaoAtual === 'Melhoria' ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-500/50' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        A Melhorar
                      </button>
                      <button
                        type="button"
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

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Competências Comportamentais por Contexto (próximo ciclo)</h3>
              <p className="text-xs text-slate-500">
                Escolha quais competências são mais relevantes para os desafios do seu próximo ciclo:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {COMPETENCIAS_COMPORTAMENTAIS_CONTEXTO.map(comp => {
                const selected = competenciasContexto.includes(comp.id);
                return (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => toggleCompetenciaContexto(comp.id)}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      selected
                        ? 'bg-[#51266E]/10 border-[#51266E] text-[#51266E]'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-[#017AA1]'
                    }`}
                  >
                    <div className="text-xs font-bold">{comp.label}</div>
                    <div className="text-[11px] opacity-80 mt-0.5">{comp.contexto}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Configure seu Perfil Profissional</h3>
              <button
                type="button"
                onClick={() => setRecommenderOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#51266E] to-[#017AA1] text-white hover:opacity-95"
              >
                <Compass className="w-3.5 h-3.5" /> Não sei qual área escolher
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Área de Atuação Principal</label>
                <select
                  value={naoListada ? '__outra__' : area}
                  onChange={(e) => handleAreaSelect(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#017AA1] bg-white"
                >
                  <option value="" disabled>Selecione a área...</option>
                  {areaOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  <option value="__outra__">Minha área não está listada...</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nível de Carreira</label>
                <select
                  value={nivel}
                  onChange={(e) => handleNivelChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#017AA1] bg-white"
                >
                  <option value="" disabled>Selecione o nível...</option>
                  {nivelOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>

              {area && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Qual é a sua especialidade?</label>
                  <select
                    value={usuario.especialidade || ''}
                    onChange={(e) => updateUsuario({ especialidade: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#017AA1] bg-white"
                  >
                    <option value="">Selecione a especialidade...</option>
                    {especialidades.map(esp => <option key={esp} value={esp}>{esp}</option>)}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Objetivo de Carreira (Trilha)</label>
                <select
                  value={usuario.objetivoCarreira || ''}
                  onChange={(e) => updateUsuario({ objetivoCarreira: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#017AA1] bg-white"
                >
                  <option value="">Selecione o objetivo...</option>
                  {OBJETIVOS_CARREIRA.map(obj => (
                    <option key={obj.id} value={obj.id}>{obj.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {naoListada && (
              <div className="bg-white border border-[#017AA1]/30 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#017AA1]">
                  <Sparkles className="w-4 h-4" /> Área personalizada (Minha área não está listada)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Nome da sua área personalizada</label>
                    <input
                      type="text"
                      value={usuario.areaPersonalizada || ''}
                      onChange={(e) => updateUsuario({ areaPersonalizada: e.target.value })}
                      placeholder="Ex: Bioinformática, Direito Espacial, Economia Criativa..."
                      className="w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Área-base semelhante para a matriz</label>
                    <select
                      value={area}
                      onChange={(e) => updateUsuario({ areaAtuacao: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-white"
                    >
                      <option value="">Escolha uma área-base...</option>
                      {areaOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Tipo de matriz desejada</label>
                    <select
                      value={usuario.tipoMatriz || 'especifica'}
                      onChange={(e) => updateUsuario({ tipoMatriz: e.target.value as 'generica' | 'especifica' })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-white"
                    >
                      <option value="especifica">Matriz específica (adaptada à área-base)</option>
                      <option value="generica">Matriz genérica (competências transversais)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Sugerir inclusão oficial na plataforma</label>
                    <input
                      type="text"
                      value={usuario.areaSugeridaPlataforma || ''}
                      onChange={(e) => updateUsuario({ areaSugeridaPlataforma: e.target.value })}
                      placeholder="Opcional: nome da área que gostaria de ver no catálogo"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {area && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Áreas Complementares (opcional, até 3 para perfis híbridos)
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                  {areaOptions
                    .filter(opt => opt.value !== area)
                    .map(opt => {
                      const active = areasComplementares.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleAreaComplementar(opt.value)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
                            active
                              ? 'bg-[#017AA1] text-white border-[#017AA1]'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-[#017AA1]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {currentLevelData && (
              <div className="mt-2 p-4 bg-[#539CBD]/10 border border-[#017AA1]/20 rounded-xl">
                <span className="block text-xs font-bold text-[#017AA1] uppercase mb-1">Expectativa do Mercado:</span>
                <p className="text-slate-800 text-sm font-medium leading-relaxed">{currentLevelData.expectativa}</p>
              </div>
            )}
          </div>

          {!currentLevelData ? (
            <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600">Selecione Área de Atuação e Nível acima</h3>
              <p className="text-gray-400 mt-2 max-w-sm mx-auto text-sm">
                Para visualizar as competências técnicas (Hard Skills) e registrar evidências, selecione sua área ou use o assistente de recomendação.
              </p>
            </div>
          ) : (
            <div className="space-y-2 mt-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                Avalie suas Competências Técnicas (1 a 5)
                {usuario.especialidade ? <span className="text-sm font-medium text-[#017AA1] ml-2">· {usuario.especialidade}</span> : null}
              </h4>
              {currentLevelData.hardSkills.map(skill => renderRatingGroup(skill))}
            </div>
          )}
        </div>
      )}

      <AreaRecommenderModal
        open={recommenderOpen}
        onClose={() => setRecommenderOpen(false)}
        onApply={handleApplyRecommendation}
      />
    </div>
  );
};
