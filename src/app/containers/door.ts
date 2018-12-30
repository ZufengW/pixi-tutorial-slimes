import {
  Sprite,
  Texture,
} from "../pixi-alias";

export function create(texture: Texture): Sprite {
  const door = new Sprite(texture);
  // TODO: add update function
  return door;
}
