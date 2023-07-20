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
    exports.parseSubnet = void 0;
    const index_1 = require("./index");
    /**
     * Parse IPv4 address and subnet mask into CIDR info
     *
     * @param ip - The IPv4 address string
     * @param mask - The subnet mask string
     * @returns The parsed CIDR info object or false if invalid
     *
     * @example
     * ```
     * parseSubnet('192.168.0.1', '1.255.255.0')    // false
     * parseSubnet('192.168.0.1', '255.255.255.0')
     * // {
     * //   ipCount: 256,
     * //   usableCount: 254,
     * //   cidrMask: 24,
     * //   subnetMask: '255.255.255.0',
     * //   firstHost: '192.168.0.1',
     * //   lastHost: '192.168.0.254',
     * //   networkAddress: '192.168.0.0',
     * //   broadcastAddress: '192.168.0.255'
     * // }
     * ```
    */
    function parseSubnet(ip, mask) {
        if (!(0, index_1.isValidIP)(ip) || !(0, index_1.isValidMask)(mask))
            return false;
        const length = (0, index_1.toMaskLength)(mask);
        const cidrInfo = (0, index_1.parseCIDR)(`${ip}/${length}`);
        return cidrInfo;
    }
    exports.parseSubnet = parseSubnet;
});
