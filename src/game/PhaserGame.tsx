import { forwardRef, useLayoutEffect, useRef } from "react";
import CreateGame from "./main";

// define interface the structure of the ref object
export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

// using forwardRef to pass a ref to the parent component for change in game outside of game canvas
export const PhaserGame = forwardRef<IRefPhaserGame>(function PhaserGame(
  _,
  ref
) {
  // useRef to hold the Phaser.Game instance
  const game = useRef<Phaser.Game | null>(null!);

  // initialize the game when the component mounts and before the painting in browser
  useLayoutEffect(() => {
    if (game.current === null) {
      // Create game and assign it to the game ref
      game.current = CreateGame("game-container");

      // Assign the game instance to the ref passed from the parent
      if (typeof ref === "function") {
        ref({ game: game.current, scene: null });
      } else if (ref) {
        ref.current = { game: game.current, scene: null };
      }
    }

    // Cleanup function to destroy the game instance when the component unmounts
    return () => {
      if (game.current) {
        game.current.destroy(true);
        if (game.current !== null) {
          game.current = null;
        }
      }
    };
  }, [ref]);

  // this will contain the Phaser game
  return <div id="game-container"></div>;
});

