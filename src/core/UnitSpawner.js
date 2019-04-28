import Planet from 'entity/planet/Planet';
import LandingShipEnemy from 'entity/enemy/LandingShipEnemy';
import ArrayHelpers from 'helpers/ArrayHelpers';
import ManEnemy from 'entity/enemy/ManEnemy';

export default class UnitSpawner {
    constructor (scene) {
        /**
         * @private
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {Phaser.GameObjects.Group}
         */
        this.units = this.scene.add.group();

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

        let unit = this._createUnitByType(LandingShipEnemy.TYPE, spawnPosition.x, spawnPosition.y);
        this.units.add(unit);
        unit.land(landingPosition.x, landingPosition.y);
    }

    deployOnLandUnit (unitType, spawnX, spawnY, deployOverX, deployOverY) {
        let unit = this._createUnitByType(ManEnemy.TYPE, spawnX, spawnY);
        this.units.add(unit);

        if (deployOverX === undefined) {
            deployOverX = spawnX;
        }
        if (deployOverY === undefined) {
            deployOverY = spawnY;
        }

        unit.landOnGround(deployOverX, deployOverY);
    }

    _getRandomLandPosition () {
        return ArrayHelpers.getRandomFromArray(Planet.getLandCircle().getPoints(512));
    }

    _createUnitByType (type, x, y) {
        switch (type) {
            case LandingShipEnemy.TYPE:
                return new LandingShipEnemy(this.scene, x, y);
            case ManEnemy.TYPE:
                return new ManEnemy(this.scene, x, y);
        }
    }
}
