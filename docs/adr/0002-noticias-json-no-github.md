# ADR 0002: notícias em um JSON lido do GitHub

- **Status:** aceito
- **Data:** 2026-11-26

## Contexto

O site ganhou uma página de Notícias (`#/noticias`) que precisa se atualizar sozinha, sem novo
deploy a cada notícia. O site é estático, sem backend, e backend, banco de dados e CMS estão fora
do escopo atual (CLAUDE.md, seção 5). O repositório passou a ser público.

## Decisão

As notícias ficam em `public/data/noticias.json`. O navegador busca o arquivo em
`raw.githubusercontent.com` (branch `master`) ao abrir a página, a cada 5 minutos e ao voltar
para a aba. Se o GitHub falhar, usa a cópia publicada com o site (`data/noticias.json`); a última
lista recebida fica guardada no navegador (`localStorage`) para exibição imediata e para quando
as duas fontes falharem.

Organização (DDD + GRASP Pure Fabrication + componentes):

- **Domínio** `src/data/news.ts`: tipo `News`, categorias e regras puras (ordenar, filtrar,
  escolher destaque).
- **Fabricação pura** `src/services/news/`: interface `NewsRepository`; `JsonNewsRepository`
  (HTTP com tempo limite); `FallbackNewsRepository` (GitHub → cópia do site); `newsMapper`
  (valida o JSON como entrada não confiável: descarta itens inválidos e aceita só links
  `http(s)`/`#rota` e imagens `https`/caminho relativo); `newsCache`.
- **Aplicação** `src/hooks/useNews.ts`: atualização periódica e estados (carregando, erro,
  pronto, falha com dados antigos).
- **UI**: `NewsPage` e componentes reutilizáveis (`FilterChips`, `SearchField`, `UpdateStatus`,
  `StatusPanel`, `NewsCard`, `NewsFeatured`).

## Alternativas consideradas

- **JSON só dentro do build:** exigiria novo deploy a cada notícia.
- **API do GitHub (`api.github.com`):** limite de 60 requisições por hora por IP sem token.
- **CMS headless:** painel amigável, mas fora do escopo atual. Se adotado, basta outra
  implementação de `NewsRepository`.
- **API de terceiros com chave:** num site estático a chave ficaria exposta no navegador.

## Consequências

- Publicar = editar o JSON e fazer commit na `master` (inclusive pelo editor do GitHub).
- O CDN do GitHub pode levar cerca de 5 minutos para servir a versão nova.
- O site depende do repositório continuar público; se voltar a ser privado, a busca no GitHub
  falha e o site passa a usar só a cópia do último deploy.
- Até este código chegar à `master`, a busca no GitHub responde 404 e a cópia do site é usada.
