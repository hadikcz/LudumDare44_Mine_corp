import AbstractEnemy from 'entity/enemy/AbstractEnemy';
import Depths from 'structs/Depths';
import Phaser from "phaser";
import Planet from 'entity/planet/Planet';
import EnemyPhase from 'structs/EnemyPhase';

export default class ManEnemy extends AbstractEnemy {
    constructor (scene, x, y) {
        super(scene, ManEnemy.TYPE, 'man', x, y);
        this.setDepth(Depths.MAN);
    }

    preUpdate () {
        super.preUpdate();
        this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y) - Math.PI / 2);

        if (this._phase === EnemyPhase.LANDED) {
            this._startWandering();
        }

        if (this._phase === EnemyPhase.MAN_START_MINING) {
            this.scene.time.addEvent({
                delay: 3000,
                callbackScope: this,
                callback: () => {
                    this._startWandering();
                }
            });
        }
    }

    _startWandering () {
        this._phase = EnemyPhase.MAN_WANDERING;
        let circle = new Phaser.Curves.Ellipse(this.x, this.y, 64);
        let randomPointAroundPlayer = circle.getRandomPoint();
        let randomPointToMove = Planet.findNearestLandPosition(randomPointAroundPlayer.x, randomPointAroundPlayer.y);

        let animationTween = this.scene.tweens.add({
            targets: this,
            originY: 1.5,
            ease: 'Linear',
            duration: 500,
            yoyo: -1,
            repeat: Infinity
        });

        this.scene.tweens.add({
            targets: this,
            ease: Phaser.Math.Easing.Linear.Linear,
            duration: 3000,
            x: randomPointToMove.x,
            y: randomPointToMove.y,
            onComplete: () => {
                animationTween.stop();
                this._phase = EnemyPhase.MAN_START_MINING;
            }
        });
    }

    static get TYPE () {
        return AbstractEnemy.ENEMY_TYPE_MAN;
    }
}
