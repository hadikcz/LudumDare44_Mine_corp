import GameConfig from 'GameConfig';

export default {
    SHIPS: {
        landingTime: 2500, // 2500
        launchTime: 5000,
        waitBeforeLaunchTime: 1,
        returnValueAfterDestroyShip: 1.2
    },
    MAN: {
        landingTime: 750,
        wanderingTime: [800, 3000],
        miningTime: 2000
    },
    FACTORY: {
        deployTime: 2500
    },
    list: [
        {
            type: 'man',
            name: 'Man',
            hp: 1,
            damage: 1,
            particles: {
                height: 20 / GameConfig.GameWindowSettings.zoom,
                force: [50, 180]
            }
        },
        {
            type: 'landing_ship', //AbstractEnemy.ENEMY_TYPE_LANDING_SHIP,
            name: 'Transport ship',
            hp: 8,
            damage: 1,
            timeBetweenSpawn: 5000,
            particles: {
                height: 55 / GameConfig.GameWindowSettings.zoom,
                force: [50, 450]
            }
        },
        {
            type: 'mining_ship', //AbstractEnemy.ENEMY_TYPE_LANDING_SHIP,
            name: 'Mining ship',
            hp: 15,
            damage: 15,
            timeBetweenSpawn: 10000,
            waitBeforeLaunchTime: 15000,
            particles: {
                height: 55 / GameConfig.GameWindowSettings.zoom,
                force: [50, 450]
            }
        },
        {
            type: 'factory', //AbstractEnemy.ENEMY_TYPE_LANDING_SHIP,
            name: 'Factory',
            hp: 20,
            damage: 20,
            timeBetweenSpawn: 20000,
            waitBeforeLaunchTime: 20000,
            particles: {
                height: 55 / GameConfig.GameWindowSettings.zoom,
                force: [50, 450]
            }
        },
        {
            type: 'huge_robot', //AbstractEnemy.ENEMY_TYPE_LANDING_SHIP,
            name: 'Huge robot',
            hp: 45,
            damage: 45,
            timeBetweenSpawn: 35000,
            waitBeforeLaunchTime: 45000,
            particles: {
                height: 55 / GameConfig.GameWindowSettings.zoom,
                force: [50, 450]
            }
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
