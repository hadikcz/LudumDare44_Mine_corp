import AbstractEnemy from 'entity/enemy/AbstractEnemy';
import EnemyPhase from 'structs/EnemyPhase';
import ManEnemy from 'entity/enemy/ManEnemy';
import TransformHelpers from 'helpers/TransformHelpers';
import Depths from 'structs/Depths';
import Enemies from 'structs/Enemies';

export default class LandingShipEnemy extends AbstractEnemy {
    constructor (scene, x, y) {
        super(scene, LandingShipEnemy.TYPE, 'landing_ship', x, y);

        this.setDepth(Depths.SHIPS);
    }

    preUpdate () {
        super.preUpdate();
        if (this._phase === EnemyPhase.LANDED) {
            this._deployCrew();
        }
    }

    _deployCrew () {
        this._phase = EnemyPhase.DEPLOYING_CREW;
        setTimeout(() => {
            this.launchToSpace();
            this._phase = EnemyPhase.LAUNCH;
        }, Enemies.SHIPS.waitBeforeLaunchTime);

        let angleModifier = Phaser.Math.RND.integerInRange(0, 1) === 1 ? 1 : -1;

        let heightFromShipLand = 35;
        let from = TransformHelpers.calcPivot(this.x, this.y, this.rotation + Math.PI / 2, -heightFromShipLand);
        let deployOver = TransformHelpers.calcPivot(
            from.x,
            from.y,
            this.rotation + (angleModifier * Math.PI),
            Phaser.Math.RND.integerInRange(25, 45)
        );
        this.scene.unitSpawner.deployOnLandUnit(ManEnemy.TYPE, from.x, from.y, deployOver.x, deployOver.y);
    }

    static get TYPE () {
        return AbstractEnemy.ENEMY_TYPE_LANDING_SHIP;
    }
}
