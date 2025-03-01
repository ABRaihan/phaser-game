import { Scene } from "phaser";
import { Bomb } from "../objects/bomb";
import { Platform } from "../objects/platform";
import { Player } from "../objects/player";
import { Star } from "../objects/star";

type OverlapObject =
  | Phaser.Physics.Arcade.Body
  | Phaser.Physics.Arcade.StaticBody
  | Phaser.Tilemaps.Tile
  | Phaser.Types.Physics.Arcade.GameObjectWithBody;

export class Game extends Scene {
  platforms: Platform;
  player: Player;
  stars: Star;
  bomb: Bomb;
  scoreText: Phaser.GameObjects.Text;
  score: number;
  gameOver: boolean;

  constructor() {
    super("Game");
  }

  create() {
    this.score = 0;
    this.gameOver = false;
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "background")
      .setScale(1, this.scale.height / 600);

    // create the game objects
    this.platforms = new Platform(this);
    this.player = new Player(this);
    this.stars = new Star(this);
    this.bomb = new Bomb(this);

    // add score text top left corner with white text
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      color: "#fff",
    });

    //  Collide the player, stars, and bomb with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bomb, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, then it's call collectStar method
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      undefined,
      this
    );

    //  Checks to see if the player collide with any of the bombs, then it's call hitBomb method
    this.physics.add.collider(
      this.player,
      this.bomb,
      this.hitBomb,
      undefined,
      this
    );
  }

  update() {
    if (this.gameOver) {
      return;
    }
    this.player.update();
  }

  collectStar(player: OverlapObject, star: OverlapObject) {
    if (!(star instanceof Phaser.Physics.Arcade.Sprite)) return;
    if (!(player instanceof Phaser.Physics.Arcade.Sprite)) return;

    // hide the start when player overlap
    star.disableBody(true, true);

    //  update score 10 for each star
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);

    // check if all stars are collected then create new stars
    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => {
        const star = child as Phaser.Physics.Arcade.Sprite;
        star.enableBody(true, star.x, 0, true, true);
        return true;
      });

      // Check if the player is on the left or right side of the screen. If player is on the left side, the bomb will be created on the right side and vice versa.
      const x =
        player.x < this.scale.width / 2
          ? Phaser.Math.Between(this.scale.width / 2, this.scale.width)
          : Phaser.Math.Between(0, this.scale.width / 2);

      const bomb = this.bomb.create(x, 50, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-250, 250), 50);
      bomb.allowGravity = false;
    }
  }

  hitBomb(player: OverlapObject) {
    if (!(player instanceof Phaser.Physics.Arcade.Sprite)) return;
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    this.gameOver = true;
    player.on("animationcomplete", () => {
      this.scene.restart();
      this.scene.start("GameOver");
    });
  }
}

