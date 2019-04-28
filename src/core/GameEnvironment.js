import Phaser from 'phaser';
import GameConfig from 'GameConfig';
import Planet from 'entity/planet/Planet';
import Block from 'entity/Block';
import AbstractEnemy from 'entity/enemy/AbstractEnemy';
import LandingShipEnemy from 'entity/enemy/LandingShipEnemy';

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
         * @private
         * @type {Phaser.GameObjects.Image}
         */
        this.bg = this.scene.add.image(0, 0, 'bg').setOrigin(0, 0);

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

        this.spawnRandomEnemies();
        // let enemy = new AbstractEnemy(this.scene, AbstractEnemy.ENEMY_TYPE_LANDING_SHIP, spawn.x, spawn.y);
        // let landingPosition = enemy.getLandingPositionAndRotation().position;
        //
        // // debug landing
        // this.scene.add.line(0, 0, spawn.x, spawn.y, landingPosition.x, landingPosition.y, 0xFF0000).setOrigin(0, 0);
        // this.scene.add.circle(spawn.x, spawn.y, 8, 0x00FF00);
        // this.scene.add.circle(landingPosition.x, landingPosition.y, 8, 0xFF0000);
    }

    update () {}

    spawnRandomEnemies () {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                let spawn = Planet.getRandomSpawn();
                let enemy = new LandingShipEnemy(this.scene, spawn.x, spawn.y);
            }, Phaser.Math.RND.integerInRange(1500, 4000));
        }
    }

    _createTestBlocks () {
        // this.scene.matter.add.imageStack('block', null, 0, 500, 50, 2, 0, 0, {
        //     mass: 0.5,
        //     // ignorePointer: true
        // });

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
