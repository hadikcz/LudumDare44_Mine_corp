/* global gamee */
import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor () {
        super({ key: 'BootScene', plugins: ['Loader'] });
    }

    preload () {
        window.scene = this;

        const progress = this.add.graphics();
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        this.load.on('complete', () => {
            progress.destroy();
            // this.scene.start('GameOverScene');
            // this.scene.start('EnableSoundScene');
            this.scene.start('GameScene');
            // this.scene.start('GameOverLostScene');
        }, this);
        this.load.image('bg', 'assets/images/bg.png');
        this.load.image('block', 'assets/images/block.png');
        this.load.image('landing_ship', 'assets/images/landing_ship.png');
    }
}
