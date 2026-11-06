# camarões.inc — Site institucional

Site da startup universitária **camarões.inc** (lema: *Ideias • Código • Impacto*).
Feito com **React 19 + Vite + Tailwind CSS v4 + TypeScript**.

## Como rodar

Requisitos: Node.js 20+ e npm.

```bash
npm install        # instala as dependências
npm run dev        # servidor de desenvolvimento (http://localhost:5173)
npm run typecheck  # checa os tipos com TypeScript
npm run build      # gera a versão de produção em dist/
npm run preview    # serve o conteúdo de dist/ localmente
```

Para publicar, envie o conteúdo da pasta `dist/` para qualquer hospedagem estática
(Netlify, Vercel, GitHub Pages, Cloudflare Pages etc.).

## Estrutura de pastas

```
camaroes-inc/
├── public/                  # Arquivos servidos como estão (sem processamento)
│   ├── favicon.svg
│   └── images/
│       ├── site/            # Logo, símbolo e imagens do hero e do destaque da home
│       ├── team/            # Fotos da equipe
│       └── projects/        # Imagens dos projetos
├── src/
│   ├── main.tsx             # Ponto de entrada: monta <App /> no #root
│   ├── App.tsx              # Layout (Header + página atual + Footer)
│   ├── router.ts            # Rotas por hash: #/equipe, #/projetos (sem dependências)
│   ├── pages/               # Uma página por arquivo
│   │   ├── Home.tsx         # Página inicial (monta as seções de sections/)
│   │   ├── Team.tsx         # Página Equipe
│   │   └── ProjectsPage.tsx # Página Projetos
│   ├── components/
│   │   ├── layout/          # Estrutura fixa da página
│   │   │   ├── Header.tsx   # Menu, botão "Vamos conversar" e menu mobile
│   │   │   └── Footer.tsx
│   │   ├── cards/           # Cartões das páginas internas
│   │   │   ├── MemberCard.tsx   # Cartão de um membro da equipe
│   │   │   └── ProjectRow.tsx   # Linha de um projeto (imagem + texto)
│   │   └── ui/              # Peças reutilizáveis
│   │       ├── OfficialLogo.tsx  # Símbolo da marca (usado na seção de contato)
│   │       ├── SectionTag.tsx    # Etiqueta numerada das seções
│   │       ├── PageHero.tsx      # Cabeçalho das páginas internas
│   │       ├── Photo.tsx         # Imagem, ou espaço reservado se estiver vazia
│   │       ├── InteractiveImage.tsx # Imagem com moldura, zoom e link opcional
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
│   │   └── projects.ts      # Projetos: texto de abertura e a lista de projetos
│   ├── styles/
│   │   ├── index.css        # Tailwind + CSS global e da página inicial
│   │   └── pages.css        # CSS das páginas Equipe e Projetos
│   └── vite-env.d.ts
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

Dica de imagem: use fotos da equipe na proporção 4:5 (vertical) e imagens de projeto na
proporção 4:3, em JPG ou WebP, de preferência com menos de 400 KB.

## Navegação entre páginas

O site usa rotas por hash, sem servidor e sem bibliotecas extras. Funciona em qualquer
hospedagem estática, sem configuração adicional.

| Página | Endereço |
|---|---|
| Início | `/` (âncoras: `#sobre`, `#fazemos`, `#projetos`, `#contato`) |
| Equipe | `/#/equipe` |
| Projetos | `/#/projetos` |

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
| Trocar a foto do projeto em destaque | `public/images/site/featured-project.jpg` |
| Adicionar ou reordenar seções da home | criar em `src/sections/` e ajustar `src/pages/Home.tsx` |
| Alterar destinos fixos de navegação | `siteLinks` em `src/data/links.ts` |
| Mudar e-mail ou redes sociais | `siteLinks` em `src/data/links.ts` |
| Mudar links de um projeto ou integrante | `src/data/projects.ts` ou `src/data/team.ts` |
| Mudar cores, tamanhos e animações | `src/styles/index.css` |
| Mudar título, descrição ou fontes | `index.html` |
| Trocar o logo do header | `public/images/site/header-logo.jpg` |
| Trocar a imagem à direita da home | `public/images/site/home-hero.jpg` |

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
- O site ainda não tem domínio definido. Quando tiver, adicione em `index.html` a URL canônica e `og:url`/`og:image` (URLs absolutas) e crie `public/sitemap.xml`, citando-o em `public/robots.txt`.
