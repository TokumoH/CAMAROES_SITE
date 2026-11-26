# camarões.inc — Site institucional

Site da startup universitária **camarões.inc** (lema: *Ideias • Código • Impacto*).
Feito com **React 19 + Vite + Tailwind CSS v4 + TypeScript**.

## Como rodar

Requisitos: Node.js 20+ e npm.

```bash
npm install        # instala as dependências
npm run dev        # servidor de desenvolvimento (http://localhost:5173)
npm run typecheck  # checa os tipos com TypeScript
npm test           # roda os testes automatizados (Vitest)
npm run test:watch # testes em modo observação, rodando a cada alteração
npm run build      # gera a versão de produção em dist/
npm run preview    # serve o conteúdo de dist/ localmente
```

A CI (`.github/workflows/ci.yml`) roda `typecheck`, `test` e `build` em todo pull request e push
para `master`. Decisão registrada em [`docs/adr/0001-ci-github-actions.md`](docs/adr/0001-ci-github-actions.md).

Para publicar, envie o conteúdo da pasta `dist/` para qualquer hospedagem estática
(Netlify, Vercel, GitHub Pages, Cloudflare Pages etc.).

## Estrutura de pastas

```
camaroes-inc/
├── public/                  # Arquivos servidos como estão (sem processamento)
│   ├── favicon.svg
│   ├── data/
│   │   └── noticias.json    # Notícias (lidas pelo site direto do GitHub)
│   └── images/
│       ├── site/            # Logo, símbolo e imagens do hero e do destaque da home
│       ├── team/            # Fotos da equipe
│       └── projects/        # Imagens dos projetos
├── src/
│   ├── main.tsx             # Ponto de entrada: monta <App /> no #root
│   ├── App.tsx              # Layout (Header + página atual + Footer)
│   ├── router.ts            # Rotas por hash: #/equipe, #/projetos, #/noticias (sem dependências)
│   ├── pages/               # Uma página por arquivo
│   │   ├── Home.tsx         # Página inicial (monta as seções de sections/)
│   │   ├── Team.tsx         # Página Equipe
│   │   ├── ProjectsPage.tsx # Página Projetos
│   │   └── NewsPage.tsx     # Página Notícias (lista que se atualiza sozinha)
│   ├── components/
│   │   ├── layout/          # Estrutura fixa da página
│   │   │   ├── Header.tsx   # Menu, botão "Vamos conversar" e menu mobile
│   │   │   └── Footer.tsx
│   │   ├── cards/           # Cartões das páginas internas
│   │   │   ├── MemberCard.tsx   # Cartão de um membro da equipe
│   │   │   ├── ProjectRow.tsx   # Linha de um projeto (imagem + texto)
│   │   │   ├── NewsCard.tsx     # Cartão de uma notícia
│   │   │   ├── NewsFeatured.tsx # Notícia em destaque
│   │   │   └── NewsCardSkeleton.tsx # Esqueleto exibido enquanto carrega
│   │   └── ui/              # Peças reutilizáveis
│   │       ├── OfficialLogo.tsx  # Símbolo da marca (usado na seção de contato)
│   │       ├── SectionTag.tsx    # Etiqueta numerada das seções
│   │       ├── PageHero.tsx      # Cabeçalho das páginas internas
│   │       ├── Photo.tsx         # Imagem, ou espaço reservado se estiver vazia
│   │       ├── InteractiveImage.tsx # Imagem com moldura, zoom e link opcional
│   │       ├── FilterChips.tsx   # Botões de filtro (ex.: categorias)
│   │       ├── SearchField.tsx   # Campo de busca
│   │       ├── UpdateStatus.tsx  # Quadro "Atualizado há X min"
│   │       ├── StatusPanel.tsx   # Painel de erro / lista vazia
│   │       ├── linkProps.ts      # Links externos em nova aba com segurança
│   │       └── Icons.tsx         # Ícones SVG (seta, código, órbita, play)
│   ├── sections/            # Seções da página inicial, uma por arquivo
│   │   ├── Hero.tsx         # Topo, com chamada principal
│   │   ├── Ticker.tsx       # Carrossel contínuo de frases
│   │   ├── Manifesto.tsx    # 01 · Quem somos
│   │   ├── Services.tsx     # 02 · O que fazemos
│   │   ├── Projects.tsx     # 03 · Projetos em destaque
│   │   ├── Audiences.tsx    # 04 · Para quem fazemos
│   │   └── Contact.tsx      # Chamada final e e-mail (também nas páginas internas)
│   ├── data/                # Conteúdo editável, separado do layout
│   │   ├── content.tsx      # Home: serviços, públicos e foto padrão do destaque
│   │   ├── assets.ts        # Caminhos centralizados das imagens do site
│   │   ├── links.ts         # Destinos centrais da navegação e contato
│   │   ├── featured.ts      # Home: textos da seção "Projetos em destaque"
│   │   ├── team.ts          # Equipe: texto de abertura e os 5 membros
│   │   ├── projects.ts      # Projetos: texto de abertura e a lista de projetos
│   │   └── news.ts          # Notícias: tipo, categorias, regras (ordenar, filtrar) e texto de abertura
│   ├── services/news/       # Busca das notícias (fonte, validação do JSON, cache)
│   │   └── instagram/       # Post do Instagram → notícia, cliente da API e mescla
│   ├── hooks/               # useNews (atualização automática) e useNow
│   ├── test/                # Preparação dos testes (setup.ts) e dados de exemplo (fixtures.ts)
│   ├── styles/
│   │   ├── index.css        # Tailwind + CSS global e da página inicial
│   │   └── pages.css        # CSS das páginas Equipe, Projetos e Notícias
│   └── vite-env.d.ts
├── scripts/
│   ├── build-standalone.mjs # Gera o HTML único (npm run build:standalone)
│   └── sync-instagram-news.ts # Tarefa que transforma posts do Instagram em notícias
├── docs/                    # ADRs (decisões) e guias
├── index.html               # Shell HTML: título, descrição, fontes, favicon
├── vite.config.ts           # Vite + React + Tailwind + alias "@" para src/
├── tsconfig.json
└── package.json
```

## Preenchendo a Equipe e os Projetos

1. Abra `src/data/team.ts` (equipe) ou `src/data/projects.ts` (projetos). Os trechos
   marcados com `✏️ EDITE AQUI` são os que você preenche.
2. Troque os textos de exemplo: nome, cargo, descrição, título, categoria, tags.
3. As imagens provisórias já estão em `public/images/team/` e
   `public/images/projects/`. Para substituí-las mantendo os mesmos nomes, troque os
   arquivos nesses diretórios. Para usar outros nomes ou extensões, atualize os caminhos
   em `src/data/assets.ts`.
4. Links são opcionais: o botão de projeto e os links de membros só aparecem se tiverem
   endereço (`link` / `href`).
5. Para adicionar ou remover um membro ou projeto, basta adicionar ou apagar um item do
   array. O layout se ajusta sozinho (a última linha da equipe fica centralizada).

### Imagens e links dos projetos

- Coloque os arquivos em `public/images/projects/` e registre seus caminhos em
   `siteImages` no arquivo `src/data/assets.ts`.
- Para os cards colaborativos da home, configure `image`, `imageAlt`, `imageLink` e
   `imageFit` em `featuredPurple` ou `featuredCoral`, em `src/data/featured.ts`.
- Para projetos da página completa, configure `image`, `imageLink` e `imageFit` em cada
   item de `src/data/projects.ts`. O `ProjectRow` repassa esses campos ao componente comum.
- `imageLink` é opcional. URLs `http`/`https` abrem em nova aba; links internos ficam na
   mesma aba. Sem `imageLink`, a imagem não é clicável.
- `imageFit` aceita `cover` (padrão, preenche e pode recortar) ou `contain` (mostra a
   imagem inteira, ideal para logos).
- `InteractiveImage` centraliza o recorte, o efeito de hover, o enquadramento e o link
   opcional. Use-o quando quiser uma imagem clicável com o mesmo tratamento visual.

Dica de imagem: use fotos da equipe na proporção 4:5 (vertical, até 640 px de largura) e
imagens de projeto na proporção 4:3 (até 1600 px), de preferência em WebP e com menos de 400 KB.
Para converter, por exemplo: `cwebp -q 80 -resize 1600 0 foto.jpg -o foto.webp`.

## Publicando notícias

### Pelo Instagram (automático)

**Basta postar no Instagram `@camaroes.inc`.** A cada hora, uma tarefa do GitHub Actions
(`.github/workflows/sync-instagram.yml`) busca os posts novos e os transforma em notícias:

- a primeira linha da legenda vira o **título** e o resto vira o **resumo**
  (legenda de uma linha só: a primeira frase vira o título);
- a foto vira a imagem (em vídeos, a capa; em carrosséis, a primeira mídia);
- o link do post vira o "Ler mais"; a data é a do post, no horário de Brasília.

Hashtags na legenda controlam a página (maiúsculas e acentos não importam):

| Hashtag | Efeito |
|---|---|
| `#projetos` / `#projeto` | categoria **Projetos** |
| `#eventos` / `#evento` | categoria **Eventos** |
| `#ifsp` | categoria **IFSP** |
| `#equipe` (ou nenhuma das acima) | categoria **Equipe** |
| `#destaque` | coloca o post no destaque do topo |
| `#nosite` | deixa o post **fora** do site |

O post aparece no site em até ~1 hora (mais alguns minutos de cache do GitHub). Editar a legenda,
apagar o post ou adicionar `#nosite` depois também é refletido na próxima execução. Posts sem
texto na legenda são ignorados. Para mudar as hashtags, edite `instagramCategoryTags` em
`src/data/news.ts`.

A configuração é feita **uma única vez**: [`docs/guias/instagram.md`](docs/guias/instagram.md).
Enquanto ela não for feita, a tarefa não faz nada e o site mostra só as notícias manuais.

### Notícias manuais (opcional)

Para algo que não foi para o Instagram, edite [`public/data/noticias.json`](public/data/noticias.json)
na `master` (pode ser pelo lápis do GitHub). A tarefa junta essas notícias às do Instagram em
poucos minutos, sem novo deploy. Cada notícia é um objeto dentro de `"news"`:

```json
{
  "id": "2026-12-nome-curto",
  "title": "Título da notícia",
  "summary": "Resumo de uma ou duas frases.",
  "category": "Projetos",
  "publishedAt": "2026-12-01",
  "image": "images/projects/semeia.webp",
  "imageAlt": "Descrição da imagem",
  "link": "https://exemplo.com",
  "featured": true
}
```

- **Obrigatórios:** `id` (único; não comece com `ig-`, reservado ao Instagram), `title`, `summary`,
  `category` (`Projetos`, `Eventos`, `Equipe` ou `IFSP`) e `publishedAt` (`AAAA-MM-DD`).
- **Opcionais:** `image` (caminho em `public/` ou URL `https`) e `imageAlt`; `link` (`https://...`
  ou rota interna como `#/projetos`); `featured: true` para o destaque (sem nenhum destaque
  marcado, vale a notícia mais recente).
- Itens inválidos são ignorados, e links ou imagens com endereços não permitidos são descartados.
  Antes do commit, confira se o JSON é válido (vírgulas e aspas).

### Como o site lê as notícias

Ordem de leitura (em `src/services/news/index.ts`; endereços em `src/services/news/config.ts`):
1. `noticias.json` da branch **`noticias`**, gerada pela tarefa (Instagram + manuais, com as fotos).
   **Não edite essa branch à mão**: ela é reescrita a cada execução;
2. `public/data/noticias.json` da `master` (enquanto a branch gerada não existir);
3. a cópia publicada junto com o site, se o GitHub não responder.

Decisões: [ADR 0002](docs/adr/0002-noticias-json-no-github.md) e
[ADR 0004](docs/adr/0004-noticias-automaticas-do-instagram.md).

## Testes

Os testes usam **Vitest** com **Testing Library** e **jsdom**
([ADR 0003](docs/adr/0003-testes-com-vitest.md)). Cada teste fica ao lado do arquivo que testa,
com o sufixo `.test.ts` ou `.test.tsx` (ex.: `src/data/news.ts` → `src/data/news.test.ts`).

| Testado hoje | Arquivo de teste |
|---|---|
| Regras de notícia (ordenar, filtrar, destaque, datas) | `src/data/news.test.ts` |
| Validação do JSON de notícias (campos, links e imagens seguros) | `src/services/news/newsMapper.test.ts` |
| Busca HTTP, tempo limite e fonte reserva | `src/services/news/JsonNewsRepository.test.ts`, `FallbackNewsRepository.test.ts` |
| Cache no navegador | `src/services/news/newsCache.test.ts` |
| Atualização automática (`useNews`) | `src/hooks/useNews.test.tsx` |
| Componentes e página de Notícias | `NewsCard.test.tsx`, `FilterChips.test.tsx`, `NewsPage.test.tsx` |

Para um teste novo, use `makeNews()` de `src/test/fixtures.ts` para criar notícias de exemplo
e prefira consultar a tela como uma pessoa usaria (`getByRole`, `getByText`).

## Navegação entre páginas

O site usa rotas por hash, sem servidor e sem bibliotecas extras. Funciona em qualquer
hospedagem estática, sem configuração adicional.

| Página | Endereço |
|---|---|
| Início | `/` (âncoras: `#sobre`, `#fazemos`, `#projetos`, `#contato`) |
| Equipe | `/#/equipe` |
| Projetos | `/#/projetos` |
| Notícias | `/#/noticias` |

Os destinos fixos de navegação e contato ficam em `src/data/links.ts`. Para criar uma nova
página: (1) crie o arquivo em `src/pages/`, (2) adicione o destino em `src/data/links.ts`
e a rota/título em `src/router.ts`, (3) registre a página em `src/App.tsx` e (4) conecte o
link no componente apropriado.

## Guia de organização

**Regra geral:** cada arquivo tem uma responsabilidade.

| Quero... | Edite |
|---|---|
| Mudar textos de uma seção | `src/sections/<Seção>.tsx` |
| Mudar as frases do carrossel | `phrases` no topo de `src/sections/Ticker.tsx` |
| Mudar a velocidade do carrossel | duração (`90s`) da `animation` em `.ticker__track` no `src/styles/index.css` (menor = mais rápido) |
| Preencher os cartões de "Projetos em destaque" da home | `src/data/featured.ts` |
| Preencher a equipe (nomes e cargos) | `src/data/team.ts` |
| Preencher os projetos (títulos e textos) | `src/data/projects.ts` |
| Trocar as imagens da equipe e dos projetos | Arquivos em `public/images/team/` e `public/images/projects/`; caminhos em `src/data/assets.ts` |
| Mudar o texto de abertura das páginas Equipe/Projetos | `teamIntro` / `projectsIntro` nos arquivos de `src/data/` |
| Mudar o visual das páginas Equipe/Projetos | `src/styles/pages.css` |
| Mudar a lista de serviços ou de públicos | `src/data/content.tsx` |
| Alterar os caminhos das imagens do site | `siteImages` em `src/data/assets.ts` |
| Trocar a foto do projeto em destaque | `public/images/site/semeia.webp` (caminho em `featuredProject`, em `src/data/assets.ts`) |
| Adicionar ou reordenar seções da home | criar em `src/sections/` e ajustar `src/pages/Home.tsx` |
| Alterar destinos fixos de navegação | `siteLinks` em `src/data/links.ts` |
| Mudar e-mail ou redes sociais | `siteLinks` em `src/data/links.ts` |
| Mudar links de um projeto ou integrante | `src/data/projects.ts` ou `src/data/team.ts` |
| Mudar cores, tamanhos e animações | `src/styles/index.css` |
| Mudar título, descrição ou fontes | `index.html` |
| Publicar notícias | Postar no Instagram (veja "Publicando notícias"); manuais em `public/data/noticias.json` |
| Mudar as hashtags que definem a categoria | `instagramCategoryTags` em `src/data/news.ts` |
| Mudar o texto de abertura da página Notícias | `newsIntro` em `src/data/news.ts` |
| Trocar o logo do header | `public/images/site/header-logo.svg` |
| Trocar a imagem à direita da home | `public/images/site/home-hero.webp` |

**Convenções**
- Componentes em PascalCase, um por arquivo, com `export default` (exceto `Icons.tsx`, que exporta vários ícones nomeados).
- Imports usam o alias `@/` (ex.: `import Hero from "@/sections/Hero"`).
- Conteúdo que se repete (listas) fica em `src/data/`, não dentro do JSX.
- Componentes genéricos vão em `components/ui/`; blocos da página, em `sections/`.
- As classes de estilo são nomeadas por seção (`.hero`, `.services`, `.contact`...) em `index.css` (global e home) e `pages.css` (páginas internas).

## Pendências conhecidas

- O cartão grande de "Projetos em destaque" não tem link (`link` vazio em `featuredMain`, em `src/data/featured.ts`); a seta só aparece quando ele for preenchido.
- Os projetos da página Projetos ainda não têm link (`link` vazio em `src/data/projects.ts`).
- Os LinkedIn de Bruno e Katherina estão vazios em `src/data/team.ts` (o link fica oculto até ser preenchido).
- Fazer a configuração única do Instagram ([`docs/guias/instagram.md`](docs/guias/instagram.md)).
- As notícias iniciais de `public/data/noticias.json` foram escritas a partir do conteúdo do site; revise os textos e datas.
- O site ainda não tem domínio definido. Quando tiver, adicione em `index.html` a URL canônica e `og:url`/`og:image` (URLs absolutas) e crie `public/sitemap.xml`, citando-o em `public/robots.txt`.
