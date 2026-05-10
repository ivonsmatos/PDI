import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { loadPdiAtual, loadDiario, loadCiclos } from '../lib/firestore';
import { usePdiStore } from '../store/usePdiStore';

// ── Tradução de erros Firebase → PT-BR ───────────────────────────────────────
function translateError(code: string): string {
  const map: Record<string, string> = {
    'auth/email-already-in-use':   'Este e-mail já está cadastrado.',
    'auth/invalid-email':           'E-mail inválido.',
    'auth/weak-password':           'Senha muito fraca. Use ao menos 6 caracteres.',
    'auth/user-not-found':          'Usuário não encontrado.',
    'auth/wrong-password':          'Senha incorreta.',
    'auth/invalid-credential':      'E-mail ou senha incorretos.',
    'auth/too-many-requests':       'Muitas tentativas. Aguarde um momento.',
    'auth/popup-closed-by-user':    'Login cancelado.',
    'auth/network-request-failed':  'Erro de conexão. Verifique sua internet.',
  };
  return map[code] ?? 'Erro inesperado. Tente novamente.';
}

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (nome: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}

// ── Carrega dados do Firestore e hidrata o store ──────────────────────────────
async function hydrateStore(uid: string) {
  const store = usePdiStore.getState();

  try {
    const [pdiAtual, diario, ciclos] = await Promise.all([
      loadPdiAtual(uid),
      loadDiario(uid),
      loadCiclos(uid),
    ]);

    if (pdiAtual) {
      if (pdiAtual.usuario)         store.updateUsuario(pdiAtual.usuario as Parameters<typeof store.updateUsuario>[0]);
      if (pdiAtual.inventario)      store.setStoreItem('inventario', pdiAtual.inventario as Parameters<typeof store.setStoreItem<'inventario'>>[1]);
      if (pdiAtual.objetivos)       store.setStoreItem('objetivos', pdiAtual.objetivos as Parameters<typeof store.setStoreItem<'objetivos'>>[1]);
      if (pdiAtual.planoDeAcao)     store.setStoreItem('planoDeAcao', pdiAtual.planoDeAcao as Parameters<typeof store.setStoreItem<'planoDeAcao'>>[1]);
      if (pdiAtual.campoDeForcas)   store.updateCampoDeForcas(pdiAtual.campoDeForcas as Parameters<typeof store.updateCampoDeForcas>[0]);
      if (pdiAtual.stepAtual)       store.setStepAtual(pdiAtual.stepAtual);
      if (pdiAtual.planoAcaoStatus) {
        Object.entries(pdiAtual.planoAcaoStatus).forEach(([id, status]) =>
          store.setPlanoItemStatus(id, status as Parameters<typeof store.setPlanoItemStatus>[1])
        );
      }
      if (pdiAtual.trilhaProgresso) {
        Object.entries(pdiAtual.trilhaProgresso).forEach(([key, val]) => {
          if (val !== usePdiStore.getState().trilhaProgresso[key]) store.toggleTrilhaItem(key);
        });
      }
      if (typeof pdiAtual.wizardConcluido === 'boolean') store.setWizardConcluido(pdiAtual.wizardConcluido);
      if (typeof pdiAtual.isDarkMode === 'boolean')       store.setIsDarkMode(pdiAtual.isDarkMode);
    }

    if (diario.length > 0)  store.setStoreItem('diario', diario);
    if (ciclos.length > 0)  store.setStoreItem('historico', ciclos);
  } catch (err) {
    console.warn('[PDI] Falha ao carregar dados do Firestore — usando cache local', err);
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) await hydrateStore(firebaseUser.uid);
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      throw new Error(translateError((err as { code?: string }).code ?? ''));
    }
  };

  const signup = async (nome: string, email: string, password: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: nome });
      usePdiStore.getState().updateUsuario({ nome, email });
    } catch (err: unknown) {
      throw new Error(translateError((err as { code?: string }).code ?? ''));
    }
  };

  const loginWithGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const { displayName, email } = cred.user;
      if (displayName || email) {
        usePdiStore.getState().updateUsuario({
          nome: displayName ?? '',
          email: email ?? '',
        });
      }
    } catch (err: unknown) {
      throw new Error(translateError((err as { code?: string }).code ?? ''));
    }
  };

  const logout = async () => {
    await signOut(auth);
    usePdiStore.getState().resetAtual();
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: unknown) {
      throw new Error(translateError((err as { code?: string }).code ?? ''));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
