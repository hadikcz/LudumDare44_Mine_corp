import Phaser from 'phaser';
import Depths from 'structs/Depths';

export default class Lightning extends Phaser.GameObjects.Sprite {
    constructor (scene) {
        super(scene, -1000, -1000, 'assets2', 'light/light_1');
        this.scene.add.existing(this);
        this.setOrigin(0.5, 1);
        this.setDepth(Depths.ATTACKS);
        this.setActive(false);
        this.setVisible(false);
        this.setScale(0.5);

        this.animation = this.scene.anims.create({
            key: 'lightning',
            frames: this.scene.anims.generateFrameNames('assets2', { prefix: 'light/light_', end: 10, zeroPad: 0 }),
            frameRate: 30,
            hideOnComplete: true
        });
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

        this.play('lightning');

        this.scene.cameras.main.shake(80, 0.01);
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
