import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import { useToastStore } from '../store/useToastStore';
import { Plus, Trash2, BookOpen, Calendar, Target, Search, X, Pencil, Check, ShieldAlert, Download, Wifi, WifiOff } from 'lucide-react';

const MAX_CARACTERES = 2000;

const TAGS_SUGERIDAS = ['conquista', 'aprendizado', 'feedback', 'bloqueio'];

const PERIODOS = [
  { value: '',   label: 'Sempre' },
  { value: '7',  label: '7 dias' },
  { value: '30', label: '30 dias' },
  { value: '90', label: '90 dias' },
];

export const Diario: React.FC = () => {
  const { diario, objetivos, addDiarioEntry, updateDiarioEntry, removeDiarioEntry, restoreDiarioEntry } = usePdiStore();
  const { addToast } = useToastStore();
  const [texto, setTexto] = useState('');
  const [objetivoId, setObjetivoId] = useState('');
  const [tagsSelecionadas, setTagsSelecionadas] = useState<string[]>([]);
  const [filtroObj, setFiltroObj] = useState('');
  const [filtroTag, setFiltroTag] = useState('');
  const [busca, setBusca] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editTexto, setEditTexto] = useState('');
  const [online, setOnline] = useState(() => (typeof navigator !== 'undefined' ? navigator.onLine : true));

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const handleAdd = () => {
    const t = texto.trim();
    if (!t) return;
    addDiarioEntry({
      data: new Date().toISOString(),
      texto: t,
      objetivoId: objetivoId || undefined,
      tags: tagsSelecionadas.length > 0 ? tagsSelecionadas : undefined,
    });
    setTexto('');
    setObjetivoId('');
    setTagsSelecionadas([]);
  };

  const toggleTag = (tag: string) => {
    setTagsSelecionadas((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const entriesFiltradas = useMemo(() => {
    let result = diario;

    if (filtroObj) result = result.filter(e => e.objetivoId === filtroObj);

    if (filtroTag) result = result.filter(e => e.tags?.includes(filtroTag));

    if (periodo) {
      const limite = new Date();
      limite.setDate(limite.getDate() - Number(periodo));
      result = result.filter(e => new Date(e.data) >= limite);
    }

    if (busca.trim()) {
      const q = busca.trim().toLowerCase();
      result = result.filter(e =>
        e.texto.toLowerCase().includes(q) ||
        (e.tags ?? []).some(t => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [diario, filtroObj, filtroTag, periodo, busca]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleExportMarkdown = () => {
    if (entriesFiltradas.length === 0) return;
    const lines = [
      '# Diário de Progresso - Meu PDI',
      '',
      ...entriesFiltradas.flatMap((entry) => {
        const obj = entry.objetivoId ? objetivos.find(o => o.id === entry.objetivoId) : null;
        return [
          `## ${formatDate(entry.data)}${obj ? ` · ${obj.descricao}` : ''}`,
          '',
          entry.texto,
          '',
        ];
      }),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diario-pdi-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    addToast(`${entriesFiltradas.length} entrada(s) exportada(s) em Markdown.`, 'success');
  };

  return (
    <div className="pb-24 lg:pb-0 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-violet-500" /> Diário de Progresso
          </h1>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                online
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40'
                  : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40'
              }`}
            >
              {online ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {online ? 'Salvo na nuvem' : 'Offline · salvo no dispositivo'}
            </span>
            {entriesFiltradas.length > 0 && (
              <button
                type="button"
                onClick={handleExportMarkdown}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                title="Exportar entradas exibidas em Markdown para reuniões 1:1"
              >
                <Download className="w-3.5 h-3.5" /> Exportar (.md)
              </button>
            )}
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Registre reflexões, conquistas e aprendizagens ao longo do ciclo. Mantido entre ciclos.
        </p>
      </motion.div>

      {/* Input de nova entrada */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 mb-8"
      >
        <h3 className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
          Nova entrada
        </h3>

        {/* Associar a objetivo */}
        {objetivos.length > 0 && (
          <div className="mb-3">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Relacionar a um objetivo <span className="font-normal text-slate-400">(opcional)</span>
            </label>
            <select
              value={objetivoId}
              onChange={e => setObjetivoId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">- Sem vínculo -</option>
              {objetivos.map(o => (
                <option key={o.id} value={o.id}>{o.descricao}</option>
              ))}
            </select>
          </div>
        )}

        <textarea
          rows={4}
          maxLength={MAX_CARACTERES}
          value={texto}
          onChange={e => setTexto(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) handleAdd(); }}
          placeholder="O que aconteceu hoje? O que você aprendeu? Qual foi a maior conquista ou obstáculo?&#10;&#10;(Ctrl+Enter para salvar)"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        />

        <div className="flex flex-wrap items-center gap-1.5 mt-3">
          <span className="text-[11px] font-semibold text-slate-400 mr-1">Tags:</span>
          {TAGS_SUGERIDAS.map((tag) => {
            const active = tagsSelecionadas.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                  active
                    ? 'bg-violet-600 text-white border-violet-600'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 mt-3 text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200/70 dark:border-amber-800/40 rounded-lg px-3 py-1.5">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
          <span>Evite registrar informações confidenciais da empresa, senhas ou dados pessoais de terceiros.</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })} · {texto.length}/{MAX_CARACTERES}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!texto.trim()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white disabled:text-slate-400 font-semibold text-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Registrar
          </button>
        </div>
      </motion.div>

      {/* Busca textual + período */}
      {diario.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar nas entradas..."
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            />
            {busca && (
              <button
                onClick={() => setBusca('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex gap-1.5">
            {PERIODOS.map(p => (
              <button
                key={p.value}
                onClick={() => setPeriodo(p.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  periodo === p.value
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filtro por objetivo e tags */}
      {diario.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-5">
          {objetivos.length > 0 && (
            <>
              <button
                onClick={() => setFiltroObj('')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filtroObj === '' ? 'bg-violet-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                Todos
              </button>
              {objetivos.map(o => (
                <button
                  key={o.id}
                  onClick={() => setFiltroObj(o.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all truncate max-w-[200px] ${
                    filtroObj === o.id ? 'bg-violet-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {o.descricao.length > 30 ? o.descricao.slice(0, 30) + '…' : o.descricao}
                </button>
              ))}
            </>
          )}
          {TAGS_SUGERIDAS.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => setFiltroTag(prev => (prev === tag ? '' : tag))}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                filtroTag === tag
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Entradas */}
      {entriesFiltradas.length === 0 ? (
        <div className="text-center py-16 text-slate-400 dark:text-slate-600">
          {diario.length > 0 ? (
            <>
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">Nenhuma entrada encontrada.</p>
              <p className="text-xs mt-1">Tente ajustar a busca ou o período.</p>
            </>
          ) : (
            <>
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">Nenhuma entrada ainda.</p>
              <p className="text-xs mt-1">Comece registrando uma reflexão acima.</p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {entriesFiltradas.map((entry) => {
              const obj = entry.objetivoId ? objetivos.find(o => o.id === entry.objetivoId) : null;
              return (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-5"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(entry.data)}
                      </span>
                      {obj && (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300">
                          <Target className="w-2.5 h-2.5" />
                          {obj.descricao.length > 25 ? obj.descricao.slice(0, 25) + '…' : obj.descricao}
                        </span>
                      )}
                      {(entry.tags ?? []).map(tag => (
                        <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        aria-label="Editar entrada do diário"
                        onClick={() => {
                          setEditandoId(entry.id);
                          setEditTexto(entry.texto);
                        }}
                        className="text-slate-400 hover:text-indigo-500 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Excluir entrada do diário"
                        onClick={() => {
                          const backup = entry;
                          removeDiarioEntry(entry.id);
                          addToast('Entrada removida do diário.', 'info', {
                            label: 'Desfazer',
                            onClick: () => restoreDiarioEntry(backup),
                          });
                        }}
                        className="text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {editandoId === entry.id ? (
                    <div className="space-y-2">
                      <textarea
                        rows={3}
                        maxLength={MAX_CARACTERES}
                        value={editTexto}
                        onChange={e => setEditTexto(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditandoId(null)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          disabled={!editTexto.trim()}
                          onClick={() => {
                            updateDiarioEntry(entry.id, { texto: editTexto.trim() });
                            setEditandoId(null);
                            addToast('Entrada atualizada.', 'success');
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50"
                        >
                          <Check className="w-3.5 h-3.5" /> Salvar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {entry.texto}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
