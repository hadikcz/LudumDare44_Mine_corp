export default class ArrayHelpers {
    /**
     * @param {array} array1
     * @param {array} array2
     * @returns {array}
     */
    static arrayMerge (array1, array2) {
        let result = [];
        array1.forEach((element) => {
            result.push(element);
        });
        array2.forEach((element) => {
            result.push(element);
        });
        return result;
    }

    /**
     * @param {array} array
     * @returns {*}
     */
    static getRandomFromArray (array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * @param {number} from
     * @param {number} to
     * @param {number} number
     * @return {boolean}
     */
    static isNumberInRange (from, to, number) {
        return number >= from && number <= to;
    }
}
