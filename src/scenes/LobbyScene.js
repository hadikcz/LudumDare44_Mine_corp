/* global $, VERSION, BUILD_NUMBER */
import $ from 'jquery';
import Phaser from 'phaser';

export default class LobbyScene extends Phaser.Scene {
    constructor () {
        super({ key: 'LobbyScene' });
    }

    create () {

        $('.killCamBorder').hide();
        this.characterSelectorUI = this.scene.manager.getScene('BootScene').characterSelectorUI;

        let element = $('.mainmenuversion');
        element.html('v' + VERSION + '(' + BUILD_NUMBER + ')');
        element.show();

        let self = this;
        $('.start-game').on('click', function () {
            let selector = $('.play-button');
            if (selector.hasClass('click')) {
                return;
            }
            selector.addClass('click');
            setTimeout(() => {
                // @TODO: loading spinner
                self.scene.start('GameScene', { selectedCharacter: self.characterSelectorUI.currentCharacterId });
            }, 100);
        });
    }
}
