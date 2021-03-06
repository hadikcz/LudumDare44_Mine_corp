export default {
    GameWindowSettings: {
        width: 1024,
        height: 640,
        zoom: 0.5, // 1.0...0.5
        initZoom: 0.75
    },
    World: {
        width: 1024 * 2, // 1024 * 2,
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
        spawnRadius: 500 * 2, // 500 * 2
        radius: 160 * 2, // 188 * 2... 2x vetsi 160*2
        orbitRadius: 160 * 3,
        offset: {
            x: 17,
            y: 17
        },
        offsetCircle: {
            x: 10,
            y: 10
        }
    },
    timing: {
        timeBeforeZoomOut: 3500,
        zoomOutTime: 3000,
        timeBeforeAttack: 10000
    }
};
