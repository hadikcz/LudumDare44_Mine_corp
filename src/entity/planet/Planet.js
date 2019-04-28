import GameEnvironment from 'core/GameEnvironment';
import PlanetCollider from 'entity/planet/PlanetCollider';
import GameConfig from 'GameConfig';
import ArrayHelpers from 'helpers/ArrayHelpers';
import TransformHelpers from 'helpers/TransformHelpers';
import Depths from 'structs/Depths';

export default class Planet {
    constructor (scene) {
        /**
         * @private
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @private
         * @type {Phaser.GameObjects.Image}
         */
        this.bg = this.scene.add.image(0, 0, 'bg').setOrigin(0, 0).setDepth(Depths.PLANET_LAYER3);

        /**
         * @type {PlanetCollider}
         */
        this.planetCollider = new PlanetCollider(this.scene, Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y);

        // this.scene.matter.add.mouseSpring();
    }

    /**
     * @param {number} landingX
     * @param {number} landingY
     * @return {{x: number, y: number}}
     * @private
     */
    static calculateSpawnPosition (landingX, landingY) {
        let angle = Phaser.Math.Angle.Between(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, landingX, landingY);
        angle -= Phaser.Math.DegToRad(GameConfig.Planet.landing.offsetAngle);
        return TransformHelpers.calcPivot(landingX, landingY, angle, GameConfig.Planet.spawnRadius);
    }

    /**
     * @return {Phaser.Math.Vector2}
     */
    static getRandomSpawn () {
        let spawns = Planet.getSpawnCircle().getPoints(256);
        return ArrayHelpers.getRandomFromArray(spawns);
    }

    /**
     * @return {{x: number, y: number}}
     */
    static getCenterOfPlanet () {
        return {
            x: GameConfig.World.width / 2,
            y: GameConfig.World.height / 2
        };
    }

    /**
     * @return {Phaser.Curves.Ellipse}
     */
    static getLandCircle () {
        return new Phaser.Curves.Ellipse(
            GameEnvironment.getCenterOfTheMap().x,
            GameEnvironment.getCenterOfTheMap().y,
            GameConfig.Planet.radius
        );
    }

    static findNearestLandPosition (pointerX, pointerY) {
        let points = Planet.getLandCircle().getPoints(256);
        return TransformHelpers.getNearest(points, pointerX, pointerY);
    }
}
