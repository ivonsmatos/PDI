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
};

export const STATUS_COLOR: Record<PlanoStatus, string> = {
  pendente:     'text-slate-400 dark:text-slate-500',
  em_andamento: 'text-amber-500',
  concluido:    'text-emerald-500',
};

export const STATUS_BG: Record<PlanoStatus, string> = {
  pendente:     'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
  em_andamento: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  concluido:    'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
};
