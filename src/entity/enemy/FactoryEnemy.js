import AbstractEnemy from 'entity/enemy/AbstractEnemy';
import EnemyPhase from 'structs/EnemyPhase';
import ManEnemy from 'entity/enemy/ManEnemy';
import TransformHelpers from 'helpers/TransformHelpers';
import Depths from 'structs/Depths';
import Enemies from 'structs/Enemies';
import Events from 'structs/Events';
import Planet from 'entity/planet/Planet';
import Phaser from "phaser";
import GameConfig from 'GameConfig';

export default class FactoryEnemy extends AbstractEnemy {
    constructor (scene, x, y) {
        super(scene, FactoryEnemy.TYPE, 'factory', x, y);
        this.setDepth(Depths.SHIPS);

        /**
         * @type {{x: number, y: number}}
         * @private
         */
        this._smokeFrom = TransformHelpers.calcPivot(this.x, this.y, Planet.getRotationTowardPlanetCenter(this.x, this.y) - Math.PI / 2, 45 / GameConfig.GameWindowSettings.zoom);
    }

    preUpdate () {
        super.preUpdate();
        if (this._phase === EnemyPhase.LANDED) {
            this._startMining();
        }

        if (this._phase === EnemyPhase.MINING) {
            this.scene.effectManager.launchSmoke(this._smokeFrom.x, this._smokeFrom.y);
        }
    }

    destroy () {
        if (this.hp.get() <= 0) {
            this.scene.events.emit(Events.ReturnDamageToPlanet, this.totalMined - this.totalMined / Enemies.SHIPS.returnValueAfterDestroyShip);
        }
        super.destroy();
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    deployFromSurface (x, y) {
        this._phase = EnemyPhase.DEPLOYING;
        let landPosition = Planet.findNearestLandPosition(x, y);
        this.setPosition(landPosition.x, landPosition.y);
        this.setRotation(Planet.getRotationTowardPlanetCenter(x, y));

        this.setScale(0, 0);
        this.scene.tweens.add({
            targets: this,
            ease: Phaser.Math.Easing.Linear.Linear,
            duration: Enemies.FACTORY.deployTime,
            scaleX: 1,
            scaleY: 1,
            onComplete: () => {
                this._canMine = true;
                this._phase = EnemyPhase.MINING;
            }
        });
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
        return AbstractEnemy.ENEMY_TYPE_FACTORY;
    }
}
