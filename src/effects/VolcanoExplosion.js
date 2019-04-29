import Phaser from 'phaser';
import Depths from 'structs/Depths';
import Attacks from 'structs/Attacks';

export default class VolcanoExplosion extends Phaser.GameObjects.Sprite {
    constructor (scene) {
        super(scene, -1000, -1000, 'assets2', 'volcano/volex_1');
        this.scene.add.existing(this);
        this.setOrigin(0.35, 1.3);
        this.setDepth(Depths.SMOKE);
        this.setActive(false);
        this.setVisible(false);

        this.animation = this.scene.anims.create({
            key: 'volex',
            frames: this.scene.anims.generateFrameNames('assets2', { prefix: 'volcano/volex_', end: 17, zeroPad: 0 }),
            frameRate: 15,
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
        this.setAlpha(1);

        this.play('volex');

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
