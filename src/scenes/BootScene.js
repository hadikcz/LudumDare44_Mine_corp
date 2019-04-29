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
        // this.load.image('bg', 'assets/images/bg2.png');
        this.load.image('block', 'assets/images/block.png');
        // this.load.image('core', 'assets/images/core2.png');
        // this.load.image('core_no_color', 'assets/images/core2_no_color.png');

        this.load.atlas('assets', 'assets/images/assets.png', 'assets/images/assets.json');

        // new ones
        // large one
        this.load.image('bg', 'assets/images/large/bg.png');
        this.load.image('earth', 'assets/images/large/earth.png');
        this.load.image('core', 'assets/images/large/core.png');
        this.load.image('core_no_color', 'assets/images/large/core_no_colors.png');
        this.load.image('clouds', 'assets/images/large/clouds.png');

        this.load.atlas('assets2', 'assets/images/assets2.png', 'assets/images/assets2.json');
    }
}
