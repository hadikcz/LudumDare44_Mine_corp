export default {
    GameWindowSettings: {
        width: 1024,
        height: 640,
        zoom: 1.0
    },
    World: {
        width: 1024,
        height: 640
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
        radius: 230,
        offset: {
            x: 25,
            y: 25
        },
        offsetCircle: {
            x: 10,
            y: 10
        }
    }
};
