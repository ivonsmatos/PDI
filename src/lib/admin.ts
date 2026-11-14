export const ADMIN_EMAIL = 'contato@ivonmatos.com.br';

export function isAdminUser(email?: string | null): boolean {
  return (email ?? '').trim().toLowerCase() === ADMIN_EMAIL;
}
