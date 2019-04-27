/* eslint-disable no-trailing-spaces */
/* global __DEV__ */
import * as dat from 'dat.gui';
import Phaser from 'phaser';
import Controller from '../Controller';
import EffectManager from './../effects/EffectManager';
import GameConfig from './../GameConfig';
import GameEnvironment from '../core/GameEnvironment';
import LightSystem from './../core/lights/LightSystem';
import UI from './../ui/UI';

export default class GameScene extends Phaser.Scene {
    constructor () {
        super({ key: 'GameScene' });
        /**
         * @type {EffectManager}
         */
        this.effectManager = null;

        /**
         * @type {UI}
         */
        this.ui = null;

        this.gameOver = false;
    }

    create () {
        this.physics.world.setBounds(0, 0, GameConfig.World.width, GameConfig.World.height);
        this.effectManager = new EffectManager(this);
        this.cameras.main.setOrigin(0, 0);
        this.cameras.main.startFollow({ x: 0, y: 0 });
        this.cameras.main.setZoom(GameConfig.GameWindowSettings.zoom);

        this.lightSystem = new LightSystem(this);

        this.gameEnvironment = new GameEnvironment(this);

        this.controller = new Controller(this);

        this.ui = new UI(this);

        // fade in
        // this.fadeRect = this.add.rectangle(0, 0, 1000, 1000, 0x000000, 1).setAlpha(1).setDepth(99999);
        // this.tweens.add({
        //     targets: this.fadeRect,
        //     alpha: 0,
        //     duration: 1000,
        //     ease: 'Linear',
        //     onComplete: () => {
        //         this.fadeRect.destroy();
        //     }
        // });
    }

    update () {
        this.controller.update();
        this.gameEnvironment.update();
    }
}
