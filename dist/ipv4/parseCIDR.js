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
    exports.parseCIDR = void 0;
    const index_1 = require("./index");
    /**
     * Parse CIDR format address into address range info
     *
     * NetworkAddress and broadcastAddress are valid when mask < 31
     *
     * @param cidr - The CIDR format address string
     * @returns The parsed address range object or false if invalid
     *
     * @example
     * ```
     * parseCIDR('192.168.0.1/33')    // false
     * parseCIDR('192.168.0.1/24')
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
    function parseCIDR(cidr) {
        if (typeof cidr !== 'string')
            return false;
        const [ip, mask] = cidr.split('/');
        if (!(0, index_1.isValidIP)(ip) || !(0, index_1.isValidMask)(+mask))
            return false;
        const length = 32 - +mask;
        const longIP = (0, index_1.ip2long)(ip);
        const ipCount = Math.pow(2, length);
        const networkIP = +mask ? ((longIP >> length) << length) >>> 0 : 0;
        const broadcastIP = (networkIP | ipCount - 1) >>> 0;
        const cidrInfo = {
            ipCount,
            cidrMask: +mask,
            usableCount: +mask < 31 ? ipCount - 2 : ipCount,
            subnetMask: (0, index_1.toSubnetMask)(+mask),
            networkAddress: +mask < 31 ? (0, index_1.long2ip)(networkIP) : '',
            broadcastAddress: +mask < 31 ? (0, index_1.long2ip)(broadcastIP) : '',
            firstHost: (0, index_1.long2ip)(networkIP + (+mask < 31 ? 1 : 0)),
            lastHost: (0, index_1.long2ip)(broadcastIP - (+mask < 31 ? 1 : 0)),
        };
        return cidrInfo;
    }
    exports.parseCIDR = parseCIDR;
});
