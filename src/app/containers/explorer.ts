import { setupMoveKeys } from "../input";
import {
  MovingSprite,
  Rectangle,
  Texture,
} from "../pixi-alias";

export class Explorer extends MovingSprite {
  public isHit: boolean = false;
  private speed: number = 0;

  constructor(texture: Texture, speed: number) {
    super(texture);
    this.speed = speed;
    this.hitArea = new Rectangle(0, 0, this.width, this.height);

    setupMoveKeys(this, this.speed);
  }

  public update(delta: number): void {
    // tint differently if hurt
    if (this.isHit) {
      this.tint = 0xff0000;
    } else {
      this.tint = 0xffffff;
    }
  }
}
