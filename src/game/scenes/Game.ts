import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import { Player } from "../objects/player";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player: Player;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    stars: Phaser.Physics.Arcade.Group;
    bombs: Phaser.Physics.Arcade.Group;
    scoreText: Phaser.GameObjects.Text;
    score: number;
    gameOver: boolean;

    constructor() {
        super("Game");
    }

    createPlatforms() {
        //  The platforms group contains the ground and the 3 ledges we can jump on
        this.platforms = this.physics.add.staticGroup();

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.platforms.create(400, 568, "ground").setScale(2).refreshBody();

        //  Now let's create some ledges
        this.platforms.create(600, 400, "ground");
        this.platforms.create(50, 250, "ground");
        this.platforms.create(750, 220, "ground");
    }

    createPlayer() {
        // The player and its settings
        this.player = this.physics.add.sprite(100, 450, "dude");

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
    }

    setupPlayerAnimation() {
        //  Our player animations, turning, walking left and walking right.
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

    createStar() {
        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        this.stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        this.stars.children.iterate((child) => {
            //  Give each star a slightly different bounce
            const star = child as Phaser.Physics.Arcade.Sprite;
            star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return true;
        });
    }

    createCollider() {
        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
    }

    create() {
        this.score = 0;
        this.gameOver = false;
        this.background = this.add.image(400, 300, "background");

        this.createPlatforms();
        // this.createPlayer();
        // this.setupPlayerAnimation();
        this.player = new Player(this);
        this.createStar();

        // add score text top left corner with white text
        this.scoreText = this.add.text(16, 16, "score: 0", {
            fontSize: "32px",
            color: "#fff",
        });

        //  Input Events
        this.cursors = this.input.keyboard?.createCursorKeys();

        this.bombs = this.physics.add.group();

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb);

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        if (this.gameOver) {
            return;
        }
        this.player.update();

        // if (this.cursors) {
        //     if (this.cursors.left.isDown) {
        //         this.player.setVelocityX(-160);

        //         this.player.anims.play("left", true);
        //     } else if (this.cursors.right.isDown) {
        //         this.player.setVelocityX(160);

        //         this.player.anims.play("right", true);
        //     } else {
        //         this.player.setVelocityX(0);

        //         this.player.anims.play("turn");
        //     }

        //     if (this.cursors.up.isDown && this.player.body?.touching.down) {
        //         this.player.setVelocityY(-330);
        //     }
        // }
    }

    collectStar(player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);

        if (this.stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            this.stars.children.iterate((child) => {
                const star = child as Phaser.Physics.Arcade.Sprite;
                star.enableBody(true, star.x, 0, true, true);
                return true;
            });

            const x =
                player.x < 400
                    ? Phaser.Math.Between(400, 800)
                    : Phaser.Math.Between(0, 400);

            const bomb = this.bombs.create(x, 16, "bomb");
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }
    }

    hitBomb(player: Phaser.Physics.Arcade.Sprite) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play("turn");

        this.gameOver = true;
        player.on("animationcomplete", () => {
            this.scene.restart();
            this.scene.start("GameOver");
        });
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}

