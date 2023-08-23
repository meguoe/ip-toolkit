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
    exports.isEqual = void 0;
    const index_1 = require("./index");
    /**
     * Verify if two IPv6 address are equal
     * @param ip1 The first IPv6 address to compare
     * @param ip2 The second IPv6 address to compare
     * @returns True if equal, false otherwise
     *
     * @example
     * ```
     * isEqual(65535n, 65535)  // false
     * isEqual(65535n, 65535n)  // true
     * isEqual('::ffff', 65535n) // true
     * isEqual('::ffff', ::ffff)  // true
     * isEqual('::ffff', 0:0:0:0:0:0:0:ffff)  // true
     * isEqual('::ffff', 0000:0000:0000:0000:0000:0000:0000:ffff)  // true
     * ```
    */
    function isEqual(ip1, ip2) {
        if (typeof ip1 === 'bigint' && (ip1 < 0n || ip1 > 340282366920938463463374607431768211455n))
            return false;
        if (typeof ip2 === 'bigint' && (ip2 < 0 || ip2 > 340282366920938463463374607431768211455n))
            return false;
        if (typeof ip1 === 'string')
            ip1 = (0, index_1.ip2long)(ip1);
        if (typeof ip2 === 'string')
            ip2 = (0, index_1.ip2long)(ip2);
        if (typeof ip1 !== 'bigint' || typeof ip2 !== 'bigint')
            return false;
        return ip1 === ip2;
    }
    exports.isEqual = isEqual;
});
