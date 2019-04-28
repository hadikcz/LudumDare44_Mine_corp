
import LandingShipEnemy from 'entity/enemy/LandingShipEnemy';

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
            this.scene.unitSpawner.landUnit(LandingShipEnemy.TYPE, pointer.worldX, pointer.worldY);
        });
    }
}
