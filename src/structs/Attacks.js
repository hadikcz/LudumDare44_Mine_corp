import GameConfig from 'GameConfig';
export default {
    Lightning: {
        name: 'Lightning',
        duration: -1, // -1 = instant
        coolDown: 250, // 500ms
        damage: 1, // per s
        radius: 25, // px
        circlesCount: 12
    },
    Tornado: {
        name: 'Tornado',
        duration: 5000,
        coolDown: 20000, // 20000 ms
        damage: 0.25, // per 100ms (2.5 per s)
        radius: 40 / GameConfig.GameWindowSettings.zoom, // px
        circlesCount: 2
    },
    Volcano: {
        name: 'Volcano',
        duration: -1,
        coolDown: 45000, // ms
        damage: 20, // per s
        radius: 75 / GameConfig.GameWindowSettings.zoom,
        growTime: 800, // px
        circlesCount: 1
    },
    Asteroid: {
        name: 'Asteroid',
        duration: -1,
        coolDown: 60000, // 60000ms
        damage: 50, // per s
        radius: 150 / GameConfig.GameWindowSettings.zoom,
        landingTime: 1500, // px
        circlesCount: 1
    },
    TYPES: {
        LIGHTNING: 'lightning',
        TORNADO: 'tornado',
        VOLCANO: 'volcano',
        ASTEROID: 'asteroid'
    },
    /**
     * @param {string} type
     * @return {object}
     */
    getDataByType (type) {
        switch (type) {
            case this.TYPES.LIGHTNING:
                return this.Lightning;
            case this.TYPES.TORNADO:
                return this.Tornado;
            case this.TYPES.VOLCANO:
                return this.Volcano;
            case this.TYPES.ASTEROID:
                return this.Asteroid;
        }
    }
};
