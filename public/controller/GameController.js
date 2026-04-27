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
 * @desc Coordinates the game flow between model and view, handling input,
 * animation frames, level progression, and sound playback.
 */
import { AudioManager } from '../view/AudioManager.js';
/** @classdesc Acts as the central controller in an MVC architecture. */
export class GameController {
    /**
     * @desc Creates a new game controller instance.
     * @param model - Game model instance
     * @param view - Game view instance
     */
    constructor(model, view) {
        this.lastTime = null;
        this.animationFrameId = null;
        this.keys = Object.create(null);
        this.keyHandlerCleanup = null;
        this.model = model;
        this.view = view;
        this.setupKeyTracking();
        this.audioManager = new AudioManager();
        globalThis.addEventListener('keydown', () => {
            this.audioManager.playBackground();
        }, { once: true });
    }
    /** @desc Starts the game from level 0 with initial lives. */
    start() {
        this.startLevel(0, 3);
    }
    /** @desc Tears down the game controller and releases resources. */
    destroy() {
        this.stopAnimation();
        this.view.unmount();
        this.keyHandlerCleanup?.();
    }
    /**
     * @desc Starts a specific level with the given number of lives.
     * @param index - Level index to start (0-based)
     * @param lives - Number of lives to start with
     */
    startLevel(index, lives) {
        this.stopAnimation();
        const level = this.model.reset(lives); // resets lives counter to `lives`
        // reset() always goes to index 0; for other indices use loadLevel directly
        const currentLevel = index === 0 ? level : this.model.loadLevel(index);
        this.model.bindSoundEvent((soundType) => {
            this.audioManager.play(soundType);
        });
        this.view.mount(currentLevel.getWidth(), currentLevel.getHeight());
        this.runAnimation();
    }
    /**
     * @desc Handles level completion (win or loss).
     * @param status - Completion status ('won' or 'lost')
     */
    onLevelFinished(status) {
        this.view.unmount();
        if (status === 'lost') {
            this.model.loseLife();
            if (!this.model.getHasLivesRemaining()) {
                this.audioManager.play('gameOver');
                // Game over → restart from level 0 with 3 lives
                setTimeout(() => this.startLevel(0, 3), 0);
                return;
            }
            // Retry same level with one fewer life
            const level = this.model.reloadCurrentLevel();
            level.setLives(this.model.getLives());
            this.view.mount(level.getWidth(), level.getHeight());
            this.runAnimation();
            return;
        }
        if (this.model.getIsLastLevel()) {
            this.audioManager.play('levelClear');
            setTimeout(() => this.startLevel(0, 3), 0);
            return;
        }
        const level = this.model.loadNextLevel();
        this.view.mount(level.getWidth(), level.getHeight());
        this.runAnimation();
    }
    /** @desc Starts the main animation loop using requestAnimationFrame. */
    runAnimation() {
        this.lastTime = null;
        const frame = (time) => {
            if (this.lastTime === null) {
                this.lastTime = time;
                this.animationFrameId = requestAnimationFrame(frame);
                return;
            }
            const step = Math.min(time - this.lastTime, 100) / 1000;
            if (this.keys['esc']) {
                this.lastTime = time;
                this.animationFrameId = requestAnimationFrame(frame);
                return;
            }
            this.model.animate(step, this.keys);
            const currentLevel = this.model.getCurrentLevel();
            const actorsView = currentLevel.getActors()
                .map((actor) => ({
                type: actor.getType(),
                position: actor.getPosition(),
                size: actor.getSize(),
            }));
            const uiElementsView = currentLevel.getUiElements()
                .map((actor) => ({
                type: actor.getType(),
                position: actor.getPosition(),
                size: actor.getSize(),
            }));
            const playerView = {
                position: currentLevel.getPlayer().getPosition(),
                size: currentLevel.getPlayer().getSize(),
                speed: currentLevel.getPlayer().getSpeed(),
            };
            this.view.drawFrame({
                step,
                center: currentLevel.getPlayer().getPosition(),
                actors: actorsView,
                uiElements: uiElementsView,
                playerView,
                worldWidth: currentLevel.getWidth(),
                worldHeight: currentLevel.getHeight(),
                numberOfCoins: currentLevel.getNumberOfCoins(),
                numberOfCollectedCoins: currentLevel.getNumberOfCollectedCoins(),
                status: currentLevel.getStatus(),
                grid: currentLevel.getGrid(),
            });
            const status = currentLevel.getStatus();
            if (currentLevel.isFinished() && status) {
                this.onLevelFinished(status);
                return; // stop this animation loop; a new one starts in onLevelFinished
            }
            this.lastTime = time;
            this.animationFrameId = requestAnimationFrame(frame);
        };
        this.animationFrameId = requestAnimationFrame(frame);
    }
    /** @desc Stops the current animation loop. */
    stopAnimation() {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
    /** @desc Sets up keyboard event tracking for game controls. */
    setupKeyTracking() {
        const handler = (event) => {
            const action = GameController.KEY_MAP[event.code];
            if (!action)
                return;
            const down = event.type === 'keydown';
            if (action === 'esc') {
                if (!down) {
                    this.keys['esc'] = !this.keys['esc'];
                }
            }
            else {
                this.keys[action] = down;
            }
            event.preventDefault();
        };
        globalThis.addEventListener('keydown', handler);
        globalThis.addEventListener('keyup', handler);
        this.keyHandlerCleanup = () => {
            globalThis.removeEventListener('keydown', handler);
            globalThis.removeEventListener('keyup', handler);
        };
    }
}
GameController.KEY_MAP = {
    'Escape': 'esc', // Escape key
    'ArrowLeft': 'left', // Left arrow key
    'ArrowUp': 'up', // Up arrow key
    'ArrowRight': 'right', // Right arrow key
};
