/**
 * PIXI aliases
 */
import * as PIXI from "pixi.js";

import Application = PIXI.Application;
import loader = PIXI.loader;
class Sprite extends PIXI.Sprite {
  public update(delta: number): void {
    return;
  }
}
import Texture = PIXI.Texture;
import utils = PIXI.utils;

export {
  Application,
  loader,
  Sprite,
  Texture,
  utils,
};
