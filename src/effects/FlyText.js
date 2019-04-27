import Phaser from 'phaser';

export default class FlyText extends Phaser.GameObjects.Text {
    constructor (scene) {
        super(scene, -1000, -100, '', { fontFamily: 'AldotheApache, Verdana, Arial', fontSize: 32, color: '#0000FF' });

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.setStroke('#FFFFFF', 8);

        this.setDepth(6);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {string} text
     * @param {object} style
     */
    launch (x, y, text, style) {
        this.setText(text);
        this.setPosition(x, y);
        this.setVisible(true);
        this.setActive(true);

        if (style !== undefined) {
            this.setStyle(style);
        }

        let range = 20;
        let tweenX = Phaser.Math.RND.realInRange(-range, range);
        let tweenY = -250;
        let duration = Phaser.Math.RND.integerInRange(3000, 4000);

        this.scene.tweens.add({
            targets: this,
            x: this.x + tweenX,
            y: this.y + tweenY,
            alpha: 0,
            duration: duration,
            ease: 'Linear',
            onComplete: () => {
                this.setActive(false);
                this.setVisible(false);
            }
        });
    }
}
