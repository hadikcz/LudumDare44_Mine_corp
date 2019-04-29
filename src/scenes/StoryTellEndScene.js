import Phaser from 'phaser';
import Depths from 'structs/Depths';

export default class StoryTellEndScene extends Phaser.Scene {
    constructor () {
        super({ key: 'StoryTellEndScene' });
    }

    create () {
        let texts = [
            'She gave them life',
            'And children kill their mother',
            'because of money'
        ];

        /**
         * @type {Phaser.GameObjects.Image}
         */
        let planet = this.add.image(0, 0, 'bg_death').setOrigin(0, 0).setScale(0.5, 0.5).setAlpha(0);
        
        setTimeout(() => {
            this.add.tween({
                targets: planet,
                alpha: 1,
                duration: 1000
            });
        }, 5500);

        let time = Math.round(Date.now() / 1000 - window.started);

        let timeBetweenText = 5500;
        let i = 0;
        texts.forEach((text) => {
            setTimeout(() => {
                this.showText(text);
            }, i * timeBetweenText);
            i++;
        });

        setTimeout(() => {
            let texts2 = [
                'Planet Earth depleted after ' + time + ' months.',
                'Mine corp total income was $' + window.totalIncome + 'M'
            ];
            this.showText(texts2, true);
        }, i * timeBetweenText);
    }

    showText (text, last = false) {
        let textObject = this.add.text(this.physics.world.bounds.centerX, this.physics.world.bounds.centerY, text, { fill: '#FFF', fontFamily: 'AldotheApache', fontSize: 50, align: 'center' }).setOrigin(0.5, 0.5).setAlpha(0);
        this.add.tween({
            targets: textObject,
            duration: 1000,
            alpha: 1,
            onComplete: () => {
                if (!last) {
                    setTimeout(() => {
                        this.add.tween({
                            targets: textObject,
                            duration: 1000,
                            alpha: 0
                        });
                    }, 3000);
                }
            }
        });
    }
}
