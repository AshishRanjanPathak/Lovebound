import Phaser from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { GremlinWoodsScene } from '../scenes/GremlinWoodsScene';

export const createPhaserConfig = (parent: HTMLElement): Phaser.Types.Core.GameConfig => {
  return {
    type: Phaser.AUTO,
    parent,
    width: 1920,
    height: 1080,
    backgroundColor: '#101323',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1920,
      height: 1080,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 1400 },
        debug: false,
      },
    },
    render: {
      antialias: true,
      pixelArt: false,
      roundPixels: true,
    },
    scene: [BootScene, GremlinWoodsScene],
  };
};
