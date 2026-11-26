# Guia: ligar o Instagram à página de Notícias

Configuração feita **uma única vez**. Depois dela, basta postar no Instagram `@camaroes.inc` e o post
aparece na página de Notícias em até cerca de 1 hora. Decisão técnica: [ADR 0004](../adr/0004-noticias-automaticas-do-instagram.md).

> As telas da Meta e do GitHub mudam com frequência: os nomes dos menus abaixo podem estar um pouco
> diferentes. O que importa é o resultado de cada passo.

## O que você vai precisar

- Acesso de administrador à conta `@camaroes.inc` no Instagram.
- Uma conta pessoal no Facebook/Meta para entrar no painel de desenvolvedores (não precisa de página).
- Acesso de administrador ao repositório `TokumoH/CAMAROES_SITE` no GitHub.

## 1. Transformar a conta em profissional (grátis)

No app do Instagram, entre na conta `@camaroes.inc` → **Configurações** → **Tipo de conta e
ferramentas** → **Mudar para conta profissional** → escolha **Criador de conteúdo** ou **Empresa**.
Nada muda para os seguidores.

## 2. Criar o app e gerar a chave na Meta

1. Acesse **developers.facebook.com** → **Meus apps** → **Criar app**.
2. Escolha o caso de uso de **Instagram** (gerenciar conteúdo / API do Instagram com login do
   Instagram). Dê um nome, por exemplo `camaroes-site`.
3. No app, abra **Instagram** → **Configuração da API com login do Instagram**.
4. Em **Gerar tokens de acesso**, clique em **Adicionar conta** e entre com `@camaroes.inc`.
   A permissão necessária é só a básica de leitura (`instagram_business_basic`).
5. Clique em **Gerar token** e copie a chave. Ela vale **60 dias** (a tarefa renova sozinha, passo 4).

O app pode continuar em **modo de desenvolvimento**: ele só lê a própria conta da camarões.inc.

> **Nunca** cole essa chave no código, no JSON, em issue, PR ou chat. Ela vai só no segredo do passo 3.

## 3. Guardar a chave no GitHub

No repositório: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

- **Name:** `INSTAGRAM_ACCESS_TOKEN`
- **Secret:** a chave copiada no passo 2.

## 4. Ativar a renovação automática da chave (recomendado)

A chave do Instagram expira em 60 dias. Toda segunda-feira a tarefa pede uma chave nova à Meta;
para conseguir **salvá-la** no segredo, ela precisa de uma permissão extra do GitHub:

1. No **seu perfil** do GitHub: **Settings** → **Developer settings** → **Personal access tokens** →
   **Fine-grained tokens** → **Generate new token**.
2. **Repository access:** só `TokumoH/CAMAROES_SITE`.
3. **Permissions → Repository permissions → Secrets:** **Read and write**. Nenhuma outra.
4. Escolha a validade (o GitHub permite até 1 ano) e gere. Anote a data para renovar.
5. No repositório, crie outro segredo: **Name** `SECRETS_ADMIN_TOKEN`, **Secret** o token gerado.

Sem esse passo, tudo funciona, mas a cada ~60 dias a tarefa vai falhar com "Error validating access
token" e será preciso repetir os passos 2 e 3.

## 5. Testar

1. No repositório: **Actions** → **Notícias do Instagram** → **Run workflow** (deixe "Renovar também a
   chave" desmarcado na primeira vez: a Meta só renova chaves com mais de 24 horas).
2. Ao terminar, deve aparecer a branch **`noticias`** com `noticias.json` e a pasta `imagens/`.
3. Em até ~10 minutos, os posts aparecem em `/#/noticias` no site.

## Quando algo der errado

O GitHub manda e-mail quando uma execução agendada falha. Na aba **Actions**, abra a execução com ❌:

| Mensagem | O que fazer |
|---|---|
| `Error validating access token` / `Session has expired` | Gere uma chave nova (passo 2) e atualize o segredo (passo 3). Confira o passo 4. |
| `Segredo INSTAGRAM_ACCESS_TOKEN não configurado` (aviso) | Faça o passo 3. |
| `Não foi possível salvar a foto ...` (aviso) | A notícia entra sem foto; normalmente se resolve na execução seguinte. |
| Falha no passo "Renova a chave" com `gh` | O `SECRETS_ADMIN_TOKEN` expirou ou não tem a permissão de Secrets: refaça o passo 4. |

## Desligar

Em **Actions** → **Notícias do Instagram** → **⋯** → **Disable workflow**. O site continua mostrando a
última versão gerada; para voltar só às notícias manuais, apague também a branch `noticias`.
