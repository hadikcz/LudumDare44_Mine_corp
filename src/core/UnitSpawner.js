import Planet from 'entity/planet/Planet';
import LandingShipEnemy from 'entity/enemy/LandingShipEnemy';
import ArrayHelpers from 'helpers/ArrayHelpers';
import ManEnemy from 'entity/enemy/ManEnemy';
import MiningShipEnemy from 'entity/enemy/MiningShipEnemy';
import Events from 'structs/Events';
import FactoryEnemy from 'entity/enemy/FactoryEnemy';
import RobotEnemy from 'entity/enemy/RobotEnemy';
import Enemies from 'structs/Enemies';

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
            delay: 3000,
            callbackScope: this,
            callback: () => {
                this.scene.events.emit(Events.MineOperationsBegin);
                this._mineOpStarts = true;
            }
        });

        // test spawner
        this.scene.time.addEvent({
            repeat: Infinity,
            delay: 1500,
            callbackScope: this,
            callback: this._spawnMiningShip
        });
        //
        // // spawn intervals
        // this.scene.time.addEvent({
        //     repeat: Infinity,
        //     delay: Enemies.getDataByType(LandingShipEnemy.TYPE).timeBetweenSpawn,
        //     callbackScope: this,
        //     callback: this._spawnTransportShip
        // });
        //
        // this.scene.time.addEvent({
        //     repeat: Infinity,
        //     delay: Enemies.getDataByType(MiningShipEnemy.TYPE).timeBetweenSpawn,
        //     callbackScope: this,
        //     callback: this._spawnMiningShip
        // });
        //
        // this.scene.time.addEvent({
        //     repeat: Infinity,
        //     delay: Enemies.getDataByType(FactoryEnemy.TYPE).timeBetweenSpawn,
        //     callbackScope: this,
        //     callback: this._spawnFactory
        // });
        //
        // this.scene.time.addEvent({
        //     repeat: Infinity,
        //     delay: Enemies.getDataByType(RobotEnemy.TYPE).timeBetweenSpawn,
        //     callbackScope: this,
        //     callback: this._spawnRobot
        // });
    }

    _spawnTransportShip () {
        let landPosition = this._getRandomLandPosition();
        this.landUnit(LandingShipEnemy.TYPE, landPosition.x, landPosition.y);
    }

    _spawnMiningShip () {
        let landPosition = this._getRandomLandPosition();
        this.landUnit(MiningShipEnemy.TYPE, landPosition.x, landPosition.y);
    }

    _spawnFactory () {
        let landPosition = this._getRandomLandPosition();
        this.deployFromSurface(FactoryEnemy.TYPE, landPosition.x, landPosition.y);
    }

    _spawnRobot () {
        let landPosition = this._getRandomLandPosition();
        this.landUnit(RobotEnemy.TYPE, landPosition.x, landPosition.y);
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
            case RobotEnemy.TYPE:
                return new RobotEnemy(this.scene, x, y);
        }
    }
}
