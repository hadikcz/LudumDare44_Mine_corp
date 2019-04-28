import Phaser from 'phaser';
import GameConfig from 'GameConfig';
import GameEnvironment from 'core/GameEnvironment';
import TransformHelpers from 'helpers/TransformHelpers';

/**
 * @abstract
 */
export default class AbstractEnemy extends Phaser.GameObjects.Container {
    constructor (scene, type, key, x, y) {
        super(scene, x, y, []);
        this.scene.add.existing(this);

        /**
         * @private
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {null}
         */
        this.type = type;

        /**
         * @type {string}
         * @private
         */
        this._phase = 'spawned';

        /**
         * @type {Phaser.Math.Vector2}
         * @private
         */
        this._spawn = new Phaser.Math.Vector2(x, y);

        /**
         * @type {Phaser.Math.Vector2}
         * @private
         */
        this._landing = new Phaser.Math.Vector2(0, 0);

        /**
         * @private
         * @type {Phaser.GameObjects.Graphics}
         */
        this.graphics = this.scene.add.graphics();

        let image = this.scene.add.image(0, 0, key).setOrigin(0.5, 1);
        this.add(image);
    }

    land (landX, landY) {
        this._landing.set(landX, landY);
        this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, landX, landY) - Math.PI / 2);

        this.scene.tweens.add({
            targets: this,
            ease: Phaser.Math.Easing.Expo.Out,
            duration: 5000,
            x: landX,
            y: landY,
            onComplete: () => {
                this._phase = 'landed';
            }
        });

        // debug
        this.scene.add.line(0, 0, this.x, this.y, landX, landY, 0xFF0000).setOrigin(0, 0);
        this.scene.add.circle(this.x, this.y, 8, 0x00FF00);
        this.scene.add.circle(landX, landY, 8, 0xFF0000);
        this._phase = 'landing';
    }

    preUpdate () {
        if (this._phase === 'landing') {
            this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, this._landing.x, this._landing.y) - Math.PI / 2);
        }
    }

    static get ENEMY_TYPE_MAN () {
        return 'man';
    }

    static get ENEMY_TYPE_LANDING_SHIP () {
        return 'landing_ship';
    }

    static get ENEMY_TYPE_MINING_SHIP () {
        return 'mining_ship';
    }

    static get ENEMY_TYPE_FACTORY () {
        return 'factory';
    }

    static get ENEMY_TYPE_HUGE_ROBOT () {
        return 'huge_robot';
    }

    static get ENEMY_TYPE_SPACE_SHIP () {
        return 'space_ship';
    }
}
