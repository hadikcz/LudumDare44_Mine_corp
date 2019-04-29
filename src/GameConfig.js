export default {
    GameWindowSettings: {
        width: 1024, // 1024 * 2
        height: 640, // 640 * 2
        zoom: 0.5 // 1.0
    },
    World: {
        width: 1024 * 2,
        height: 640 * 2,
        offsetX: 35,
        offsetY: 0
    },
    DepthLayers: {
        Surface: 1,
        Furniture: 4,
        Player: 5,
        PickedFurniture: 6,
        Lights: 10,
        UpOnLights: 11,
        Night: 12,
        Text: 50
    },
    Gravity: {
        accelerateSpeed: 800
    },
    Planet: {
        landing: {
            offsetAngle: 12
        },
        spawnRadius: 500 * 2,
        radius: 160 * 2, // 188 * 2
        offset: {
            x: 17,
            y: 17
        },
        offsetCircle: {
            x: 10,
            y: 10
        }
    }
};
