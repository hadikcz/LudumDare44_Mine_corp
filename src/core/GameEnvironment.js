import Phaser from 'phaser';
import GameConfig from 'GameConfig';
import Planet from 'entity/planet/Planet';
import Block from 'entity/Block';

export default class GameEnvironment {
    /**
     * @param {GameScene} scene
     */
    constructor (scene) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

        this.scene.add.rectangle(0, 0, GameConfig.World.width, GameConfig.World.height, 0xFFFFFF, 1).setAlpha(1).setOrigin(0, 0);

        /**
         * @type {Phaser.GameObjects.Group}
         */
        this.blocks = this.scene.add.group();

        /**
         * @type {Planet}
         */
        this.planet = new Planet(this.scene);

        this.scene.physics.add.collider(this.planet.planetCollider, this.blocks);
        this.scene.physics.add.collider(this.blocks, this.blocks);

        this._createTestBlocks();
    }

    update () {}

    _createTestBlocks () {
        for (var i = 0; i < 25; i++) {
            var pos = this.scene.physics.world.bounds.getRandomPoint();
            let block = new Block(this.scene, pos.x, pos.y);
            this.blocks.add(block);
        }
    }

    /**
     * @return {{x: number, y: number}}
     */
    static getCenterOfTheMap () {
        return {
            x: GameConfig.World.width / 2,
            y: GameConfig.World.height / 2
        };
    }
}
