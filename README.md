# Meu PDI

Plano de Desenvolvimento Individual gratuito para profissionais brasileiros.
Ferramenta web completa para planejar, acompanhar e evidenciar crescimento de carreira.

**Produção:** [meupdi.app.br](https://meupdi.app.br)  
**Repositório:** [github.com/ivonsmatos/PDI](https://github.com/ivonsmatos/PDI)  
**Deploy:** Cloudflare Pages (auto-deploy a cada push em `main`)

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + TypeScript + Vite 8 |
| Estilo | Tailwind CSS 3 |
| Animações | Framer Motion 12 |
| Estado global | Zustand 5 com `persist` (localStorage) |
| Backend / Auth | Firebase Auth (email + Google OAuth) |
| Banco de dados | Firestore com cache offline (IndexedDB) |
| Gráficos | Recharts 3 |
| PDF | jsPDF 4 + html2canvas |
| Ícones | Lucide React |
| Roteamento | React Router DOM 7 |
| PWA | vite-plugin-pwa (service worker gerado automaticamente) |
| CI/CD | Cloudflare Pages |

---

## Funcionalidades

### Para profissionais
- **Wizard de 6 passos** — coleta causa, autoavaliação, objetivos, plano de ação, campo de forças e revisão final
- **Trilha personalizada** — atividades de desenvolvimento por área e nível de carreira (26 áreas × 6 níveis)
- **Plano de ação** — ações com prazos, recursos e status (pendente / em andamento / concluído)
- **Diário de progresso** — entradas com busca, filtro por período e vínculo a objetivos
- **Comparador de nível** — gap analysis entre o nível atual e o próximo (ex: Pleno → Sênior)
- **Currículo de competências** — PDF profissional com radar, certificações e histórico de ciclos
- **Histórico de ciclos** — cada ciclo fechado fica arquivado com score de saúde e retrospectiva
- **Score de saúde do PDI** — métrica 0–100 com drill-down de penalidades
- **Campo de Forças** — forças impulsionadoras, restritivas e alianças estratégicas

### Gamificação e engajamento
- **Check-in semanal** — modal guiado às sextas-feiras com 3 perguntas que alimentam o diário automaticamente
- **Conquistas** — badges desbloqueáveis (primeira certificação, 10 ações concluídas, ciclo fechado, etc.)
- **Barra de completude** — indica % do PDI preenchido no Dashboard
- **Notificações push** — PWA notifica ações com prazo próximo (3 dias) via service worker

### Compartilhamento
- **Perfil público** — URL `meupdi.app.br/p/[token]` com radar de skills e métricas do profissional
- **Templates por profissão** — seletor no Passo 1 que pré-preenche o PDI com base na área e nível
- **Modo demo** — explorar sem criar conta (dados fictícios, sem Firebase)

### Para RH e headhunters
- Link de perfil público verificável antes da entrevista
- Currículo de competências em PDF para anexar ao processo seletivo
- Histórico de ciclos evidenciando evolução real, não apenas intenção

---

## Estrutura de arquivos

```
src/
├── components/
│   ├── CheckinSemanal.tsx       # Modal check-in semanal (sextas)
│   ├── ErrorBoundary.tsx        # React class component para captura de erros
│   ├── GamificacaoWidget.tsx    # Conquistas, streak e barra de completude
│   ├── HistoricoModal.tsx       # Modal de ciclos anteriores (paginado)
│   ├── OnboardingModal.tsx      # Tour inicial para novos usuários
│   ├── PdfReport.tsx            # Layout do relatório PDF exportável
│   ├── TemplateSelector.tsx     # Seletor de templates por profissão/nível
│   ├── ToastContainer.tsx       # Sistema de notificações toast (Zustand)
│   └── WizardLayout.tsx         # Layout dos 6 passos do wizard
│
├── contexts/
│   └── AuthContext.tsx          # Firebase Auth + hidratação do Firestore
│
├── data/
│   ├── demoData.ts              # Dados fictícios para modo demo
│   ├── matrizCompetencias.ts    # 26 áreas × 6 níveis × hard/soft skills
│   └── trilhaTemplates.ts       # 35+ templates hard skills + 25 soft skill sets
│
├── hooks/
│   ├── useFirebaseSync.ts       # Sincronização automática store ↔ Firestore
│   └── useNotificacoesPrazo.ts  # Lógica de notificação push para prazos
│
├── layouts/
│   └── AppLayout.tsx            # Layout autenticado: sidebar, header, nav mobile
│
├── lib/
│   ├── constants.ts             # STATUS_LABEL, STATUS_COLOR, PRAZO_LABEL
│   ├── firebase.ts              # Inicialização Firebase + Firestore offline
│   ├── firestore.ts             # CRUD: savePdiAtual, loadDiario, saveCiclo…
│   └── healthScore.ts           # computeHealthScore() centralizado
│
├── pages/
│   ├── Comparador.tsx           # Gap analysis nível atual → próximo nível
│   ├── Config.tsx               # Configurações do usuário
│   ├── Curriculo.tsx            # Geração do currículo de competências em PDF
│   ├── Dashboard.tsx            # Painel principal com métricas e ações próximas
│   ├── Diario.tsx               # Diário com busca, filtros e entradas
│   ├── Evolucao.tsx             # Gráficos de evolução e histórico
│   ├── LandingPage.tsx          # Landing page pública (meupdi.app.br/)
│   ├── Login.tsx                # Login / cadastro / recuperação de senha
│   ├── Passo1Causa.tsx          # Wizard: causa, área, nível + TemplateSelector
│   ├── Passo2AutoAvaliacao.tsx  # Wizard: hard skills e soft skills
│   ├── Passo3Objetivos.tsx      # Wizard: objetivos com categoria e prazo
│   ├── Passo4PlanoAcao.tsx      # Wizard: ações por objetivo com data
│   ├── Passo5CampoForcas.tsx    # Wizard: campo de forças
│   ├── Passo6RevisaoFinal.tsx   # Wizard: radar, score e revisão
│   ├── PerfilPublico.tsx        # Perfil público decodificado da URL
│   ├── PlanoBoard.tsx           # Kanban do plano de ação
│   ├── Privacidade.tsx          # Política de privacidade + guia de uso
│   └── Trilha.tsx               # Trilha de desenvolvimento personalizada
│
├── store/
│   ├── usePdiStore.ts           # Store principal (Zustand + persist)
│   └── useToastStore.ts         # Store de notificações toast
│
├── App.tsx                      # Wizard multi-step (renderiza Passo1–6)
├── main.tsx                     # Entry point: AuthProvider + RouterProvider
└── router.tsx                   # Rotas: / (LP), /login, /app/*, /wizard, /p/:encoded
```

---

## Roteamento

```
/                    → LandingPage (pública)
/login               → Login / cadastro / recuperação de senha
/privacidade         → Política de privacidade e guia de uso
/wizard              → App.tsx — wizard de 6 passos
/p/:encoded          → PerfilPublico — perfil compartilhável (read-only)
/app                 → AppLayout (requer auth) → Dashboard
/app/trilha          → Trilha de desenvolvimento
/app/plano           → PlanoBoard (kanban)
/app/evolucao        → Evolução e histórico
/app/diario          → Diário de progresso
/app/comparador      → Comparador de nível
/app/curriculo       → Geração do currículo PDF
/app/config          → Configurações
/dashboard           → redireciona para /app (compatibilidade)
*                    → redireciona para /
```

**Fluxo de autenticação:**
1. Usuário não autenticado acessa qualquer rota `/app/*` → redirecionado para `/login`
2. Após login → redirecionado para `/app`
3. Usuário autenticado sem wizard concluído → redirecionado para `/wizard`
4. Após concluir wizard → redirecionado para `/app`

---

## Firebase

**Projeto Firebase:** `meupdi`  
**Auth habilitado:** Email/senha + Google OAuth  
**Domínio autorizado:** `meupdi.app.br`

### Firestore — estrutura de coleções

```
users/{uid}/
  pdiAtual/          → documento com o PDI em edição
  diario/            → coleção de DiarioEntry
  ciclos/            → coleção de PdiCiclo (histórico)
```

### Regras de segurança

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

### Cache offline

O Firestore usa `persistentLocalCache` + `persistentMultipleTabManager` — o app funciona sem internet e sincroniza automaticamente ao reconectar. Dados são armazenados em IndexedDB.

---

## Estado global (Zustand)

### `usePdiStore`

Persiste em `localStorage` via `persist` middleware (chave `pdi-storage`).

| Campo | Tipo | Descrição |
|---|---|---|
| `stepAtual` | `number` | Passo atual do wizard (1–6) |
| `usuario` | `object` | Nome, email, causa, área, nível |
| `inventario` | `object` | Hard skills e soft skills |
| `objetivos` | `Objetivo[]` | Lista de objetivos |
| `planoDeAcao` | `PlanoAcaoItem[]` | Ações vinculadas a objetivos |
| `campoDeForcas` | `object` | Forças impulsionadoras, restritivas, alianças |
| `diario` | `DiarioEntry[]` | Entradas do diário (mantidas entre ciclos) |
| `historico` | `PdiCiclo[]` | Ciclos fechados com score e retrospectiva |
| `planoAcaoStatus` | `Record<id, PlanoStatus>` | Status de cada ação |
| `trilhaProgresso` | `Record<key, boolean>` | Itens da trilha concluídos |
| `isDarkMode` | `boolean` | Modo escuro (inicializado pelo sistema) |
| `wizardConcluido` | `boolean` | Se o wizard foi finalizado ao menos uma vez |
| `conquistasVistas` | `string[]` | IDs de conquistas já exibidas ao usuário |

### `useToastStore`

Gerencia notificações toast com auto-dismiss em 5 segundos.

---

## Sincronização Firestore

`useFirebaseSync` (hook) monitora mudanças no store via `subscribe` do Zustand e persiste automaticamente no Firestore com debounce de 1s e 2 retentativas com backoff exponencial.

`AuthContext` hidrata o store ao fazer login:
- Carrega `pdiAtual` (campos do PDI)
- Carrega `diario` (entradas)
- Carrega `ciclos` (histórico)
- Timeout de 12s com toast de aviso em caso de falha
- `logout` usa `try/finally { resetAtual() }` — sempre limpa o estado local

---

## Performance

| Métrica | Antes | Depois |
|---|---|---|
| Bundle inicial | ~1.472 KB | ~628 KB |
| Redução | — | **57%** |

Estratégia: `React.lazy()` + `Suspense` em todas as rotas. jsPDF, html2canvas, Recharts e matrizDeCompetencias carregam sob demanda.

---

## Landing Page

`/` → `src/pages/LandingPage.tsx`

11 seções:

| Seção | Conteúdo |
|---|---|
| Navbar | Fixo, transparente → branco no scroll |
| Hero | Título + CTA duplo + foto real (Unsplash) + 3 cards flutuantes animados |
| Trust strip | 6 badges: gratuito, LGPD, 26 áreas, 6 níveis, PWA, sem cartão |
| Problema | 3 estatísticas sobre profissionais sem PDI |
| Features | 6 cards para profissionais + lista de 8 extras |
| Como funciona | 3 passos com linha conectora |
| Callout Comparador | Destaque para gap analysis |
| Para RH | Split layout foto + 4 benefícios + dica para headhunters |
| Depoimentos | 3 cards com fotos reais (dev, analista RH, gerente) |
| Comparação | Antes/depois lado a lado |
| CTA final | Gradiente com 3 mini-stats |

Imagens: Unsplash (sem chave de API necessária, URLs diretas com parâmetros de resize).

---

## Desenvolvimento local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

> **Atenção:** O repositório git está em `C:\Temp\pdi-fresh` por conta de uma limitação do OneDrive com arquivos mmap do git. Os arquivos fonte ficam em `C:\Users\ivonm\OneDrive\...\Github\PDI`. Sempre edite os arquivos no OneDrive e copie para `C:\Temp\pdi-fresh` antes de commitar.

---

## Deploy

O deploy é automático via **Cloudflare Pages**:

1. Push para `main` no GitHub
2. Cloudflare detecta o push e executa `npm run build`
3. Artefatos em `dist/` são publicados em `meupdi.app.br`

Não é necessário `wrangler` nem token da Cloudflare configurado localmente — o deploy é inteiramente gerenciado pelo painel da Cloudflare conectado ao repositório GitHub.

**Configurações do Cloudflare Pages:**
- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite
- SPA redirect: `/* → /index.html` (necessário para React Router)

---

## Histórico de commits

| Commit | Descrição |
|---|---|
| `252b775` | Landing page inovadora + roteamento `/app` |
| `b3bd989` | 8 melhorias: comparador, gamificação, perfil público, demo, templates, check-in, notificações, currículo PDF |
| `1f49887` | Code splitting (bundle −57%), Firestore offline, dark mode automático, busca no diário |
| `30c12e6` | Remove responsável de dados da página de privacidade |
| `222ed47` | QA — 13 correções críticas (score duplicado, validações, acessibilidade) |
| `5abe37e` | LGPD, política de privacidade e guia de uso |
| `e0a3cd5` | Correção de 4 erros TypeScript no build CI |
| `096f066` | Firebase Auth + Firestore cloud sync |
| `3d0e1d0` | Expansão da biblioteca de skills e inteligência de carreira na Trilha |
| `cef3bdb` | Diário, Config, validador SMART, retrospectiva e melhorias gerais |
| `390ad62` | Redesign do export PDF |

---

## Matriz de competências

`src/data/matrizCompetencias.ts`

- **26 áreas profissionais:** tecnologia, DevOps, segurança, QA, dados, produto, RH, marketing, vendas, gestão, finanças, design, e outras
- **6 níveis:** Estagiário, Júnior, Pleno, Sênior, Especialista, Gestor
- Para cada combinação área × nível: lista de hard skills e soft skills esperadas
- Usada pelo Comparador de Nível, pela Trilha e pelo TemplateSelector

---

## LGPD e privacidade

- Consentimento explícito no cadastro (checkbox obrigatório)
- Dados usados exclusivamente para salvar o PDI do usuário
- Nenhum dado vendido, compartilhado ou usado para marketing
- Regras Firestore garantem isolamento total por `uid`
- Direitos LGPD documentados em `/privacidade`: acesso, correção, exclusão, portabilidade, revogação
- Exclusão de conta via e-mail: `contato@meupdi.app.br`

---

## Pendências / próximas melhorias

- [ ] **Mentor IA** — Cloudflare Worker com Claude API para sugestões personalizadas de próximos passos (requer backend para proteger API key)
- [ ] Testes automatizados (Vitest + Testing Library)
- [ ] i18n (internacionalização para inglês/espanhol)
- [ ] Analytics de uso (sem dados pessoais — ex: Plausible)
