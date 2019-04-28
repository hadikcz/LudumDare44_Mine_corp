import Phaser from 'phaser';
import EnemyPhase from 'structs/EnemyPhase';
import Planet from 'entity/planet/Planet';
import Enemies from 'structs/Enemies';
import Counter from 'structs/Counter';
import Depths from 'structs/Depths';
import Events from 'structs/Events';

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
         * @protected
         */
        this._phase = EnemyPhase.SPAWNED;

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
         * @type {boolean}
         * @protected
         */
        this._canAttack = false;

        /**
         * @private
         * @type {Phaser.GameObjects.Graphics}
         */
        this.graphics = this.scene.add.graphics();

        /**
         * @type {object}
         */
        this.enemyData = Enemies.getDataByType(this.type);

        /**
         * @type {Counter}
         */
        this.hp = new Counter(this.enemyData.hp);

        /**
         * @type {Phaser.GameObjects.Image}
         */
        this.image = this.scene.add.image(0, 0, key).setOrigin(0.5, 1);
        this.add(this.image);

        /**
         * @type {Phaser.GameObjects.Text}
         */
        this.hpText = this.scene.add.text(this.x, this.y, this.hp.getPercent() + '%', { fill: '#FF0000' }).setDepth(Depths.UI);
        this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y) - Math.PI / 2);

        this.scene.time.addEvent({
            delay: 1000,
            repeat: Infinity,
            callbackScope: this,
            callback: () => {
                if (this._canAttack) {
                    this.scene.events.emit(Events.ApplyDamageToPlanet, this.enemyData.damage);
                }
            }
        });
    }

    preUpdate () {
        this.hpText.setPosition(this.x, this.y);
        this.hpText.setText(this.hp.getPercent() + '%');

        if (this._phase === EnemyPhase.LANDING) {
            this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, this._landing.x, this._landing.y) - Math.PI / 2);
        }

        if (this._phase === EnemyPhase.ENDED) {
            this.destroy();
        }

        if (this.hp.get() <= 0) {
            this.destroy();
        }
    }

    applyDamage (damage) {
        this.hp.take(damage);
    }

    land (landX, landY) {
        this._landing.set(landX, landY);
        this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, landX, landY) - Math.PI / 2);

        this.scene.tweens.add({
            targets: this,
            ease: Phaser.Math.Easing.Expo.Out,
            duration: Enemies.SHIPS.landingTime,
            x: landX,
            y: landY,
            onComplete: () => {
                this._phase = EnemyPhase.LANDED;
            }
        });
        this._phase = EnemyPhase.LANDING;

        // debug
        // this.scene.add.line(0, 0, this.x, this.y, landX, landY, 0xFF0000).setOrigin(0, 0);
        // this.scene.add.circle(this.x, this.y, 8, 0x00FF00);
        // this.scene.add.circle(landX, landY, 8, 0xFF0000);
    }

    landOnGround (x, y) {
        this._phase = EnemyPhase.LANDING;
        let landPosition = Planet.findNearestLandPosition(x, y);

        this.scene.tweens.add({
            targets: this,
            ease: Phaser.Math.Easing.Linear.Linear,
            duration: Enemies.MAN.landingTime,
            x: landPosition.x,
            y: landPosition.y,
            onComplete: () => {
                this._phase = EnemyPhase.LANDED;
            }
        });
    }

    launchToSpace () {
        this.scene.tweens.add({
            targets: this,
            ease: Phaser.Math.Easing.Expo.In,
            duration: Enemies.SHIPS.launchTime,
            x: this._spawn.x,
            y: this._spawn.y,
            onComplete: () => {
                this._phase = EnemyPhase.ENDED;
            }
        });
    }

    destroy () {
        this._canAttack = false;
        this.hpText.destroy();
        super.destroy();
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
