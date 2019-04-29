import $ from 'jquery';
import Phaser from 'phaser';
import MineCorpIncomeUI from 'ui/MineCorpIncomeUI';
import AttackBarUI from 'ui/AttackBarUI';
import PlanetHpTextUI from 'ui/PlanetHpTextUI';

export default class UI {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor (scene) {
        /**
         * @type {Phaser.Scene}
         */
        this.scene = scene;

        /**
         * @type {MineCorpIncomeUI}
         */
        this.mineCorpIncomeUI = new MineCorpIncomeUI(this.scene, this.scene.gameEnvironment.planet);

        /**
         * @type {AttackBarUI}
         */
        this.attackBarUI = new AttackBarUI(this.scene, this.scene.attackManager);

        /**
         * @type {PlanetHpTextUI}
         */
        this.planetHpTextUI = new PlanetHpTextUI(this.scene);
    }

    hide () {
        this.attackBarUI.fadeOut();
        this.mineCorpIncomeUI.fadeOut();
        this.planetHpTextUI.fadeOut();
    }
}
