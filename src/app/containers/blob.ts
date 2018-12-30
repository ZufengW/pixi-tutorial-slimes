import {
  MovingSprite,
  Texture,
} from "../pixi-alias";

export class Blob extends MovingSprite {
  private direction: number = 0;
  private speed: number = 0;
  private minY: number;
  private maxY: number;

  constructor(texture: Texture, direction: number,
              speed: number, minY: number, maxY: number) {
    super(texture);
    this.direction = direction;
    this.speed = speed;
    this.minY = minY;
    this.maxY = maxY;
  }

  public update(delta: number): void {
    // check if need to change direction
    if (this.direction === 1 && this.y > this.maxY - this.height) {
      this.direction *= -1;
    } else if (this.direction === -1 && this.y < this.minY) {
      this.direction *= -1;
    }

    this.dy = this.direction * this.speed;
    this.y += this.dy * delta;
  }
}
