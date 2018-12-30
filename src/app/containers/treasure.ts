import {
  MovingSprite,
  Texture,
} from "../pixi-alias";

export class Treasure extends MovingSprite {
  public holder: MovingSprite = null;

  constructor(texture: Texture) {
    super(texture);
  }

  // update does nothing

  public postUpdate(delta: number) {
    if (this.holder) {
      // move to holder's position
      const pos = this.holder.position;
      this.position.set(pos.x + 8, pos.y + 8);
    }
  }
}
