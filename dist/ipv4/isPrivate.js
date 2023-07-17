(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ipRange", "./isValidIP"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPrivate = void 0;
    const ipRange_1 = require("./ipRange");
    const isValidIP_1 = require("./isValidIP");
    /**
     * Verify if an IP address is private
     * @param ip - The IP address string
     * @returns True if private IP, false otherwise
     *
     * @example
     *
     * ```
     * isPrivate('192.168.0.1') // returns true
     * isPrivate('114.114.114.114') // returns false
     * ```
     */
    function isPrivate(ip) {
        if (!(0, isValidIP_1.isValidIP)(ip))
            return false;
        const privateRanges = [
            { start: '10.0.0.0', end: '10.255.255.255' },
            { start: '127.0.0.0', end: '127.255.255.255' },
            { start: '172.16.0.0', end: '172.31.255.255' },
            { start: '169.254.0.0', end: '169.254.255.255' },
            { start: '192.168.0.0', end: '192.168.255.255' }
        ];
        for (const range of privateRanges) {
            if (ipRange_1.ipRange.fromString(range.start, range.end).contains(ip)) {
                return true;
            }
        }
        return false;
    }
    exports.isPrivate = isPrivate;
});
