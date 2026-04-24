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
 * @desc Lives
 */

import { Actor } from './Actor.js';
import { Vector } from '../Vector.js';

/** @classdesc Represents a UI element that displays the player's remaining lives. */
export class Lives extends Actor {
  
  /**
   * @desc Creates a new Lives UI element at the specified position.
   * @param pos - The position vector where the life indicator should be placed
   */
  constructor(pos: Vector) {
    super();
    this.position = pos;
    this.size = new Vector(1, 1);
    this.type = 'lives';
  }

  /** @desc Updates the Lives UI element (no behavior needed). */
  act() {}
}
