import Phaser from 'phaser';
import Depths from 'structs/Depths';
import Attacks from 'structs/Attacks';
import Planet from 'entity/planet/Planet';

export default class Lightning extends Phaser.GameObjects.Image {
    constructor (scene) {
        super(scene, -1000, -1000, 'assets', 'asteroid');
        this.scene.add.existing(this);
        this.setOrigin(0.5, 1);
        this.setDepth(Depths.VOLCANOS);
        this.setActive(false);
        this.setVisible(false);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} rotation
     */
    launch (x, y, rotation) {
        let spawnPosition = Planet.calculateSpawnPosition(x, y, 350);
        this.setPosition(spawnPosition.x, spawnPosition.y);
        this.setRotation(rotation);
        this.setVisible(true);
        this.setActive(true);

        this.scene.tweens.add({
            targets: this,
            x: x,
            y: y,
            duration: Attacks.Asteroid.landingTime,
            // ease: Phaser.Math.Easing.Quadratic.In,
            ease: Phaser.Math.Easing.Cubic.In,
            // ease: Phaser.Math.Easing.Linear.Linear,
            onComplete: () => {
                this.scene.cameras.main.flash(500, 255, 255, 255, true);
                this.setActive(false);
                this.setVisible(false);
            }
        });
    }
}
