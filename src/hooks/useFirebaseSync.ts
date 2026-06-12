import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePdiStore } from '../store/usePdiStore';
import { useToastStore } from '../store/useToastStore';
import { savePdiAtual, saveDiarioEntry, deleteDiarioEntry, saveCiclo } from '../lib/firestore';
import type { PdiState } from '../store/usePdiStore';

const DEBOUNCE_MS = 1500;
const MAX_RETRIES = 2;

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_RETRIES) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }
  throw lastErr;
}

/**
 * Hook que sincroniza automaticamente o Zustand store com o Firestore.
 * Deve ser montado UMA VEZ dentro do AppLayout (rotas autenticadas).
 */
export function useFirebaseSync() {
  const { user } = useAuth();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prevDiarioRef    = useRef<PdiState['diario']>([]);
  const prevHistoricoRef = useRef<PdiState['historico']>([]);

  useEffect(() => {
    if (!user) return;

    const uid = user.uid;
    const { addToast } = useToastStore.getState();

    const unsub = usePdiStore.subscribe((state, _prev) => {
      // ── PDI atual (debounced) ──────────────────────────────────────────────────
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        withRetry(() =>
          savePdiAtual(uid, {
            stepAtual:       state.stepAtual,
            usuario:         state.usuario as Record<string, string>,
            inventario:      state.inventario as Record<string, unknown>,
            objetivos:       state.objetivos,
            planoDeAcao:     state.planoDeAcao,
            campoDeForcas:   state.campoDeForcas as Record<string, unknown>,
            wizardConcluido: state.wizardConcluido,
            planoAcaoStatus: state.planoAcaoStatus,
            trilhaProgresso: state.trilhaProgresso,
            isDarkMode:      state.isDarkMode,
          })
        ).catch(() => {
          addToast('Erro ao sincronizar dados. Verifique sua conexão.', 'error');
        });
      }, DEBOUNCE_MS);

      // ── Diário ─────────────────────────────────────────────────────────────────
      const prevDiario = prevDiarioRef.current;
      const curDiario  = state.diario;

      if (curDiario !== prevDiario) {
        curDiario
          .filter(e => !prevDiario.find(p => p.id === e.id))
          .forEach(e =>
            withRetry(() => saveDiarioEntry(uid, e)).catch(() =>
              addToast('Erro ao salvar entrada do diário.', 'error')
            )
          );

        prevDiario
          .filter(p => !curDiario.find(e => e.id === p.id))
          .forEach(p =>
            withRetry(() => deleteDiarioEntry(uid, p.id)).catch(() =>
              addToast('Erro ao excluir entrada do diário.', 'error')
            )
          );

        prevDiarioRef.current = curDiario;
      }

      // ── Histórico ──────────────────────────────────────────────────────────────
      const prevHistorico = prevHistoricoRef.current;
      const curHistorico  = state.historico;

      if (curHistorico !== prevHistorico) {
        curHistorico
          .filter(c => !prevHistorico.find(p => p.idCiclo === c.idCiclo))
          .forEach(c =>
            withRetry(() => saveCiclo(uid, c)).catch(() =>
              addToast('Erro ao salvar ciclo no histórico.', 'error')
            )
          );

        prevHistoricoRef.current = curHistorico;
      }
    });

    const s = usePdiStore.getState();
    prevDiarioRef.current    = s.diario;
    prevHistoricoRef.current = s.historico;

    return () => {
      unsub();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [user]);
}
