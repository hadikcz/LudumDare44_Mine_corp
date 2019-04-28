import Planet from 'entity/planet/Planet';
import LandingShipEnemy from 'entity/enemy/LandingShipEnemy';

export default class UnitSpawner {
    constructor (scene) {
        /**
         * @private
         * @type {GameScene}
         */
        this.scene = scene;
    }

    landUnit (unitType, pointerX, pointerY) {
        let landingPosition = Planet.findNearestLandPosition(pointerX, pointerY);
        let spawnPosition = Planet.calculateSpawnPosition(landingPosition.x, landingPosition.y);

        let unit = new LandingShipEnemy(this.scene, spawnPosition.x, spawnPosition.y);
        unit.land(landingPosition.x, landingPosition.y);
    }
}
