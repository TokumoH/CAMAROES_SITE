# ADR 0004: notícias geradas automaticamente a partir do Instagram

- **Status:** aceito
- **Data:** 2026-11-26

## Contexto

Com o ADR 0002, publicar uma notícia exige editar um JSON no repositório. A equipe quer que as
notícias se atualizem sozinhas, sem cadastro manual em outro lugar. Alternativas de cadastro mais
simples (planilha do Google, formulário, CMS) ainda pedem um passo extra a cada notícia. A equipe já
publica suas novidades no Instagram `@camaroes.inc`. O site é estático e sem servidor próprio.

## Decisão

Uma **tarefa agendada no GitHub Actions** (`.github/workflows/sync-instagram.yml`), a cada hora:

1. busca os 50 posts mais recentes na API do Instagram (login do Instagram, conta profissional),
   com a chave guardada no segredo `INSTAGRAM_ACCESS_TOKEN`;
2. converte cada post em notícia (`src/services/news/instagram/instagramToNews.ts`): primeira linha
   da legenda = título, resto = resumo, link do post, data no horário de Brasília; hashtags definem
   categoria (`#projetos`, `#eventos`, `#ifsp`, `#equipe`), destaque (`#destaque`) e exclusão
   (`#nosite`); posts sem texto são ignorados;
3. baixa as fotos uma única vez (vídeo: capa; carrossel: primeira mídia) e salva em WebP, porque os
   links de mídia do Instagram expiram;
4. junta com as notícias manuais de `public/data/noticias.json` da `master` (`mergeNews.ts`): manuais
   têm prioridade; posts antigos fora da janela de 50 são preservados; posts apagados ou com
   `#nosite` saem;
5. grava `noticias.json` + `imagens/` na branch **`noticias`** e faz commit só se algo mudou
   (o JSON não tem data de geração, para não gerar commits vazios).

O site passa a ler, nesta ordem: branch `noticias` → JSON manual da `master` → cópia do build
(`src/services/news/index.ts`, endereços em `config.ts`). A validação do ADR 0002 (`newsMapper`)
continua valendo para tudo o que chega ao navegador.

Também: renovação semanal da chave (válida por 60 dias) com `refresh_access_token`, salva no segredo
via `gh secret set` usando um token do GitHub com permissão só de Secrets (`SECRETS_ADMIN_TOKEN`);
execução imediata quando o JSON manual muda na `master`; `vercel.json` desliga deploys da branch
`noticias`; guia de configuração em `docs/guias/instagram.md`.

## Por que uma branch própria

- Commits automáticos a cada hora não poluem o histórico da `master` nem disparam deploys.
- O código e os dados ficam separados: a `master` continua só com código e conteúdo editado por pessoas.

## Alternativas consideradas

- **Ler o Instagram direto do navegador:** exigiria expor a chave no site. Descartado.
- **Servidor próprio ou função serverless:** backend está fora do escopo; o GitHub Actions resolve
  sem infraestrutura nova e com o segredo protegido.
- **Planilha / formulário do Google, CMS headless:** ainda exigem um cadastro por notícia.
- **Widgets de terceiros (embed de feed):** dependem de serviço externo, trazem scripts e rastreadores
  de terceiros e não se integram ao visual, aos filtros e ao cache da página.

## Consequências

- O site fica tão atualizado quanto o Instagram; parar de postar = parar de publicar notícias.
- Dependência da API da Meta: mudanças de versão ou de regras podem exigir manutenção em
  `instagramClient.ts`. Falhas aparecem como execução com erro na aba Actions (com e-mail do GitHub)
  e o site continua com a última versão gerada.
- Configuração única manual (conta profissional, app na Meta, segredos) e renovação anual do
  `SECRETS_ADMIN_TOKEN`.
- Novas dependências de desenvolvimento: `tsx` (executa o script TypeScript com os aliases do projeto)
  e `sharp` (conversão das fotos). Nenhuma entra no bundle do site.
- Testes: conversão post → notícia, cliente da API (paginação, limite, erros sem expor a chave) e
  mescla. O script foi testado de ponta a ponta contra um servidor simulado da API; a API real só
  pode ser verificada depois da configuração da conta.
