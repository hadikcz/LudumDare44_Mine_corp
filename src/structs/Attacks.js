export default {
    Lightning: {
        name: 'Lightning',
        duration: -1, // -1 = instant
        coolDown: 500, // ms
        damage: 1, // per s
        radius: 5, //px
    },
    Tornado: {
        name: 'Tornado',
        duration: 5000,
        coolDown: 20000, // ms
        damage: 2.5, // per s
        radius: 15, //px
    },
    Volcano: {
        name: 'Volcano',
        duration: -1,
        coolDown: 45000, // ms
        damage: 20, // per s
        radius: 75
    },
    Asteroid: {
        name: 'Asteroid',
        duration: -1,
        coolDown: 60000, // ms
        damage: 50, // per s
        radius: 125
    },
    TYPES: {
        LIGHTNING: 'Lightning',
        TORNADO: 'Tornado',
        VOLCANO: 'Volcano',
        ASTEROID: 'Asteroid'
    }
};
