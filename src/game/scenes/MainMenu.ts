import { Scene } from "phaser";
import { GameButton } from "../objects/button";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "background")
      .setScale(1, this.scale.height / 600);

    // add the game button by clicking on it, it will start the game
    new GameButton(this);
  }
}

