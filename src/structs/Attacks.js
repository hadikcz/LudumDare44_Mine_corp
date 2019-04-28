export default {
    Lightning: {
        name: 'Lightning',
        duration: -1, // -1 = instant
        coolDown: 250, // 500ms
        damage: 1, // per s
        radius: 15 // px
    },
    Tornado: {
        name: 'Tornado',
        duration: 5000,
        coolDown: 20000, // 20000 ms
        damage: 2.5, // per s
        radius: 30 // px
    },
    Volcano: {
        name: 'Volcano',
        duration: -1,
        coolDown: 45000, // ms
        damage: 20, // per s
        radius: 75,
        growTime: 800
    },
    Asteroid: {
        name: 'Asteroid',
        duration: -1,
        coolDown: 60000, // ms
        damage: 50, // per s
        radius: 125
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
