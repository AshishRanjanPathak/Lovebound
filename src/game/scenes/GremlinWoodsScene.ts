import Phaser from 'phaser';
import { Heroine } from '../entities/Heroine';
import { PrincessCompanion } from '../entities/PrincessCompanion';
import { gameEventBus } from '../../events/gameEventBus';
import { useGameStore } from '../../stores/useGameStore';
import { useUIStore } from '../../stores/useUIStore';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { audioService } from '../../services/audioService';

export class GremlinWoodsScene extends Phaser.Scene {
  private heroine!: Heroine;
  private companion!: PrincessCompanion;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private projectiles!: Phaser.Physics.Arcade.Group;
  private wisps!: Phaser.Physics.Arcade.Group;
  private shrine!: Phaser.Physics.Arcade.Sprite;
  private shrineActivated = false;

  private keys!: {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    jump: Phaser.Input.Keyboard.Key;
    attackBasic: Phaser.Input.Keyboard.Key;
    attackStaff: Phaser.Input.Keyboard.Key;
    dodge: Phaser.Input.Keyboard.Key;
    companion: Phaser.Input.Keyboard.Key;
    ultimate: Phaser.Input.Keyboard.Key;
    pause: Phaser.Input.Keyboard.Key;
  };

  private unsubscribers: Array<() => void> = [];

  constructor() {
    super({ key: 'GremlinWoodsScene' });
  }

  create() {
    const { width, height } = this.scale;

    // 1. Parallax Background Layers
    this.createAtmosphericEnvironment(width, height);

    // 2. Projectiles Group
    this.projectiles = this.physics.add.group({
      defaultKey: 'magic-bolt-pink',
      maxSize: 30,
    });

    // 3. Platforms & Ground
    this.platforms = this.physics.add.staticGroup();
    // Main ground
    for (let x = 0; x < width + 128; x += 128) {
      this.platforms.create(x, height - 20, 'ground-tile');
    }
    // Floating Ruin Platforms
    this.platforms.create(500, height - 260, 'ground-tile').setScale(1.5, 1).refreshBody();
    this.platforms.create(900, height - 420, 'ground-tile').setScale(1.2, 1).refreshBody();
    this.platforms.create(1350, height - 300, 'ground-tile').setScale(1.5, 1).refreshBody();

    // 4. Ancient Checkpoint Shrine
    this.shrine = this.physics.add.staticSprite(1400, height - 370, 'checkpoint-shrine');

    // 5. Heroine Player Entity
    this.heroine = new Heroine(this, 250, height - 120, this.projectiles);
    this.physics.add.collider(this.heroine, this.platforms);

    // 6. Princess Companion
    this.companion = new PrincessCompanion(this, 180, height - 140, this.heroine);

    // 7. Practice Wisps / Gremlin Targets
    this.wisps = this.physics.add.group();
    this.createWisps(height);

    // Overlaps & Collisions
    this.physics.add.overlap(this.projectiles, this.wisps, this.handleProjectileHitWisp as any, undefined, this);
    this.physics.add.overlap(this.heroine, this.shrine, this.handleShrineOverlap as any, undefined, this);

    // Setup Keyboard Controls
    this.setupKeyboardControls();

    // Setup React <-> Phaser Event Bus Listeners
    this.setupEventBusListeners();

    // Scene ready notification
    gameEventBus.emit('GAME:SCENE_READY', {
      territoryId: 'gremlin-woods',
      checkpointId: 'whispering-grove',
    });
  }

  update(time: number, delta: number) {
    if (this.scene.isPaused()) return;

    // Heroine Keyboard Movement
    const isMovingLeft = this.keys.left.isDown;
    const isMovingRight = this.keys.right.isDown;

    if (isMovingLeft) {
      this.heroine.moveLeft();
    } else if (isMovingRight) {
      this.heroine.moveRight();
    } else {
      this.heroine.stopMoving();
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.jump) || Phaser.Input.Keyboard.JustDown(this.keys.up)) {
      this.heroine.jump();
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.attackStaff)) {
      if (this.heroine.attackStaff()) {
        audioService.playSound('magic-cast');
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.attackBasic)) {
      if (this.heroine.attackBasic()) {
        audioService.playSound('button-hover');
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.dodge)) {
      this.heroine.dodge();
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.companion)) {
      this.triggerCompanionBlessing();
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.ultimate)) {
      this.triggerDominanceUltimate();
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.pause)) {
      useGameStore.getState().setPaused(true);
      useUIStore.getState().openOverlay('pause');
    }

    // Update Companion
    this.companion.update(time, delta);
  }

  private createAtmosphericEnvironment(width: number, height: number) {
    // Parallax background graphics
    const bgG = this.add.graphics();
    // Sky
    bgG.fillGradientStyle(0x101323, 0x101323, 0x21162f, 0x21162f, 1);
    bgG.fillRect(0, 0, width, height);

    // Giant Glowing Moon
    bgG.fillStyle(0xfff4eb, 0.15);
    bgG.fillCircle(width * 0.75, height * 0.25, 140);
    bgG.fillStyle(0xff79b7, 0.2);
    bgG.fillCircle(width * 0.75, height * 0.25, 90);
    bgG.fillStyle(0xffffff, 0.7);
    bgG.fillCircle(width * 0.75, height * 0.25, 60);

    // Twisted enchanted tree silhouettes
    bgG.fillStyle(0x181126, 0.85);
    // Tree 1
    bgG.fillRect(120, height - 600, 70, 600);
    bgG.fillCircle(155, height - 600, 160);
    // Tree 2
    bgG.fillRect(720, height - 700, 90, 700);
    bgG.fillCircle(765, height - 700, 200);
    // Tree 3
    bgG.fillRect(1500, height - 650, 80, 650);
    bgG.fillCircle(1540, height - 650, 180);
  }

  private createWisps(height: number) {
    const coords = [
      { x: 550, y: height - 330 },
      { x: 950, y: height - 490 },
      { x: 1200, y: height - 160 },
      { x: 1650, y: height - 160 },
    ];

    coords.forEach((c) => {
      const wisp = this.wisps.create(c.x, c.y, 'gremlin-wisp') as Phaser.Physics.Arcade.Sprite;
      const body = wisp.body as Phaser.Physics.Arcade.Body;
      if (body) {
        body.setAllowGravity(false);
      }
      wisp.setImmovable(true);

      // Gentle floating tween
      this.tweens.add({
        targets: wisp,
        y: c.y - 25,
        duration: 1800 + Math.random() * 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    });
  }

  private handleProjectileHitWisp(
    projectile: Phaser.Physics.Arcade.Sprite,
    wisp: Phaser.Physics.Arcade.Sprite
  ) {
    if (!projectile.active || !wisp.active) return;
    projectile.destroy();

    const isDominance = this.heroine.isDominanceActive();
    const damage = isDominance ? 120 : 45;

    audioService.playSound('enemy-hit');

    // Charge Dominance Meter in store
    useGameStore.getState().addDominance(15);

    // Show Damage Floater Text
    const settings = useSettingsStore.getState().settings;
    if (settings.gameplay.showDamageNumbers) {
      const dmgText = this.add.text(wisp.x, wisp.y - 20, `${damage}${isDominance ? ' CRIT!' : ''}`, {
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: isDominance ? '24px' : '18px',
        color: isDominance ? '#8B5CF6' : '#FF79B7',
        stroke: '#101323',
        strokeThickness: 3,
      });

      this.tweens.add({
        targets: dmgText,
        y: wisp.y - 70,
        alpha: 0,
        duration: 800,
        ease: 'Cubic.easeOut',
        onComplete: () => dmgText.destroy(),
      });
    }

    // Screen Shake if enabled
    if (settings.display.screenShake && isDominance) {
      this.cameras.main.shake(120, 0.008);
    }

    // Flash wisp
    this.tweens.add({
      targets: wisp,
      alpha: 0.3,
      duration: 100,
      yoyo: true,
    });
  }

  private handleShrineOverlap() {
    if (this.shrineActivated) return;
    this.shrineActivated = true;

    audioService.playSound('checkpoint-activate');

    // Shrine Glow Tween
    this.tweens.add({
      targets: this.shrine,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 300,
      yoyo: true,
      repeat: 2,
    });

    useGameStore.getState().reachCheckpoint({
      id: 'whispering-grove',
      territoryId: 'gremlin-woods',
      name: 'Whispering Grove Ancient Shrine',
      description: 'The ancient stone seal holds sacred memories of the two maidens.',
      x: 1400,
      y: 700,
      activated: true,
    });

    // Shrine activation floating text
    const text = this.add.text(this.shrine.x - 120, this.shrine.y - 80, 'SANCTUARY CHECKPOINT ACTIVATED', {
      fontFamily: 'Cinzel, serif',
      fontSize: '18px',
      color: '#E9C77B',
      stroke: '#101323',
      strokeThickness: 3,
    });

    this.tweens.add({
      targets: text,
      y: this.shrine.y - 140,
      alpha: 0,
      duration: 2500,
      ease: 'Sine.easeOut',
      onComplete: () => text.destroy(),
    });
  }

  private triggerCompanionBlessing() {
    const companionState = useGameStore.getState().companion;
    if (companionState.abilityReady) {
      audioService.playSound('companion-assist');
      this.companion.activateBlessing();
    }
  }

  private triggerDominanceUltimate() {
    const canUse = useGameStore.getState().consumeDominance();
    if (canUse) {
      audioService.playSound('dominance-burst');
      this.heroine.setDominanceMode(true);

      const settings = useSettingsStore.getState().settings;
      if (settings.display.screenShake) {
        this.cameras.main.shake(300, 0.015);
      }

      this.time.delayedCall(10000, () => {
        this.heroine.setDominanceMode(false);
      });
    }
  }

  private setupKeyboardControls() {
    if (!this.input.keyboard) return;

    this.keys = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      attackBasic: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
      attackStaff: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
      dodge: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
      companion: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      ultimate: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      pause: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
    };
  }

  private setupEventBusListeners() {
    // UI -> Game
    this.unsubscribers.push(
      gameEventBus.on('UI:PAUSE_GAME', () => {
        this.physics.pause();
        this.anims.pauseAll();
      }),
      gameEventBus.on('UI:RESUME_GAME', () => {
        this.physics.resume();
        this.anims.resumeAll();
      }),
      gameEventBus.on('UI:RESTART_CHECKPOINT', () => {
        this.heroine.setPosition(250, this.scale.height - 120);
        this.heroine.setVelocity(0, 0);
        useGameStore.getState().updateHeroine({ hp: 100, magic: 80 });
      }),
      gameEventBus.on('UI:MOVE_INPUT', ({ direction }) => {
        if (direction === 'left') this.heroine.moveLeft();
        else if (direction === 'right') this.heroine.moveRight();
        else this.heroine.stopMoving();
      }),
      gameEventBus.on('UI:JUMP_INPUT', () => this.heroine.jump()),
      gameEventBus.on('UI:ATTACK_STAFF_INPUT', () => this.heroine.attackStaff()),
      gameEventBus.on('UI:ATTACK_BASIC_INPUT', () => this.heroine.attackBasic()),
      gameEventBus.on('UI:DODGE_INPUT', () => this.heroine.dodge()),
      gameEventBus.on('UI:COMPANION_ABILITY_INPUT', () => this.triggerCompanionBlessing()),
      gameEventBus.on('UI:DOMINANCE_ULTIMATE_INPUT', () => this.triggerDominanceUltimate())
    );
  }

  shutdown() {
    this.unsubscribers.forEach((unsub) => unsub());
    this.unsubscribers = [];
  }
}
