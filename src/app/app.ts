import "./../styles/app.css";
import { create as createExplorer } from "./containers/explorer";
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
  // TODO: set things up
  console.log("set up successful");

  /** Alias to point to the texture atlas's textures object */
  const id = loader.resources[TREASURE_HUNTER_PATH].textures;

  const dungeon = new Sprite(id["dungeon.png"]);
  app.stage.addChild(dungeon);

  const explorer = createExplorer(id["explorer.png"]);
  explorer.position.set(68, app.stage.height / 2 - explorer.height / 2);
  app.stage.addChild(explorer);
}

// load the texture we need
// PIXI.loader.add('bunny', 'bunny.png').load((loader, resources) => {
//   // This creates a texture from a 'bunny.png' image
//   const bunny = new PIXI.Sprite(resources.bunny.texture);

//   // Setup the position of the bunny
//   bunny.x = app.renderer.width / 2;
//   bunny.y = app.renderer.height / 2;

//   // Rotate around the center
//   bunny.anchor.x = 0.5;
//   bunny.anchor.y = 0.5;

//   // Add the bunny to the scene we are building
//   app.stage.addChild(bunny);

//   // Listen for frame updates
//   app.ticker.add(() => {
//     // each frame we spin the bunny around a bit
//     bunny.rotation += 0.01;
//   });
// });
