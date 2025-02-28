import { Scene } from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

    constructor(scene: Scene) {
        super(scene, 100, 450, "dude");
        this.cursors = this.scene.input.keyboard?.createCursorKeys();

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)

        //  Player physics properties. Give the little guy a slight bounce.
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    public update(): void {
        if (!this.cursors) return;
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);

            this.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160);

            this.anims.play("right", true);
        } else {
            this.setVelocityX(0);

            this.anims.play("turn");
        }

        if (this.cursors.up.isDown && this.body?.touching.down) {
            this.setVelocityY(-330);
        }
    }
}
