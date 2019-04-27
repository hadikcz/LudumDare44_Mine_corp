import Phaser from 'phaser';
import GameConfig from 'GameConfig';
import GameEnvironment from 'core/GameEnvironment';

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
         * @type {Phaser.Math.Vector2}
         * @private
         */
        this._spawn = new Phaser.Math.Vector2(x, y);

        let image = this.scene.add.image(0, 0, key).setOrigin(0.5, 1);
        this.add(image);
    }

    land () {
        let landingData = this.getLandingPositionAndRotation();

        this.setRotation(landingData.rotation);
        this.scene.tweens.add({
            targets: this,
            ease: Phaser.Math.Easing.Expo.Out,
            duration: 5000,
            x: landingData.position.x,
            y: landingData.position.y,
            onComplete: () => {
                console.log('landed');
                this.tint = 0xFF0000;
            }
        });

        // debug
        this.scene.add.line(0, 0, this._spawn.x, this._spawn.y, landingData.position.x, landingData.position.y, 0xFF0000).setOrigin(0, 0);
        this.scene.add.circle(this._spawn.x, this._spawn.y, 8, 0x00FF00);
        this.scene.add.circle(landingData.position.x, landingData.position.y, 8, 0xFF0000);
    }

    /**
     * @return {{position: {Phaser.Math.Vector2}, rotation: number}}
     */
    getLandingPositionAndRotation () {
        let planetCircle = this.getPlanetCircle();
        let points = planetCircle.getPoints(256);

        let nearestPoint = null;
        let minDistance = Infinity;

        points.forEach((point) => {
            let distance = Phaser.Math.Distance.Between(point.x, point.y, this._spawn.x, this._spawn.y);
            if (distance < minDistance) {
                nearestPoint = point;
                minDistance = distance;
            }
        });

        return {
            position: nearestPoint,
            rotation: Phaser.Math.Angle.Between(this._spawn.x, this._spawn.y, nearestPoint.x, nearestPoint.y) - Math.PI / 2
        };
    }

    /**
     * @return {Phaser.Curves.Ellipse}
     */
    getPlanetCircle () {
        let planetCircle = new Phaser.Curves.Ellipse(
            GameEnvironment.getCenterOfTheMap().x + GameConfig.Planet.offsetCircle.x,
            GameEnvironment.getCenterOfTheMap().y + GameConfig.Planet.offsetCircle.y,
            GameConfig.Planet.radius,
            GameConfig.Planet.radius
        );
        return planetCircle;

        let points = planetCircle.getPoints(150);
        points.forEach((point) => {
            this.scene.add.circle(point.x, point.y, 3, 0xff0000);
        });
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
