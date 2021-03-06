import {
  Container,
  Graphics,
} from "../pixi-alias";

const BAR_WIDTH = 128;

export class HealthBar extends Container {
  public outer: Graphics;
  public maxHealth: number;
  /** Current health */
  public health: number;

  constructor(maxHealth: number) {
    super();

    this.maxHealth = maxHealth;
    this.health = maxHealth;

    // Create the black background rectangle
    const innerBar = new Graphics();
    innerBar.beginFill(0x000000);
    innerBar.drawRect(0, 0, BAR_WIDTH, 8);
    innerBar.endFill();
    this.addChild(innerBar);

    // Create the front red rectangle
    const outerBar = new Graphics();
    outerBar.beginFill(0xFF3300);
    outerBar.drawRect(0, 0, BAR_WIDTH, 8);
    outerBar.endFill();
    this.addChild(outerBar);

    this.outer = outerBar;
  }

  /**
   * Change the health value. Can also add a negative amount of health.
   * @param num amount of health to add.
   */
  public addHealth(num: number) {
    this.health += num;
    // Update the appearance of the bar. Don't allow going negative
    const convertedHealth = this.health > 0 ? this.health : 0;
    this.outer.width = (convertedHealth / this.maxHealth) * BAR_WIDTH;
  }
}
