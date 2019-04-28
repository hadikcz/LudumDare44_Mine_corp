import Planet from 'entity/planet/Planet';
import Attacks from 'structs/Attacks';

export default class AttackManager {
    /**
     * @param {GameScene} scene
     */
    constructor (scene) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {string}
         * @private
         */
        this._activeAttack = Attacks.TYPES.LIGHTNING;
    }

    attack () {
        let landPosition = Planet.findNearestLandPosition(this.scene.input.activePointer.worldX, this.scene.input.activePointer.worldY);
        console.log(landPosition);
        switch (this._activeAttack) {
            case Attacks.TYPES.LIGHTNING:
                this._launchLightning(landPosition.x, landPosition.y);
                break;
        }
    }

    _launchLightning (x, y) {
        let rotation = Planet.getRotationTowardPlanetCenter(x, y);
        this.scene.effectManager.launchLightning(x, y, rotation);
    }
}
