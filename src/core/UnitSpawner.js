import Planet from 'entity/planet/Planet';
import LandingShipEnemy from 'entity/enemy/LandingShipEnemy';
import ArrayHelpers from 'helpers/ArrayHelpers';
import ManEnemy from 'entity/enemy/ManEnemy';
import MiningShipEnemy from 'entity/enemy/MiningShipEnemy';
import Events from 'structs/Events';
import FactoryEnemy from 'entity/enemy/FactoryEnemy';

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

        /**
         * @type {boolean}
         * @private
         */
        this._mineOpStarts = false;

        this.scene.time.addEvent({
            repeat: Infinity,
            delay: 3000,
            callbackScope: this,
            callback: this._spawn
        });
    }

    _spawn () {
        if (!this._mineOpStarts) {
            this.scene.events.emit(Events.MineOperationsBegin);
            this._mineOpStarts = true;
        }

        let landPosition = this._getRandomLandPosition();

        this.deployFromSurface(FactoryEnemy.TYPE, landPosition.x, landPosition.y);
        // let rnd = Phaser.Math.RND.integerInRange(0, 2);
        // if (rnd === 0) {
        //     this.landUnit(LandingShipEnemy.TYPE, landPosition.x, landPosition.y);
        // } else if (rnd === 1) {
        //     this.landUnit(MiningShipEnemy.TYPE, landPosition.x, landPosition.y);
        // } else if (rnd === 2) {
        //     this.deployFromSurface(FactoryEnemy.TYPE, landPosition.x, landPosition.y);
        // }
    }

    deployFromSurface (unitType, pointerX, pointerY) {
        let landingPosition = Planet.findNearestLandPosition(pointerX, pointerY);
        let unit = this._createUnitByType(unitType, landingPosition.x, landingPosition.y);
        this.units.add(unit);
        unit.deployFromSurface(landingPosition.x, landingPosition.y);
    }

    landUnit (unitType, pointerX, pointerY) {
        let landingPosition = Planet.findNearestLandPosition(pointerX, pointerY);
        let spawnPosition = Planet.calculateSpawnPosition(landingPosition.x, landingPosition.y);

        let unit = this._createUnitByType(unitType, spawnPosition.x, spawnPosition.y);
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
            case MiningShipEnemy.TYPE:
                return new MiningShipEnemy(this.scene, x, y);
            case FactoryEnemy.TYPE:
                return new FactoryEnemy(this.scene, x, y);
        }
    }
}
