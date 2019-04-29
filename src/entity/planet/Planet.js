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
        this.planet.setBlendMode(Phaser.BlendModes.NORMAL);

        /**
         * @private
         * @type {Phaser.GameObjects.Image}
         */
        this.core = this.scene.add.image(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, 'core').setDepth(Depths.PLANET_LAYER4);

        /**
         * @type {Phaser.GameObjects.Image}
         */
        this.clouds2 = this.scene.add.image(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, 'clouds_2b').setDepth(Depths.CLOUDS_FAR);

        /**
         * @type {Phaser.GameObjects.Image}
         */
        this.clouds = this.scene.add.image(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, 'clouds_2a').setDepth(Depths.CLOUDS);

        /**
         * @type {PlanetCollider}
         */
        this.planetCollider = new PlanetCollider(this.scene, Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y);

        /**
         * @type {Phaser.GameObjects.Image}
         */
        this.blendShadow = this.scene.add.image(Planet.getCenterOfPlanet().x - 25, Planet.getCenterOfPlanet().y + 25, 'assets2', 'earth_shadow_multiply_effect').setDepth(Depths.PLANET_LAYER5_BLENDS)
        this.blendShadow.setBlendMode(Phaser.BlendModes.MULTIPLY);
        /**
         * @type {Phaser.GameObjects.Image}
         */
        this.blendLight = this.scene.add.image(Planet.getCenterOfPlanet().x + 90, Planet.getCenterOfPlanet().y - 120, 'assets2', 'earth_highlight_overlay_effect').setDepth(Depths.PLANET_LAYER5_BLENDS)
        this.blendLight.setAlpha(0.3);
        this.blendLight.setBlendMode(Phaser.BlendModes.ADD);

        /**
         * @type {Counter}
         */
        this.hp = new Counter(10000);

        /**
         * @type {number}
         */
        this.mineCorpIncome = 0;
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
        if (this.scene.isGameOver) {
            return;
        }
        this.scene.ui.planetHpTextUI.redrawHp(Math.floor(this.hp.get()));

        if (this.hp.get() <= 0 && !this.scene.isGameOver) {
            this.scene.ui.planetHpTextUI.redrawHp(0);
            this.scene.gameOver();
        }
        let alpha = this.hp.getPercent() / 110;

        let scale = this.hp.getPercent() / 85;
        if (scale <= 0.25) {
            scale = 0.25;
        }
        if (scale > 1) {
            scale = 1;
        }

        this.core.setScale(scale);

        this.clouds.rotation -= 0.0005;
        this.clouds2.rotation -= 0.00025;

        this.blendShadow.setAlpha(alpha);
        this.blendLight.setAlpha(this.blendLight.alpha * alpha);
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

    /**
     * @return {Phaser.Math.Vector2}
     */
    static getRandomOrbitPosition () {
        let orbit = new Phaser.Curves.Ellipse(Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y, GameConfig.Planet.orbitRadius);
        let points = orbit.getPoints(256);
        return ArrayHelpers.getRandomFromArray(points);
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
