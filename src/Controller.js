
import LandingShipEnemy from 'entity/enemy/LandingShipEnemy';
import Attacks from 'structs/Attacks';

export default class Controller {
    /**
     * @param {GameScene} scene
     */
    constructor (scene) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

        this.scene.input.on('pointerdown', (pointer) => {
            // this.scene.unitSpawner.landUnit(LandingShipEnemy.TYPE, pointer.worldX, pointer.worldY);
            this.scene.attackManager.attack();
        });
    }
}
