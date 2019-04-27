import AbstractEnemy from 'entity/enemy/AbstractEnemy';

export default class LandingShipEnemy extends AbstractEnemy {
    constructor (scene, x, y) {
        super(scene, AbstractEnemy.ENEMY_TYPE_LANDING_SHIP, 'landing_ship', x, y);

        this.land();
    }
}
