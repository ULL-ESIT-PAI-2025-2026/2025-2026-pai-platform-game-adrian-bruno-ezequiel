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
 * @desc Provides the core actor abstraction with shared state, collision
 * checks, and the update interface for all game entities.
 */
import { Vector } from '../Vector.js';
/** @classdesc Provides common functionality for all game actors. */
export class Actor {
    constructor() {
        this.position = new Vector(0, 0);
        this.size = new Vector(0, 0);
        this.type = '';
    }
    /**
     * @desc Gets the type of this actor.
     * @returns The actor's type (e.g., 'player', 'coin', 'lava')
     */
    getType() {
        return this.type;
    }
    /**
     * @desc ets the position of the actor.
     * @param pos - The new position vector
     */
    setPosition(pos) {
        this.position = pos;
    }
    /**
     * @desc Sets the size (dimensions) of the actor.
     * @param size - The new size vector
     */
    setSize(size) {
        this.size = size;
    }
    /**
     * @desc Sets the type of the actor.
     * @param type - The new actor type
     */
    setType(type) {
        this.type = type;
    }
    /**
     * @desc Checks if this actor overlaps with another actor.
     * @param other - The other actor to check collision against
     * @returns `true` if the actors' bounding boxes intersect, `false` otherwise
     */
    overlaps(other) {
        return (this.position.x + this.size.x > other.getPosition().x &&
            this.position.x < other.getPosition().x + other.getSize().x &&
            this.position.y + this.size.y > other.getPosition().y &&
            this.position.y < other.getPosition().y + other.getSize().y);
    }
    /**
     * @desc Gets the current position of the actor.
     * @returns The position vector of the actor
     */
    getPosition() {
        return this.position;
    }
    /**
     * @desc Gets the current size (dimensions) of the actor.
     * @returns The size vector of the actor
     */
    getSize() {
        return this.size;
    }
}
