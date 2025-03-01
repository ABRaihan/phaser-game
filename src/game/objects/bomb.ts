import { Scene } from "phaser";

export class Bomb extends Phaser.Physics.Arcade.Group {
  constructor(scene: Scene) {
    super(scene.physics.world, scene);
  }
}
