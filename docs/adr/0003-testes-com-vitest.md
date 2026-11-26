# ADR 0003: testes automatizados com Vitest e Testing Library

- **Status:** aceito
- **Data:** 2026-11-26

## Contexto

Com a página de Notícias, o site passou a ter regras de negócio (ordenar, filtrar, escolher
destaque), validação de dados externos (o JSON lido do GitHub) e estado com atualização
automática. Até aqui tudo era verificado à mão, e a CI só checava tipos e build.

## Decisão

Adotar **Vitest** (que usa a mesma configuração e os mesmos aliases do Vite), com
**@testing-library/react** e **@testing-library/jest-dom** para componentes e **jsdom** como
ambiente de navegador.

- Configuração no bloco `test` de `vite.config.ts`; preparação comum em `src/test/setup.ts`
  (matchers do jest-dom, limpeza da tela e do `localStorage` após cada teste).
- Testes ao lado do código, `Arquivo.test.ts(x)`; dados de exemplo em `src/test/fixtures.ts`.
- `npm test` (execução única, usado na CI) e `npm run test:watch` (desenvolvimento).
- A CI roda `npm test` entre o typecheck e o build ([ADR 0001](0001-ci-github-actions.md)).
- Componentes são consultados como uma pessoa usaria (`getByRole`, `getByText`), o que também
  cobre parte da acessibilidade. A página é testada isolada da rede, com o hook substituído.

Primeiros testes (77): domínio de notícias, validação do JSON (incluindo links e imagens
maliciosos), busca HTTP com tempo limite, fonte reserva, cache, hook `useNews` (polling,
visibilidade da aba, cancelamento) e os componentes/página de Notícias. Foram feitas
verificações de mutação (quebrar o código de propósito e ver os testes falharem) na validação
de links e no polling.

## Alternativas consideradas

- **Jest:** exigiria configuração própria de TypeScript/ESM e aliases, duplicando o Vite.
- **Playwright (ponta a ponta):** já disponível para verificações manuais; mais lento e frágil
  para regras puras. Pode entrar depois para fluxos críticos.
- **happy-dom no lugar do jsdom:** mais rápido, porém menos completo; o jsdom é o padrão mais
  compatível com a Testing Library.

## Consequências

- Código novo com regra, validação ou estado deve vir com testes (CLAUDE.md, seção 5).
- Quatro dependências de desenvolvimento a mais; nada muda no bundle publicado.
- Ainda sem testes nas seções antigas da home e nas páginas Equipe/Projetos, que são
  basicamente conteúdo estático; podem ganhar testes quando forem alteradas.
