import { Scene } from "phaser";
import { buttonConfig } from "../../button-config";

export class GameButton extends Phaser.GameObjects.Graphics {
  constructor(scene: Scene, text?: string) {
    super(scene);
    scene.add.existing(this);

    // parse the button config from button-config.ts
    const { buttonText, buttonStyle } = buttonConfig;
    const width = (parseFloat(buttonStyle.width) / 100) * scene.scale.width;
    const height = parseInt(buttonStyle.height);
    const x = scene.scale.width * (parseFloat(buttonStyle.left) / 100);
    const y = scene.scale.height * (parseFloat(buttonStyle.top) / 100);
    const radius = parseInt(buttonStyle.borderRadius);
    const background = Phaser.Display.Color.ValueToColor(
      buttonStyle.backgroundColor
    ).color;

    this.fillStyle(background, 1);
    this.fillRoundedRect(x - width / 2, y - height / 2, width, height, radius);
    this.setInteractive(
      new Phaser.Geom.Rectangle(x - width / 2, y - height / 2, width, height),
      Phaser.Geom.Rectangle.Contains
    );

    this.on(
      "pointerover",
      () => (this.scene.game.canvas.style.cursor = "pointer")
    );
    this.on(
      "pointerout",
      () => (this.scene.game.canvas.style.cursor = "default")
    );
    this.on("pointerdown", () => {
      scene.scene.start("Game");
    });

    // add the text to the button
    scene.add
      .text(x, y, text ?? buttonText, {
        color: buttonStyle.color,
        fontSize: buttonStyle.fontSize,
        fontStyle: "bold",
      })
      .setOrigin(0.5);
  }
}
