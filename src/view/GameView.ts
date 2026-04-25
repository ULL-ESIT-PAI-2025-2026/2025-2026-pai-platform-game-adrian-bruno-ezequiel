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
 * @desc GameView
 */

import { Vector } from '../Vector.js';
import { Status } from '../model/Level.js';
import { ActorView } from './ActorView.js';
import { PlayerView } from './PlayerView.js';
import { ActorType } from '../model/Actor.js';
import { CanvasDisplay } from './CanvasDisplay.js';

// Re-export display types for convenience
export { CanvasDisplay } from './CanvasDisplay.js';

export type DisplayType = 'canvas' | 'dom';

/** @classdesc Single entry-point to the view layer. */
export class GameView {
  private canvasDisplay: CanvasDisplay | undefined;
  private readonly canvas: HTMLCanvasElement;
  private readonly displayType: DisplayType;

  /** @desc Creates a new GameView instance with injected rendering dependencies. */
  constructor(canvas: HTMLCanvasElement, displayType: DisplayType = 'canvas') {
    this.canvas = canvas;
    this.displayType = displayType;
  }

  /**
   * @desc Creates (or recreates) the display for a given level.
   * @param width - Width of the level in grid units
   * @param height - Height of the level in grid units
   */
  mount(width: number, height: number): void {
    if (this.displayType !== 'canvas') {
      throw new Error(`GameView: unsupported display type "${this.displayType}"`);
    }
    this.unmount();
    this.canvasDisplay = new CanvasDisplay(this.canvas, width, height);
  }

  /** @desc Removes the current display and cleans up resources. */
  unmount(): void {
    if (this.canvasDisplay) {
      //this.canvasDisplay.clear();
    }
  }

  /**
   * @desc Renders one complete frame of the game.
   * @param step - Time step in seconds (for animation timing)
   * @param center - Center position for viewport (typically player position)
   * @param actors - Array of dynamic actors to render (coins, lava, etc.)
   * @param uiElements - Array of UI elements to render (score, lives)
   * @param playerView - Player data for rendering (position, size, speed)
   * @param worldWidth - Total world width in grid units
   * @param worldHeight - Total world height in grid units
   * @param numberOfCoins - Total coins in the level
   * @param numberOfCollectedCoins - Coins collected so far
   * @param status - Current level status (won/lost/null)
   * @param grid - Level grid for background tiles (walls, lava floors)
   * @throws {Error} If no display is mounted before calling drawFrame
   */
  drawFrame(
    step: number, center: Vector,
    actors: ActorView[], uiElements: ActorView[], playerView: PlayerView,
    worldWidth: number, worldHeight: number,
    numberOfCoins: number, numberOfCollectedCoins: number,
    status: Status,
    grid: ActorType[][]
  ): void {
    if (!this.canvasDisplay) throw new Error('GameView: no display mounted');
    this.canvasDisplay.drawFrame(
      step,
      center,
      worldWidth,
      worldHeight,
      actors,
      uiElements,
      playerView, 
      numberOfCoins,
      numberOfCollectedCoins,
      status,
      grid,
    );
  }
}
