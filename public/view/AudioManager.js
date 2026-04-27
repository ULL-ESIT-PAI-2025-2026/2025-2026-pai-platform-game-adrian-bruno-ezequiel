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
 * @desc Manages game audio by mapping and playing sound effects and background
 * music with safe browser playback behavior.
 */
/**
 * @classdesc Manages audio playback for sound effects and background music in
 * the game.
 */
export class AudioManager {
    /**
     * @desc Creates a new AudioManager instance and initializes audio
     * elements.
     */
    constructor() {
        this.map = new Map();
        this.musicSource = 'assets/sound/overworld.mp3';
        this.music = document.getElementById('music');
        this.sound = document.getElementById('sound');
        this.map.set('coin', 'assets/sound/coin.wav');
        this.map.set('jump', 'assets/sound/jump-small.wav');
        this.map.set('die', 'assets/sound/mario-die.wav');
        this.map.set('levelClear', 'assets/sound/stage-clear.wav');
        this.map.set('gameOver', 'assets/sound/game-over.wav');
    }
    /**
     * @desc Plays a sound effect of the specified type.
     * @param soundType - The type of sound effect to play
     */
    play(soundType) {
        this.sound.src = this.map.get(soundType);
        this.sound.play().catch((err) => {
            if (err?.name === 'NotAllowedError') {
                // Browser requires user interaction before playing audio
                // Silently ignore to prevent console errors
                return;
            }
        });
    }
    /** @desc Starts or resumes background music playback. */
    playBackground() {
        this.music.setAttribute('src', this.musicSource);
        this.music.loop = true;
        this.music.play();
    }
}
