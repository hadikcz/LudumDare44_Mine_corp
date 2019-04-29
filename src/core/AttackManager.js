import Planet from 'entity/planet/Planet';
import Attacks from 'structs/Attacks';
import Depths from 'structs/Depths';
import Events from 'structs/Events';
import TransformHelpers from 'helpers/TransformHelpers';
import Phaser from "phaser";

export default class AttackManager {
    /**
     * @param {GameScene} scene
     */
    constructor (scene) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {boolean}
         */
        this.lightningCooldown = false;

        /**
         * @type {boolean}
         */
        this.tornadoCooldown = false;

        /**
         * @type {boolean}
         */
        this.volcanoCooldown = false;

        /**
         * @type {boolean}
         */
        this.asteroidCooldown = false;

        this.locks = {};
        this.locks[Attacks.TYPES.LIGHTNING] = false;
        this.locks[Attacks.TYPES.TORNADO] = true; // true
        this.locks[Attacks.TYPES.VOLCANO] = true; // true
        this.locks[Attacks.TYPES.ASTEROID] = true; // true

        this.cooldowns = {};
        this.cooldowns[Attacks.TYPES.ASTEROID] = false;
        this.cooldowns[Attacks.TYPES.TORNADO] = false;
        this.cooldowns[Attacks.TYPES.VOLCANO] = false;
        this.cooldowns[Attacks.TYPES.ASTEROID] = false;

        this.canAttack = false;

        this.scene.events.on(Events.ShowUI, () => {
            this.canAttack = true;
        }, this);

        /**
         * @type {string}
         * @private
         */
        this._activeAttack = Attacks.TYPES.LIGHTNING;
    }

    attack () {
        if (!this.canAttack) return;
        let landPosition = Planet.findNearestLandPosition(this.scene.input.activePointer.worldX, this.scene.input.activePointer.worldY);
        switch (this._activeAttack) {
            case Attacks.TYPES.LIGHTNING:
                this._launchLightning(landPosition.x, landPosition.y);
                break;
            case Attacks.TYPES.TORNADO:
                this._launchTornado(landPosition.x, landPosition.y);
                break;
            case Attacks.TYPES.VOLCANO:
                this._launchVolcano(landPosition.x, landPosition.y);
                break;
            case Attacks.TYPES.ASTEROID:
                this._launchAsteroid(landPosition.x, landPosition.y);
                break;
        }
    }

    unlock (type) {
        this.locks[type] = false;
        this.scene.events.emit(Events.UnlockedNewAttack);
    }

    /**
     * @param {string} type
     * @return {boolean}
     */
    switchAttackType (type) {
        if (this.locks[type]) return false;
        this._activeAttack = type;
        return true;
    }

    /**
     * @return {string}
     */
    getActiveAttack () {
        return this._activeAttack;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {*} attackData
     */
    findAndDamageEnemies (x, y, attackData) {
        let circles = [];
        let rotation = Planet.getRotationTowardPlanetCenter(x, y) - Math.PI / 2;

        circles.push(new Phaser.Geom.Circle(x, y, attackData.radius));

        let previousPivot = { x: x, y: y };
        if (attackData.circlesCount > 1) {
            for (let i = 0; i < attackData.circlesCount; i++) {
                let pivot = TransformHelpers.calcPivot(previousPivot.x, previousPivot.y, rotation, attackData.radius);
                let circle = new Phaser.Geom.Circle(pivot.x, pivot.y, attackData.radius);
                circles.push(circle);
                previousPivot = pivot;
            }
        }

        this.scene.unitSpawner.units.getChildren().forEach((/** @type {AbstractEnemy} */ unit) => {
            for (let i = 0; i < circles.length; i++) {
                let radiusCircle = circles[i];
                // this.scene.add.circle(radiusCircle.x, radiusCircle.y, attackData.radius, 0xFF0000, 0.5).setDepth(Depths.UI);
                if (radiusCircle.contains(unit.x, unit.y)) {
                    unit.applyDamage(attackData.damage);
                    break;
                }
            }
        });
    }

    /**
     * @param {number} x
     * @param {number} y
     * @private
     */
    _launchLightning (x, y) {
        if (this.cooldowns[Attacks.TYPES.LIGHTNING]) return;

        this.scene.soundManager.lightning.play();

        let rotation = Planet.getRotationTowardPlanetCenter(x, y);
        this.scene.effectManager.launchLightning(x, y, rotation);
        this.findAndDamageEnemies(x, y, Attacks.Lightning);

        this.cooldowns[Attacks.TYPES.LIGHTNING] = true;
        setTimeout(() => {
            this.cooldowns[Attacks.TYPES.LIGHTNING] = false;
        }, Attacks.Lightning.coolDown);

        this.scene.events.emit(Events.UsedAttack, Attacks.TYPES.LIGHTNING);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @private
     */
    _launchTornado (x, y) {
        if (this.cooldowns[Attacks.TYPES.TORNADO]) return;

        this.scene.soundManager.tornado.play();

        let rotation = Planet.getRotationTowardPlanetCenter(x, y);
        this.scene.effectManager.launchTornado(x, y, rotation);

        this.findAndDamageEnemies(x, y, Attacks.Tornado);
        let dealDamageInterval = setInterval(() => {
            this.findAndDamageEnemies(x, y, Attacks.Tornado);
        }, 100);

        setTimeout(() => {
            clearInterval(dealDamageInterval);
        }, Attacks.Tornado.duration);

        this.cooldowns[Attacks.TYPES.TORNADO] = true;
        setTimeout(() => {
            this.cooldowns[Attacks.TYPES.TORNADO] = false;
        }, Attacks.Tornado.coolDown);

        this.scene.events.emit(Events.UsedAttack, Attacks.TYPES.TORNADO);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @private
     */
    _launchVolcano (x, y) {
        if (this.cooldowns[Attacks.TYPES.VOLCANO]) return;

        let rotation = Planet.getRotationTowardPlanetCenter(x, y);
        this.scene.effectManager.launchVolcano(x, y, rotation);
        setTimeout(() => {
            this.findAndDamageEnemies(x, y, Attacks.Volcano);
            this.scene.effectManager.launchVolcanoExplosion(x, y, rotation);
        }, Attacks.Volcano.growTime);

        this.cooldowns[Attacks.TYPES.VOLCANO] = true;
        setTimeout(() => {
            this.cooldowns[Attacks.TYPES.VOLCANO] = false;
        }, Attacks.Volcano.coolDown);

        this.scene.events.emit(Events.UsedAttack, Attacks.TYPES.VOLCANO);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @private
     */
    _launchAsteroid (x, y) {
        if (this.cooldowns[Attacks.TYPES.ASTEROID]) return;

        let rotation = Planet.getRotationTowardPlanetCenter(x, y);
        this.scene.effectManager.launchAsteroid(x, y, rotation);
        setTimeout(() => {
            this.findAndDamageEnemies(x, y, Attacks.Asteroid);
            this.spawnDebris(x, y, 25);
        }, Attacks.Asteroid.landingTime);

        this.cooldowns[Attacks.TYPES.ASTEROID] = true;
        setTimeout(() => {
            this.cooldowns[Attacks.TYPES.ASTEROID] = false;
        }, Attacks.Asteroid.coolDown);

        this.scene.events.emit(Events.UsedAttack, Attacks.TYPES.ASTEROID);
    }

    spawnDebris (x, y, count = 3) {
        let angleOutOfCore = Planet.getRotationTowardPlanetCenter(x, y) - Math.PI / 2;

        for (let i = 0; i < count; i++) {
            let modifiedAngle = angleOutOfCore + Phaser.Math.DegToRad(Phaser.Math.RND.integerInRange(-80, 80));
            let velocity = TransformHelpers.rotationToVelocity(modifiedAngle, Phaser.Math.RND.integerInRange(150, 250));
            let centerOfObject = TransformHelpers.calcPivot(x, y, angleOutOfCore, 80);
            this.scene.effectManager.launchDebris(centerOfObject.x, centerOfObject.y, angleOutOfCore, velocity.x, velocity.y);
        }
    }
}
