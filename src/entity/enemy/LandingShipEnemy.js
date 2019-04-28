import AbstractEnemy from 'entity/enemy/AbstractEnemy';

export default class LandingShipEnemy extends AbstractEnemy {
    constructor (scene, x, y) {
        super(scene, LandingShipEnemy.TYPE, 'landing_ship', x, y);
    }

    static get TYPE () {
        return AbstractEnemy.ENEMY_TYPE_LANDING_SHIP;
    }
}
