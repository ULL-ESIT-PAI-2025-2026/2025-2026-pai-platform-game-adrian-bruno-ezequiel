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
 * @desc Coin
 */

import { Actor } from "./Actor.js";
import { Vector } from "../Vector.js";

/** @classdesc Represents a collectible coin in the game world. */
export class Coin extends Actor {
  private basePos: Vector;
  private wobble: number;
  /**
   * @desc Creates a new Coin instance at the specified position.
   * @param pos - The base position where the coin should be placed
   */
  constructor(pos: Vector) {
    super();
    this.basePos = pos.plus(new Vector(0.2, 0.1));
    this.position = this.basePos;
    this.size = new Vector(0.6, 0.6);
    this.wobble = Math.random() * Math.PI * 2;
    this.setType("coin");
  }

  /**
   * @desc Updates the coin's animation state for the current frame.
   * @param step - Time step in seconds since the last frame
   */
  act(step: number) {
    const wobbleSpeed = 8;
    const wobbleDist = 0.07;
    this.wobble += step * wobbleSpeed;
    const wobblePos = Math.sin(this.wobble) * wobbleDist;
    this.setPosition(this.basePos.plus(new Vector(0, wobblePos)));
  }
}
