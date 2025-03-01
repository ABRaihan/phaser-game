# Phaser Game Demo

A dynamic 2D platformer game built with Phaser 3, React, and TypeScript, demonstrating seamless React-Phaser communication powered by Vite.

**[Github repository](https://github.com/phaserjs/template-react)**

### Versions

This template has been updated for:

- [Phaser 3.88.2](https://github.com/phaserjs/phaser)
- [React 18.2.0](https://github.com/facebook/react)
- [Vite 5.3.1](https://github.com/vitejs/vite)
- [TypeScript 5.2.2](https://github.com/microsoft/TypeScript)

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `pnpm`.

## Available Commands

| Command                | Description                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `pnpm install`         | Install project dependencies                                                                             |
| `pnpm run dev`         | Launch a development web server                                                                          |
| `pnpm run build`       | Create a production build in the `dist` folder                                                           |
| `pnpm run dev-nolog`   | Launch a development web server without sending anonymous data (see "About log.js" below)                |
| `pnpm run build-nolog` | Create a production build in the `dist` folder without sending anonymous data (see "About log.js" below) |

## Writing Code

After cloning the repo, run `pnpm install` from your project directory. Then, you can start the local development server by running `pnpm run dev`.

The local development server runs on `http://localhost:8080` by default. Please see the Vite documentation if you wish to change this, or add SSL support.

Once the server is running you can edit any of the files in the `src` folder. Vite will automatically recompile your code and then reload the browser.

## Template Project Structure

We have provided a default project structure to get you started. This is as follows:

- `index.html` - A basic HTML page to contain the game.
- `src` - Contains the React client source code.
- `src/main.tsx` - The main **React** entry point. This bootstraps the React application.
- `src/vite-env.d.ts` - Global TypeScript declarations, provide types information.
- `src/App.tsx` - The main React component.
- `src/game/PhaserGame.tsx` - The React component that initializes the Phaser Game and serve like a bridge between React and Phaser.
- `src/game` - Contains the game source code.
- `src/game/main.tsx` - The main **game** entry point. This contains the game configuration and start the game.
- `src/game/objects/` - The Phaser game all objects are in this folder.
- `src/game/scenes/` - The Phaser Scenes are in this folder.
- `public/style.css` - Some simple CSS rules to help with page layout.
- `public/assets` - Contains the static assets used by the game.

## Features

🚀 **Core Gameplay**

- Responsive character movement (Arrows)
- Collectible star system with score tracking
- Bomb obstacle mechanics with collision detection
- Multiple game scenes (Boot, Preloader, Main Menu, Game, Game Over)

