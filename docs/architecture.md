# LOVEBOUND — Software Architecture & Developer Guide

## 1. System Architecture Overview

LOVEBOUND uses a hybrid architecture combining **React 18** and **Phaser 3**:

```
+-----------------------------------------------------------+
|                        REACT UI                           |
|  - Main Menu & Opening Splash                             |
|  - Save Slot Management (IndexedDB)                       |
|  - Settings & Accessibility Controls (localStorage)       |
|  - Pause Menu & Modals (Inventory, Map, Credits)          |
|  - Reactive Game HUD & Virtual Touch Controls             |
+-----------------------------+-----------------------------+
                              |
                     Typed GameEventBus
                              |
+-----------------------------v-----------------------------+
|                      PHASER 3 ENGINE                      |
|  - 1920x1080 Logical 16:9 Viewport (Phaser.Scale.FIT)     |
|  - Arcade Physics (Gravity, Platforms, Colliders)         |
|  - Entities: Heroine (Player), Princess (AI Companion)    |
|  - Combat: Projectiles, Floater Texts, Parallax Scenery   |
|  - Scenes: BootScene, GremlinWoodsScene                   |
+-----------------------------------------------------------+
```

### Core Principle: Separation of Concerns
* **Phaser** manages the game world, player physics, projectile pools, collision detection, and parallax backgrounds.
* **React** manages all interface menus, overlays, settings forms, save slots, and HUD displays.
* **GameEventBus** bridges the two layers with strictly typed events (`UI:*` and `GAME:*`).
* No enemy AI or physics loops pollute React components, and no UI dialog HTML is embedded in Phaser canvas.

---

## 2. Directory Structure

```
src/
├── app/                  # Application initialization
├── assets/
│   ├── assetManifest.ts  # Master asset catalog & metadata
│   └── assetValidator.ts # Dynamic verification & fallback reporter
├── components/
│   ├── common/           # FantasyButton, ModalWrapper, MissingAssetPlaceholder
│   ├── hud/              # GameHUD, VirtualControls
│   ├── menu/             # SplashScreen, MainMenu, SaveSlotModal, SettingsModal, ControlsModal, CreditsModal, AssetReportModal
│   └── overlays/         # PauseMenu, InventoryModal, MapModal, DialogueOverlay, GameOverModal, MissionCompleteModal
├── data/                 # Dialogues, Territories, Inventory static records
├── events/
│   └── gameEventBus.ts   # Strongly typed event emitter
├── game/
│   ├── config/           # Phaser 3 1920x1080 canvas config
│   ├── entities/         # Heroine.ts, PrincessCompanion.ts
│   └── scenes/           # BootScene.ts, GremlinWoodsScene.ts
├── services/
│   ├── audioService.ts   # Web Audio synthesizer & sound manager
│   ├── saveService.ts    # IndexedDB persistent multi-slot saves
│   └── settingsService.ts# localStorage user configurations & DOM filters
├── stores/               # Zustand stores: useGameStore, useSettingsStore, useUIStore
├── styles/               # Tailwind CSS & custom animations
└── types/                # TypeScript interfaces: game, save, settings, assets, dialogue
```

---

## 3. Storage & Persistence Layer

* **Save Slots (IndexedDB)**:
  * Database name: `lovebound_save_database`.
  * Store: `save_slots`.
  * Preserves Heroine Level, HP/MP, Dominance Meter, Territory, Checkpoint, Playtime, Inventory, and Story Flags.
  * If IndexedDB is blocked (e.g. private browsing), the service transparently falls back to `localStorage` or memory without errors.

* **Settings (localStorage)**:
  * Audio volume sliders (Master, Music, SFX) directly update Web Audio `GainNode`s.
  * Brightness slider adjusts CSS variable `--app-brightness` and `document.body.style.filter`.
  * High Contrast and Reduce Motion inject appropriate accessibility classes into the root `<html>` element.

---

## 4. Local Development & Production Build

### Prerequisites
* Node.js v18+ (tested on Node v24.22.0).

### Run Locally
```bash
cd lovebound
npm run dev
```
The game will start at `http://localhost:5173`.

### Run Test Suite
```bash
npm run test
```
Executes all unit tests verifying settings persistence, audio bus values, and save slot creation/deletion via Vitest.

### Production Build
```bash
npm run build
```
Creates an optimized, compressed production bundle in `dist/` with PWA manifest and service worker.
