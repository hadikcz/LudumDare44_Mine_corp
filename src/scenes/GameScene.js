/* eslint-disable no-trailing-spaces */
/* global __DEV__ */
import Phaser from 'phaser';
import Controller from '../Controller';
import EffectManager from './../effects/EffectManager';
import GameConfig from './../GameConfig';
import GameEnvironment from '../core/GameEnvironment';
import LightSystem from './../core/lights/LightSystem';
import UI from './../ui/UI';
import UnitSpawner from 'core/UnitSpawner';
import AttackManager from 'core/AttackManager';
import Events from 'structs/Events';
import SoundManager from 'core/SoundManager';

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

        this.isGameOver = false;
    }

    create () {
        window.gameScene = this;
        this.physics.world.setBounds(0, 0, GameConfig.World.width, GameConfig.World.height);
        this.effectManager = new EffectManager(this);
        this.cameras.main.startFollow({ x: GameConfig.World.width / 2, y: GameConfig.World.height / 2 });

        if (!window.skipStory) {
            this.cameras.main.setZoom(GameConfig.GameWindowSettings.initZoom);

            setTimeout(() => {
                this.cameras.main.zoomTo(GameConfig.GameWindowSettings.zoom, GameConfig.timing.zoomOutTime);
            }, GameConfig.timing.timeBeforeZoomOut);
        } else {
            this.cameras.main.setZoom(GameConfig.GameWindowSettings.zoom);
        }

        this.lightSystem = new LightSystem(this);
        this.gameEnvironment = new GameEnvironment(this);

        this.soundManager = new SoundManager(this);

        this.unitSpawner = new UnitSpawner(this);
        this.controller = new Controller(this);

        this.attackManager = new AttackManager(this);

        this.ui = new UI(this);

        this.input.on('dragstart', function (pointer, obj) {
            obj.body.moves = false;
        });

        this.input.on('drag', function (pointer, obj, dragX, dragY) {
            obj.setPosition(dragX, dragY);
        });

        this.input.on('dragend', function (pointer, obj) {
            obj.body.moves = true;
        });
    }

    update () {
        this.gameEnvironment.update();
    }

    gameOver () {
        this.attackManager.canAttack = false;
        window.totalIncome = this.gameEnvironment.planet.mineCorpIncome;
        this.isGameOver = true;
        this.ui.hide();
        this.add.tween({
            targets: this.gameEnvironment.bgDeath,
            alpha: 1,
            duration: 5000
        });

        this.add.tween({
            targets: [this.gameEnvironment.planet.clouds, this.gameEnvironment.planet.clouds2],
            alpha: 0,
            duration: 5000
        });

        setTimeout(() => {
            this.scene.launch('StoryTellEndScene');
        }, 4000);

        setTimeout(() => {
            this.scene.stop('GameScene');
            // this.cameras.main.fadeOut(1000);
            // setTimeout(() => {
            //     this.scene.stop('GameScene');
            // }, 5000);
        }, 9000);
    }
}
