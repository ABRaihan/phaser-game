import { Scene } from "phaser";

export class Platform extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene: Scene) {
    super(scene.physics.world, scene);
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.create(360, 1248, "ground").setScale(2).refreshBody();

    this.create(620, 900, "ground"); // Slightly above center-right
    this.create(80, 600, "ground"); // Left side, mid-screen
    this.create(650, 350, "ground"); // Right side, higher up
  }
}
