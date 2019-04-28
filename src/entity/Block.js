import Phaser from 'phaser';
import GameEnvironment from 'core/GameEnvironment';
import GameConfig from 'GameConfig';
import Planet from 'entity/planet/Planet';

export default class Block extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super(scene, x, y, 'block');

        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        let radius = 16;
        this.body.setCircle(radius, -radius / 2, -radius / 2);

        this.body.setVelocity(Phaser.Math.Between(100, 150), Phaser.Math.Between(150, 200));
        this.body.setBounce(0.2);

        // if (Math.random() > 0.5) {
        //     this.body.velocity.x *= -1;
        // } else {
        //     this.body.velocity.y *= -1;
        // }

        this.scene.input.setDraggable(this.setInteractive());
    }

    preUpdate () {
        this.scene.physics.accelerateToObject(this, Planet.getCenterOfPlanet(), GameConfig.Gravity.accelerateSpeed);
    }
}
