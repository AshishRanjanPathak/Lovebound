import Phaser from 'phaser';

export class PrincessCompanion extends Phaser.GameObjects.Sprite {
  private target: Phaser.GameObjects.Sprite;
  private floatOffset = 0;
  private shieldGraphics: Phaser.GameObjects.Graphics | null = null;
  private isShieldActive = false;

  constructor(scene: Phaser.Scene, x: number, y: number, target: Phaser.GameObjects.Sprite) {
    super(scene, x, y, 'princess-companion');
    scene.add.existing(this);
    this.target = target;
    this.setScale(1.3);
  }

  public update(time: number, _delta: number) {
    if (!this.target || !this.target.active) return;

    // Follow heroine with gentle smoothing
    const targetX = this.target.x + (this.target.flipX ? 70 : -70);
    const targetY = this.target.y - 25;

    // Sinusoidal floating bob
    this.floatOffset = Math.sin(time * 0.003) * 12;

    this.x = Phaser.Math.Linear(this.x, targetX, 0.08);
    this.y = Phaser.Math.Linear(this.y, targetY + this.floatOffset, 0.08);

    this.setFlipX(this.target.flipX);

    // Update shield if active
    if (this.isShieldActive && this.shieldGraphics) {
      this.shieldGraphics.clear();
      this.shieldGraphics.lineStyle(3, 0xe9c77b, 0.85);
      this.shieldGraphics.strokeCircle(this.target.x, this.target.y, 50);
      this.shieldGraphics.lineStyle(2, 0xff79b7, 0.6);
      this.shieldGraphics.strokeCircle(this.target.x, this.target.y, 56);
    }
  }

  public activateBlessing() {
    this.isShieldActive = true;
    if (!this.shieldGraphics) {
      this.shieldGraphics = this.scene.add.graphics();
    }

    // Shield lasts for 4 seconds
    this.scene.time.delayedCall(4000, () => {
      this.isShieldActive = false;
      if (this.shieldGraphics) {
        this.shieldGraphics.clear();
      }
    });
  }
}
