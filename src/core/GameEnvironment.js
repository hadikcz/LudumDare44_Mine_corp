import GameScene from '../scenes/GameScene.js';
import GameConfig from '../GameConfig';
import Phaser from "phaser";

export default class GameEnvironment {
    /**
     * @param {GameScene} scene
     */
    constructor (scene) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

    }

    update () {
    }
}
