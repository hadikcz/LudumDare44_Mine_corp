export default class ProgressBarUI extends Phaser.GameObjects.Container {
    /**
     * @param {GameScene} scene
     * @param {object} config
     */
    constructor (scene, config) {
        if (config.x === undefined) config.x = 0;
        if (config.y === undefined) config.y = 0;
        super(scene, config.x, config.y, []);
        this.scene.add.existing(this);
        /**
         * @type {GameScene}
         * @private
         */
        this.scene = scene;

        /**
         * @type {Object}
         * @private
         */
        this.config = config;

        /**
         * @type {Phaser.GameObjects.Image}
         * @private
         */
        this.bgImage = null;

        /**
         * @type {Phaser.GameObjects.Image}
         * @private
         */
        this.barImage = null;

        /**
         * @type {Phaser.GameObjects.GameObject}
         * @private
         */
        this.followTarget = config.followTarget ? config.followTarget : null;

        /**
         * @type {Phaser.GameObjects.Text}
         */
        this.text = null;

        this._checkDefaultConfigValues();

        this._drawBackground();
        this._drawBar();

        if (this.config.drawText) {
            this.text = this.scene.add.text(0, 0, '', { fill: '#FF0000' });
            this.add(this.text);
        }
        this.setDepth(this.config.depth);
    }

    preUpdate () {
        if (this.followTarget) {
            this.setPosition(
                this.followTarget.x + this.config.offsetX,
                this.followTarget.y + this.config.offsetY
            );
        }
    }

    destroy () {
        this.bgImage.destroy();
        this.barImage.destroy();
    }

    hide () {
        this.bgImage.setVisible(false);
        this.bgImage.setActive(false);
        this.barImage.setVisible(false);
        this.barImage.setActive(false);
    }

    show () {
        this.bgImage.setVisible(true);
        this.bgImage.setActive(true);
        this.barImage.setVisible(true);
        this.barImage.setActive(true);
    }

    /**
     * @param {string} bg
     * @param {string} bar
     */
    setFrames (bg, bar) {
        this.bgImage.setFrame(bg);
        this.barImage.setFrame(bar);
    }

    /**
     * @param {number} x
     */
    setOffsetX (x) {
        this.config.offsetX = x;
    }

    /**
     * @param {number} y
     */
    setOffsetY (y) {
        this.config.offsetY = y;
    }

    /**
     * @param {boolean} fixed
     */
    setFixedToCamera (fixed = true) {
        let scrollFactor = fixed ? 0 : 1;
        this.bgImage.setScrollFactor(scrollFactor);
        this.barImage.setScrollFactor(scrollFactor);
    }

    /**
     * @param {number} percent
     * @param {number} delay
     */
    setPercent (percent, delay = null) {
        if (percent < 0) {
            percent = 0;
        }
        var newScale = {
            x: percent / 100,
            y: 1
        };

        if (delay) {
            this.scene.add.tween({
                targets: this.barImage,
                scaleX: newScale.x,
                scaleY: newScale.Y,
                delay: delay,
                ease: 'linear'
            });
        } else {
            this.barImage.setScale(newScale.x, newScale.y);
        }

        if (this.text) {
            this.text.setText(percent + '%');
        }
    }

    _checkDefaultConfigValues () {
        if (this.config.barOffsetX === undefined) {
            this.config.barOffsetX = 0;
        }

        if (this.config.barOffsetY === undefined) {
            this.config.barOffsetY = 0;
        }

        if (this.config.drawText === undefined) {
            this.config.drawText = false;
        }

        if (this.config.offsetX === undefined) {
            this.config.offsetX = 0;
        }

        if (this.config.offsetY === undefined) {
            this.config.offsetY = 0;
        }

        if (this.config.rotation === undefined) {
            this.config.rotation = 0;
        }
    }

    /**
     * @private
     */
    _drawBackground () {
        if (this.config.bgTexture !== undefined) {
            this.bgImage = this.scene.add.image(this.config.x, this.config.y, this.config.bgTexture);
        } else if (this.config.spriteSheet !== undefined) {
            this.bgImage = this.scene.add.image(this.config.x, this.config.y, this.config.spriteSheet, 1);
        } else if (this.config.atlas !== undefined) {
            this.bgImage = this.scene.add.image(this.config.x, this.config.y, this.config.atlas, this.config.atlasBg ? this.config.atlasBg : 'bg');
        } else {
            throw 'No bg texture given';
        }
        this.bgImage.setOrigin(0);
        this.bgImage.setRotation(this.config.rotation);
        this.add(this.bgImage);
    }

    /**
     * @private
     */
    _drawBar () {
        if (this.config.barTexture !== undefined) {
            this.barImage = this.scene.add.image(this.config.x, this.config.y, this.config.barTexture);
        } else if (this.config.spriteSheet !== undefined) {
            this.barImage = this.scene.add.image(this.config.x, this.config.y, this.config.spriteSheet, 0);
        } else if (this.config.atlas !== undefined) {
            this.barImage = this.scene.add.image(this.config.x, this.config.y, this.config.atlas, this.config.atlasBar ? this.config.atlasBar : 'bar');
        } else {
            throw 'No bar texture given';
        }
        if (this.config.barAlpha !== undefined) {
            this.barImage.setAlpha(this.config.barAlpha);
        }
        this.barImage.setOrigin(0);
        this.barImage.setRotation(this.config.rotation);
        this.add(this.barImage);
    }
}
