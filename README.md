# LOVEBOUND — 2D Anime Action-Adventure Game Shell

LOVEBOUND is an anime-inspired 2D side-scrolling fantasy action-adventure game built with **React**, **TypeScript**, **Phaser 3**, **Zustand**, and **Tailwind CSS**.

---

## 🌟 Overview

* **Protagonist**: Astraea, Maiden of the Staff of Love
  * **Normal State**: Wields radiant pink Love Magic to protect and heal.
  * **Enraged State**: Wields potent violet Dominance Magic when her bond is threatened.
* **Companion**: Princess Elinore (AI-guided follow companion with Starlight Blessing protective barrier).
* **Nemesis Bosses**:
  1. **HATA** — Manipulative gremlin kingpin of Gremlin Woods.
  2. **BUNNY** — Deceptive enchantress of the Enchanted District.
  3. **RISHI** — Boar titan wielding a colossal stone tablet in Greedlands.

---

## 🛠 Tech Stack

* **Game Engine**: [Phaser 3](https://phaser.io/) (1920 × 1080 logical 16:9 canvas with Arcade Physics & Parallax background).
* **UI & Overlays**: React 18, TypeScript, Tailwind CSS, Lucide Icons.
* **Bridge**: Strongly typed event bus (`GameEventBus`) for decoupled React <-> Phaser communication.
* **State Management**: Zustand (`useGameStore`, `useSettingsStore`, `useUIStore`).
* **Persistence**:
  * IndexedDB multi-slot save architecture with automatic fallback to localStorage/memory.
  * Persistent user preferences for audio, display, gameplay difficulty, keybindings, and accessibility.
* **Audio**: Procedural Web Audio API synthesizer for instant zero-dependency chimes, spells, and bass impacts.
* **PWA**: `vite-plugin-pwa` enabled for standalone mobile and desktop installation.

---

## 🎮 Controls

### Desktop Keyboard
* **A / D**: Move Left / Right
* **SPACE**: Jump
* **J**: Basic Melee Strike
* **K**: Staff Love Magic Bolt
* **SHIFT**: Dodge Dash (invulnerable)
* **E**: Princess Elinore Blessing (Starlight Barrier)
* **Q**: Dominance Ultimate (requires 100% Dominance Meter)
* **ESC**: Pause Game / Back

### Mobile Touch
* On-screen analog virtual joystick for movement.
* Action buttons for Jump, Staff Magic, Melee, Dodge, Companion Blessing, and Dominance Ultimate.
* Direct top-right Pause button and device rotation guidance.

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18 or later
* npm / pnpm / yarn

### Installation
```bash
git clone https://github.com/AshishRanjanPathak/Lovebound.git
cd Lovebound
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Run Tests
```bash
npm test
```

### Production Build
```bash
npm run build
```

---

## 📖 Documentation
Detailed architectural and asset specifications are available in the [`docs/`](./docs) folder:
* [`docs/asset-catalog.md`](./docs/asset-catalog.md) — Asset specifications, resolutions, and fallback rules.
* [`docs/game-design.md`](./docs/game-design.md) — Lore, character profiles, combat systems, and territories.
* [`docs/architecture.md`](./docs/architecture.md) — Technical separation of concerns, storage, and event systems.
