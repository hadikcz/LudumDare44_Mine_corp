import AbstractEnemy from 'entity/enemy/AbstractEnemy';
import EnemyPhase from 'structs/EnemyPhase';
import ManEnemy from 'entity/enemy/ManEnemy';
import TransformHelpers from 'helpers/TransformHelpers';
import Depths from 'structs/Depths';

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
        }, 5000);

        console.log('deployting man');
        let angleModifier = Phaser.Math.RND.integerInRange(0, 1) === 1 ? 1 : -1;
        let deployOver = TransformHelpers.calcPivot(this.x, this.y, angleModifier * Math.PI / 2, Phaser.Math.RND.integerInRange(25, 35));
        this.scene.unitSpawner.deployOnLandUnit(ManEnemy.TYPE, this.x, this.y, deployOver.x, deployOver.y)
    }

    static get TYPE () {
        return AbstractEnemy.ENEMY_TYPE_LANDING_SHIP;
    }
}
