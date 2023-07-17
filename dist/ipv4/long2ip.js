/**
 * Convert IP number to address string
 *
 * @param ip - The IP number
 * @returns The converted IP address string or false if invalid
 *
 * @example
 * ```
 * long2ip(3232235521) // '192.168.0.1'
 * long2ip(-1) // false
 * ```
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.long2ip = void 0;
    function long2ip(ip) {
        if (ip >= 0 && ip <= 4294967295) {
            const parts = [];
            for (let i = 3; i >= 0; i--)
                parts.push((ip >>> (i * 8)) & 255);
            return parts.join('.');
        }
        else {
            return false;
        }
    }
    exports.long2ip = long2ip;
});
