export type PublicProfileData = {
  ownerUid?: string;
  nome: string;
  area: string;
  nivel: string;
  hardSkills: { skill: string; nivelAtual: number; nivelDesejado: number }[];
  softFortes: string[];
  softMelhoria: string[];
  objetivosCount: number;
  acoesConcluidasCount: number;
  ciclosCount: number;
  dataGeracao: string; // ISO string
  revogado?: boolean;
  expiraEm?: number | null;
};

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

