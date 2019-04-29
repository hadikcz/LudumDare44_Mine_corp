import $ from 'jquery';
import Events from 'structs/Events';

export default class MineCorpIncomeUI {
    /**
     * @param {GameScene} scene
     * @param {Planet} planet
     */
    constructor (scene, planet) {
        /**
         * @private
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @private
         * @type {Planet}
         */
        this.planet = planet;

        this.scene.events.on(Events.ShowUI, this.show, this);

        this.interval = null;
    }

    show (startRefresh = true) {
        $('.income').fadeIn(1000);
        if (!startRefresh) return;

        setTimeout(() => {
            this.interval = setInterval(() => {
                $('#incomeValue').html(this.scene.gameEnvironment.planet.mineCorpIncome);
            }, 500);
        }, 1200);
    }

    fadeOut () {
        clearInterval(this.interval);
        $('.income').fadeOut(1000);
    }
}
