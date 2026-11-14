import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import { useAuth } from '../contexts/AuthContext';
import { useToastStore } from '../store/useToastStore';
import { deleteAllUserData, revokePublicProfile } from '../lib/firestore';
import {
  User, Moon, Sun, DownloadCloud, UploadCloud, Trash2,
  Settings, CheckCircle2, AlertTriangle, Bell, Share2,
} from 'lucide-react';

interface ImportPreview {
  data: Record<string, unknown>;
  nome: string;
  objetivosCount: number;
  acoesCount: number;
  diarioCount: number;
  ciclosCount: number;
}

export const Config: React.FC = () => {
  const {
    usuario, updateUsuario, isDarkMode, setIsDarkMode,
    notificacoesAtivas, setNotificacoesAtivas,
    publicProfileId, setPublicProfileId,
    resetAtual, salvarCiclo, historico, limparTudo,
  } = usePdiStore();
  const { user } = useAuth();
  const { addToast } = useToastStore();

  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [saved, setSaved] = useState(false);
  const [importError, setImportError] = useState('');
  const [importOk, setImportOk] = useState(false);
  const [importPreview, setImportPreview] = useState<ImportPreview | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSavePerfil = () => {
    updateUsuario({ nome: nome.trim(), email: email.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleToggleNotificacoes = async () => {
    if (notificacoesAtivas) {
      setNotificacoesAtivas(false);
      addToast('Lembretes de prazo desativados.', 'info');
      return;
    }
    if (!('Notification' in window)) {
      addToast('Seu navegador não suporta notificações.', 'warning');
      return;
    }
    if (Notification.permission === 'denied') {
      addToast('Notificações bloqueadas nas configurações do navegador.', 'warning');
      return;
    }
    const perm = Notification.permission === 'granted'
      ? 'granted'
      : await Notification.requestPermission();
    if (perm === 'granted') {
      setNotificacoesAtivas(true);
      addToast('Lembretes de prazo ativados.', 'success');
    } else {
      addToast('Permissão de notificação não concedida.', 'info');
    }
  };

  const gerarBackupObjeto = () => {
    const store = usePdiStore.getState();
    return {
      exportedAt: new Date().toISOString(),
      versao: '2.0',
      usuario: store.usuario,
      inventario: store.inventario,
      objetivos: store.objetivos,
      planoDeAcao: store.planoDeAcao,
      campoDeForcas: store.campoDeForcas,
      planoAcaoStatus: store.planoAcaoStatus,
      trilhaProgresso: store.trilhaProgresso,
      diario: store.diario,
      historico: store.historico,
    };
  };

  const downloadJson = (obj: unknown, prefixo: string) => {
    const uri = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj, null, 2));
    const a = document.createElement('a');
    a.href = uri;
    a.download = `${prefixo}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleExportAll = () => {
    downloadJson(gerarBackupObjeto(), 'PDI_backup');
    addToast('Backup JSON exportado. Guarde em local seguro.', 'info');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError('');
    setImportOk(false);
    setImportPreview(null);

    if (file.size > 5 * 1024 * 1024) {
      setImportError('Arquivo muito grande (limite de 5 MB).');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const raw = ev.target?.result as string;
        const data = JSON.parse(raw);

        const validSchema =
          data &&
          typeof data === 'object' &&
          !Array.isArray(data) &&
          data.usuario && typeof data.usuario === 'object' &&
          data.inventario && typeof data.inventario === 'object' &&
          Array.isArray(data.inventario.hardSkills) &&
          Array.isArray(data.inventario.softSkills) &&
          Array.isArray(data.objetivos) &&
          (!data.planoDeAcao || Array.isArray(data.planoDeAcao));

        if (!validSchema) {
          throw new Error('Arquivo inválido: o JSON não segue o formato esperado do Meu PDI.');
        }

        setImportPreview({
          data,
          nome: typeof data.usuario.nome === 'string' && data.usuario.nome ? data.usuario.nome : 'Sem nome',
          objetivosCount: data.objetivos.length,
          acoesCount: Array.isArray(data.planoDeAcao) ? data.planoDeAcao.length : 0,
          diarioCount: Array.isArray(data.diario) ? data.diario.length : 0,
          ciclosCount: Array.isArray(data.historico) ? data.historico.length : 0,
        });
      } catch (err) {
        setImportError(err instanceof Error ? err.message : 'Erro ao ler o arquivo.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const confirmarImportacao = () => {
    if (!importPreview) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = importPreview.data as Record<string, any>;
    const store = usePdiStore.getState();

    // Backup automático do estado atual antes de sobrescrever
    if (store.objetivos.length > 0 || store.diario.length > 0 || store.historico.length > 0) {
      downloadJson(gerarBackupObjeto(), 'PDI_backup_antes_importacao');
    }

    if (data.usuario) store.updateUsuario(data.usuario);
    if (data.inventario) store.setStoreItem('inventario', data.inventario);
    if (data.objetivos) store.setStoreItem('objetivos', data.objetivos);
    if (data.planoDeAcao) store.setStoreItem('planoDeAcao', data.planoDeAcao);
    if (data.campoDeForcas) store.updateCampoDeForcas(data.campoDeForcas);
    if (data.planoAcaoStatus && typeof data.planoAcaoStatus === 'object') {
      usePdiStore.setState({ planoAcaoStatus: data.planoAcaoStatus });
    }
    if (data.trilhaProgresso && typeof data.trilhaProgresso === 'object') {
      usePdiStore.setState({ trilhaProgresso: data.trilhaProgresso });
    }
    if (Array.isArray(data.diario)) {
      usePdiStore.setState({ diario: data.diario });
    }
    if (Array.isArray(data.historico)) {
      store.setHistorico(data.historico);
    }

    setNome(data.usuario?.nome ?? '');
    setEmail(data.usuario?.email ?? '');
    setImportPreview(null);
    setImportOk(true);
    addToast('PDI importado com sucesso!', 'success');
    setTimeout(() => setImportOk(false), 3000);
  };

  const handleResetCiclo = () => {
    if (window.confirm('Isso irá salvar o ciclo atual no histórico e reiniciar o PDI (seu Diário é preservado). Deseja continuar?')) {
      salvarCiclo();
      resetAtual();
      addToast('Ciclo salvo no histórico.', 'success');
    }
  };

  const handleDeleteAll = async () => {
    if (confirmDeleteText.trim().toUpperCase() !== 'APAGAR' || deleting) return;
    setDeleting(true);
    try {
      if (user?.uid) {
        await deleteAllUserData(user.uid, publicProfileId);
      }
      limparTudo();
      addToast('Todos os dados do PDI foram apagados.', 'success');
      window.location.reload();
    } catch (err) {
      console.error('[Config] Erro ao apagar dados remotos:', err);
      addToast('Não foi possível apagar os dados na nuvem. Verifique sua conexão e tente novamente.', 'error');
      setDeleting(false);
    }
  };

  return (
    <div className="pb-24 lg:pb-0 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-500" /> Configurações
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Personalize seu perfil, gerencie dados e preferências do app.
        </p>
      </motion.div>

      {/* Perfil */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-indigo-500" /> Perfil
        </h2>
        <div className="space-y-3">
          <div>
            <label htmlFor="cfg-nome" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Nome completo</label>
            <input
              id="cfg-nome"
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label htmlFor="cfg-email" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">E-mail</label>
            <input
              id="cfg-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="seu@email.com"
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            {saved && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Salvo!
              </span>
            )}
            <div className="ml-auto">
              <button
                type="button"
                onClick={handleSavePerfil}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
              >
                Salvar Perfil
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Aparência e Notificações */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 mb-6 space-y-5">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
          Preferências
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Modo escuro</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Preferência salva automaticamente</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isDarkMode}
            aria-label="Alternar modo escuro"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-600'}`}
          >
            <span className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-indigo-500" /> Lembretes de prazo no navegador
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Avisa ao abrir o app quando houver ações vencendo em até 3 dias ou vencidas
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={notificacoesAtivas}
            aria-label="Ativar lembretes de prazo no navegador"
            onClick={handleToggleNotificacoes}
            className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${notificacoesAtivas ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-600'}`}
          >
            <span className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform ${notificacoesAtivas ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-indigo-500" /> Perfil público compartilhado
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {publicProfileId
                ? 'Você possui um link público ativo.'
                : 'Nenhum link público ativo. Use o botão Compartilhar no topo para gerar.'}
            </p>
          </div>
          {publicProfileId && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(`${window.location.origin}/p/${publicProfileId}`);
                  addToast('Link público copiado.', 'success');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
              >
                Copiar
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await revokePublicProfile(publicProfileId);
                    setPublicProfileId(null);
                    addToast('Link público revogado.', 'info');
                  } catch {
                    addToast('Não foi possível revogar agora. Verifique sua conexão.', 'error');
                  }
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 hover:bg-rose-200"
              >
                Revogar
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Dados */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-1">
          <DownloadCloud className="w-4 h-4 text-emerald-500" /> Dados e Backup
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          {historico.length} ciclo(s) salvo(s) no histórico.
        </p>

        <div className="space-y-3">
          {/* Export */}
          <button
            type="button"
            onClick={handleExportAll}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            <DownloadCloud className="w-5 h-5 text-emerald-500 shrink-0" />
            <div className="text-left">
              <p>Exportar backup completo (JSON)</p>
              <p className="text-xs font-normal text-slate-500 dark:text-slate-400">
                Inclui perfil, histórico, diário e ações em texto legível (não criptografado). Guarde em local privado.
              </p>
            </div>
          </button>

          {/* Import */}
          <input ref={fileRef} type="file" accept=".json,application/json" className="hidden" onChange={handleImport} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            <UploadCloud className="w-5 h-5 text-blue-500 shrink-0" />
            <div className="text-left">
              <p>Importar PDI (JSON)</p>
              <p className="text-xs font-normal text-slate-500 dark:text-slate-400">
                Mostra uma prévia antes de substituir e gera backup automático dos dados atuais.
              </p>
            </div>
          </button>

          {importPreview && (
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 space-y-2 text-xs text-slate-700 dark:text-slate-200">
              <p className="font-bold text-blue-800 dark:text-blue-300">Prévia da importação (vai substituir os dados atuais):</p>
              <ul className="space-y-0.5">
                <li>• Perfil: <strong>{importPreview.nome}</strong></li>
                <li>• Objetivos: <strong>{importPreview.objetivosCount}</strong> · Ações: <strong>{importPreview.acoesCount}</strong></li>
                <li>• Entradas no diário: <strong>{importPreview.diarioCount}</strong> · Ciclos: <strong>{importPreview.ciclosCount}</strong></li>
              </ul>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={confirmarImportacao}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Confirmar e substituir
                </button>
                <button
                  type="button"
                  onClick={() => setImportPreview(null)}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {importError && (
            <div className="flex items-center gap-2 px-3 py-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-600 dark:text-rose-300">
              <AlertTriangle className="w-4 h-4 shrink-0" /> {importError}
            </div>
          )}
          {importOk && (
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-600 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> PDI importado com sucesso!
            </div>
          )}
        </div>
      </section>

      {/* Zona de perigo */}
      <section className="bg-rose-50/50 dark:bg-rose-900/10 rounded-2xl border border-rose-200 dark:border-rose-800 p-6">
        <h2 className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4" /> Zona de Perigo
        </h2>
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleResetCiclo}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-rose-200 dark:border-rose-700 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors text-sm font-semibold text-rose-600 dark:text-rose-300"
          >
            <Trash2 className="w-5 h-5 shrink-0" />
            <div className="text-left">
              <p>Salvar e reiniciar ciclo</p>
              <p className="text-xs font-normal text-rose-500 dark:text-rose-400">
                Salva o ciclo atual no histórico e inicia um novo (seu Diário é mantido)
              </p>
            </div>
          </button>

          {!confirmDeleteOpen ? (
            <button
              type="button"
              onClick={() => setConfirmDeleteOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-rose-400 dark:border-rose-700 bg-rose-600 hover:bg-rose-700 transition-colors text-sm font-bold text-white"
            >
              <Trash2 className="w-5 h-5 shrink-0" />
              <div className="text-left">
                <p>Apagar TODOS os dados do PDI</p>
                <p className="text-xs font-normal text-rose-100">
                  Irreversível — remove dados locais e na nuvem (PDI atual, diário e ciclos). Sua conta de login permanece ativa.
                </p>
              </div>
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-rose-400 dark:border-rose-700 space-y-3">
              <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">
                Isso apagará permanentemente o seu PDI atual, histórico de ciclos e entradas do Diário (neste navegador e no Firestore).
                Digite <strong>APAGAR</strong> para confirmar:
              </p>
              <input
                type="text"
                value={confirmDeleteText}
                onChange={e => setConfirmDeleteText(e.target.value)}
                placeholder="Digite APAGAR"
                aria-label="Confirmação para apagar todos os dados"
                className="w-full px-3 py-2 rounded-lg border border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={confirmDeleteText.trim().toUpperCase() !== 'APAGAR' || deleting}
                  onClick={handleDeleteAll}
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-bold"
                >
                  {deleting ? 'Apagando…' : 'Confirmar exclusão'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmDeleteOpen(false);
                    setConfirmDeleteText('');
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
