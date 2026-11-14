import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePdiStore } from '../store/usePdiStore';
import { useToastStore } from '../store/useToastStore';
import { savePdiAtual, saveDiarioEntry, deleteDiarioEntry, saveCiclo, saveTelemetry } from '../lib/firestore';
import { computeHealthScore } from '../lib/healthScore';
import type { PdiState } from '../store/usePdiStore';

function buildTelemetry(state: PdiState) {
  const acoesConcluidasCount = Object.values(state.planoAcaoStatus).filter(v => v === 'concluido').length;
  return {
    areaAtuacao: state.usuario.areaAtuacao || '',
    nivelCarreira: state.usuario.nivelCarreira || '',
    wizardConcluido: state.wizardConcluido,
    objetivosCount: state.objetivos.length,
    acoesCount: state.planoDeAcao.length,
    acoesConcluidasCount,
    diarioCount: state.diario.length,
    ciclosCount: state.historico.length,
    hardSkillsCount: state.inventario.hardSkills.length,
    softSkillsCount: state.inventario.softSkills.length,
    scoreSaude: computeHealthScore(state),
    ultimoAcesso: new Date().toISOString().slice(0, 10),
  };
}

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

    const unsub = usePdiStore.subscribe((state) => {
      // ── PDI atual (debounced) ──────────────────────────────────────────────────
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        withRetry(() =>
          Promise.all([
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
            }),
            saveTelemetry(uid, buildTelemetry(state)),
          ])
        ).catch(() => {
          addToast('Erro ao sincronizar dados. Verifique sua conexão.', 'error');
        });
      }, DEBOUNCE_MS);

      // ── Diário ─────────────────────────────────────────────────────────────────
      const prevDiario = prevDiarioRef.current;
      const curDiario  = state.diario;

      if (curDiario !== prevDiario) {
        curDiario
          .filter(e => {
            const prev = prevDiario.find(p => p.id === e.id);
            if (!prev) return true;
            return (
              prev.texto !== e.texto ||
              (prev.objetivoId ?? '') !== (e.objetivoId ?? '') ||
              JSON.stringify(prev.tags ?? []) !== JSON.stringify(e.tags ?? [])
            );
          })
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
    saveTelemetry(uid, buildTelemetry(s)).catch(() => {});

    return () => {
      unsub();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [user]);
}
