import Phaser from 'phaser';
import GameConfig from 'GameConfig';
import Planet from 'entity/planet/Planet';
import Block from 'entity/Block';
import Depths from 'structs/Depths';

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
         * @private
         * @type {Phaser.GameObjects.Image}
         */
        this.bg = this.scene.add.image(0, 0, 'bg').setOrigin(0, 0).setDepth(Depths.SKY);

        /**
         * @type {Planet}
         */
        this.planet = new Planet(this.scene);

        // this.scene.physics.add.collider(this.blocks, this.blocks);
        this.scene.physics.add.collider(this.planet.planetCollider, this.scene.effectManager.debrisGroup);
        // this.scene.physics.add.collider(this.scene.effectManager.debrisGroup, this.scene.effectManager.debrisGroup);

        // this._createTestBlocks();
    }

    update () {
        this.planet.update();
    }

    _createTestBlocks () {
        for (var i = 0; i < 25; i++) {
            var pos = this.scene.physics.world.bounds.getRandomPoint();
            let block = new Block(this.scene, pos.x, pos.y);
            this.blocks.add(block);
        }
    }
}
