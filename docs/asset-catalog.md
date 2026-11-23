# LOVEBOUND — Master Asset Catalog & Pipeline Reference

This document outlines the asset pipeline, folder hierarchy, file naming conventions, expected dimensions, and graceful fallback behaviors for **LOVEBOUND**.

---

## 1. Asset Directory Hierarchy

All local game assets must reside strictly under the `public/assets/` tree.

```
public/assets/
├── branding/
│   ├── logo/
│   │   ├── lovebound-logo.png          [800 × 320 px, transparent PNG]
│   │   └── lovebound-icon-512.png      [512 × 512 px, PWA icon]
│   ├── backgrounds/
│   │   └── main-menu-bg.webp           [1920 × 1080 px, 24-bit WebP]
│   └── decorations/
│       └── corner-ornaments.png        [256 × 256 px]
│
├── characters/
│   ├── heroine/
│   │   ├── reference/
│   │   │   └── heroine-concept.png
│   │   ├── normal/
│   │   │   ├── heroine-menu.png        [600 × 900 px, transparent PNG]
│   │   │   └── heroine-spritesheet.png [1024 × 512 px, 64 × 64 frame grid]
│   │   ├── enraged/
│   │   │   ├── heroine-enraged-menu.png
│   │   │   └── heroine-enraged-portrait.png [256 × 256 px]
│   │   └── portraits/
│   │       └── heroine-portrait.png    [256 × 256 px, transparent PNG]
│   │
│   └── princess/
│       ├── reference/
│       │   └── princess-concept.png
│       ├── idle/
│       │   └── princess-menu.png       [400 × 600 px, transparent PNG]
│       ├── follow/
│       │   └── princess-spritesheet.png [512 × 256 px, 48 × 48 frame grid]
│       ├── abilities/
│       │   └── starlight-barrier.png
│       └── portraits/
│           └── princess-portrait.png   [256 × 256 px, transparent PNG]
│
├── bosses/
│   ├── hata/
│   │   ├── hata-portrait.png           [256 × 256 px]
│   │   └── hata-spritesheet.png
│   ├── bunny/
│   │   ├── bunny-portrait.png          [256 × 256 px]
│   │   └── bunny-spritesheet.png
│   └── rishi/
│       ├── rishi-portrait.png          [256 × 256 px]
│       └── rishi-spritesheet.png
│
├── environments/
│   ├── gremlin-woods-bg.webp           [1920 × 1080 px]
│   ├── enchanted-district-bg.webp      [1920 × 1080 px]
│   └── greedlands-bg.webp              [1920 × 1080 px]
│
├── audio/
│   ├── bgm-main-menu.mp3               [44.1 kHz, 160 kbps CBR]
│   ├── bgm-gremlin-woods.mp3           [44.1 kHz, 160 kbps CBR]
│   ├── sfx-button-click.mp3
│   ├── sfx-magic-cast.mp3
│   └── sfx-dominance-burst.mp3
│
├── effects/
├── enemies/
├── items/
├── ui/
├── cutscenes/
└── fonts/
```

---

## 2. Priority Menu Assets & Missing Asset Fallback Policy

To ensure high visual quality before all artist illustrations are exported, the application enforces:

1. **No External Scraping / Placeholders**: Never load random internet URLs or broken icons.
2. **Themed SVG & Vector Silhouettes**: When an image is missing, `MissingAssetPlaceholder` renders a tailored anime silhouette (Heroine with Staff, Princess with Tiara, Title Crest, or Boss Crest) with subtle floating particles and glowing drop shadows.
3. **Procedural Web Audio Engine**: When `.mp3` audio files are absent, `audioService` synthesizes crystal chimes, love magic sweeps, and deep resonant bass booms using the Web Audio API.
4. **Audit Reporting**: The dev team can inspect the live asset registry via the **Asset Pipeline** button in the Main Menu or by calling `assetValidator.getReport()`.

---

## 3. Specifications for 2D Artists

| Asset ID | File Path | Dimensions | Notes |
| :--- | :--- | :--- | :--- |
| `branding-logo-main` | `public/assets/branding/logo/lovebound-logo.png` | 800 × 320 px | Transparent PNG, Cinzel/fantasy typography, pink/gold heart crest |
| `branding-bg-main-menu` | `public/assets/branding/backgrounds/main-menu-bg.webp` | 1920 × 1080 px | Gremlin Woods atmosphere, midnight navy & dark purple palette |
| `heroine-menu-illustration` | `public/assets/characters/heroine/normal/heroine-menu.png` | 600 × 900 px | Normal love state heroine holding staff, object-fit contain |
| `princess-menu-illustration` | `public/assets/characters/princess/idle/princess-menu.png` | 400 × 600 px | Companion princess in gentle gown, golden tiara |
| `heroine-portrait-normal` | `public/assets/characters/heroine/portraits/heroine-portrait.png` | 256 × 256 px | Dialogue and top-left HUD portrait |
| `princess-portrait` | `public/assets/characters/princess/portraits/princess-portrait.png` | 256 × 256 px | Companion gauge icon and dialogue |
| `boss-hata-portrait` | `public/assets/bosses/hata/hata-portrait.png` | 256 × 256 px | Manipulative hooded gremlin |
| `boss-bunny-portrait` | `public/assets/bosses/bunny/bunny-portrait.png` | 256 × 256 px | Deceptive enchantress with rabbit ears |
| `boss-rishi-portrait` | `public/assets/bosses/rishi/rishi-portrait.png` | 256 × 256 px | Boar titan with colossal stone tablet |
