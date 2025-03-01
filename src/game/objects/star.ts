import { Scene } from "phaser";

export class Star extends Phaser.Physics.Arcade.Group {
  constructor(scene: Scene) {
    super(scene.physics.world, scene, {
      key: "star",
      repeat: 11,
      setXY: { x: 19, y: 0, stepX: 62 },
    });

    // set random bounce for each star
    this.children.iterate((child) => {
      const star = child as Phaser.Physics.Arcade.Sprite;
      star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      return true;
    });
  }
}
