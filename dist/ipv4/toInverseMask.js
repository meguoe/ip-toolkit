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
    exports.toInverseMask = void 0;
    const index_1 = require("./index");
    /**
     * Calculate the inverse mask of a subnet mask
     * @param mask - The subnet mask
     * @returns The inverse mask, or false if invalid
     *
     * @example
     *
     * ```
     * toInverseMask(24);  // '0.0.0.255'
     * toInverseMask(16);  // '0.0.255.255'
     * toInverseMask('255.255.255.0');  // '0.0.0.255'
     * toInverseMask('255.255.0.0');  // '0.0.255.255'
     * ```
     */
    function toInverseMask(mask) {
        if (!(0, index_1.isValidMask)(mask))
            return false;
        if (typeof mask === 'number')
            mask = (0, index_1.toSubnetMask)(mask);
        const longMask = (0, index_1.ip2long)(mask);
        const notMask = (longMask ^ 0xffffffff) >>> 0;
        return (0, index_1.long2ip)(notMask);
    }
    exports.toInverseMask = toInverseMask;
});
