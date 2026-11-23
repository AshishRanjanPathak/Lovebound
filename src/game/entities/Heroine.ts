import Phaser from 'phaser';

export class Heroine extends Phaser.Physics.Arcade.Sprite {
  private moveSpeed = 380;
  private jumpPower = -680;
  private isDodging = false;
  private isDominance = false;
  private lastFired = 0;
  private projectiles: Phaser.Physics.Arcade.Group;

  constructor(scene: Phaser.Scene, x: number, y: number, projectiles: Phaser.Physics.Arcade.Group) {
    super(scene, x, y, 'heroine-normal');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.projectiles = projectiles;

    this.setCollideWorldBounds(true);
    this.setSize(36, 56);
    this.setOffset(14, 8);
    this.setScale(1.5);
  }

  public moveLeft() {
    if (this.isDodging) return;
    this.setVelocityX(-this.moveSpeed);
    this.setFlipX(true);
  }

  public moveRight() {
    if (this.isDodging) return;
    this.setVelocityX(this.moveSpeed);
    this.setFlipX(false);
  }

  public stopMoving() {
    if (this.isDodging) return;
    this.setVelocityX(0);
  }

  public jump() {
    const body = this.body as Phaser.Physics.Arcade.Body;
    if (body.touching.down || body.blocked.down) {
      this.setVelocityY(this.jumpPower);
    }
  }

  public dodge() {
    if (this.isDodging) return;
    this.isDodging = true;
    const direction = this.flipX ? -1 : 1;
    this.setVelocityX(direction * 750);
    this.setAlpha(0.6);

    // After 250ms, return to normal
    this.scene.time.delayedCall(250, () => {
      this.isDodging = false;
      this.setAlpha(1);
      this.setVelocityX(0);
    });
  }

  public attackStaff(): boolean {
    const time = this.scene.time.now;
    if (time < this.lastFired + 250) return false;
    this.lastFired = time;

    const texture = this.isDominance ? 'magic-bolt-violet' : 'magic-bolt-pink';
    const bolt = this.projectiles.get(this.x + (this.flipX ? -30 : 30), this.y - 10, texture);

    if (bolt) {
      bolt.setActive(true);
      bolt.setVisible(true);
      const body = bolt.body as Phaser.Physics.Arcade.Body;
      if (body) {
        body.setAllowGravity(false);
      }
      const speed = this.isDominance ? 850 : 650;
      bolt.setVelocityX(this.flipX ? -speed : speed);
      bolt.setScale(this.isDominance ? 1.4 : 1.1);

      // Auto-cleanup after 2 seconds
      this.scene.time.delayedCall(2000, () => {
        if (bolt.active) {
          this.projectiles.killAndHide(bolt);
        }
      });
      return true;
    }
    return false;
  }

  public attackBasic(): boolean {
    // Quick melee visual burst
    const time = this.scene.time.now;
    if (time < this.lastFired + 200) return false;
    this.lastFired = time;

    const hitG = this.scene.add.graphics();
    hitG.lineStyle(4, this.isDominance ? 0x8b5cf6 : 0xff79b7, 0.9);
    const startX = this.x + (this.flipX ? -20 : 20);
    const endX = this.x + (this.flipX ? -80 : 80);
    hitG.lineBetween(startX, this.y - 20, endX, this.y + 20);

    this.scene.time.delayedCall(120, () => hitG.destroy());
    return true;
  }

  public setDominanceMode(active: boolean) {
    this.isDominance = active;
    this.setTexture(active ? 'heroine-enraged' : 'heroine-normal');
    this.moveSpeed = active ? 480 : 380;
    this.jumpPower = active ? -740 : -680;
  }

  public isDominanceActive(): boolean {
    return this.isDominance;
  }
}
