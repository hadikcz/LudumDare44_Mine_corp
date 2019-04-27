import Phaser from 'phaser';
import GameScene from './../../scenes/GameScene';
import GameConfig from "../../GameConfig";

export default class Light extends Phaser.GameObjects.Sprite {
    /**
     * @param {GameScene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor (scene, x, y) {
        super(scene, x, y, 'light');

        this.scene.add.existing(this);
        this.setBlendMode(Phaser.BlendModes.OVERLAY);

        this.setDepth(GameConfig.DepthLayers.Lights);
    }
}
