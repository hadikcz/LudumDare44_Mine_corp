import GameScene from './../scenes/GameScene';
import FlyText from './FlyText';
import Lightning from 'effects/Lightning';
import Tornado from 'effects/Tornado';

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
    }
}
