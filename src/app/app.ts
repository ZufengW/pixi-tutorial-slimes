import "./../styles/app.css";
import {
  constrainSpritePosition,
  spriteCollision,
} from "./collision";
import { Blob } from "./containers/blob";
import { create as createDoor } from "./containers/door";
import { Explorer } from "./containers/explorer";
import { HealthBar } from "./containers/health-bar";
import { Treasure } from "./containers/treasure";
import { randRange } from "./helpers";
import {
  Application,
  loader,
  MovingSprite,
  Sprite,
  Text,
  TextStyle,
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
document.getElementById("canvas-div").appendChild(app.view);
/** p node for displaying loading messages */
const loadingP = document.getElementById("loading-p");

const TREASURE_HUNTER_PATH = "./assets/treasureHunter.json";

// Load the assets
loader
  .add(TREASURE_HUNTER_PATH)
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(load, resource) {
  loadingP.textContent = ("loading: " + resource.url);
  loadingP.textContent = ("progress: " + load.progress + "%");
}

// Things used in the game
let gameState: (delta: number) => void;
let door: Sprite;  // exit door
let explorer: Explorer;  // the player
let treasure: Treasure;  // treasure chest
let healthBar: HealthBar;  // player's health bar
const blobs: MovingSprite[] = [];
// Messages displayed when game ends
const WIN_MESSAGE = "You Win!";
const LOSE_MESSAGE = "You Lose!";
let endTextMessage: Text;  // message displayed at the end
// Wall boundaries of dungeon.png
const DUNGEON_MIX_X = 32;
const DUNGEON_MAX_X = 512 - 32;
const DUNGEON_MIN_Y = 20;
const DUNGEON_MAX_Y = 480;
const EXPLORER_SPEED = 4;

function setup() {
  // clear the loadingP
  loadingP.textContent = "";

  /** Alias to point to the texture atlas's textures object */
  const id = loader.resources[TREASURE_HUNTER_PATH].textures;

  // create and add the sprites
  const dungeon = new Sprite(id["dungeon.png"]);
  app.stage.addChild(dungeon);

  // Make the exit door
  door = createDoor(id["door.png"]);
  door.position.set(32, 0);
  app.stage.addChild(door);

  explorer = new Explorer(id["explorer.png"], EXPLORER_SPEED);
  explorer.position.set(68, app.stage.height / 2 - explorer.height / 2);
  app.stage.addChild(explorer);

  treasure = new Treasure(id["treasure.png"]);
  // Position the treasure next to the right edge of the canvas
  treasure.x = app.stage.width - treasure.width - 48;
  treasure.y = app.stage.height / 2 - treasure.height / 2;
  app.stage.addChild(treasure);

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

  // Create the health bar
  healthBar = new HealthBar(40);
  healthBar.position.set(app.stage.width - 170, 4);
  app.stage.addChild(healthBar);  // TODO: replace with gameScene.addChild

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
 * The Play game state. Playable.
 * @param delta frame time difference
 */
function play(delta: number) {
  explorer.update(delta);
  blobs.forEach((blob) => {
    blob.update(delta);
  });

  explorer.isHit = false;  // reset

  // postUpdate to update positions using velocity
  explorer.postUpdate(delta);
  blobs.forEach((blob) => {
    blob.postUpdate(delta);

    // Check for overlap between explorer and blob
    if (spriteCollision(explorer, blob)) {
      explorer.isHit = true;
      healthBar.addHealth(-1);  // subtract health
      if (healthBar.health <= 0) {
        // lose condition
        gameState = end;
        endTextMessage = showEndMessage(LOSE_MESSAGE);
      }
    }
  });

  // Constrain explorer to keep it within walls
  constrainSpritePosition(
    explorer, DUNGEON_MIX_X, DUNGEON_MAX_X - explorer.width,
    DUNGEON_MIN_Y, DUNGEON_MAX_Y - explorer.height,
  );

  // If explorer and treasure overlap, treasure is held by player
  if (spriteCollision(explorer, treasure)) {
    treasure.holder = explorer;
  }
  // update treasure's position after player has finished updating
  treasure.postUpdate(delta);

  // Check if treasure has reached door
  if (spriteCollision(treasure, door)) {
    // win condition
    gameState = end;
    endTextMessage = showEndMessage(WIN_MESSAGE);
  }
}

/**
 * The end game state
 * @param delta
 */
function end(delta: number) {
  // grand entrance for the end message
  const style = endTextMessage.style;
  const MAX_FONT_SIZE = 100;
  const ROTATION_SPEED = 0.15;
  if (typeof style.fontSize === "number" && style.fontSize < MAX_FONT_SIZE) {
    style.fontSize += 2;
  }
  const TWO_PI = Math.PI * 2;
  if (endTextMessage.rotation < TWO_PI) {
    endTextMessage.rotation += ROTATION_SPEED;
    if (endTextMessage.rotation > TWO_PI) {
      endTextMessage.rotation = TWO_PI;
    }
  }
}

function showEndMessage(message: string): Text {
  const style = new TextStyle({
    fontFamily: "Futura",
    fontSize: 16,
    fill: "white",
    stroke: "#000000",
    strokeThickness: 6,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowDistance: 6,
  });
  const textMessage = new Text(message, style);
  textMessage.anchor.set(0.5, 0.5);  // anchor right in the middle for spinning
  textMessage.rotation = 0.1;
  textMessage.x = app.stage.width / 2;
  textMessage.y = app.stage.height / 2;
  app.stage.addChild(textMessage);
  return textMessage;
}
