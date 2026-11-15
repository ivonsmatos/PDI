export type PublicProfileVisibility = 'publico' | 'recrutadores' | 'gestor' | 'rh';

export type PublicProfileData = {
  ownerUid?: string;
  nome: string;
  area: string;
  nivel: string;
  areasComplementares?: string[];
  especialidade?: string;
  objetivoCarreira?: string;
  hardSkills: {
    skill: string;
    nivelAtual: number;
    nivelDesejado: number;
    evidenciasCount?: number;
  }[];
  softFortes: string[];
  softMelhoria: string[];
  objetivosCount: number;
  acoesConcluidasCount: number;
  ciclosCount: number;
  dataGeracao: string; // ISO string
  revogado?: boolean;
  expiraEm?: number | null;
  visibilidade?: PublicProfileVisibility;
  senhaHash?: string | null;
  apenasCompetencias?: string[] | null;
  incluirDiario?: boolean;
  diarioResumo?: { data: string; texto: string }[];
  consentimentoHistorico?: { data: string; acao: string; escopo: string }[];
};

export async function hashProfilePassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Gera ID aleatório URL-safe de 24 caracteres (~144 bits de entropia). */
export function generatePublicProfileId(): string {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/** Verifica se o parâmetro da rota tem formato de ID do Firestore (não Base64 legado). */
export function isFirestoreProfileId(param: string): boolean {
  return /^[A-Za-z0-9_-]{16,40}$/.test(param);
}

/** Compatibilidade com links antigos codificados em Base64. */
export function decodeLegacyProfile(encoded: string): PublicProfileData | null {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded)))) as PublicProfileData;
  } catch {
    return null;
  }
}

