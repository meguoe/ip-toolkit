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
    exports.contains = void 0;
    const index_1 = require("./index");
    /**
     * Verify if the IP address is within the CIDR range
     *
     * @param cidr - A standard format CIDR address
     * @param ip - The IPv4 address to check
     * @returns True if within range, otherwise false
     *
     * @example
     *
     * contains('192.168.1.0/24', '192.168.1.5')    // true
     * contains('192.168.1.0/24', '192.168.2.5')    // false
     */
    function contains(cidr, ip) {
        const subnet = (0, index_1.parseCIDR)(cidr);
        if (typeof subnet !== 'object' || !(0, index_1.isValidIP)(ip))
            return false;
        const { cidrMask, firstHost, lastHost, networkAddress, broadcastAddress } = subnet;
        if (cidrMask >= 31) {
            return index_1.ipRange.fromString(firstHost, lastHost).contains(ip);
        }
        else {
            return index_1.ipRange.fromString(networkAddress, broadcastAddress).contains(ip);
        }
    }
    exports.contains = contains;
});
