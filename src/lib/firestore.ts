import {
  doc, setDoc, getDoc, getDocs,
  deleteDoc, collection,
} from 'firebase/firestore';
import { db } from './firebase';
import type { PdiCiclo, DiarioEntry } from '../store/usePdiStore';

// ── Snapshot do PDI atual ──────────────────────────────────────────────────────
export interface PdiSnapshot {
  stepAtual?: number;
  usuario?: Record<string, string>;
  inventario?: Record<string, unknown>;
  objetivos?: unknown[];
  planoDeAcao?: unknown[];
  campoDeForcas?: Record<string, unknown>;
  wizardConcluido?: boolean;
  planoAcaoStatus?: Record<string, string>;
  trilhaProgresso?: Record<string, boolean>;
  isDarkMode?: boolean;
}

export async function savePdiAtual(uid: string, data: PdiSnapshot): Promise<void> {
  await setDoc(doc(db, 'users', uid, 'pdi', 'atual'), data, { merge: true });
}

export async function loadPdiAtual(uid: string): Promise<PdiSnapshot | null> {
  const snap = await getDoc(doc(db, 'users', uid, 'pdi', 'atual'));
  return snap.exists() ? (snap.data() as PdiSnapshot) : null;
}

// ── Diário ────────────────────────────────────────────────────────────────────
export async function saveDiarioEntry(uid: string, entry: DiarioEntry): Promise<void> {
  await setDoc(doc(db, 'users', uid, 'diario', entry.id), entry);
}

export async function deleteDiarioEntry(uid: string, id: string): Promise<void> {
  await deleteDoc(doc(db, 'users', uid, 'diario', id));
}

export async function loadDiario(uid: string): Promise<DiarioEntry[]> {
  const snap = await getDocs(collection(db, 'users', uid, 'diario'));
  return snap.docs
    .map(d => d.data() as DiarioEntry)
    .sort((a, b) => b.data.localeCompare(a.data));
}

// ── Ciclos (histórico) ────────────────────────────────────────────────────────
export async function saveCiclo(uid: string, ciclo: PdiCiclo): Promise<void> {
  await setDoc(doc(db, 'users', uid, 'ciclos', ciclo.idCiclo), ciclo);
}

export async function loadCiclos(uid: string): Promise<PdiCiclo[]> {
  const snap = await getDocs(collection(db, 'users', uid, 'ciclos'));
  return snap.docs
    .map(d => d.data() as PdiCiclo)
    .sort((a, b) => a.dataSalvamento.localeCompare(b.dataSalvamento));
}
