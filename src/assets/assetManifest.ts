import { AssetManifestItem } from '../types/assets';

/**
 * LOVEBOUND Asset Registry
 * Central catalog of all registered game assets across branding, characters,
 * environments, bosses, audio, and UI.
 */
export const ASSET_MANIFEST: AssetManifestItem[] = [
  // --- Priority Main Menu Assets ---
  {
    id: 'branding-logo-main',
    category: 'branding',
    path: '/assets/branding/logo/lovebound-logo.png',
    purpose: 'Primary game title logo displayed on splash and main menu',
    expectedDimensions: { width: 800, height: 320 },
    requiredForMenu: true,
    status: 'pending',
    fallbackDescription: 'Stylized Cinzel fantasy text with glowing pink and violet gradients and heart crest'
  },
  {
    id: 'branding-bg-main-menu',
    category: 'branding',
    path: '/assets/branding/backgrounds/main-menu-bg.webp',
    purpose: 'Full-screen atmospheric background for main menu (Gremlin Woods style)',
    expectedDimensions: { width: 1920, height: 1080 },
    requiredForMenu: true,
    status: 'pending',
    fallbackDescription: 'Deep midnight navy to dark purple gradient with moonlight nebula and enchanted silhouettes'
  },
  {
    id: 'heroine-menu-illustration',
    category: 'character-heroine',
    path: '/assets/characters/heroine/normal/heroine-menu.png',
    purpose: 'Heroine full-body or focal artwork for main menu screen',
    expectedDimensions: { width: 600, height: 900 },
    requiredForMenu: true,
    status: 'pending',
    fallbackDescription: 'Heroine magical silhouette holding love staff with glowing pink rune aura'
  },
  {
    id: 'princess-menu-illustration',
    category: 'character-princess',
    path: '/assets/characters/princess/idle/princess-menu.png',
    purpose: 'Princess companion artwork positioned alongside heroine on main menu',
    expectedDimensions: { width: 400, height: 600 },
    requiredForMenu: true,
    status: 'pending',
    fallbackDescription: 'Delicate companion princess silhouette with warm golden tiara and floating starry motes'
  },

  // --- Character Portraits ---
  {
    id: 'heroine-portrait-normal',
    category: 'character-heroine',
    path: '/assets/characters/heroine/portraits/heroine-portrait.png',
    purpose: 'HUD dialogue and status icon for magical heroine in normal love state',
    expectedDimensions: { width: 256, height: 256 },
    status: 'pending',
    fallbackDescription: 'Pink-themed magical heroine portrait frame with crystalline staff badge'
  },
  {
    id: 'heroine-portrait-enraged',
    category: 'character-heroine',
    path: '/assets/characters/heroine/enraged/heroine-enraged-portrait.png',
    purpose: 'Dominance ultimate state heroine portrait during enraged mode',
    expectedDimensions: { width: 256, height: 256 },
    status: 'pending',
    fallbackDescription: 'Deep violet aura heroine portrait with intense glowing gaze'
  },
  {
    id: 'princess-portrait',
    category: 'character-princess',
    path: '/assets/characters/princess/portraits/princess-portrait.png',
    purpose: 'HUD companion gauge portrait and dialogue overlay',
    expectedDimensions: { width: 256, height: 256 },
    status: 'pending',
    fallbackDescription: 'Golden tiara princess icon with gentle pink blush'
  },

  // --- Boss Portraits & Reference ---
  {
    id: 'boss-hata-portrait',
    category: 'boss',
    path: '/assets/bosses/hata/hata-portrait.png',
    purpose: 'Manipulative gremlin boss dialogue and territory preview',
    expectedDimensions: { width: 256, height: 256 },
    status: 'pending',
    fallbackDescription: 'Cunning hooded gremlin with glowing emerald gaze and wooden staff'
  },
  {
    id: 'boss-bunny-portrait',
    category: 'boss',
    path: '/assets/bosses/bunny/bunny-portrait.png',
    purpose: 'Deceptive enchantress boss dialogue and territory preview',
    expectedDimensions: { width: 256, height: 256 },
    status: 'pending',
    fallbackDescription: 'Alluring rabbit-eared enchantress silhouette in magenta silks'
  },
  {
    id: 'boss-rishi-portrait',
    category: 'boss',
    path: '/assets/bosses/rishi/rishi-portrait.png',
    purpose: 'Greedy black boar with colossal tablet weapon',
    expectedDimensions: { width: 256, height: 256 },
    status: 'pending',
    fallbackDescription: 'Armored menacing boar titan with colossal stone rune tablet'
  },

  // --- Character Spritesheets ---
  {
    id: 'heroine-spritesheet',
    category: 'character-heroine',
    path: '/assets/characters/heroine/normal/heroine-spritesheet.png',
    purpose: 'Heroine 2D gameplay sprite atlas for idle, run, jump, and staff attacks',
    expectedDimensions: { width: 1024, height: 512 },
    frameMetadata: { frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 32 },
    status: 'pending',
    fallbackDescription: 'Procedural vector heroine with animated flowing dress and staff'
  },
  {
    id: 'princess-spritesheet',
    category: 'character-princess',
    path: '/assets/characters/princess/follow/princess-spritesheet.png',
    purpose: 'Princess companion follow, float, and support ability animations',
    expectedDimensions: { width: 512, height: 256 },
    frameMetadata: { frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 16 },
    status: 'pending',
    fallbackDescription: 'Procedural vector floating princess with hovering particle tail'
  },

  // --- Environments & Territories ---
  {
    id: 'env-gremlin-woods-bg',
    category: 'environment',
    path: '/assets/environments/gremlin-woods-bg.webp',
    purpose: 'Parallax background layer for Gremlin Woods territory',
    expectedDimensions: { width: 1920, height: 1080 },
    status: 'pending',
    fallbackDescription: 'Twisted luminescent canopy and mist gradient'
  },
  {
    id: 'env-enchanted-district-bg',
    category: 'environment',
    path: '/assets/environments/enchanted-district-bg.webp',
    purpose: 'Parallax background layer for Enchanted District territory',
    expectedDimensions: { width: 1920, height: 1080 },
    status: 'pending',
    fallbackDescription: 'Floating crystal spires and pink blossom dusk'
  },
  {
    id: 'env-greedlands-bg',
    category: 'environment',
    path: '/assets/environments/greedlands-bg.webp',
    purpose: 'Parallax background layer for Greedlands territory',
    expectedDimensions: { width: 1920, height: 1080 },
    status: 'pending',
    fallbackDescription: 'Volcanic gold-gilded ruins and ember smoke'
  },

  // --- UI Elements ---
  {
    id: 'ui-dialogue-frame',
    category: 'ui',
    path: '/assets/ui/dialogue-box.png',
    purpose: 'Ornate fantasy dialogue container frame',
    expectedDimensions: { width: 1200, height: 280 },
    status: 'pending',
    fallbackDescription: 'CSS frosted midnight container with gold and pink filigree border'
  },
  {
    id: 'ui-pause-frame',
    category: 'ui',
    path: '/assets/ui/pause-frame.png',
    purpose: 'Pause menu decorative outer border',
    expectedDimensions: { width: 800, height: 900 },
    status: 'pending',
    fallbackDescription: 'CSS double-bordered dark purple panel with corner ornaments'
  },

  // --- Audio ---
  {
    id: 'audio-bgm-menu',
    category: 'audio',
    path: '/assets/audio/bgm-main-menu.mp3',
    purpose: 'Gentle, romantic anime fantasy theme for main menu',
    status: 'pending',
    fallbackDescription: 'Web Audio procedural atmospheric fantasy synthesizer'
  },
  {
    id: 'audio-bgm-gameplay',
    category: 'audio',
    path: '/assets/audio/bgm-gremlin-woods.mp3',
    purpose: 'Exploration and combat theme for Gremlin Woods',
    status: 'pending',
    fallbackDescription: 'Web Audio procedural action-adventure synth loop'
  },
  {
    id: 'audio-sfx-button-click',
    category: 'audio',
    path: '/assets/audio/sfx-button-click.mp3',
    purpose: 'Crystal feedback sound when pressing menu buttons',
    status: 'pending',
    fallbackDescription: 'Web Audio crystal chime synthesizer'
  },
  {
    id: 'audio-sfx-magic-cast',
    category: 'audio',
    path: '/assets/audio/sfx-magic-cast.mp3',
    purpose: 'Sound when firing love magic projectile from staff',
    status: 'pending',
    fallbackDescription: 'Web Audio pink harmonic frequency synthesizer'
  },
  {
    id: 'audio-sfx-dominance-burst',
    category: 'audio',
    path: '/assets/audio/sfx-dominance-burst.mp3',
    purpose: 'Heavy bass impact and energy surge when activating Dominance Ultimate',
    status: 'pending',
    fallbackDescription: 'Web Audio heavy sub-bass resonant boom'
  }
];

export const getAssetById = (id: string): AssetManifestItem | undefined => {
  return ASSET_MANIFEST.find(a => a.id === id);
};
