import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Generate procedural anime-styled graphics textures for gameplay placeholder
    this.createProceduralTextures();
  }

  create() {
    this.scene.start('GremlinWoodsScene');
  }

  private createProceduralTextures() {
    // 1. Heroine Texture (Normal Love Form)
    const hG = this.make.graphics({ x: 0, y: 0 });
    // Aura
    hG.fillStyle(0xff79b7, 0.2);
    hG.fillCircle(32, 38, 28);
    // Body / Flowing Dress
    hG.fillStyle(0x55306f, 1);
    hG.fillTriangle(32, 24, 18, 56, 46, 56);
    // Head / Hair
    hG.fillStyle(0x21162f, 1);
    hG.fillCircle(32, 22, 12);
    // Staff in hand
    hG.lineStyle(2, 0xe9c77b, 1);
    hG.lineBetween(42, 10, 42, 54);
    // Staff crystal
    hG.fillStyle(0xff79b7, 1);
    hG.fillCircle(42, 10, 6);
    hG.generateTexture('heroine-normal', 64, 64);
    hG.destroy();

    // 2. Heroine Texture (Enraged Dominance Form)
    const hdG = this.make.graphics({ x: 0, y: 0 });
    // Violet Dominance Aura
    hdG.fillStyle(0x8b5cf6, 0.4);
    hdG.fillCircle(32, 38, 30);
    // Body
    hdG.fillStyle(0x5125a8, 1);
    hdG.fillTriangle(32, 24, 16, 56, 48, 56);
    // Head
    hdG.fillStyle(0x101323, 1);
    hdG.fillCircle(32, 22, 12);
    // Dominance Rod
    hdG.lineStyle(3, 0x8b5cf6, 1);
    hdG.lineBetween(42, 8, 42, 54);
    hdG.fillStyle(0xffffff, 1);
    hdG.fillCircle(42, 8, 7);
    hdG.generateTexture('heroine-enraged', 64, 64);
    hdG.destroy();

    // 3. Princess Companion Texture
    const pG = this.make.graphics({ x: 0, y: 0 });
    // Gentle golden aura
    pG.fillStyle(0xe9c77b, 0.25);
    pG.fillCircle(24, 24, 20);
    // Gown
    pG.fillStyle(0xf49ac2, 0.9);
    pG.fillTriangle(24, 16, 14, 40, 34, 40);
    // Head
    pG.fillStyle(0x2b163e, 1);
    pG.fillCircle(24, 14, 8);
    // Tiara
    pG.fillStyle(0xe9c77b, 1);
    pG.fillRect(21, 6, 6, 3);
    pG.generateTexture('princess-companion', 48, 48);
    pG.destroy();

    // 4. Love Magic Staff Projectile (Pink Glowing Heart/Orb)
    const bG = this.make.graphics({ x: 0, y: 0 });
    bG.fillStyle(0xff79b7, 0.3);
    bG.fillCircle(16, 16, 14);
    bG.fillStyle(0xff79b7, 0.9);
    bG.fillCircle(16, 16, 8);
    bG.fillStyle(0xffffff, 1);
    bG.fillCircle(16, 16, 4);
    bG.generateTexture('magic-bolt-pink', 32, 32);
    bG.destroy();

    // 5. Dominance Projectile (Violet Orb)
    const vG = this.make.graphics({ x: 0, y: 0 });
    vG.fillStyle(0x8b5cf6, 0.4);
    vG.fillCircle(20, 20, 18);
    vG.fillStyle(0x8b5cf6, 1);
    vG.fillCircle(20, 20, 10);
    vG.fillStyle(0xffffff, 1);
    vG.fillCircle(20, 20, 5);
    vG.generateTexture('magic-bolt-violet', 40, 40);
    vG.destroy();

    // 6. Platform Ground Tile
    const platG = this.make.graphics({ x: 0, y: 0 });
    platG.fillStyle(0x1a1226, 1);
    platG.fillRect(0, 0, 128, 40);
    // Glowing runes on top edge
    platG.lineStyle(3, 0xff79b7, 0.7);
    platG.lineBetween(0, 0, 128, 0);
    platG.fillStyle(0x55306f, 0.5);
    platG.fillRect(0, 3, 128, 10);
    platG.generateTexture('ground-tile', 128, 40);
    platG.destroy();

    // 7. Checkpoint Ancient Shrine
    const shG = this.make.graphics({ x: 0, y: 0 });
    shG.fillStyle(0x21162f, 1);
    shG.fillRect(16, 20, 32, 60);
    shG.fillStyle(0xe9c77b, 1);
    shG.fillCircle(32, 16, 10);
    shG.lineStyle(2, 0xff79b7, 0.8);
    shG.strokeCircle(32, 16, 14);
    shG.generateTexture('checkpoint-shrine', 64, 80);
    shG.destroy();

    // 8. Corrupt Gremlin Wisp (Practice Target)
    const wG = this.make.graphics({ x: 0, y: 0 });
    wG.fillStyle(0x34d399, 0.3);
    wG.fillCircle(24, 24, 20);
    wG.fillStyle(0x064e3b, 0.8);
    wG.fillCircle(24, 24, 12);
    // Glowing red eyes
    wG.fillStyle(0xef4444, 1);
    wG.fillCircle(20, 22, 2.5);
    wG.fillCircle(28, 22, 2.5);
    wG.generateTexture('gremlin-wisp', 48, 48);
    wG.destroy();

    // 9. Particle Sparkle
    const pM = this.make.graphics({ x: 0, y: 0 });
    pM.fillStyle(0xffffff, 1);
    pM.fillCircle(4, 4, 3);
    pM.generateTexture('sparkle-particle', 8, 8);
    pM.destroy();
  }
}
