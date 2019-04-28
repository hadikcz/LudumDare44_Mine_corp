import GameEnvironment from 'core/GameEnvironment';
import PlanetCollider from 'entity/planet/PlanetCollider';
import GameConfig from 'GameConfig';
import ArrayHelpers from 'helpers/ArrayHelpers';

export default class Planet {
    constructor (scene) {
        /**
         * @private
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {PlanetCollider}
         */
        this.planetCollider = new PlanetCollider(this.scene, Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y);

        // this.scene.matter.add.mouseSpring();
    }

    /**
     * @return {Phaser.Math.Vector2}
     */
    static getRandomSpawn () {
        let spawns = Planet.getSpawnCircle().getPoints(256);
        return ArrayHelpers.getRandomFromArray(spawns);
    }

    /**
     * @return {Phaser.Curves.Ellipse}
     */
    static getSpawnCircle () {
        return new Phaser.Curves.Ellipse(
            Planet.getCenterOfPlanet().x,
            Planet.getCenterOfPlanet().y,
            GameConfig.Planet.spawnRadius
        );
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

    // _createPlanetColliderAndAttractor () {
    //     this.planetCollider = this.scene.matter.add.image(GameEnvironment.getCenterOfTheMap().x, GameEnvironment.getCenterOfTheMap().y, '', null, {
    //         shape: {
    //             type: 'circle',
    //             radius: 235
    //         },
    //         isStatic: true,
    //         plugin: {
    //             attractors: [
    //                 function (bodyB, bodyA) {
    //                     // if (bodyA.isPlanet !== undefined) {
    //                     //     return { x: bodyA.x, y: bodyA.y };
    //                     // }
    //                     return {
    //                         x: (bodyA.position.x - bodyB.position.x) * 0.000001,
    //                         y: (bodyA.position.y - bodyB.position.y) * 0.000001
    //                     };
    //                 }
    //             ]
    //         }
    //     });
    //     this.planetCollider.isPlanet = true;
    //
    //     this.planetCollider.isStatic(true);
    // }
}
