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
    exports.isValidMask = void 0;
    const index_1 = require("./index");
    /**
     * Verify if the subnet mask is valid
     *
     * @param  mask - The subnet mask to validate
     * @returns true if valid, otherwise false
     *
     * @example
     * isValidMask(24) // true
     * isValidMask('255.255.255.0') // true
     * isValidMask('255.255.256.0') // false
    */
    function isValidMask(mask) {
        if (typeof mask === 'number') {
            if (mask < 0 || mask > 32)
                return false;
            return true;
        }
        else if (typeof mask === 'string') {
            const longMask = (0, index_1.ip2long)(mask);
            if (typeof longMask !== 'number')
                return false;
            return /^1*0*$/.test(longMask.toString(2).padStart(32, '0'));
        }
        else {
            return false;
        }
    }
    exports.isValidMask = isValidMask;
});
