import Phaser from 'phaser';
import Depths from 'structs/Depths';
import Attacks from 'structs/Attacks';

export default class Lightning extends Phaser.GameObjects.Sprite {
    constructor (scene) {
        super(scene, -1000, -1000, 'assets2', 'twister/twister_1');
        this.scene.add.existing(this);
        this.setOrigin(0.5, 1);
        this.setDepth(Depths.ATTACKS);
        this.setActive(false);
        this.setVisible(false);

        this.setScale(0.25, 0.25);

        this.animation = this.scene.anims.create({
            key: 'tornado',
            frames: this.scene.anims.generateFrameNames('assets2', { prefix: 'twister/twister_', end: 12, zeroPad: 0 }),
            frameRate: 20,
            repeat: Infinity,
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
        this.setVisible(true);
        this.setActive(true);

        this.play('tornado');

        this.scene.time.addEvent({
            delay: Attacks.Tornado.duration,
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
