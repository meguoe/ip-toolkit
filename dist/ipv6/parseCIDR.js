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
     * parseCIDR('::9999:ffff/118')
     * // {
     * //   ipCount: 1024n,
     * //   cidrMask: 118,
     * //   firstHost: '::9999:fc00',
     * //   lastHost: '::9999:ffff',
     * // }
     * ```
     */
    function parseCIDR(cidr) {
        if (typeof cidr !== 'string')
            return false;
        const [ip, mask] = cidr.split('/');
        if (ip === undefined || mask === undefined)
            return false;
        const prefixLength = +mask;
        if (!(0, index_1.isValidIP)(ip) || isNaN(prefixLength) || prefixLength < 0 || prefixLength > 128)
            return false;
        // 计算网络地址和主机地址位数
        const length = BigInt(128 - prefixLength);
        const longIP = (0, index_1.ip2long)(ip);
        const ipCount = BigInt(1n << length);
        const networkIP = (longIP >> length) << length;
        const firstHost = (0, index_1.long2ip)(networkIP);
        const lastHost = (0, index_1.long2ip)(networkIP | ipCount - 1n);
        const cidrInfo = {
            ipCount,
            firstHost,
            lastHost,
            prefixLength,
        };
        return cidrInfo;
    }
    exports.parseCIDR = parseCIDR;
});
