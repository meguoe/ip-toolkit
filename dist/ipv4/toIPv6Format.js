(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./index", "../ipv6/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toIPv6Format = void 0;
    const index_1 = require("./index");
    const index_2 = require("../ipv6/index");
    /**
     * Converts IPv4 address to IPv6 format
     *
     * @param ip - The IPv4 address string (validation requires strict mode)
     * @returns The IPv6 address object or false if invalid
     *
     * @example
     * ```
     * toIPv6Format('192.168.1.1')
     * // {
     * //   mapped: '::ffff:192.168.1.1',
     * //   comperssed: "::ffff:c0a8:101"
     * //   expanded: '0000:0000:0000:0000:0000:ffff:c0a8:0101',
     * // }
     * ```
     */
    function toIPv6Format(ip) {
        if (!(0, index_1.isValidIP)(ip))
            return false;
        const longIP = (0, index_1.ip2long)(ip);
        const ipv4 = (0, index_1.long2ip)(longIP);
        return {
            mapped: `::ffff:${ipv4}`,
            comperssed: (0, index_2.compressedForm)(`::ffff:${ipv4}`),
            expanded: (0, index_2.expandedForm)(`::ffff:${ipv4}`),
        };
    }
    exports.toIPv6Format = toIPv6Format;
});
