import $ from 'jquery';
import Events from 'structs/Events';
import Attacks from 'structs/Attacks';

export default class AttackBarUI {
    /**
     * @param {GameScene} scene
     * @param {AttackManager} attackManager
     */
    constructor (scene, attackManager) {
        /**
         * @private
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @private
         * @type {AttackManager}
         */
        this.attackManager = attackManager;

        this.show(false);
        this.scene.events.on(Events.MineOperationsBegin, this.show, this);

        let self = this;
        $('.button').on('click', function () {
            let attackType = $(this).data('id');
            if (self.attackManager.switchAttackType(attackType)) {
                self.redraw();
            }
        });
    }

    redraw () {
        $('.button').removeClass('active');
        $('.button[data-id=' + this.attackManager.getActiveAttack() + ']').addClass('active');
    }

    show (fade = true) {
        let selector = $('.attackBar');
        if (fade) {
            selector.fadeIn(1000);
        } else {
            selector.show();
        }
    }
}
