import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, Mail, Lock, User, Eye, EyeOff, Gift, Shield } from 'lucide-react';

// SVG inline do Google (lucide-react não inclui ícone do Google)
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
  </svg>
);

type Mode = 'login' | 'signup' | 'reset';

export const Login: React.FC = () => {
  const { login, signup, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>('login');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const reset = () => { setError(''); setSuccess(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    reset();
    try {
      if (mode === 'login') {
        await login(email, password);
        navigate('/', { replace: true });
      } else if (mode === 'signup') {
        if (!nome.trim()) { setError('Digite seu nome.'); setLoading(false); return; }
        if (!lgpdConsent) { setError('Você precisa aceitar a Política de Privacidade para criar uma conta.'); setLoading(false); return; }
        await signup(nome.trim(), email, password);
        navigate('/', { replace: true });
      } else {
        await resetPassword(email);
        setSuccess('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
      }
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    reset();
    try {
      await loginWithGoogle();
      navigate('/', { replace: true });
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const titles: Record<Mode, string> = {
    login:  'Entrar na sua conta',
    signup: 'Criar conta gratuita',
    reset:  'Recuperar senha',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 px-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo + badges */}
        <div className="text-center mb-8">
          <span className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent tracking-tight">
            Meu PDI
          </span>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Seu plano de desenvolvimento inteligente
          </p>
          {/* Badges */}
          <div className="mt-3 flex items-center justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
              <Gift className="w-3.5 h-3.5" /> 100% Gratuito, sempre
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
              <Shield className="w-3.5 h-3.5" /> Dados protegidos — LGPD
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            {titles[mode]}
          </h2>

          {/* Google OAuth (não exibe em reset) */}
          {mode !== 'reset' && (
            <>
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
              >
                <GoogleIcon />
                Continuar com Google
              </button>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200 dark:border-slate-600" />
                </div>
                <div className="relative flex justify-center text-xs text-slate-400 dark:text-slate-500">
                  <span className="bg-white dark:bg-slate-800 px-2">ou com e-mail</span>
                </div>
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome (só no signup) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder="Seu nome"
                    required
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                </div>
              </div>
            )}

            {/* E-mail */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="voce@email.com"
                  required
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              </div>
            </div>

            {/* Senha (não exibe em reset) */}
            {mode !== 'reset' && (
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={mode === 'signup' ? 'Mínimo 6 caracteres' : '••••••••'}
                    required
                    minLength={mode === 'signup' ? 6 : undefined}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Checkbox LGPD — só no signup */}
            {mode === 'signup' && (
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={lgpdConsent}
                    onChange={e => setLgpdConsent(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${lgpdConsent ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700'}`}>
                    {lgpdConsent && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                        <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M1.5 5l2.5 2.5 4.5-4.5"/>
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Li e concordo com a{' '}
                  <Link
                    to="/privacidade"
                    target="_blank"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Política de Privacidade
                  </Link>
                  . Seus dados são usados apenas para salvar seu PDI —{' '}
                  <strong className="text-slate-600 dark:text-slate-300">nunca para marketing</strong>.
                </span>
              </label>
            )}

            {/* Erro / Sucesso */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-sm text-green-600 dark:text-green-400">
                {success}
              </div>
            )}

            {/* Esqueci senha link (só no login) */}
            {mode === 'login' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => { setMode('reset'); reset(); }}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Esqueci minha senha
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold text-sm hover:from-indigo-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg disabled:opacity-60"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === 'login' && 'Entrar'}
              {mode === 'signup' && 'Criar conta grátis'}
              {mode === 'reset' && 'Enviar e-mail'}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            {mode === 'login' && (
              <>
                Não tem conta?{' '}
                <button
                  onClick={() => { setMode('signup'); reset(); }}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Criar agora — é grátis
                </button>
              </>
            )}
            {mode === 'signup' && (
              <>
                Já tem conta?{' '}
                <button
                  onClick={() => { setMode('login'); reset(); }}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Entrar
                </button>
              </>
            )}
            {mode === 'reset' && (
              <button
                onClick={() => { setMode('login'); reset(); }}
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Voltar para o login
              </button>
            )}
          </div>
        </div>

        {/* Rodapé com privacidade */}
        <div className="mt-5 text-center space-y-1">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Seus dados são salvos com segurança e nunca compartilhados.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            <Link to="/privacidade" className="text-indigo-500 hover:underline">
              Política de Privacidade e LGPD
            </Link>
            {' · '}
            <Link to="/privacidade#como-usar" className="text-indigo-500 hover:underline">
              Como usar
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
