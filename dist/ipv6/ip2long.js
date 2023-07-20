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
    exports.ip2long = void 0;
    const index_1 = require("./index");
    /**
     * Convert IPv6 address string to number
     *
     * @param ip - The IPv6 address string
     * @returns The converted IPv6 number or false if invalid
     *
     * @example
     * ```
     * ip2long('f16c:f7ec:cfa2:e1c5:9a3c:cb08:801f:36b8')   // 320909743562165251276054390739658815160n
     * ```
     */
    function ip2long(ip) {
        if (!(0, index_1.isValidIP)(ip))
            return false;
        const binary = [];
        ip = (0, index_1.expandedForm)(ip);
        const parts = ip.split(':');
        for (let i = 0; i < parts.length; i++) {
            const dec = parseInt(parts[i], 16);
            binary.push(dec.toString(2).padStart(16, '0'));
        }
        return BigInt(`0b${binary.join('')}`);
    }
    exports.ip2long = ip2long;
});
