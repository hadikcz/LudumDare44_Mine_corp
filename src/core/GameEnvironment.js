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

        this.scene.add.rectangle(0, 0, GameConfig.World.width, GameConfig.World.height, 0xFFFFFF, 1).setAlpha(1).setOrigin(0, 0);

        /**
         * @private
         * @type {Phaser.GameObjects.Image}
         */
        this.bg = this.scene.add.image(0, 0, 'bg').setOrigin(0, 0);
    }

    update () {}
}
