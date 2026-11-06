# ADR 0001: integração contínua com GitHub Actions

- **Status:** aceito
- **Data:** 2026-11-06

## Contexto

O site não tinha nenhuma verificação automática. Um erro de tipo ou de build só era
percebido depois do merge, ou já na publicação. O CLAUDE.md pede `npm run typecheck`
e `npm run build` antes de cada entrega, mas isso dependia de alguém lembrar de rodar.

## Decisão

Criar o workflow `.github/workflows/ci.yml`, que roda em todo pull request e em todo
push para `master`:

1. `npm ci` (instalação reproduzível a partir do `package-lock.json`);
2. `npm run typecheck`;
3. `npm run build`.

Usa Node 22, só `ubuntu-latest` (um site estático não depende do sistema operacional)
e permissão de leitura apenas (`contents: read`).

## Alternativas consideradas

- **Não ter CI:** custo zero, mas mantém o risco de quebrar `master`.
- **Matriz com Windows e macOS:** não agrega nada a um build estático e multiplica o tempo.
- **Deploy automático (GitHub Pages, Vercel etc.):** fica para outra decisão, junto com a
  escolha da hospedagem e do domínio.

## Consequências

- PRs passam a mostrar se o tipo e o build estão íntegros.
- Recomenda-se ativar, nas configurações do repositório, a regra que exige o check
  `CI / build` verde antes do merge em `master`.
- Quando houver testes automatizados (ex.: Vitest), basta adicionar um passo `npm test`.
