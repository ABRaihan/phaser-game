import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    this.load.image("background", "assets/sky.png");
  }

  create() {
    //  Once the assets have been loaded in, we can now launch the Preloader Scene.
    this.scene.start("Preloader");
  }
}

