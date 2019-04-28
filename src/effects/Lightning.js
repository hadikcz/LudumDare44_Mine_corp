import Phaser from 'phaser';
import Depths from 'structs/Depths';

export default class Lightning extends Phaser.GameObjects.Image {
    constructor (scene) {
        super(scene, -1000, -1000, 'Lightning');
        this.scene.add.existing(this);
        this.setOrigin(0.5, 1);
        this.setDepth(Depths.ATTACKS);
        this.setActive(false);
        this.setVisible(false);
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

        this.scene.cameras.main.flash(85, 255, 255, 255, true);

        this.scene.time.addEvent({
            delay: 150,
            callbackScope: this,
            callback: () => {
                this.scene.tweens.add({
                    targets: this,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        this.setActive(false);
                        this.setVisible(false);
                    }
                });
            }
        });
    }
}
