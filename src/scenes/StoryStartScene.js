import Phaser from 'phaser';

export default class StoryStartScene extends Phaser.Scene {
    constructor () {
        super({ key: 'StoryStartScene' });
    }

    create () {
        let texts = [
            'Wake up little planet..',
            'Your grandchildren are returning',
            // 'Your EVIL grandchildren are returning'
        ];

        let timeBetweenText = 5500;
        let i = 0;

        texts.forEach((text) => {
            setTimeout(() => {
                this.showText(text);
            }, i * timeBetweenText);
            i++;
        });
    }

    showText (text) {
        let textObject = this.add.text(this.physics.world.bounds.centerX, this.physics.world.bounds.centerY, text, { fill: '#FFF', fontFamily: 'AldotheApache', fontSize: 50 }).setOrigin(0.5, 0.5).setAlpha(0);
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
                }, 3000);
            }
        });
    }
}
