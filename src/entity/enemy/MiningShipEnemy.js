import AbstractEnemy from 'entity/enemy/AbstractEnemy';
import EnemyPhase from 'structs/EnemyPhase';
import ManEnemy from 'entity/enemy/ManEnemy';
import TransformHelpers from 'helpers/TransformHelpers';
import Depths from 'structs/Depths';
import Enemies from 'structs/Enemies';
import Events from 'structs/Events';

export default class MiningShipEnemy extends AbstractEnemy {
    constructor (scene, x, y) {
        super(scene, MiningShipEnemy.TYPE, 'ship', x, y, 'assets2');
        this.setDepth(Depths.SHIPS);

        this.legs = this.scene.add.image(0, 0, 'assets2', 'ship_legs').setScale(0, 0);
        this.add(this.legs);

        this.miningPipe = this.scene.add.image(0, 0, 'assets2', 'ship_orange_line').setOrigin(0.5, 0).setScale(1, 0);
        this.add(this.miningPipe);

        this.leftEngine = this.scene.add.image(-67, -30, 'assets2', 'ship_flames').setOrigin(0.5, 0);
        this.add(this.leftEngine);

        this.rightEngine = this.scene.add.image(67, -30, 'assets2', 'ship_flames').setOrigin(0.5, 0);
        this.add(this.rightEngine);

        // legs animation
        setTimeout(() => {
            this.scene.add.tween({
                targets: this.legs,
                duration: 750,
                scaleX: 1,
                scaleY: 1
            });

            // engine animation
            this.scene.add.tween({
                targets: [this.leftEngine, this.rightEngine],
                duration: 750,
                scaleX: 0,
                scaleY: 0,
                ease: Phaser.Math.Easing.Expo.In
            });
        }, 500);
    }

    preUpdate () {
        super.preUpdate();
        if (this._phase === EnemyPhase.LANDED) {
            this._startMining();
        }
    }

    destroy () {
        if (this.hp.get() <= 0) {
            this.scene.events.emit(Events.ReturnDamageToPlanet, this.totalMined - this.totalMined / Enemies.SHIPS.returnValueAfterDestroyShip);
        }
        super.destroy();
    }

    _startMining () {
        this._canMine = true;
        this._phase = EnemyPhase.START_MINING;

        // mining pipe animation
        this.scene.add.tween({
            targets: this.miningPipe,
            duration: 1500,
            scaleX: 1,
            scaleY: 1
        });

        setTimeout(() => {
            this._phase = EnemyPhase.LAUNCH;
            this.launchToSpace();

            // mining pipe back
            this.scene.add.tween({
                targets: this.miningPipe,
                duration: 1500,
                scaleX: 1,
                scaleY: 0
            });
            // engine animation
            this.scene.add.tween({
                targets: [this.leftEngine, this.rightEngine],
                duration: 2500,
                scaleX: 1,
                scaleY: 1,
                ease: Phaser.Math.Easing.Expo.Out
            });
            setTimeout(() => {
                this.scene.add.tween({
                    targets: this.legs,
                    duration: 1250,
                    scaleX: 0,
                    scaleY: 0
                });
            }, 2000);
        }, this.enemyData.waitBeforeLaunchTime);
    }

    static get TYPE () {
        return AbstractEnemy.ENEMY_TYPE_MINING_SHIP;
    }
}
