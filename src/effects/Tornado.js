import Phaser from 'phaser';
import Depths from 'structs/Depths';
import Attacks from 'structs/Attacks';

export default class Lightning extends Phaser.GameObjects.Image {
    constructor (scene) {
        super(scene, -1000, -1000, 'assets', 'tornado');
        this.scene.add.existing(this);
        this.setOrigin(0.5, 1);
        this.setDepth(Depths.ATTACKS);
        this.setActive(false);
        this.setVisible(false);

        /**
         * @type {Phaser.Tweens.Tween}
         */
        this.animationTween = this.scene.tweens.add({
            duration: 1500,
            yoyo: -1,
            repeat: Infinity,
            ease: 'Linear',
            targets: this,
            scaleX: 1.25,
            scaleY: 1.25
        });
        this.animationTween.pause();
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} rotation
     */
    launch (x, y, rotation) {
        this.setPosition(x, y);
        this.setRotation(rotation);
        this.setAlpha(1);
        this.setVisible(true);
        this.setActive(true);
        this.animationTween.play();

        this.scene.time.addEvent({
            delay: Attacks.Tornado.duration,
            callbackScope: this,
            callback: () => {
                this.scene.tweens.add({
                    targets: this,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        this.animationTween.pause();
                        this.setActive(false);
                        this.setVisible(false);
                    }
                });
            }
        });
    }
}
