import { Rectangle, Sprite } from "./pixi-alias";

/**
 * Functions for collision detection
 */

/**
 * Constrains a Sprite's position to keep it within bounds
 * @param s the sprite to constrain
 * @param minX minimum x position
 * @param maxX maximum x position
 * @param minY minimum y position
 * @param maxY maximum y position
 */
export function constrainSpritePosition(
    s: Sprite, minX: number, maxX: number, minY: number, maxY: number): void {
  if (s.x < minX) {
    s.x = minX;
  } else if (s.x > maxX) {
    s.x = maxX;
  }
  if (s.y < minY) {
    s.y = minY;
  } else if (s.y > maxY) {
    s.y = maxY;
  }
}

 /**
  * Return whether or not s1 and s2 overlap based on their rectangular texture
  * @param r1 first sprite
  * @param r2 second sprite
  */
export function spriteCollision(s1: Sprite, s2: Sprite): boolean {
  return lineOverlap(s1.x, s1.x + s1.width, s2.x, s2.x + s2.width)
      && lineOverlap(s1.y, s1.y + s1.height, s2.y, s2.y + s2.height);
}

 /**
  * Return whether or not two Rectangles r1 and r2 overlap
  * @param r1 first rectangle
  * @param r2 second rectangle
  */
export function rectangleCollision(r1: Rectangle, r2: Rectangle): boolean {
  return lineOverlap(r1.x, r1.x + r1.width, r2.x, r2.x + r2.width)
      && lineOverlap(r1.y, r1.y + r1.height, r2.y, r2.y + r2.height);
}

/**
 * Checks whether or not two lines on a 1-D axis overlap
 * @param a1 value of line a
 * @param a2 other value of line a
 * @param b1 value of line b
 * @param b2 other value of line b
 *
 * 1 and 2 don't have to be ordered. This function checks that too.
 */
function lineOverlap(a1: number, a2: number, b1: number, b2: number): boolean {
  // Order the 1 and 2 so that 1 < 2
  let c1 = a1;
  let c2 = a2;
  if (a1 > a2) {
    c1 = a2;
    c2 = a1;
  }
  let d1 = b1;
  let d2 = b2;
  if (b1 > b2) {
    d1 = b2;
    d2 = b1;
  }

  // Two ways to not overlap
  // 1--c--2
  //        1---d----2

  // 1---d----2
  //             1--c--2

  // All other ways are overlap
  return !(c2 <= d1 || d2 <= c1);  // just touching doesn't count as overlap
}
