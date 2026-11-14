import type { PlanoStatus } from '../store/usePdiStore';

export const PRAZO_LABEL: Record<string, string> = {
  curto: '< 3 meses',
  medio: '3 – 6 meses',
  longo: '> 6 meses',
};

export const STATUS_LABEL: Record<PlanoStatus, string> = {
  pendente:     'Pendente',
  em_andamento: 'Em andamento',
  concluido:    'Concluído',
  bloqueado:    'Bloqueado',
};

export const STATUS_COLOR: Record<PlanoStatus, string> = {
  pendente:     'text-slate-500 dark:text-slate-400',
  em_andamento: 'text-amber-600 dark:text-amber-400',
  concluido:    'text-emerald-600 dark:text-emerald-400',
  bloqueado:    'text-rose-600 dark:text-rose-400',
};

export const STATUS_BG: Record<PlanoStatus, string> = {
  pendente:     'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
  em_andamento: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  concluido:    'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  bloqueado:    'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300',
};
