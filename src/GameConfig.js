export default {
    GameWindowSettings: {
        width: 1024,
        height: 640,
        zoom: 1.0
    },
    World: {
        width: 1024,
        height: 640,
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
        spawnRadius: 500,
        radius: 188, // 230
        offset: {
            x: 17, // 51
            y: 17 // 16
        },
        offsetCircle: {
            x: 10,
            y: 10
        }
    }
};
