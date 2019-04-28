export default class TransformHelpers {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} angle
     * @param {number} distance
     * @return {{x: number, y: number}}
     */
    static calcPivot (x, y, angle, distance) {
        return {
            x: (x + Math.cos(angle) * distance),
            y: (y + Math.sin(angle) * distance)
        };
    }

    /**
     * @param {number} fromX
     * @param {number} fromY
     * @param {number} toX
     * @param {number} toY
     * @param {number} lerp
     * @return {{x: number, y: number}}
     */
    static lerp (fromX, fromY, toX, toY, lerp) {
        return {
            x: fromX + lerp * (toX - fromX),
            y: fromY + lerp * (toY - fromY)
        };
    }

    /**
     * @param {{x: {number}, y: {number}[]}}objects
     * @param {number} targetX
     * @param {number} targetY
     * @return {object|null}
     */
    static getNearest (objects, targetX, targetY) {
        let nearestObject = null;
        let nearestDistance = Infinity;

        for (let i = 0; i < objects.length; i++) {
            let object = objects[i];
            let distance = TransformHelpers.distanceBetween(object.x, object.y, targetX, targetY);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestObject = object;
            }
        }

        return nearestObject;
    }

    static distanceBetween (x1, y1, x2, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * @param {number} rotation
     * @param {number} speed
     * @return {{x: number, y: number}}
     */
    static rotationToVelocity (rotation, speed) {
        return {
            x: speed * Math.cos(rotation),
            y: speed * Math.sin(rotation)
        };
    }
}
