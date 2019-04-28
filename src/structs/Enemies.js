export default {
    SHIPS: {
        landingTime: 5000, // 5000
        launchTime: 5000,
        waitBeforeLaunchTime: 500
    },
    MAN: {
        landingTime: 750,
        wanderingTime: 3000,
        miningTime: 2000
    },
    list: [
        {
            type: 'man',
            name: 'Man',
            hp: 1,
            damage: 1
        },
        {
            type: 'landing_ship', //AbstractEnemy.ENEMY_TYPE_LANDING_SHIP,
            name: 'Transport ship',
            hp: 8,
            damage: 1
        }
    ],
    /**
     * @param {string} type
     * @return {object}
     */
    getDataByType (type) {
        return this.list.find((enemy) => {
            return enemy.type === type;
        });
    }
};
