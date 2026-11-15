import {
  doc, setDoc, getDoc, getDocs,
  deleteDoc, collection,
} from 'firebase/firestore';
import { db } from './firebase';
import type { PdiCiclo, DiarioEntry } from '../store/usePdiStore';
import type { PublicProfileData } from './publicProfile';

// ── Snapshot do PDI atual ──────────────────────────────────────────────────────
export interface PdiSnapshot {
  stepAtual?: number;
  usuario?: Record<string, unknown>;
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

/** Remove os documentos do PDI do usuário no Firestore (pdi/atual, diário, ciclos e telemetria). */
export async function deleteAllUserData(uid: string, publicProfileId?: string | null): Promise<void> {
  const [diarioSnap, ciclosSnap] = await Promise.all([
    getDocs(collection(db, 'users', uid, 'diario')),
    getDocs(collection(db, 'users', uid, 'ciclos')),
  ]);
  await Promise.all([
    deleteDoc(doc(db, 'users', uid, 'pdi', 'atual')),
    deleteDoc(doc(db, 'telemetry', uid)),
    ...diarioSnap.docs.map(d => deleteDoc(d.ref)),
    ...ciclosSnap.docs.map(d => deleteDoc(d.ref)),
    ...(publicProfileId ? [deleteDoc(doc(db, 'publicProfiles', publicProfileId))] : []),
  ]);
}

// ── Telemetria anonimizada (sem PII, para painel do Admin Geral) ─────────────
export interface TelemetrySnapshot {
  areaAtuacao: string;
  nivelCarreira: string;
  wizardConcluido: boolean;
  stepAtual?: number;
  objetivosCount: number;
  acoesCount: number;
  acoesConcluidasCount: number;
  diarioCount: number;
  ciclosCount: number;
  hardSkillsCount: number;
  softSkillsCount: number;
  evidenciasCount?: number;
  tempoAtePrimeiroPdiMin?: number | null;
  exportacoesPdf?: number;
  usoComparador?: number;
  usoPerfilPublico?: number;
  scoreSaude: number;
  ultimoAcesso: string; // YYYY-MM-DD
}

export async function saveTelemetry(uid: string, data: TelemetrySnapshot): Promise<void> {
  await setDoc(doc(db, 'telemetry', uid), data, { merge: true });
}

export async function loadAllTelemetry(): Promise<TelemetrySnapshot[]> {
  const snap = await getDocs(collection(db, 'telemetry'));
  return snap.docs.map(d => d.data() as TelemetrySnapshot);
}

// ── Perfil público (ID aleatório no Firestore, revogável) ─────────────────────
export async function savePublicProfile(profileId: string, data: PublicProfileData): Promise<void> {
  await setDoc(doc(db, 'publicProfiles', profileId), {
    ...data,
    revogado: false,
    expiraEm: data.expiraEm ?? null,
  });
}

export async function loadPublicProfile(profileId: string): Promise<PublicProfileData | null> {
  const snap = await getDoc(doc(db, 'publicProfiles', profileId));
  if (!snap.exists()) return null;
  const data = snap.data() as PublicProfileData;
  if (data.revogado) return null;
  if (data.expiraEm && Date.now() > data.expiraEm) return null;
  return data;
}

export async function revokePublicProfile(profileId: string): Promise<void> {
  await setDoc(doc(db, 'publicProfiles', profileId), { revogado: true }, { merge: true });
}
