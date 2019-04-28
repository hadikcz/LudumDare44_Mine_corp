import Phaser from 'phaser';
import Depths from 'structs/Depths';
import Attacks from 'structs/Attacks';

export default class Lightning extends Phaser.GameObjects.Image {
    constructor (scene) {
        super(scene, -1000, -1000, 'assets', 'volcano');
        this.scene.add.existing(this);
        this.setOrigin(0.5, 1);
        this.setDepth(Depths.ATTACKS);
        this.setActive(false);
        this.setVisible(false);
        this.setScale(0, 0);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} rotation
     */
    launch (x, y, rotation) {
        this.setPosition(x, y);
        this.setRotation(rotation);
        this.setVisible(true);
        this.setActive(true);

        this.scene.tweens.add({
            targets: this,
            scaleX: 1,
            scaleY: 1,
            duration: 800,
            ease: 'Linear'
        });
        this.scene.time.addEvent({
            delay: 5000,
            callbackScope: this,
            callback: () => {
                this.scene.tweens.add({
                    targets: this,
                    scaleX: 0,
                    scaleY: 0,
                    duration: 800,
                    ease: 'Linear',
                    onComplete: () => {
                        this.setActive(false);
                        this.setVisible(false);
                    }
                });
            }
        });
    }
}
