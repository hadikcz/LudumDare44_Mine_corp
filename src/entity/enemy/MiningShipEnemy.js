import AbstractEnemy from 'entity/enemy/AbstractEnemy';
import EnemyPhase from 'structs/EnemyPhase';
import ManEnemy from 'entity/enemy/ManEnemy';
import TransformHelpers from 'helpers/TransformHelpers';
import Depths from 'structs/Depths';
import Enemies from 'structs/Enemies';
import Events from 'structs/Events';

export default class MiningShipEnemy extends AbstractEnemy {
    constructor (scene, x, y) {
        super(scene, MiningShipEnemy.TYPE, 'mining_ship', x, y);
        this.setDepth(Depths.SHIPS);
    }

    preUpdate () {
        super.preUpdate();
        if (this._phase === EnemyPhase.LANDED) {
            this._startMining();
        }
    }

    destroy () {
        this.scene.events.emit(Events.ReturnDamageToPlanet, this.totalMined - this.totalMined / Enemies.SHIPS.returnValueAfterDestroyShip);
        super.destroy();
    }

    _startMining () {
        this._canMine = true;
        this._phase = EnemyPhase.START_MINING;
        setTimeout(() => {
            this._phase = EnemyPhase.LAUNCH;
            this.launchToSpace();
        }, this.enemyData.waitBeforeLaunchTime);
    }

    static get TYPE () {
        return AbstractEnemy.ENEMY_TYPE_MINING_SHIP;
    }
}
