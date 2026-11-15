import React, { useState } from 'react';
import { X, Lock, Shield, Clock, CheckCircle2, Copy, Share2 } from 'lucide-react';
import { usePdiStore } from '../store/usePdiStore';
import { useAuth } from '../contexts/AuthContext';
import { useToastStore } from '../store/useToastStore';
import {
  generatePublicProfileId,
  hashProfilePassword,
  type PublicProfileData,
  type PublicProfileVisibility,
} from '../lib/publicProfile';
import { savePublicProfile } from '../lib/firestore';
import { AREA_EMOJI_LABEL_MAP as AREA_LABELS } from '../data/areas';
import { trackEvent } from '../lib/analytics';

const NIVEL_LABELS: Record<string, string> = {
  estagiario: 'Estagiário',
  junior: 'Júnior',
  pleno: 'Pleno',
  senior: 'Sênior',
  especialista: 'Especialista',
  gestor: 'Gestor',
};

const VISIBILITY_OPTIONS: { value: PublicProfileVisibility; label: string; desc: string }[] = [
  { value: 'publico', label: 'Público', desc: 'Qualquer pessoa com o link pode visualizar' },
  { value: 'recrutadores', label: 'Somente para recrutadores', desc: 'Indicado para processos seletivos e headhunters' },
  { value: 'gestor', label: 'Compartilhado com gestor', desc: 'Focado em alinhamento de ciclo e 1:1' },
  { value: 'rh', label: 'Compartilhado com RH', desc: 'Uso em People Analytics, ciclos e sucessão' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SharePrivacyModal: React.FC<Props> = ({ open, onClose }) => {
  const {
    usuario,
    inventario,
    objetivos,
    planoAcaoStatus,
    historico,
    diario,
    publicProfileId,
    setPublicProfileId,
    incrementMetric,
  } = usePdiStore();
  const { user } = useAuth();
  const { addToast } = useToastStore();

  const [visibilidade, setVisibilidade] = useState<PublicProfileVisibility>('recrutadores');
  const [validadeDias, setValidadeDias] = useState<number>(30);
  const [senha, setSenha] = useState('');
  const [incluirDiario, setIncluirDiario] = useState(false);
  const [skillsSelecionadas, setSkillsSelecionadas] = useState<string[]>(
    () => inventario.hardSkills.map(s => s.skill)
  );
  const [saving, setSaving] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(
    publicProfileId ? `${window.location.origin}/p/${publicProfileId}` : null
  );

  if (!open) return null;

  const toggleSkill = (skill: string) => {
    setSkillsSelecionadas(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handlePublish = async () => {
    if (!user?.uid) return;
    setSaving(true);
    try {
      const acoesConcluidasCount = Object.values(planoAcaoStatus).filter(v => v === 'concluido').length;
      const expiraEm = validadeDias > 0 ? Date.now() + validadeDias * 86_400_000 : null;
      const senhaHash = senha.trim() ? await hashProfilePassword(senha.trim()) : null;
      const filteredHard = inventario.hardSkills
        .filter(s => skillsSelecionadas.length === 0 || skillsSelecionadas.includes(s.skill))
        .map(s => ({
          skill: s.skill,
          nivelAtual: s.nivelAtual,
          nivelDesejado: s.nivelDesejado,
          evidenciasCount: s.evidencias?.length ?? 0,
        }));

      const id = publicProfileId || generatePublicProfileId();
      const isNew = !publicProfileId;

      const profileData: PublicProfileData = {
        ownerUid: user.uid,
        nome: usuario.nome || 'Profissional',
        area: AREA_LABELS[usuario.areaAtuacao] || usuario.areaPersonalizada || usuario.areaAtuacao,
        nivel: NIVEL_LABELS[usuario.nivelCarreira] || usuario.nivelCarreira,
        areasComplementares: usuario.areasComplementares ?? [],
        especialidade: usuario.especialidade,
        objetivoCarreira: usuario.objetivoCarreira,
        hardSkills: filteredHard,
        softFortes: inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Forte').map(s => s.atributo),
        softMelhoria: inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Melhoria').map(s => s.atributo),
        objetivosCount: objetivos.length,
        acoesConcluidasCount,
        ciclosCount: historico.length,
        dataGeracao: new Date().toISOString(),
        visibilidade,
        expiraEm,
        senhaHash,
        apenasCompetencias: skillsSelecionadas,
        incluirDiario,
        diarioResumo: incluirDiario ? diario.slice(0, 5).map(d => ({ data: d.data, texto: d.texto })) : [],
        consentimentoHistorico: [
          {
            data: new Date().toISOString(),
            acao: isNew ? 'Link criado' : 'Permissões atualizadas',
            escopo: `${visibilidade} · ${filteredHard.length} competência(s) · ${incluirDiario ? 'com diário' : 'sem diário'}`,
          },
        ],
      };

      await savePublicProfile(id, profileData);
      if (isNew) {
        setPublicProfileId(id);
        trackEvent('public_profile_created', { visibilidade, validade_dias: validadeDias });
      }
      incrementMetric('usoPerfilPublico');
      trackEvent('public_profile_shared', { visibilidade, protected_password: Boolean(senhaHash) });

      const url = `${window.location.origin}/p/${id}`;
      setGeneratedUrl(url);
      await navigator.clipboard.writeText(url);
      addToast('Link atualizado e copiado com as permissões escolhidas!', 'success');
    } catch (err) {
      console.error('[SharePrivacyModal] Erro:', err);
      addToast('Não foi possível salvar as permissões do perfil.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#51266E]/10 text-[#51266E] dark:text-[#BAB1BD] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                Compartilhamento e Privacidade Granular
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Você controla exatamente quem vê, o que vê e por quanto tempo.
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nível de visibilidade</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {VISIBILITY_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setVisibilidade(opt.value)}
                  className={`text-left p-2.5 rounded-xl border transition-colors ${
                    visibilidade === opt.value
                      ? 'border-[#017AA1] bg-[#017AA1]/10 text-[#017AA1] dark:text-[#539CBD]'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <div className="font-bold">{opt.label}</div>
                  <div className="text-[11px] opacity-80">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300 mb-1">
                <Clock className="w-3.5 h-3.5" /> Validade do link
              </label>
              <select
                value={validadeDias}
                onChange={(e) => setValidadeDias(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-slate-800 dark:text-slate-100"
              >
                <option value={7}>Expira em 7 dias</option>
                <option value={30}>Expira em 30 dias</option>
                <option value={90}>Expira em 90 dias</option>
                <option value={0}>Sem expiração (revogável a qualquer momento)</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300 mb-1">
                <Lock className="w-3.5 h-3.5" /> Proteger com senha (opcional)
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Deixe vazio para acesso direto"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          {inventario.hardSkills.length > 0 && (
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Competências visíveis ({skillsSelecionadas.length}/{inventario.hardSkills.length})
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
                {inventario.hardSkills.map(s => {
                  const checked = skillsSelecionadas.includes(s.skill);
                  return (
                    <button
                      key={s.skill}
                      type="button"
                      onClick={() => toggleSkill(s.skill)}
                      className={`px-2 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
                        checked
                          ? 'bg-[#51266E] text-white border-[#51266E]'
                          : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {s.skill}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={incluirDiario}
              onChange={(e) => setIncluirDiario(e.target.checked)}
              className="rounded text-[#017AA1]"
            />
            <span className="text-slate-700 dark:text-slate-300">
              Incluir registros recentes do Diário pessoal (desmarcado = apenas currículo e competências)
            </span>
          </label>
        </div>

        {generatedUrl && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate text-emerald-800 dark:text-emerald-200 font-medium">{generatedUrl}</span>
            </div>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(generatedUrl);
                addToast('Link copiado!', 'success');
              }}
              className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 font-bold text-emerald-700"
            >
              <Copy className="w-3.5 h-3.5" /> Copiar
            </button>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-600 dark:text-slate-300"
          >
            Fechar
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#51266E] to-[#017AA1] text-white text-xs font-bold hover:opacity-95 disabled:opacity-60"
          >
            <Share2 className="w-3.5 h-3.5" />
            {saving ? 'Salvando...' : 'Gerar / Atualizar Link'}
          </button>
        </div>
      </div>
    </div>
  );
};
