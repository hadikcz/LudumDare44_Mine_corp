import GameScene from './../scenes/GameScene';
import FlyText from './FlyText';
import Lightning from 'effects/Lightning';
import Tornado from 'effects/Tornado';
import Volcano from 'effects/Volcano';
import Asteroid from 'effects/Asteroid';
import Debris from 'effects/Debris';

export default class EffectManger {
    /**
     * @param {GameScene}scene
     */
    constructor (scene) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {Phaser.GameObjects.Group}
         * @private
         */
        this._flyTextGroup = this.scene.add.group({
            classType: FlyText,
            maxSize: 20,
            runChildUpdate: true

        });

        /**
         * @type {Phaser.GameObjects.Group}
         * @private
         */
        this._lightningGroup = this.scene.add.group({
            classType: Lightning,
            maxSize: 20,
            runChildUpdate: true
        });

        /**
         * @type {Phaser.GameObjects.Group}
         * @private
         */
        this._tornadoGroup = this.scene.add.group({
            classType: Tornado,
            maxSize: 20,
            runChildUpdate: true
        });

        /**
         * @type {Phaser.GameObjects.Group}
         * @private
         */
        this._volcanoGroup = this.scene.add.group({
            classType: Volcano,
            maxSize: 20,
            runChildUpdate: true
        });

        /**
         * @type {Phaser.GameObjects.Group}
         * @private
         */
        this._asteroidGroup = this.scene.add.group({
            classType: Asteroid,
            maxSize: 20,
            runChildUpdate: true
        });

        /**
         * @type {Phaser.GameObjects.Group}
         */
        this.debrisGroup = this.scene.add.group({
            classType: Debris,
            maxSize: 20,
            runChildUpdate: true
        });

        this._preparePools();
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {string} text
     * @param {object} style
     * @return {FlyText}
     */
    launchFlyText (x, y, text, style) {
        let group = this._flyTextGroup;
        /** @type {FlyText} */
        let effect = group.getFirstDead();
        if (!effect) {
            effect = new FlyText(this.scene);
            group.add(effect);
        }
        effect.launch(x, y, text, style);
        return effect;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} rotation
     * @return {Lightning}
     */
    launchLightning (x, y, rotation) {
        let group = this._lightningGroup;
        /** @type {FlyText} */
        let effect = group.getFirstDead();
        if (!effect) {
            effect = new Lightning(this.scene);
            group.add(effect);
        }
        effect.launch(x, y, rotation);
        return effect;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} rotation
     * @return {Tornado}
     */
    launchTornado (x, y, rotation) {
        let group = this._tornadoGroup;
        /** @type {FlyText} */
        let effect = group.getFirstDead();
        if (!effect) {
            effect = new Tornado(this.scene);
            group.add(effect);
        }
        effect.launch(x, y, rotation);
        return effect;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} rotation
     * @return {Tornado}
     */
    launchVolcano (x, y, rotation) {
        let group = this._volcanoGroup;
        /** @type {FlyText} */
        let effect = group.getFirstDead();
        if (!effect) {
            effect = new Volcano(this.scene);
            group.add(effect);
        }
        effect.launch(x, y, rotation);
        return effect;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} rotation
     * @return {Tornado}
     */
    launchAsteroid (x, y, rotation) {
        let group = this._asteroidGroup;
        /** @type {FlyText} */
        let effect = group.getFirstDead();
        if (!effect) {
            effect = new Asteroid(this.scene);
            group.add(effect);
        }
        effect.launch(x, y, rotation);
        return effect;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} rotation
     * @param {number} velocityX
     * @param {number} velocityY
     * @return {Debris}
     */
    launchDebris (x, y, rotation, velocityX = 0, velocityY = 0, customImage = false) {
        let group = this.debrisGroup;
        /** @type {FlyText} */
        let effect = group.getFirstDead();
        if (!effect) {
            effect = new Debris(this.scene);
            group.add(effect);
        }
        effect.launch(x, y, rotation, velocityX, velocityY, customImage);
        return effect;
    }

    /**
     * @private
     */
    _preparePools () {
        let group;

        group = this._flyTextGroup;
        for (let i = 0; i < group.maxSize; i++) {
            let effect = new FlyText(this.scene);
            group.add(effect);
        }

        group = this._lightningGroup;
        for (let i = 0; i < group.maxSize; i++) {
            let effect = new Lightning(this.scene);
            group.add(effect);
        }

        group = this._tornadoGroup;
        for (let i = 0; i < group.maxSize; i++) {
            let effect = new Tornado(this.scene);
            group.add(effect);
        }

        group = this._volcanoGroup;
        for (let i = 0; i < group.maxSize; i++) {
            let effect = new Volcano(this.scene);
            group.add(effect);
        }

        group = this._asteroidGroup;
        for (let i = 0; i < group.maxSize; i++) {
            let effect = new Asteroid(this.scene);
            group.add(effect);
        }

        group = this.debrisGroup;
        for (let i = 0; i < group.maxSize; i++) {
            let effect = new Debris(this.scene);
            group.add(effect);
        }
    }
}
