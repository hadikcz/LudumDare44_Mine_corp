/* globals __DEV__ */
import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import StoryStartScene from './scenes/StoryStartScene';
import GameScene from './scenes/GameScene';
import StoryTellEndScene from './scenes/StoryTellEndScene';
import SkipStoryScene from './scenes/SkipStoryScene';
import GameConfig from './GameConfig.js';
import Stats from 'stats.js/src/Stats';

window.skipStory = true;

const config = {
    type: Phaser.AUTO,
    pixelArt: false,
    roundPixels: false,
    parent: 'content',
    width: GameConfig.GameWindowSettings.width,
    height: GameConfig.GameWindowSettings.height,
    backgroundColor: '#000000',
    audio: {
        disableWebAudio: true
    },
    physics: {
        default: 'arcade',
        // matter: {
        //     gravity: {
        //         scale: 0
        //     },
        //     debug: true
        // },
        // plugins: {
        //     attractors: true
        // },
        arcade: {
            debug: false
        }
    },
    antialias: true,
    scene: [
        BootScene,
        GameScene,
        StoryStartScene,
        SkipStoryScene,
        StoryTellEndScene
    ]
};

let game = new Phaser.Game(config);

var stats = new Stats();
document.body.appendChild(stats.dom);

requestAnimationFrame(function loop () {
    stats.update();
    requestAnimationFrame(loop);
});
