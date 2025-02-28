import { GameObjects, Scene } from "phaser";

import { buttonConfig } from "../../button-config";
import { EventBus } from "../EventBus";

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    button: GameObjects.Graphics;
    startText: GameObjects.Text;

    constructor() {
        super("MainMenu");
    }

    create() {
        this.background = this.add.image(400, 300, "background");

        const { buttonText, buttonStyle } = buttonConfig;

        // Convert CSS colors to Phaser format
        const bgColor = parseInt(
            buttonStyle.backgroundColor.replace("#", "0x"),
            16
        );
        const textColor = buttonStyle.color;

        // Convert percentage values

        const buttonX = this.scale.width * (parseFloat(buttonStyle.left) / 100);
        const buttonY = this.scale.height * (parseFloat(buttonStyle.top) / 100);
        const buttonWidth =
            (parseFloat(buttonStyle.width) / 100) * this.scale.width;
        const buttonHeight = parseInt(buttonStyle.height);
        const borderRadius = parseInt(buttonStyle.borderRadius);
        const fontSize = buttonStyle.fontSize;

        // 🔵 Step 1: Draw Rounded Button
        const graphics = this.add.graphics();
        graphics.fillStyle(bgColor, 1);
        graphics.fillRoundedRect(
            buttonX - buttonWidth / 2,
            buttonY - buttonHeight / 2,
            buttonWidth,
            buttonHeight,
            borderRadius
        );

        // 🔤 Step 2: Add Button Text
        this.startText = this.add
            .text(buttonX, buttonY, buttonText, {
                fontSize: fontSize,
                color: textColor,
                fontStyle: "bold",
            })
            .setOrigin(0.5)
            .setInteractive();
        this.startText.on("pointerdown", () => {
            this.scene.start("Game");
        });

        EventBus.emit("current-scene-ready", this);
    }
}

