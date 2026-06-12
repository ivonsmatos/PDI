import { useEffect } from 'react';
import { usePdiStore } from '../store/usePdiStore';

const STORAGE_KEY = 'pdi-notif-last-check';
const WINDOW_MS = 12 * 60 * 60 * 1000; // notifica no máximo 1x a cada 12h

async function requestPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

export function useNotificacoesPrazo() {
  const { planoDeAcao, planoAcaoStatus } = usePdiStore();

  useEffect(() => {
    const run = async () => {
      const granted = await requestPermission();
      if (!granted) return;

      const last = Number(localStorage.getItem(STORAGE_KEY) ?? '0');
      if (Date.now() - last < WINDOW_MS) return;

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const limite = new Date(hoje);
      limite.setDate(limite.getDate() + 3);

      const vencendo = planoDeAcao.filter(a => {
        if (!a.prazoData) return false;
        if (planoAcaoStatus[a.id] === 'concluido') return false;
        const d = new Date(a.prazoData);
        d.setHours(0, 0, 0, 0);
        return d >= hoje && d <= limite;
      });

      const vencidas = planoDeAcao.filter(a => {
        if (!a.prazoData) return false;
        if (planoAcaoStatus[a.id] === 'concluido') return false;
        const d = new Date(a.prazoData);
        d.setHours(0, 0, 0, 0);
        return d < hoje;
      });

      if (vencendo.length === 0 && vencidas.length === 0) return;

      const partes: string[] = [];
      if (vencidas.length > 0)
        partes.push(`${vencidas.length} ação(ões) vencida(s)`);
      if (vencendo.length > 0)
        partes.push(`${vencendo.length} ação(ões) vence${vencendo.length === 1 ? '' : 'm'} em até 3 dias`);

      const exemplo = vencidas[0]?.acao ?? vencendo[0]?.acao ?? '';

      // Delay pequeno para não disparar no cold start antes da UI pintar
      setTimeout(() => {
        const n = new Notification('Meu PDI — Atenção ao prazo ⏰', {
          body: `${partes.join(' · ')}.\nEx: "${exemplo.slice(0, 60)}${exemplo.length > 60 ? '…' : ''}"`,
          icon: '/pwa-192x192.png',
          badge: '/pwa-192x192.png',
          tag: 'pdi-prazo',
        });
        n.onclick = () => {
          window.focus();
          window.location.hash = '/plano';
        };
      }, 2000);

      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // roda só no mount (checagem diária ao abrir o app)
}
