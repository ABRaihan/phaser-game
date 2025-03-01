import { Scene } from "phaser";
import { GameButton } from "../objects/button";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "background")
      .setScale(1, this.scale.height / 600);

    // add the game over text
    this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Game Over", {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);

    // add the game button by clicking on it, it will start the game again
    new GameButton(this);
  }
}

