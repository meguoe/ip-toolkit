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
    exports.toMaskLength = void 0;
    const index_1 = require("./index");
    /**
     * Convert subnet mask string to mask length number
     *
     * @param mask - The subnet mask string
     * @returns The mask length or false if invalid
     *
     * @example
     * toMaskLength('255.255.255.0') // 24
     * toMaskLength('255.255.256.0') // false
    */
    function toMaskLength(mask) {
        if (typeof mask !== 'string')
            return false;
        if (!(0, index_1.isValidMask)(mask))
            return false;
        const longMask = (0, index_1.ip2long)(mask);
        const length = longMask === 0 ? 0 : longMask.toString(2).replaceAll('0', '').length;
        return length;
    }
    exports.toMaskLength = toMaskLength;
});
