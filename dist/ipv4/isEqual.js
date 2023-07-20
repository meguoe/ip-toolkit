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
     * Verify if two IPv4 address are equal
     * @param ip1 The first IPv4 address to compare
     * @param ip2 The second IPv4 address to compare
     * @returns True if equal, false otherwise
     *
     * @example
     * ```
     * isEqual(32322355, 3232235521)  // false
     * isEqual(3232235521, 3232235521)  // true
     * isEqual('192.168.0.1', 3232235521)  // true
     * isEqual('192.168.1.10', '192.168.1.10') // true
     * isEqual('192.168.01.10', '192.168.1.010') // true
     * isEqual('192.168.02.10', '192.168.1.010') // false
     * ```
    */
    function isEqual(ip1, ip2) {
        if (typeof ip1 === 'number' && (ip1 < 0 || ip1 > 4294967295))
            return false;
        if (typeof ip2 === 'number' && (ip2 < 0 || ip2 > 4294967295))
            return false;
        if (typeof ip1 === 'string')
            ip1 = (0, index_1.ip2long)(ip1);
        if (typeof ip2 === 'string')
            ip2 = (0, index_1.ip2long)(ip2);
        if (typeof ip1 !== 'number' || typeof ip2 !== 'number')
            return false;
        return ip1 === ip2;
    }
    exports.isEqual = isEqual;
});
