import {
  Sprite,
  Texture,
} from "../pixi-alias";

export function create(texture: Texture): Sprite {
  const treasure = new Sprite(texture);
  // TODO: add update function
  return treasure;
}
