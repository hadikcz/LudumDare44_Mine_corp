import GameEnvironment from 'core/GameEnvironment';
import PlanetCollider from 'entity/planet/PlanetCollider';

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
        this.planetCollider = new PlanetCollider(this.scene, GameEnvironment.getCenterOfTheMap().x, GameEnvironment.getCenterOfTheMap().y);

        // this.scene.matter.add.mouseSpring();
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
