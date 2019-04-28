import GameConfig from 'GameConfig';

export default class PlanetCollider extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super(scene, x, y, null);

        this.setAlpha(0);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.body.setCircle(GameConfig.Planet.radius, -GameConfig.Planet.radius + GameConfig.Planet.offset.x, -GameConfig.Planet.radius + GameConfig.Planet.offset.y);
        this.body.setImmovable(true);
        this.body.setBounce(0.2);
    }
}
