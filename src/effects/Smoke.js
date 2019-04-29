import Phaser from 'phaser';
import Depths from 'structs/Depths';
import TransformHelpers from 'helpers/TransformHelpers';
import Planet from 'entity/planet/Planet';

export default class Lightning extends Phaser.GameObjects.Image {
    constructor (scene) {
        super(scene, -1000, -1000, 'assets', 'smoke');
        this.scene.add.existing(this);
        this.setDepth(Depths.SMOKE);
        this.setActive(false);
        this.setVisible(false);
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    launch (x, y) {
        this.setPosition(x, y);
        this.setAlpha(1);
        this.setVisible(true);
        this.setActive(true);
        this.setScale(Phaser.Math.RND.realInRange(0.8, 1.2));

        let moveTo = TransformHelpers.calcPivot(x, y, Planet.getRotationTowardPlanetCenter(x, y) - Math.PI / 2 + Phaser.Math.DegToRad(Phaser.Math.RND.integerInRange(-15, 15)), 150);

        this.scene.tweens.add({
            targets: this,
            duration: 5000,
            x: moveTo.x,
            y: moveTo.y,
            onComplete: () => {
                this.setActive(false);
                this.setVisible(false);
            }
        });
        this.scene.tweens.add({
            targets: this,
            duration: 3000,
            alpha: 0
        });
    }
}
