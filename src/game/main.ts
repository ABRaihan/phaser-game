import { AUTO, Game, Scale } from "phaser";
import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 720,
  height: 1280,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false,
    },
  },
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

const CreateGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default CreateGame;

