import { Scene } from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor(scene: Scene) {
    super(scene, 100, 1100, "dude");
    this.cursors = this.scene.input.keyboard?.createCursorKeys();

    this.scene.add.existing(this); // this will add the player to context scene
    this.scene.physics.add.existing(this); // this will add physics to the player

    //  the player will slight bounce.
    this.setBounce(0.2);
    //  player will not go out of the world
    this.setCollideWorldBounds(true);
  }

  update() {
    if (!this.cursors) return;

    if (this.cursors.left.isDown) {
      // when press left key, player will move left -160px
      this.setVelocityX(-160);
      this.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      // when press left key, player will move left -160px
      this.setVelocityX(160);
      this.anims.play("right", true);
    } else {
      this.setVelocityX(0);
      this.anims.play("turn");
    }

    // when press up key, player will jump 450px upper
    if (this.cursors.up.isDown && this.body?.touching.down) {
      this.setVelocityY(-450);
    }
  }
}
