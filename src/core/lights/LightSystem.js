import GameScene from '../../scenes/GameScene';
import Light from './Light';
import GameConfig from "../../GameConfig";

export default class LightSystem {
    /**
     * @param {GameScene} scene
     */
    constructor (scene) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;
        //
        // /**
        //  * @type {Phaser.GameObjects.Rectangle}
        //  * @private
        //  */
        // this._darkBasement = this.scene.add.rectangle(1, 109, 320, 400, 0x000000, 0.85);
        // this._darkBasement.setOrigin(0, 0);
        // this._darkBasement.setDepth(GameConfig.DepthLayers.Lights);

        /**
         * @type {Light[]}
         * @private
         */
        this._lights = [];

        this._createLights();
    }

    _createLights () {
        // first level
        // this._lights.push(new Light(this.scene, 48, 120));
        // this._lights.push(new Light(this.scene, 92, 123));
        // this._lights.push(new Light(this.scene, 149, 122));
        // this._lights.push(new Light(this.scene, 210, 124));
    }

    turnOffAllLights () {
        this._lights.forEach((light) => {
            light.setVisible(false);
        });
        this._darkBasement.setVisible(true);
    }

    turnOnAllLights () {
        this._lights.forEach((light) => {
            light.setVisible(true);
        });
        this._darkBasement.setVisible(false);
    }
}
