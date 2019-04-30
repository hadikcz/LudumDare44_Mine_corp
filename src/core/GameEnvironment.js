import Phaser from 'phaser';
import GameConfig from 'GameConfig';
import Planet from 'entity/planet/Planet';
import Block from 'entity/Block';
import Depths from 'structs/Depths';
import Events from 'structs/Events';
import Attacks from 'structs/Attacks';

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
         * @type {Phaser.GameObjects.Image}
         */
        this.bgDeath = this.scene.add.image(0, 0, 'bg_death').setOrigin(0, 0).setDepth(Depths.PLANET_DEATH).setAlpha(0);

        /**
         * @type {Planet}
         */
        this.planet = new Planet(this.scene);

        // this.scene.physics.add.collider(this.blocks, this.blocks);
        this.scene.physics.add.collider(this.planet.planetCollider, this.scene.effectManager.debrisGroup);
        // this.scene.physics.add.collider(this.scene.effectManager.debrisGroup, this.scene.effectManager.debrisGroup);

        // this._createTestBlocks();

        this.kills = {};
        this.kills['man'] = 0;
        this.kills['landing_ship'] = 0;
        this.kills['mining_ship'] = 0;
        this.kills['factory'] = 0;
        this.kills['space_ship'] = 0;

        this.scene.events.on(Events.OnKill, (type) => {
            this.kills[type]++;
            if (type === 'landing_ship') {
                this.kills['man'] += 3;
            }

            if (this.kills['man'] >= 20 && this.scene.attackManager.locks[Attacks.TYPES.TORNADO]) {
                this.scene.attackManager.locks[Attacks.TYPES.TORNADO] = false;
                this.scene.ui.attackBarUI.redraw();
            }

            if (this.kills['mining_ship'] >= 4 && this.scene.attackManager.locks[Attacks.TYPES.VOLCANO]) {
                this.scene.attackManager.locks[Attacks.TYPES.VOLCANO] = false;
                this.scene.ui.attackBarUI.redraw();
            }

            if (this.kills['factory'] >= 3 && this.scene.attackManager.locks[Attacks.TYPES.ASTEROID]) {
                this.scene.attackManager.locks[Attacks.TYPES.ASTEROID] = false;
                this.scene.ui.attackBarUI.redraw();
            }
        }, this);
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
