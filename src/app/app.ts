import "./../styles/app.css";
import { Blob } from "./containers/blob";
import { create as createDoor } from "./containers/door";
import { Explorer } from "./containers/explorer";
import { create as createTreasure } from "./containers/treasure";
import { randRange } from "./helpers";
import {
  Application,
  loader,
  MovingSprite,
  Sprite,
  utils,
} from "./pixi-alias";

let type: string = "WebGL";
if (!utils.isWebGLSupported()) {
  type = "canvas";
}
utils.sayHello(type);

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application({width: 512, height: 512});
app.renderer.autoResize = true;
app.renderer.resize(512, 512);

// The app creates a canvas element for you that you
// can then insert into the DOM
document.getElementById("container").appendChild(app.view);

const TREASURE_HUNTER_PATH = "./assets/treasureHunter.json";

// Load the assets
loader
  .add(TREASURE_HUNTER_PATH)
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(load, resource) {
  console.log("loading: " + resource.url);
  console.log("progress: " + load.progress + "%");
}

let gameState: (delta: number) => void;
let explorer: Explorer;  // the player
const blobs: MovingSprite[] = [];
// Wall boundaries of dungeon.png
const DUNGEON_MIX_X = 32;
const DUNGEON_MAX_X = 32;
const DUNGEON_MIN_Y = 20;
const DUNGEON_MAX_Y = 480;
const EXPLORER_SPEED = 4;

function setup() {
  /** Alias to point to the texture atlas's textures object */
  const id = loader.resources[TREASURE_HUNTER_PATH].textures;

  // create and add the sprites
  const dungeon = new Sprite(id["dungeon.png"]);
  app.stage.addChild(dungeon);

  explorer = new Explorer(id["explorer.png"], EXPLORER_SPEED);
  explorer.position.set(68, app.stage.height / 2 - explorer.height / 2);
  app.stage.addChild(explorer);

  const treasure = createTreasure(id["treasure.png"]);
  // Position the treasure next to the right edge of the canvas
  treasure.x = app.stage.width - treasure.width - 48;
  treasure.y = app.stage.height / 2 - treasure.height / 2;
  app.stage.addChild(treasure);

  // Make the exit door
  const door = createDoor(id["door.png"]);
  door.position.set(32, 0);
  app.stage.addChild(door);

  // Make a line of blobs
  const NUM_BLOBS = 6;
  const BLOB_SPACING = 48;  // spacing between blobs
  const BLOB_X_OFFSET = 150;  // distance from left of stage for first blob
  const BLOB_SPEED = 4;  // how fast the blobs move

  for (let i = 0; i < NUM_BLOBS; i++) {
    const direction = i % 2 === 0 ? 1 : -1;
    const blob = new Blob(id["blob.png"], direction, BLOB_SPEED, DUNGEON_MIN_Y, DUNGEON_MAX_Y);
    const x = BLOB_SPACING * i + BLOB_X_OFFSET;
    // Give the blob a random y position
    const y = randRange(0 + blob.height, app.stage.height - (blob.height * 2));
    blob.position.set(x, y);
    app.stage.addChild(blob);
    blobs.push(blob);
  }

  // Start the game loop by adding the `gameLoop` function to
  // Pixi's `ticker` and providing it with a `delta` argument.
  gameState = play;
  app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta: number) {
  // Update the current game state
  gameState(delta);
}

/**
 * Playing
 * @param delta frame time difference
 */
function play(delta: number) {
  explorer.update(delta);
  blobs.forEach((blob) => {
    blob.update(delta);
  });
}
