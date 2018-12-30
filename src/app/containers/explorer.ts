import { setupMoveKeys } from "../input";
import {
  MovingSprite,
  Texture,
} from "../pixi-alias";

export class Explorer extends MovingSprite {
  private speed: number = 0;

  constructor(texture: Texture, speed: number) {
    super(texture);
    this.speed = speed;

    setupMoveKeys(this, this.speed);
  }

  public update(delta: number): void {
    // TODO: add keyboard stuff
    this.x += this.dx * delta;
    this.y += this.dy * delta;
  }
}
