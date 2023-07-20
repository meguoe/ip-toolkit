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
    exports.isSameSubnet = void 0;
    const index_1 = require("./index");
    /**
     * Verify if two IPv4 address are on the same subnet
     *
     * @param ip1 - The first IPv4 address to compare
     * @param ip2 - The second IPv4 address to compare
     * @param mask - The subnet mask
     * @returns True if in the same subnet, otherwise false
     *
     * @example
     * ```
     * isSameSubnet('192.168.1.10', '192.168.1.100', 24) // true
     * isSameSubnet('192.168.1.10', '192.168.1.100', 32) // false
     * isSameSubnet('192.168.1.10', '192.168.1.100', '255.255.255.0') // true
     * isSameSubnet('192.168.1.10', '192.168.2.100', '255.255.255.0') // false
     * ```
     */
    function isSameSubnet(ip1, ip2, mask) {
        if (!(0, index_1.isValidIP)(ip1) || !(0, index_1.isValidIP)(ip2) || !(0, index_1.isValidMask)(mask))
            return false;
        const ip1Long = (0, index_1.ip2long)(ip1);
        const ip2Long = (0, index_1.ip2long)(ip2);
        if (typeof mask === 'number')
            mask = (0, index_1.toSubnetMask)(mask);
        const maskLong = (0, index_1.ip2long)(mask);
        return (ip1Long & maskLong) === (ip2Long & maskLong);
    }
    exports.isSameSubnet = isSameSubnet;
});
