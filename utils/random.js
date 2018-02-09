var Random = {
    _String: function (length) {
        return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1).toUpperCase();
    },
    _Number: function getRandom(length) {
        // return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
        return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    }
};

module.exports = Random;