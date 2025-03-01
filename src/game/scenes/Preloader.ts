import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    // add the game background before load other assets
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "background")
      .setScale(1, this.scale.height / 600);
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets"); // set the path to the assets folder, so don't need use each load image method
    this.load.image("ground", "platform.png");
    this.load.image("star", "star.png");
    this.load.image("bomb", "bomb.png");
    this.load.spritesheet("dude", "dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    // player left movement animation
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // player right movement animation
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // player idle animation
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
    });

    this.scene.start("MainMenu");
  }
}

