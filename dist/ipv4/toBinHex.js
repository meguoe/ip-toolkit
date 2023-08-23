(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toBinHex = void 0;
    const index_1 = require("./index");
    /**
     * Convert IPv4 address to binary and hex
     *
     * @param ip - The IPv4 address string
     * @returns Contains binary and hexadecimal objects, false if invalid
     *
     * @example
     * ```
     * const results = toBinHex('192.168.0.1');
     * // results = {
     * //   hex: 'c0a80001',
     * //   decimal: 0x3232235521
     * //   binary: '11000000101010000000000000001'
     * // }
     * ```
     */
    function toBinHex(ip) {
        if (!(0, index_1.isValidIP)(ip))
            return false;
        const longIP = (0, index_1.ip2long)(ip);
        return {
            decimal: longIP,
            hex: `0x${longIP.toString(16).padStart(8, '0')}`,
            binary: longIP.toString(2).padStart(32, '0'),
        };
    }
    exports.toBinHex = toBinHex;
});
