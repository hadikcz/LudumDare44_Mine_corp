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

        // this.show(false);
        setTimeout(() => {

        })
        this.scene.events.on(Events.ShowUI, this.show, this);
        this.scene.events.on(Events.UsedAttack, this._usedAttack, this);

        let self = this;
        $('.button').on('click', function () {
            let attackType = $(this).data('id');
            if (self.attackManager.switchAttackType(attackType)) {
                self.redraw();
            }
        });

        this.scene.events.on(Events.UnlockedNewAttack, this.redraw, this);

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
        $('.button').removeClass('button_lightning_selected');
        $('.button').removeClass('button_tornado_selected');
        $('.button').removeClass('button_volcano_selected');
        $('.button').removeClass('button_asteroid_selected');

        $('.button[data-id=' + this.attackManager.getActiveAttack() + ']').addClass('button_' + this.attackManager.getActiveAttack() + '_selected');

        // unlock
        if (this.attackManager.locks[Attacks.TYPES.TORNADO]) {
            $('.button[data-id=tornado]').removeClass('button_tornado');
            $('.button[data-id=tornado]').addClass('button_tornado_disabled');
        } else {
            $('.button[data-id=tornado]').addClass('button_tornado');
            $('.button[data-id=tornado]').removeClass('button_tornado_disabled');
        }

        if (this.attackManager.locks[Attacks.TYPES.VOLCANO]) {
            $('.button[data-id=volcano]').removeClass('button_volcano');
            $('.button[data-id=volcano]').addClass('button_volcano_disabled');
        } else {
            $('.button[data-id=volcano]').addClass('button_volcano');
            $('.button[data-id=volcano]').removeClass('button_volcano_disabled');
        }

        if (this.attackManager.locks[Attacks.TYPES.ASTEROID]) {
            $('.button[data-id=asteroid]').removeClass('button_asteroid');
            $('.button[data-id=asteroid]').addClass('button_asteroid_disabled');
        } else {
            $('.button[data-id=asteroid]').addClass('button_asteroid');
            $('.button[data-id=asteroid]').removeClass('button_asteroid_disabled');
        }
    }

    show (fade = true) {
        this.redraw();
        let selector = $('.attackBar');
        if (fade) {
            selector.fadeIn(1000);
        } else {
            selector.show();
        }

        setTimeout(() => {
            // $('.key-manual').fadeOut(1000);
        }, 3500);
    }

    _usedAttack (type) {
        let attackData = Attacks.getDataByType(type);

        // let selector = $('#progress-' + type);
        let selectorInner = $('#progress-inner-' + type);
        selectorInner.height('0%');

        let countdownStart = Date.now();
        let countdownInterval = setInterval(() => {
            let elapsedTime = Date.now() - countdownStart;
            let percent = (elapsedTime / attackData.coolDown);
            selectorInner.height((percent * 100) + '%');
            if (percent >= 1) {
                selectorInner.height('100%');
                clearInterval(countdownInterval);
            }
        }, 10);
    }
}
