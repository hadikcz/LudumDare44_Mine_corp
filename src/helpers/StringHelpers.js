export default class StringHelpers {
    /**
     * @param {string} string
     * @return {string}
     */
    static capitalize (string) {
        return string[0].toUpperCase() + string.slice(1);
    }
}
