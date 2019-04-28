import Phaser from 'phaser';
import Depths from 'structs/Depths';
import Planet from 'entity/planet/Planet';
import GameConfig from 'GameConfig';

export default class Debris extends Phaser.GameObjects.Image {
    constructor (scene) {
        super(scene, -1000, -1000, 'assets', 'debris' + Phaser.Math.RND.integerInRange(1, 3));
        this.scene.add.existing(this);
        this.setDepth(Depths.DEBRIS);
        this.setActive(false);
        this.setVisible(false);

        this.scene.physics.world.enable(this);

        // let radius = 16;
        // this.body.setCircle(radius, -radius / 2, -radius / 2);
        this.body.setBounce(0.2);
    }

    preUpdate () {
        this.scene.physics.accelerateToObject(this, Planet.getCenterOfPlanet(), GameConfig.Gravity.accelerateSpeed);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} rotation
     * @param {number} velocityX
     * @param {number} velocityY
     */
    launch (x, y, rotation, velocityX = 0, velocityY = 0, customImage = false) {
        if (customImage) {
            this.setFrame(customImage);
            this.body.setSize(4, 4);
        } else {
            this.setFrame('debris' + Phaser.Math.RND.integerInRange(1, 3));
            this.body.setSize(11, 11);
        }
        this.setPosition(x, y);
        this.setRotation(Phaser.Math.RND.rotation());
        this.setVisible(true);
        this.setActive(true);
        this.setScale(1, 1);

        if (velocityX && velocityY) {
            console.log(velocityX);
            this.body.setVelocity(velocityX, velocityY);
        }

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
