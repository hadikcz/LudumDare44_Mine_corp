import GameEnvironment from 'core/GameEnvironment';
import PlanetCollider from 'entity/planet/PlanetCollider';
import GameConfig from 'GameConfig';
import ArrayHelpers from 'helpers/ArrayHelpers';
import TransformHelpers from 'helpers/TransformHelpers';
import Depths from 'structs/Depths';
import Counter from 'structs/Counter';
import Events from 'structs/Events';

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
        this.planet = this.scene.add.image(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, 'earth').setDepth(Depths.PLANET_LAYER1);

        /**
         * @private
         * @type {Phaser.GameObjects.Image}
         */
        this.core = this.scene.add.image(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, 'core').setDepth(Depths.PLANET_LAYER4);

        /**
         * @private
         * @type {Phaser.GameObjects.Image}
         */
        this.coreNoColor = this.scene.add.image(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, 'core_no_color').setDepth(Depths.PLANET_LAYER3);
        /**
         * @private
         * @type {Phaser.GameObjects.Image}
         */
        this.clouds = this.scene.add.image(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, 'clouds').setDepth(Depths.CLOUDS);

        /**
         * @type {PlanetCollider}
         */
        this.planetCollider = new PlanetCollider(this.scene, Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y);

        /**
         * @type {Counter}
         */
        this.hp = new Counter(10000);

        /**
         * @type {number}
         */
        this.mineCorpIncome = 0;

        /**
         * @type {Phaser.GameObjects.Text}
         */
        this.planetHpText = this.scene.add.text(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, '100%', { fill: '#ff0000' }).setDepth(Depths.UI);

        this.scene.events.on(Events.ApplyDamageToPlanet, (damage) => {
            this.hp.take(damage);
            this._processMineCorpIncome(damage);
        });

        this.scene.events.on(Events.ReturnDamageToPlanet, (damage) => {
            this.hp.add(damage);
        });

        // debug land
        // Planet.getLandCircle().getPoints(64).forEach((point) => {
        //     this.scene.add.circle(point.x, point.y, 2, 0xFF0000).setDepth(Depths.UI);
        // });
    }

    update () {
        this.planetHpText.setText(Math.floor(this.hp.getPercent()) + '% (' + this.hp.get() + ')');

        let alpha = this.hp.getPercent() / 110;
        let scale = this.hp.getPercent() / 85;
        if (scale <= 0.25) {
            scale = 0.25;
        }
        if (scale > 1) {
            scale = 1;
        }

        this.core.setScale(scale);
        this.coreNoColor.setScale(scale);
        this.core.setAlpha(alpha);

        this.clouds.rotation -= 0.001;
    }

    _processMineCorpIncome (damage) {
        let income = damage * Phaser.Math.RND.integerInRange(1, 4);
        this.mineCorpIncome += Math.round(income);
    }

    /**
     * @param {number} landingX
     * @param {number} landingY
     * @param {number} customSpawnRadius
     * @return {{x: number, y: number}}
     * @private
     */
    static calculateSpawnPosition (landingX, landingY, customSpawnRadius = GameConfig.Planet.spawnRadius) {
        let angle = Phaser.Math.Angle.Between(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, landingX, landingY);
        angle -= Phaser.Math.DegToRad(GameConfig.Planet.landing.offsetAngle);
        return TransformHelpers.calcPivot(landingX, landingY, angle, customSpawnRadius);
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
            x: (GameConfig.World.width / 2) + GameConfig.World.offsetX,
            y: GameConfig.World.height / 2 + GameConfig.World.offsetY
        };
    }

    /**
     * @return {Phaser.Curves.Ellipse}
     */
    static getLandCircle () {
        return new Phaser.Curves.Ellipse(
            Planet.getCenterOfPlanet().x,
            Planet.getCenterOfPlanet().y,
            GameConfig.Planet.radius
        );
    }

    static findNearestLandPosition (pointerX, pointerY) {
        let points = Planet.getLandCircle().getPoints(256);
        return TransformHelpers.getNearest(points, pointerX, pointerY);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @return {number}
     */
    static getRotationTowardPlanetCenter (x, y) {
        return Phaser.Math.Angle.Between(x, y, Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y) - Math.PI / 2;
    }
}
