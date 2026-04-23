/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Castro Rodríguez <adrian.castro.46@ull.edu.es>
 * @author Bruno Morales Hernández <morales.hernandez.28@ull.edu.es>
 * @author Ezequiel Juan Canale Oliva <ezequiel.juan.11@ull.edu.es>
 * @since Apr 27 2026
 * @desc Lava
 */

import { Vector } from "../Vector.js";
import { Actor } from "./Actor.js";
import { Level } from "./Level.js";

/** @classdesc Represents a hazardous lava element in the game world. */
export class Lava extends Actor {
  private speed: Vector;
  private repeatPos: Vector;

  /**
   * @desc Creates a new Lava instance at the specified position with the given type.
   * @param pos - The initial position of the lava
   * @param ch - The character representing lava type
   */
  constructor(pos: Vector, ch: string) {
    super();
    this.position = pos;
    this.size = new Vector(1, 1);
    if (ch === "=") {
      this.speed = new Vector(2, 0);
      this.repeatPos = new Vector(0, 0);
    } else if (ch === "|") {
      this.speed = new Vector(0, 2);
      this.repeatPos = new Vector(0, 0);
    } else if (ch === "v") {
      this.speed = new Vector(0, 3);
      this.repeatPos = this.getPosition();
    } else {
      this.speed = new Vector(0, 0);
      this.repeatPos = new Vector(0, 0);
    }
    this.setType("lava");
  }

  /**
   * @desc Updates the lava's position based on its movement pattern.
   * @param step - Time step in seconds since the last frame
   * @param level - Reference to the current level for collision detection
   */
  act(step: number, level: Level) {
    const newPos = this.getPosition().plus(this.speed.times(step));
    if (!level.obstacleAt(newPos, this.getSize())) {
      this.position = newPos;
    } else if (this.repeatPos && this.speed.y > 0) {
      this.position = this.repeatPos;
    } else {
      this.speed = this.speed.times(-1);
    }
  }
}
