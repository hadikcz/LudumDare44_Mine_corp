import AbstractEnemy from 'entity/enemy/AbstractEnemy';
import EnemyPhase from 'structs/EnemyPhase';
import ManEnemy from 'entity/enemy/ManEnemy';
import TransformHelpers from 'helpers/TransformHelpers';
import Depths from 'structs/Depths';
import Enemies from 'structs/Enemies';

export default class LandingShipEnemy extends AbstractEnemy {
    constructor (scene, x, y) {
        super(scene, LandingShipEnemy.TYPE, 'transport_ship', x, y, 'assets2');

        this.leftEngine = this.scene.add.image(-28, -15, 'assets2', 'transport_ship_flames').setOrigin(0.5, 0);
        this.add(this.leftEngine);

        this.rightEngine = this.scene.add.image(28, -15, 'assets2', 'transport_ship_flames').setOrigin(0.5, 0);
        this.add(this.rightEngine);

        // legs animation
        setTimeout(() => {
            // engine animation
            this.scene.add.tween({
                targets: [this.leftEngine, this.rightEngine],
                duration: 750,
                scaleX: 0,
                scaleY: 0,
                ease: Phaser.Math.Easing.Expo.In
            });
        }, 500);

        this.setDepth(Depths.SHIPS);
    }

    preUpdate () {
        super.preUpdate();
        if (this._phase === EnemyPhase.LANDED) {
            this._deployWholeCrew();
        }
    }

    _deployWholeCrew () {
        this._phase = EnemyPhase.DEPLOYING_CREW;
        setTimeout(() => {
            this.launchToSpace();
            this._phase = EnemyPhase.LAUNCH;
            setTimeout(() => {
                // engine animation
                this.scene.add.tween({
                    targets: [this.leftEngine, this.rightEngine],
                    duration: 4000,
                    scaleX: 1,
                    scaleY: 1,
                    ease: Phaser.Math.Easing.Expo.Out
                });
            }, 1000);
        }, Enemies.SHIPS.waitBeforeLaunchTime);

        let count = Phaser.Math.RND.integerInRange(1, 3);
        for (let i = 0; i < count; i++) {
            let angleModifier = i % 2 === 0 ? 1 : -1;
            this._deployCrew(angleModifier);
        }
    }

    _deployCrew (angleModifier = 1) {
        let heightFromShipLand = 35;
        let from = TransformHelpers.calcPivot(this.x, this.y, this.rotation + Math.PI / 2, -heightFromShipLand);
        let deployOver = TransformHelpers.calcPivot(
            from.x,
            from.y,
            this.rotation + Math.PI,
            Phaser.Math.RND.integerInRange(25, 45) * angleModifier
        );
        this.scene.unitSpawner.deployOnLandUnit(ManEnemy.TYPE, from.x, from.y, deployOver.x, deployOver.y);
    }

    static get TYPE () {
        return AbstractEnemy.ENEMY_TYPE_LANDING_SHIP;
    }
}
