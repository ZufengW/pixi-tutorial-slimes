/**
 * PIXI aliases
 */
import * as PIXI from "pixi.js";

import Application = PIXI.Application;
import loader = PIXI.loader;
/**
 * Has velocity and update
 */
class MovingSprite extends PIXI.Sprite {
  public dx: number = 0;
  public dy: number = 0;

  public update(delta: number): void {
    return;
  }
}
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import utils = PIXI.utils;

export {
  Application,
  loader,
  MovingSprite,
  Sprite,
  Texture,
  utils,
};
