export default class SoundManager {
    /**
     * @param {GameScene} scene
     */
    constructor (scene) {
        /**
        * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {Phaser.Sound.BaseSound}
         */
        this.lightning = this.scene.sound.add('lightning');
        this.explosion1 = this.scene.sound.add('explosion1');
        this.die1 = this.scene.sound.add('die1');
        this.tornado = this.scene.sound.add('tornado');
        this.engine2 = this.scene.sound.add('engine2');
        this.volcano = this.scene.sound.add('volcano');
        this.asteroid = this.scene.sound.add('asteroid');
        this.laser = this.scene.sound.add('laser');
    }
}
