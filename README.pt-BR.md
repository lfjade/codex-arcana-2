<div align="center">

> This section is in Portuguese-BR! To read it in english, [click here](./README.md).

# 🌒🌕🌘 Codex Arcana 🌒🌕🌘
  
#### Codex Arcana é uma aplicação desktop desenvolvida para simular um grimório mágico, permitindo ao usuário registrar, navegar e pesquisar feitiços e diários rituais pessoais.

> ⚠️ Codex Arcana ainda está em desenvolvimento.

</div>

<div align="left">

## 🤔 O que é?

- **Aplicação desktop** desenvolvida com **Electron**
- Um **grimório digital pessoal** para registros mágicos
- Permite criar e organizar **diários**, **feitiços** e metadados relacionados
- Oferece suporte a **tags** e **componentes** para classificação e pesquisa
- Utiliza um **banco de dados local SQLite** para persistência de dados
- Inclui uma interação simbólica com a deusa **Hécate** por meio de um backend com IA
- Projetado como uma aplicação **offline-first** e autocontida

## 🔐 Acesso ritualístico

- Roda como uma **aplicação desktop** por meio do Electron
- Inicializa internamente um **servidor local Express** para acesso aos dados
- Utiliza **comunicação IPC** entre os processos *main* e *renderer*
- Acessa os dados exclusivamente por meio de uma **camada de API protegida via preload**
- Não utiliza autenticação externa — o acesso é local e pessoal
- Não requer conexão com a internet para as funcionalidades principais

## ⚙️ Requerimentos

- **Node.js** (versão 18 ou superior recomendada)
- **npm** (ou gerenciador de pacotes compatível)
- **Electron**
- **SQLite3**
- Sistema operacional compatível com Electron (Windows, Linux ou macOS)
- Uma **chave de API válida do Gemini** (para as funcionalidades de interação com Hécate)

## 📦 Setup


**1. Clone o repositório e instale as dependências**

```bash
git clone https://github.com/lfjade/codex-arcana-2.git  
cd codex-arcana-2
npm install
```

**2. Crie o arquivo de ambiente**

  Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
PW=as within, so without  
GEMINI_API_KEY=your_api_key_here
```

**3. Inicialize o banco de dados**
   
```bash
npm run setup
```

> ⚠️ Isso criará a estrutura do banco de dados local SQLite, mas não irá populá-lo.

**4. Inicie a aplicação**

```bash
npm start
```

## 🧰 Tech

- **Electron** — framework para aplicações desktop
- **JavaScript (ES Modules)** — lógica da aplicação
- **Express.js** — servidor backend local
- **SQLite** — banco de dados relacional local
- **dotenv** — gerenciamento de variáveis de ambiente
- **IPC (Electron)** — comunicação segura entre os processos *main* e *renderer*
- **Estrutura inspirada em MVC** — separação entre interface, lógica e acesso a dados
- **Google Gemini API** — respostas baseadas em IA para a interação com Hécate

## 🗺️ Roadmap

O projeto está em **desenvolvimento ativo**. As funcionalidades planejadas e em andamento incluem:

- [x] Esquema central do banco de dados (diários, feitiços, tags, componentes)
- [x] Backend local com operações CRUD completas
- [x] Configuração segura do Electron com comunicação via IPC
- [x] Tela de acesso ritual (entrada baseada em senha)
- [x] Interação inicial com Hécate via IA (mensagem de boas-vindas)

- [ ] Interface de gerenciamento de feitiços (em andamento)
- [ ] Interface de gerenciamento de diários
- [ ] Interface para associação de tags e componentes
- [ ] Pesquisa e filtragem entre registros
- [ ] Navegação entre páginas e “folhear” registros
- [ ] Interação de oração / invocação com Hécate
- [ ] Ajustes de UI/UX e consistência visual
- [ ] População inicial do banco de dados para testes

Melhorias futuras poderão ser adicionadas conforme o projeto evoluir.

## 🗂️ Status

Este projeto está em **desenvolvimento ativo**.

A arquitetura do backend, o esquema do banco de dados e a lógica central estão implementados e funcionais.  
A estrutura da aplicação Electron, a comunicação via IPC e o fluxo de acesso ritual estão estáveis.

A interface gráfica está **parcialmente implementada**, com o desenvolvimento atual focado nas telas de gerenciamento de feitiços e diários.

Algumas funcionalidades ainda não estão disponíveis na interface, apesar de já serem suportadas pelo backend.  
O projeto não é considerado completo em termos de funcionalidades neste estágio.

## 🪦 Versões Anteriores

Você pode conferir as versões anteriores (e provavelmente quebradas) nos links abaixo.

- [Codex Arcana V1](https://github.com/lfjade/codex-arcana)

</div>
