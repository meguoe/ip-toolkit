(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./compressedForm"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.long2ip = void 0;
    const compressedForm_1 = require("./compressedForm");
    /**
     * Convert IPv4 number to address string
     *
     * @param ip - The IPv4 number
     * @returns The converted IPv4 address string or false if invalid
     *
     * @example
     * ```
     * long2ip(3232235521) // '192.168.0.1'
     * long2ip(-1) // false
     * ```
     */
    function long2ip(ip) {
        if (typeof ip !== 'bigint')
            return false;
        if (ip >= 0n && ip <= 340282366920938463463374607431768211455n) {
            const sections = [];
            const hex = ip.toString(16).padStart(32, '0');
            for (let i = 0; i < 8; i++)
                sections.push(hex.slice(i * 4, (i + 1) * 4));
            return (0, compressedForm_1.compressedForm)(sections.join(':'));
        }
        else {
            return false;
        }
    }
    exports.long2ip = long2ip;
});
