import * as clone from 'clone';

export default class Counter {
    /**
     * @param {number} start
     * @param {number} regenerateDelay - Delay between regen in ms
     * @param {number} regenerateCount - Count of health points for regenerate every regenerate tick
     * @param {GameScene} scene - Scene
     * @param {boolean} checkMax
     * @param {boolean} checkMin
     */
    constructor (start = 0, regenerateDelay = null, regenerateCount = null, scene = null, checkMax = false, checkMin = false) {

        /**
         * @type {Phaser.Events.EventEmitter}
         */
        this.events = new Phaser.Events.EventEmitter();

        /**
         * @type {boolean}
         * @private
         */
        this._checkMin = checkMin;

        /**
         * @type {boolean}
         * @private
         */
        this._checkMax = checkMax;

        /**
         * @type {number}
         * @private
         */
        this._maxValue = start;
        /**
         * @type {number}
         * @private
         */
        this._regenerateCount = regenerateCount;

        /**
         * @type {Phaser.Time.TimerEvent|null}
         * @private
         */
        this._regenerateTimer = null;

        /**
         * @type {number}
         * @private
         */
        this._value = start;

        if (regenerateDelay && regenerateCount && scene) {
            this._regenerateTimer = scene.time.addEvent({
                delay: regenerateDelay,
                repeat: Infinity,
                callbackScope: this,
                callback: this._regenerateTick
            });
        }
    }

    /**
     * @param {number} amount
     */
    add (amount) {
        if (this.get() + amount > this._maxValue && this._checkMax) {
            this._value = clone(this._maxValue);
            this._emitChange();
            return;
        }
        this._value += amount;
        this._emitChange();
    }

    /**
     * @readonly
     * @return {number}
     */
    get () {
        return this._value;
    }

    /**
     * @return {number}
     */
    getPercent () {
        return (this._value / this._maxValue) * 100;
    }

    /**
     * @param {number} amount
     */
    take (amount) {
        if (this.get() - amount < 0 && this._checkMin) return;
        this._value -= amount;
        this._emitChange();
    }

    /**
     * @param {number} value
     */
    increaseMax (value) {
        this._maxValue += value;
        this._emitChangeMax();
        this._emitChange();
    }

    setToMax () {
        this._value = JSON.parse(JSON.stringify(this._maxValue));
        this._emitChange();
    }

    /**
     * @private
     */
    _regenerateTick () {
        this.add(this._regenerateCount);
    }

    /**
     * @private
     */
    _emitChange () {
        this.events.emit('change', this.getPercent(), this.get(), this._maxValue);
    }

    /**
     * @private
     */
    _emitChangeMax () {
        this.events.emit('changeMax', this.getPercent(), this.get(), this._maxValue);
    }
}
