export default class Controller {
    /**
     * @param {GameScene} scene
     */
    constructor (scene) {

        /**
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {Character} targetCharacterToControl
         */
        this._targetCharacterToControl = null;

        /**
         * @type {{jump: Phaser.Input.Keyboard.Key, jump2: Phaser.Input.Keyboard.Key, fire: Phaser.Input.Keyboard.Key, left: Phaser.Input.Keyboard.Key, right: Phaser.Input.Keyboard.Key, down: Phaser.Input.Keyboard.Key}}
         */
        this.keys = {
            up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            up2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            left2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            right2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            down2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            action: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            action2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            switchCharacter: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
        };

        this._lockInteract = false;

        this._lockSwitchCharacter = false;
    }

    /**
     * @param {Character} character
     */
    setControlledCharacter (character) {
        this._targetCharacterToControl = character;
    }

    update () {
        if (!this._targetCharacterToControl) return;

        if (this.keys.switchCharacter.isDown && !this._lockSwitchCharacter) {
            this._lockSwitchCharacter = true;
            this.scene.events.emit('switchCharacter');
            setTimeout(() => {
                try {
                    this._lockSwitchCharacter = false;
                } catch (e) {console.log(e);}
            }, 200);
        }
        if (this._targetCharacterToControl._lockControlls) return;

        if (this.keys.left.isDown || this.keys.left2.isDown) {
            this._targetCharacterToControl.walk(-this._targetCharacterToControl.acceleration, 'left');
        } else if (this.keys.right.isDown || this.keys.right2.isDown) {
            this._targetCharacterToControl.walk(this._targetCharacterToControl.acceleration, 'right');
        } else {
            // this._targetCharacterToControl.body.setVelocity(0, 0);
            this._targetCharacterToControl.walk(0);
        }

        if (this.keys.action.isDown || this.keys.action2.isDown) {
            if (!this._lockInteract) {
                this.scene.events.emit('interact');
                this._lockInteract = true;
                setTimeout(() => {
                    try {
                        this._lockInteract = false;
                    } catch (e) {console.log(e);}
                }, 200);
            }
        }
    }
}
