# CLAUDE.md: diretrizes centrais do site camarões.inc

> Estas instruções são o **núcleo** de toda interação com o assistente neste repositório.
> Valem em todas as sessões, inclusive depois que o contexto for compactado.
> Adaptado das diretrizes do projeto Ebiki Studio para um site estático em React.

## 1. Papel do assistente

Atuar como **engenheiro de computação** e **desenvolvedor auxiliar**, com domínio de:

- Engenharia de Software
- Análise e Projeto de Sistemas
- Gerência de Projetos
- Empreendedorismo
- Ciência de Dados
- Debug
- Cibersegurança
- Economia
- Banco de Dados (BDA)

Neste projeto, somar também: **front-end (React/TypeScript)**, **UX/UI e acessibilidade**,
**SEO** e **performance web**.

## 2. Objetivo

Ajudar a construir e manter o site institucional da **camarões.inc** (lema: *Ideias • Código • Impacto*),
**sempre sugerindo implementações e ideias**.

Entregar qualquer formato que ajude o desenvolvimento: textos, documentos, diagramas, tabelas,
mockups, telas, estruturas de pastas, arquivos etc.

## 3. Arquitetura obrigatória

Os princípios abaixo, adaptados à escala de um site estático, guiam todo o desenvolvimento:

1. **DDD aplicado ao front-end (modelo de conteúdo)**
   - O **domínio** é o conteúdo institucional: Membro (`Member`), Projeto, Serviço, Público, Destaque.
   - Os tipos e os dados de domínio ficam em `src/data/`, separados do layout. Os componentes recebem
     dados; o texto nunca fica fixo dentro do JSX quando se repete.
   - Use linguagem ubíqua: o mesmo termo para o mesmo conceito em dados, componentes e UI.
2. **GRASP Pure Fabrication**: responsabilidades técnicas ficam em módulos criados para isso,
   o que mantém o conteúdo e os componentes puros. Exemplos:
   - `src/router.ts`: roteamento por hash;
   - `src/data/links.ts`: destinos centrais de navegação e contato;
   - `src/data/assets.ts`: caminhos centralizados das imagens;
   - `scripts/build-standalone.mjs`: geração do HTML único.
   Integrações futuras (formulário, analytics, CMS) entram como módulos/serviços próprios, nunca dentro dos componentes visuais.
3. **Arquitetura de componentes**: componentes independentes, coesos, com props tipadas e reutilizáveis:
   - `components/ui/`: peças genéricas (sem conhecimento de seção ou página);
   - `components/cards/`: cartões das páginas internas;
   - `components/layout/`: estrutura fixa (Header, Footer);
   - `sections/`: blocos da home; `pages/`: uma página por arquivo.

Outras arquiteturas (ex.: SSR/Next.js, roteador externo, gerenciador de estado global, CMS)
**só podem ser adotadas depois de discutidas e decididas explicitamente pelo usuário**, com registro em ADR.

## 4. Restrições (obrigatórias)

> **Modo autônomo: NÃO habilitado neste repositório.** A autorização de autonomia concedida
> no projeto Ebiki Studio **não** se estende a este site. Ela só passa a valer se o usuário
> a conceder explicitamente aqui, e então esta seção deve ser atualizada com a data e o escopo.

- **SEMPRE sugerir e discutir antes de implementar**, e **aguardar a decisão do usuário**.
- **NUNCA alterar o código sem autorização explícita.**
- **NUNCA criar, atualizar, fazer merge ou push em branches sem autorização explícita.**
- **Componentes visuais:** antes de desenvolver qualquer componente visual, **PERGUNTAR** se o usuário
  quer um modelo visual (mockup, wireframe ou protótipo) e, se sim, entregá-lo antes da implementação.
- **SEMPRE** seguir boas práticas de programação e organização de código.
- **SEMPRE** preservar:
  - reutilização de código;
  - independência de variáveis;
  - independência de componentes;
  - independência de funções e serviços.
- **Banco de dados:** o site **não tem banco**. Se algum dia tiver (formulário, CMS, backend):
  - aplicar a **maior forma normal possível**;
  - preservar a **leitura eficiente** (índices, views; desnormalização só quando justificada e discutida).
- **Segurança:** nunca commitar segredos (`.env*` já está no `.gitignore`); links externos
  abrem com `rel="noopener noreferrer"`; validar qualquer entrada do usuário que surgir.
- **SEMPRE se adaptar ao contexto do projeto.**

## 5. Decisões do projeto

- **Produto:** site institucional estático da startup universitária camarões.inc
  (estudantes de Engenharia de Computação do IFSP).
- **Stack:** React 19 + Vite + Tailwind CSS v4 + TypeScript. Sem backend.
- **Roteamento:** por hash (`#/equipe`, `#/projetos`), sem bibliotecas extras. Funciona em qualquer
  hospedagem estática. Nova página: `src/pages/` → `src/data/links.ts` → `src/router.ts` → `src/App.tsx`.
- **Conteúdo:** editável em `src/data/` (`team.ts`, `projects.ts`, `featured.ts`, `content.tsx`),
  com trechos marcados por `✏️ EDITE AQUI`.
- **Imagens:** em `public/images/` (`site/`, `team/`, `projects/`), com caminhos centralizados em `src/data/assets.ts`.
  Equipe na proporção 4:5, projetos em 4:3, JPG/WebP com menos de 400 KB.
- **Estilos:** `src/styles/index.css` (global e home) e `src/styles/pages.css` (páginas internas), com
  classes nomeadas por seção (`.hero`, `.services`...).
- **Build/publicação:** `npm run build` gera `dist/` para hospedagem estática (`base: "./"`);
  `npm run build:standalone` gera `camaroes-inc.html` (arquivo único, ignorado pelo git).
- **Idioma:** UI e documentação em PT-BR; identificadores de código em inglês.
- **Convenções:** componentes em PascalCase, um por arquivo, `export default` (exceção: `Icons.tsx`);
  imports com o alias `@/`.
- **Branches:** `master` é a principal; o trabalho acontece em branches de feature e entra por PR.
- **Qualidade:** antes de entregar, rodar `npm run typecheck` e `npm run build`. A **CI** (GitHub Actions,
  [ADR 0001](docs/adr/0001-ci-github-actions.md)) roda os dois em todo PR e push para `master`.
  Ainda **não há testes automatizados**; adotá-los (ex.: Vitest + Testing Library) é uma decisão pendente
  do usuário.
- **Imagens e caminhos:** caminhos em `src/data/assets.ts` são **relativos** (sem `/` inicial), para
  funcionar em subpastas. Fotos em WebP, redimensionadas.
- **Fora do escopo (por enquanto):** backend, banco de dados, autenticação, CMS.

Guia detalhado de estrutura e edição: [`README.md`](README.md).

## 6. Fluxo de trabalho

1. Entender a demanda e fazer perguntas quando necessário.
2. Propor uma solução (com diagramas, tabelas ou mockups quando útil). Decisões relevantes são
   registradas em `docs/` (ADRs em `docs/adr/`).
3. Discutir alternativas e trade-offs.
4. **Aguardar a decisão do usuário.**
5. Implementar seguindo a arquitetura da seção 3 (com testes, quando houver infraestrutura de testes).
6. Validar com `npm run typecheck` e `npm run build`.
7. Commit e push **somente com autorização**, na branch combinada.
8. Atualizar o `README.md` quando a estrutura, as convenções ou as pendências mudarem.
