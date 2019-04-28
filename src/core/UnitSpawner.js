import Planet from 'entity/planet/Planet';
import LandingShipEnemy from 'entity/enemy/LandingShipEnemy';
import GameConfig from 'GameConfig';
import ArrayHelpers from 'helpers/ArrayHelpers';

export default class UnitSpawner {
    constructor (scene) {
        /**
         * @private
         * @type {GameScene}
         */
        this.scene = scene;

        this.scene.time.addEvent({
            repeat: Infinity,
            delay: 3000,
            callbackScope: this,
            callback: this._spawn
        });
    }

    _spawn () {
        let landPosition = this._getRandomLandPosition();
        this.landUnit(LandingShipEnemy.TYPE, landPosition.x, landPosition.y);
    }

    landUnit (unitType, pointerX, pointerY) {
        let landingPosition = Planet.findNearestLandPosition(pointerX, pointerY);
        let spawnPosition = Planet.calculateSpawnPosition(landingPosition.x, landingPosition.y);

        let unit = new LandingShipEnemy(this.scene, spawnPosition.x, spawnPosition.y);
        unit.land(landingPosition.x, landingPosition.y);
    }

    _getRandomLandPosition () {
        return ArrayHelpers.getRandomFromArray(Planet.getLandCircle().getPoints(512));
    }
}
