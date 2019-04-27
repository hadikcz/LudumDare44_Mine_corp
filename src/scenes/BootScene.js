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
        this.load.image('light', 'assets/images/light.png');
        this.load.image('spaceBetweenSurfaceAndBasement', 'assets/images/spaceBetweenSurfaceAndBasement.png');
        this.load.image('surface', 'assets/images/surface.png');
        this.load.image('night', 'assets/images/night.png');
        this.load.image('nightSurface', 'assets/images/nightSurface.png');
        this.load.atlas('all', 'assets/images/all.png', 'assets/images/all.json');

        this.load.audio('nightAmbient', 'assets/sounds/nightAmbient.mp3');
        this.load.audio('sunset', 'assets/sounds/sunset.mp3');
        this.load.audio('sunrise', 'assets/sounds/sunrise.mp3');
        this.load.audio('boilerLoop', 'assets/sounds/boilerLoop.mp3');
        this.load.audio('throw', 'assets/sounds/throw.mp3');
        this.load.audio('door', 'assets/sounds/door.mp3');
        this.load.audio('take', 'assets/sounds/take.mp3');
        this.load.audio('pickup', 'assets/sounds/pickup.mp3');
        this.load.audio('fixingVent', 'assets/sounds/fixingVent.mp3');
        this.load.audio('kasel', 'assets/sounds/kasel.mp3');
        this.load.audio('die', 'assets/sounds/die.mp3');
        this.load.audio('gameInit', 'assets/sounds/gameInit.mp3');
        this.load.audio('gameOver', 'assets/sounds/gameOver.mp3');
    }
}
