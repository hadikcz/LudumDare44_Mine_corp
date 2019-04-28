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
        this.bg = this.scene.add.image(0, 0, 'bg').setOrigin(0, 0).setDepth(Depths.PLANET_LAYER3);

        /**
         * @private
         * @type {Phaser.GameObjects.Image}
         */
        this.core = this.scene.add.image(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, 'core').setDepth(Depths.PLANET_LAYER4);

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

        // this.scene.matter.add.mouseSpring();

        this.scene.events.on(Events.ApplyDamageToPlanet, (damage) => {
            this.hp.take(damage);
            this._processMineCorpIncome(damage);
        });

        this.scene.events.on(Events.ReturnDamageToPlanet, (damage) => {
            this.hp.add(damage);
        });
    }

    update () {
        this.planetHpText.setText(Math.floor(this.hp.getPercent()) + '% (' + this.hp.get() + ')');

        let scale = this.hp.getPercent() / 100;
        if (scale <= 0.25) {
            scale = 0.25;
        }
        this.core.setScale(scale);
    }

    _processMineCorpIncome (damage) {
        let income = damage * Phaser.Math.RND.integerInRange(1, 4);
        this.mineCorpIncome += Math.round(income);
    }

    /**
     * @param {number} landingX
     * @param {number} landingY
     * @return {{x: number, y: number}}
     * @private
     */
    static calculateSpawnPosition (landingX, landingY) {
        let angle = Phaser.Math.Angle.Between(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, landingX, landingY);
        angle -= Phaser.Math.DegToRad(GameConfig.Planet.landing.offsetAngle);
        return TransformHelpers.calcPivot(landingX, landingY, angle, GameConfig.Planet.spawnRadius);
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
            x: GameConfig.World.width / 2,
            y: GameConfig.World.height / 2
        };
    }

    /**
     * @return {Phaser.Curves.Ellipse}
     */
    static getLandCircle () {
        return new Phaser.Curves.Ellipse(
            GameEnvironment.getCenterOfTheMap().x,
            GameEnvironment.getCenterOfTheMap().y,
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
