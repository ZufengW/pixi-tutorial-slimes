import {
  Sprite,
  Texture,
} from "../pixi-alias";

export function create(texture: Texture): Sprite {
  const blob = new Sprite(texture);
  // TODO: add update function
  return blob;
}
