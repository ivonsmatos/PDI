import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import {
  User, Moon, Sun, DownloadCloud, UploadCloud, Trash2,
  Settings, CheckCircle2, AlertTriangle,
} from 'lucide-react';

export const Config: React.FC = () => {
  const {
    usuario, updateUsuario, isDarkMode, setIsDarkMode,
    resetAtual, salvarCiclo, historico,
  } = usePdiStore();

  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [saved, setSaved] = useState(false);
  const [importError, setImportError] = useState('');
  const [importOk, setImportOk] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSavePerfil = () => {
    updateUsuario({ nome: nome.trim(), email: email.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleExportAll = () => {
    const store = usePdiStore.getState();
    const data = {
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
    const uri = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const a = document.createElement('a');
    a.href = uri;
    a.download = `PDI_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError('');
    setImportOk(false);
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const raw = ev.target?.result as string;
        const data = JSON.parse(raw);

        // Validação mínima
        if (!data.usuario || !data.inventario || !data.objetivos) {
          throw new Error('Arquivo inválido: estrutura do PDI não reconhecida.');
        }

        const store = usePdiStore.getState();

        // Aplica os dados importados via setStoreItem
        if (data.usuario) store.updateUsuario(data.usuario);
        if (data.inventario) store.setStoreItem('inventario', data.inventario);
        if (data.objetivos)  store.setStoreItem('objetivos', data.objetivos);
        if (data.planoDeAcao) store.setStoreItem('planoDeAcao', data.planoDeAcao);
        if (data.campoDeForcas) store.updateCampoDeForcas(data.campoDeForcas);

        // Atualiza o nome local para refletir o importado
        setNome(data.usuario?.nome ?? '');
        setEmail(data.usuario?.email ?? '');

        setImportOk(true);
        setTimeout(() => setImportOk(false), 3000);
      } catch (err) {
        setImportError(err instanceof Error ? err.message : 'Erro ao ler o arquivo.');
      }
    };
    reader.readAsText(file);
    // Reset input para permitir re-importar o mesmo arquivo
    e.target.value = '';
  };

  const handleResetCiclo = () => {
    if (window.confirm('Isso irá salvar o ciclo atual no histórico e reiniciar o PDI. Deseja continuar?')) {
      salvarCiclo();
      resetAtual();
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('⚠️ Isso apagará TODOS os dados, incluindo histórico e diário. Esta ação é irreversível. Continuar?')) {
      if (window.confirm('Tem absoluta certeza? Tudo será perdido.')) {
        localStorage.removeItem('pdi-storage');
        window.location.reload();
      }
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
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">E-mail</label>
            <input
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
                onClick={handleSavePerfil}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
              >
                Salvar Perfil
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Aparência */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
          {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
          Aparência
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Modo escuro</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Preferência salva automaticamente</p>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-600'}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </section>

      {/* Dados */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-1">
          <DownloadCloud className="w-4 h-4 text-emerald-500" /> Dados
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
          {historico.length} ciclo(s) salvo(s) no histórico local.
        </p>

        <div className="space-y-3">
          {/* Export */}
          <button
            onClick={handleExportAll}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            <DownloadCloud className="w-5 h-5 text-emerald-500 shrink-0" />
            <div className="text-left">
              <p>Exportar backup completo (JSON)</p>
              <p className="text-xs font-normal text-slate-400">Inclui histórico, diário e status das ações</p>
            </div>
          </button>

          {/* Import */}
          <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            <UploadCloud className="w-5 h-5 text-blue-500 shrink-0" />
            <div className="text-left">
              <p>Importar PDI (JSON)</p>
              <p className="text-xs font-normal text-slate-400">Restaura usuário, inventário, objetivos e plano</p>
            </div>
          </button>

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
            onClick={handleResetCiclo}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-rose-200 dark:border-rose-700 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors text-sm font-semibold text-rose-600 dark:text-rose-300"
          >
            <Trash2 className="w-5 h-5 shrink-0" />
            <div className="text-left">
              <p>Salvar e reiniciar ciclo</p>
              <p className="text-xs font-normal text-rose-400">Salva o ciclo atual no histórico e começa um novo</p>
            </div>
          </button>
          <button
            onClick={handleDeleteAll}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-rose-400 dark:border-rose-700 bg-rose-600 hover:bg-rose-700 transition-colors text-sm font-bold text-white"
          >
            <Trash2 className="w-5 h-5 shrink-0" />
            <div className="text-left">
              <p>Apagar TODOS os dados</p>
              <p className="text-xs font-normal text-rose-200">Irreversível — histórico e diário serão perdidos</p>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
