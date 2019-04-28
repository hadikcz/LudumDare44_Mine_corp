import $ from 'jquery';

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
    }

    show (startRefresh = true) {
        $('.income').fadeIn(1000);
        if (!startRefresh) return;

        setTimeout(() => {
            setInterval(() => {
                $('#incomeValue').html(this.scene.gameEnvironment.planet.mineCorpIncome);
            }, 500);
        }, 1200);
    }
}
