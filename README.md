<div align="center">

> Esta sessão está em inglês! Para ler em português, [clique aqui](./README.pt-BR.md).

# 🌒🌕🌘 Codex Arcana 🌒🌕🌘
  
#### Codex Arcana is a desktop application built to simulate a magical grimoire, allowing users to register, browse, and search spells and personal ritual diaries.

> ⚠️ Codex Arcana is still under development.

</div>

<div align= "left">

## 🤔 What is it?

- **Desktop application** built with **Electron**
- A personal digital grimoire for magical records
- Allows creating and organizing **diaries**, **spells**, and related metadata
- Supports **tags** and **components** for classification and search
- Uses a **local SQLite database** for data persistence
- Includes symbolic interaction with the goddess **Hecate** via an AI-powered backend
- Designed as an **offline-first**, self-contained application

## 🔐 Ritual Access

- Runs as a **desktop application** via Electron
- Starts a **local Express server** internally for data access
- Uses **IPC communication** between renderer and main processes
- Accesses data exclusively through a **preload-secured API layer**
- No external authentication — access is local and personal
- Requires no internet connection for core features

## ⚙️ Requirements

- **Node.js** (v18 or higher recommended)
- **npm** (or compatible package manager)
- **Electron**
- **SQLite3**
- Operating system compatible with Electron (Windows, Linux, or macOS)
- A valid **Gemini API key** (for Hecate interaction features)

## Setup

**1. Clone the repository and install dependencies**

```bash
git clone https://github.com/lfjade/codex-arcana-2.git  
cd codex-arcana-2
npm install
```

**2. Create the environment file**

  Create a `.env` file at the project root with the following variables:

```bash
PW=as within, so without  
GEMINI_API_KEY=your_api_key_here
```

**3. Initialize the database**
   
```bash
npm run setup
```

> ⚠️ This will create the local SQLite database structure, but it will not populate it.

**4. Start the application**

```bash
npm start
```

## 🧰 Tech

- **Electron** — desktop application framework
- **JavaScript (ES Modules)** — application logic
- **Express.js** — local backend server
- **SQLite** — local relational database
- **dotenv** — environment variable management
- **IPC (Electron)** — secure communication between main and renderer processes
- **MVC-inspired structure** — separation between UI, logic, and data access
- **Google Gemini API** — AI-powered responses for the Hecate interaction


## 🗺️ Roadmap

The project is under **active development**. Planned and ongoing features include:

- [x] Core database schema (diaries, spells, tags, components)
- [x] Local backend with full CRUD operations
- [x] Secure Electron setup with IPC communication
- [x] Ritual access screen (password-based entry)
- [x] Hecate greeting interaction via AI

- [ ] Spell management interface (in progress)
- [ ] Diary management interface
- [ ] Tag and component assignment UI
- [ ] Search and filtering across entries
- [ ] Page navigation and record “page flipping”
- [ ] Prayer / invocation interaction with Hecate
- [ ] UI/UX refinements and visual consistency
- [ ] Initial database seeding for testing

Future improvements may be added as the project evolves.

## 🗂️ Status

This project is **under active development**.

The backend architecture, database schema, and core logic are implemented and functional.
The Electron application structure, IPC communication, and ritual access flow are stable.

The graphical interface is **partially implemented**, with ongoing work focused on spell and diary management screens.

Some features are not yet available in the UI, despite being supported by the backend.
The project is not considered feature-complete at this stage.


## 🪦 Previous versions

You can check the previous (and probably broken) versions in the links below.
- [Codex Arcana V1](https://github.com/lfjade/codex-arcana)
</div>
