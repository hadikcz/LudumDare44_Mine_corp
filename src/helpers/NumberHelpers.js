export default class NumberHelpers {
    /**
     * @param {number} number
     * @param {string} separator
     * @return {string}
     */
    static formatThousands (number, separator = ' ') {
        number = String(number);

        while (number.length % 3) {
            number = '#' + number;
        }

        var result = number.substr(0, 3);
        result = result.replace(/#/g, '');
        var i;
        var length = number.length;
        for (i = 3; i < length; i += 3) {
            result = result + separator + number.substr(i, 3);
        }

        return result;
    }
}
