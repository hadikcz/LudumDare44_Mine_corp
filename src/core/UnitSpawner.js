import GameEnvironment from 'core/GameEnvironment';
import GameConfig from 'GameConfig';
import TransformHelpers from 'helpers/TransformHelpers';
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
        let landingPosition = this._findNearestLandPosition(pointerX, pointerY);
        let spawnPosition = this._calculateSpawnPosition(landingPosition.x, landingPosition.y);

        let unit = new LandingShipEnemy(this.scene, spawnPosition.x, spawnPosition.y);
        unit.land(landingPosition.x, landingPosition.y);
    }

    _findNearestLandPosition (pointerX, pointerY) {
        let points = this._getPlanetLandCircle().getPoints(256);
        return TransformHelpers.getNearest(points, pointerX, pointerY);
    }

    /**
     * @param {number} landingX
     * @param {number} landingY
     * @return {{x: number, y: number}}
     * @private
     */
    _calculateSpawnPosition (landingX, landingY) {
        let angle = Phaser.Math.Angle.Between(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, landingX, landingY);
        angle -= Phaser.Math.DegToRad(GameConfig.Planet.landing.offsetAngle);
        return TransformHelpers.calcPivot(landingX, landingY, angle, GameConfig.Planet.spawnRadius);
    }

    /**
     * @return {Phaser.Curves.Ellipse}
     * @private
     */
    _getPlanetLandCircle () {
        return new Phaser.Curves.Ellipse(
            GameEnvironment.getCenterOfTheMap().x,
            GameEnvironment.getCenterOfTheMap().y,
            GameConfig.Planet.radius
        );
    }
}
