import GameScene from './../scenes/GameScene';
import FlyText from './FlyText';

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
     * @private
     */
    _preparePools () {
        let group;

        group = this._flyTextGroup;
        for (let i = 0; i < group.maxSize; i++) {
            let effect = new FlyText(this.scene);
            group.add(effect);
        }
    }
}
