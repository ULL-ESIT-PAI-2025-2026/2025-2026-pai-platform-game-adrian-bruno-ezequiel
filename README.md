# 🎮 Platform Game 🎮

A Mario-inspired 2D platformer built with TypeScript and the HTML5 Canvas API. Navigate levels, collect coins, avoid lava, and make it to the end — before your lives run out.

## Features

- Canvas-based rendering with sprite animations and a scrolling viewport
- Physics simulation: gravity, jumping, and collision detection
- Three types of lava hazards: horizontal, vertical, and dripping
- Coin collection mechanic — collect all coins to complete a level
- Lives system with HUD display
- Score display tracking collected vs. total coins
- Background music and sound effects
- Pause functionality (Escape key)
- MVC architecture: clean separation between model, view, and controller

## Project Structure

```
.
.
├── bib/                         # Presentation bibliography and references
├── slides/                      # slides of your presentation
├── scripts/
│   └── dev-server.js            # Development HTTP server
├── public/
│   ├── index.html
│   └── assets/
│       ├── img/
│       │   ├── player.png       # Player sprite sheet
│       │   ├── sprites.png      # Tiles and actor sprites
│       │   └── lives.png        # Lives icon
│       ├── sound/
│       │   ├── overworld.mp3    # Background music
│       │   ├── coin.wav
│       │   ├── jump-small.wav
│       │   ├── mario-die.wav
│       │   ├── stage-clear.wav
│       │   └── game-over.wav
│       └── styles/
│           └── styles.css
├── src/
│   ├── main.ts                  # Entry point
│   ├── GameLevels.ts            # Level definitions
│   ├── Vector.ts                # 2D vector math
│   ├── controller/
│   │   └── GameController.ts    # Input handling and game loop
│   ├── model/
│   │   ├── GameModel.ts         # Central game state
│   │   ├── Level.ts             # Level logic and physics
│   │   ├── Actor.ts             # Base class for all game objects
│   │   ├── Player.ts            # Player movement and collision
│   │   ├── Coin.ts              # Collectible coins with wobble animation
│   │   ├── Lava.ts              # Moving lava hazards
│   │   ├── Lives.ts             # Lives HUD element
│   │   └── Score.ts             # Score HUD element
│   └── view/
│       ├── GameView.ts          # View entry point
│       ├── CanvasDisplay.ts     # Canvas rendering engine
│       ├── ActorView.ts         # Actor render data interface
│       ├── PlayerView.ts        # Player render data interface
│       └── audio.ts             # Audio manager
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
├── README.md
└── LICENSE
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm

### Installation

```bash
git clone https://github.com/ULL-ESIT-PAI-2025-2026/2025-2026-pai-platform-game-adrian-bruno-ezequiel.git
cd 2025-2026-pai-platform-game-adrian-bruno-ezequiel
npm install
```

### Development

Compile TypeScript and start the dev server:

```bash
npm start
```

Then open your browser at `http://localhost:8080`.

### Build & Run

Alternatively, compile and run separately:

```bash
npm run tsc:watch
```

```bash
npm run dev:server
```

## Controls

| Key | Action |
|-----|--------|
| ← Left Arrow | Move left |
| → Right Arrow | Move right |
| ↑ Up Arrow | Jump |
| Esc | Pause / Resume |

> Audio starts on the first keypress (browser autoplay policy).

## Level Format

Levels are defined as arrays of strings in `src/GameLevels.ts`. Each character maps to a tile or actor:

| Character | Meaning |
|-----------|---------|
| `x` | Wall |
| `!` | Static lava floor |
| `=` | Horizontal moving lava |
| `\|` | Vertical moving lava |
| `v` | Dripping lava |
| `o` | Coin |
| `@` | Player start position |
| ` ` | Empty space |

## Architecture

The project follows an **MVC pattern**:

- **Model** (`src/model/`) — pure game logic with no DOM or canvas dependencies. `GameModel` owns the level list and lifecycle; `Level` handles physics, collision, and actor state.
- **View** (`src/view/`) — `CanvasDisplay` handles all drawing. `GameView` is a thin adapter between the controller and the display. View interfaces (`ActorView`, `PlayerView`) keep the model and view decoupled.
- **Controller** (`src/controller/`) — `GameController` drives the `requestAnimationFrame` loop, translates keyboard events into a key map, and coordinates model updates with view renders.

## Authors

- Adrián Castro Rodríguez (adrian.castro.46@ull.edu.es)
- Bruno Morales Hernández (morales.hernandez.28@ull.edu.es)
- Ezequiel Juan Canale Oliva (ezequiel.juan.11@ull.edu.es)

## License

MIT License - See LICENSE file for details

### Course Information

Universidad de La Laguna\
Escuela Superior de Ingeniería y Tecnología\
Grado en Ingenieria Informatica\
Programación de Aplicaciones Interactivas (PAI)\
Academic Year: 2025-2026
