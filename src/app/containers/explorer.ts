import {
  Application,
  loader,
  Sprite,
  Texture,
  utils,
} from "../pixi-alias";

export function create(texture: Texture): Sprite {
  const explorer = new Sprite(texture);
  // TODO: add keyboard stuff and update function
  return explorer;
}
