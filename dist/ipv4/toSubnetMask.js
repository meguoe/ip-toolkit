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
    exports.toSubnetMask = void 0;
    const index_1 = require("./index");
    /**
     * Convert mask length to subnet mask string
     *
     * @param length - The mask length number
     * @returns The subnet mask string or false if invalid
     *
     * @example
     * ```
     * toSubnetMask(0)  // '0.0.0.0'
     * toSubnetMask(8)  // '255.0.0.0'
     * toSubnetMask(16) // '255.255.0.0'
     * toSubnetMask(24) // '255.255.255.0'
     * ```
     */
    function toSubnetMask(length) {
        if (typeof length !== 'number' || isNaN(length) || !(0, index_1.isValidMask)(length))
            return false;
        const mask = 0xffffffff << 32 - length;
        return length ? (0, index_1.long2ip)(mask >>> 0) : '0.0.0.0';
    }
    exports.toSubnetMask = toSubnetMask;
});
