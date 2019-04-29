import $ from 'jquery';
import Depths from 'structs/Depths';
import Planet from 'entity/planet/Planet';
import NumberHelpers from 'helpers/NumberHelpers';

export default class MineCorpIncomeUI {
    /**
     * @param {GameScene} scene
     */
    constructor (scene) {
        /**
         * @private
         * @type {GameScene}
         */
        this.scene = scene;

        let fontSettings = { fill: '#FFF', fontFamily: 'AldotheApache', fontSize: 50 };
        let shadowFontSettings = { fill: '#6f6a52', fontFamily: 'AldotheApache', fontSize: 50 };
        let shadowAlpha = 0.5;
        let center = Planet.getCenterOfPlanet();

        let yourTextPos = { x: -50, y: -115 };
        let hpTextPos = { x: -50, y: -75 };
        let hpValuePos = { x: -5, y: 50 };

        let shadowMove = {x: 0, y: 12};

        // shadow
        this.yourTextShadow = this.scene.add.text(center.x + yourTextPos.x + shadowMove.x, center.y + yourTextPos.y + shadowMove.y, 'YOUR', shadowFontSettings).setDepth(Depths.PLANET_HP).setAlpha(shadowAlpha);
        this.hpTextShadow = this.scene.add.text(center.x + hpTextPos.x + shadowMove.x, center.y + hpTextPos.y + shadowMove.y, 'HP', { fill: '#6f6a52', fontFamily: 'AldotheApache', fontSize: 100 }).setDepth(Depths.PLANET_HP).setAlpha(shadowAlpha);
        this.hpValueTextShadow = this.scene.add.text(center.x + hpValuePos.x + shadowMove.x, center.y + hpValuePos.y + shadowMove.y, '10 000', shadowFontSettings).setDepth(Depths.PLANET_HP).setOrigin(0.5).setAlpha(shadowAlpha);

        // text
        this.yourText = this.scene.add.text(center.x + yourTextPos.x, center.y + yourTextPos.y, 'YOUR', fontSettings).setDepth(Depths.PLANET_HP);
        this.hpText = this.scene.add.text(center.x + hpTextPos.x, center.y + hpTextPos.y, 'HP', { fill: '#FFF', fontFamily: 'AldotheApache', fontSize: 100 }).setDepth(Depths.PLANET_HP);
        this.hpValueText = this.scene.add.text(center.x + hpValuePos.x, center.y + hpValuePos.y, '10 000', fontSettings).setDepth(Depths.PLANET_HP).setOrigin(0.5);
    }

    redrawHp (hp) {
        let text = NumberHelpers.formatThousands(hp, ' ');
        this.hpValueTextShadow.setText(text);
        this.hpValueText.setText(text);
    }

    // show (startRefresh = true) {
    //     $('.income').fadeIn(1000);
    //     if (!startRefresh) return;
    //
    //     setTimeout(() => {
    //         setInterval(() => {
    //             $('#incomeValue').html(this.scene.gameEnvironment.planet.mineCorpIncome);
    //         }, 500);
    //     }, 1200);
    // }
}
