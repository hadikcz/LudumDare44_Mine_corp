import AbstractEnemy from 'entity/enemy/AbstractEnemy';
import Depths from 'structs/Depths';
import Phaser from "phaser";
import Planet from 'entity/planet/Planet';
import EnemyPhase from 'structs/EnemyPhase';
import Enemies from 'structs/Enemies';

export default class RobotEnemy extends AbstractEnemy {
    constructor (scene, x, y) {
        super(scene, RobotEnemy.TYPE, 'robot', x, y);
        this.setDepth(Depths.MAN);

        this.wanderingAnimationTween = this.scene.tweens.add({
            targets: this.image,
            y: -5,
            ease: 'Linear',
            duration: 150,
            yoyo: -1,
            repeat: Infinity
        });
        this.wanderingAnimationTween.pause();
    }

    preUpdate () {
        super.preUpdate();

        this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, Planet.getCenterOfPlanet().x, Planet.getCenterOfPlanet().y) - Math.PI / 2);

        if (this._phase === EnemyPhase.LANDED) {
            this._startWandering();
        }

        if (this._phase === EnemyPhase.START_MINING) {
            this._startMining();
        }
    }

    _startMining () {
        this._canMine = true;
        this._phase = EnemyPhase.MINING;
        this.scene.time.addEvent({
            delay: Enemies.MAN.miningTime,
            callbackScope: this,
            callback: () => {
                this._startWandering();
            }
        });
    }

    _startWandering () {
        this._canMine = false;
        this._phase = EnemyPhase.MAN_WANDERING;
        let circle = new Phaser.Curves.Ellipse(this.x, this.y, 64);
        let randomPointAroundPlayer = circle.getRandomPoint();
        let randomPointToMove = Planet.findNearestLandPosition(randomPointAroundPlayer.x, randomPointAroundPlayer.y);

        this.wanderingAnimationTween.play();

        this.scene.tweens.add({
            targets: this,
            ease: Phaser.Math.Easing.Linear.Linear,
            duration: Phaser.Math.RND.integerInRange(Enemies.MAN.wanderingTime[0], Enemies.MAN.wanderingTime[1]),
            x: randomPointToMove.x,
            y: randomPointToMove.y,
            onComplete: () => {
                this.wanderingAnimationTween.pause();
                this._phase = EnemyPhase.START_MINING;
            }
        });
    }

    static get TYPE () {
        return AbstractEnemy.ENEMY_TYPE_HUGE_ROBOT;
    }
}
