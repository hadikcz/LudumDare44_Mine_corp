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
        this.scene.events.on(Events.UsedAttack, this._usedAttack, this);

        let self = this;
        $('.button').on('click', function () {
            let attackType = $(this).data('id');
            if (self.attackManager.switchAttackType(attackType)) {
                self.redraw();
            }
        });

        this.scene.input.keyboard.on('keydown', function (event) {
            console.log(event);
            if (event.key === 'q' || event.key === '1') {
                self.switchTo(Attacks.TYPES.LIGHTNING);
            }

            if (event.key === 'w' || event.key === '2') {
                self.switchTo(Attacks.TYPES.TORNADO);
            }

            if (event.key === 'e' || event.key === '3') {
                self.switchTo(Attacks.TYPES.VOLCANO);
            }

            if (event.key === 'r' || event.key === '4') {
                self.switchTo(Attacks.TYPES.ASTEROID);
            }
        });
    }

    switchTo (type) {
        this.scene.attackManager.switchAttackType(type);
        this.redraw();
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

        setTimeout(() => {
            $('.key-manual').fadeOut(1000);
        }, 3500);
    }

    _usedAttack (type) {
        let attackData = Attacks.getDataByType(type);

        // let selector = $('#progress-' + type);
        let selectorInner = $('#progress-inner-' + type);
        selectorInner.width('0%');

        let countdownStart = Date.now();
        let countdownInterval = setInterval(() => {
            let elapsedTime = Date.now() - countdownStart;
            let percent = (elapsedTime / attackData.coolDown);
            selectorInner.width((percent * 100) + '%');
            if (percent >= 1) {
                selectorInner.width('100%');
                clearInterval(countdownInterval);
            }
        }, 10);
    }
}
