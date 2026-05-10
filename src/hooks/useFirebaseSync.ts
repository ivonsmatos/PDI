import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePdiStore } from '../store/usePdiStore';
import { savePdiAtual, saveDiarioEntry, deleteDiarioEntry, saveCiclo } from '../lib/firestore';
import type { PdiState } from '../store/usePdiStore';

const DEBOUNCE_MS = 1500;

/**
 * Hook que sincroniza automaticamente o Zustand store com o Firestore.
 * Deve ser montado UMA VEZ dentro do AppLayout (rotas autenticadas).
 */
export function useFirebaseSync() {
  const { user } = useAuth();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Referência para diário e historico para detectar mudanças
  const prevDiarioRef = useRef<PdiState['diario']>([]);
  const prevHistoricoRef = useRef<PdiState['historico']>([]);

  useEffect(() => {
    if (!user) return;

    const uid = user.uid;

    const unsub = usePdiStore.subscribe((state, prev) => {
      // ── Sincroniza o PDI atual (debounced) ──────────────────────────────────
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        savePdiAtual(uid, {
          stepAtual:        state.stepAtual,
          usuario:          state.usuario as Record<string, string>,
          inventario:       state.inventario as Record<string, unknown>,
          objetivos:        state.objetivos,
          planoDeAcao:      state.planoDeAcao,
          campoDeForcas:    state.campoDeForcas as Record<string, unknown>,
          wizardConcluido:  state.wizardConcluido,
          planoAcaoStatus:  state.planoAcaoStatus,
          trilhaProgresso:  state.trilhaProgresso,
          isDarkMode:       state.isDarkMode,
        }).catch(console.error);
      }, DEBOUNCE_MS);

      // ── Diário: detecta entradas novas / removidas ───────────────────────────
      const prevDiario = prevDiarioRef.current;
      const curDiario  = state.diario;

      if (curDiario !== prevDiario) {
        // Entradas novas
        curDiario
          .filter(e => !prevDiario.find(p => p.id === e.id))
          .forEach(e => saveDiarioEntry(uid, e).catch(console.error));

        // Entradas removidas
        prevDiario
          .filter(p => !curDiario.find(e => e.id === p.id))
          .forEach(p => deleteDiarioEntry(uid, p.id).catch(console.error));

        prevDiarioRef.current = curDiario;
      }

      // ── Histórico: detecta novos ciclos salvos ────────────────────────────────
      const prevHistorico = prevHistoricoRef.current;
      const curHistorico  = state.historico;

      if (curHistorico !== prevHistorico) {
        curHistorico
          .filter(c => !prevHistorico.find(p => p.idCiclo === c.idCiclo))
          .forEach(c => saveCiclo(uid, c).catch(console.error));

        prevHistoricoRef.current = curHistorico;
      }
    });

    // Inicializa as refs com o estado atual
    const s = usePdiStore.getState();
    prevDiarioRef.current    = s.diario;
    prevHistoricoRef.current = s.historico;

    return () => {
      unsub();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [user]);
}
