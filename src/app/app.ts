import "./../styles/app.css";
import { create as createBlob } from "./containers/blob";
import { create as createDoor } from "./containers/door";
import { create as createExplorer } from "./containers/explorer";
import { create as createTreasure } from "./containers/treasure";
import { randRange } from "./helpers";
import {
  Application,
  loader,
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

function setup() {
  /** Alias to point to the texture atlas's textures object */
  const id = loader.resources[TREASURE_HUNTER_PATH].textures;

  // create and add the sprites
  const dungeon = new Sprite(id["dungeon.png"]);
  app.stage.addChild(dungeon);

  const explorer = createExplorer(id["explorer.png"]);
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

  for (let i = 0; i < NUM_BLOBS; i++) {
    const blob = createBlob(id["blob.png"]);
    const x = BLOB_SPACING * i + BLOB_X_OFFSET;
    // Give the blob a random y position
    const y = randRange(0 + blob.height, app.stage.height - (blob.height * 2));
    blob.position.set(x, y);
    app.stage.addChild(blob);
  }
}
