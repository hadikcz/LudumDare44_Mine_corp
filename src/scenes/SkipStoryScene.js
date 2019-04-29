import Phaser from 'phaser';

export default class SkipStoryScene extends Phaser.Scene {
    constructor () {
        super({ key: 'SkipStoryScene' });
    }

    create () {
        this.showText('WARNNING: Story skipped!');
    }

    showText (text) {
        let textObject = this.add.text(this.physics.world.bounds.centerX, this.physics.world.bounds.centerY, text, { fill: '#FF0000', fontFamily: 'AldotheApache', fontSize: 50 }).setOrigin(0.5, 0.5).setAlpha(0);
        this.add.tween({
            targets: textObject,
            duration: 1000,
            alpha: 1,
            onComplete: () => {
                setTimeout(() => {
                    this.add.tween({
                        targets: textObject,
                        duration: 1000,
                        alpha: 0
                    });
                }, 1000);
            }
        });
    }
}
