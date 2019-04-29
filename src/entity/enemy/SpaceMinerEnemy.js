import AbstractEnemy from 'entity/enemy/AbstractEnemy';
import Depths from 'structs/Depths';
import Phaser from "phaser";
import Planet from 'entity/planet/Planet';
import EnemyPhase from 'structs/EnemyPhase';
import Enemies from 'structs/Enemies';
import TransformHelpers from 'helpers/TransformHelpers';

export default class SpaceMinerEnemy extends AbstractEnemy {
    constructor (scene, x, y) {
        super(scene, SpaceMinerEnemy.TYPE, 'heavy_miner', x, y, 'assets2');
        this.setDepth(Depths.SPACE_MINER);

        this.laser = this.scene.add.image(0, -5, 'assets2', 'heavy_miner_drill').setOrigin(0.5, 0).setScale(0, 0);
        this.add(this.laser);
    }

    preUpdate () {
        super.preUpdate();

        this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y) - Math.PI / 2);

        if (this._phase === EnemyPhase.ORBITING) {
            this._startMining();
        }
    }

    _startMining () {
        this._canMine = true;
        this._phase = EnemyPhase.MINING;

        this.scene.cameras.main.flash(300, 255, 255, 255);
        this.scene.cameras.main.shake(700);

        this.scene.tweens.add({
            targets: this.laser,
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            onComplete: () => {
                this.scene.tweens.add({
                    targets: this.laser,
                    scaleX: 0.8,
                    scaleY: 1,
                    alpha: 0.9,
                    yoyo: -1,
                    repeat: Infinity,
                    duration: 200
                });
            }
        });

        let nearToPlanet = TransformHelpers.calcPivot(this.x, this.y, this.rotation, -50);
        this.scene.tweens.add({
            targets: this,
            x: nearToPlanet.x,
            y: nearToPlanet.y,
            repeat: Infinity,
            yoyo: -1,
            ease: Phaser.Math.Easing.Quadratic.InOut,
            duration: 6000
        });
    }

    static get TYPE () {
        return AbstractEnemy.ENEMY_TYPE_SPACE_SHIP;
    }
}
