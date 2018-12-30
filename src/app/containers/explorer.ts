import {
  Sprite,
  Texture,
} from "../pixi-alias";

export function create(texture: Texture): Sprite {
  const explorer = new Sprite(texture);
  // TODO: add keyboard stuff and update function
  return explorer;
}
