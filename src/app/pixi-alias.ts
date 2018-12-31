/**
 * PIXI aliases
 */
import * as PIXI from "pixi.js";

import Application = PIXI.Application;
import Container = PIXI.Container;
import Graphics = PIXI.Graphics;
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

  /**
   * Updates position using velocity. Call this after update().
   * @param delta frame time
   */
  public postUpdate(delta: number): void {
    this.x += this.dx * delta;
    this.y += this.dy * delta;
  }
}
import Rectangle = PIXI.Rectangle;
import Sprite = PIXI.Sprite;
import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;
import Texture = PIXI.Texture;
import utils = PIXI.utils;

export {
  Application,
  Container,
  Graphics,
  loader,
  MovingSprite,
  Rectangle,
  Sprite,
  Text,
  TextStyle,
  Texture,
  utils,
};
