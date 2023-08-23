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
    exports.isConflict = void 0;
    const index_1 = require("./index");
    /**
     * Check for conflicts in a set of CIDR
     *
     * @param cidrs - Array of CIDR format address string
     * @returns True if conflict found, false otherwise
     *
     * @example
     *
     * ```
     * isConflict(['192.168.1.0/24', '192.168.0.0/16'])  // true
     * isConflict(['192.168.1.0/24', '192.168.2.0/24'])  // false
     * isConflict(['192.168.1.0/24', '192.168.2.0/24', '192.168.3.0/16'])  // true
     * isConflict(['192.168.1.0/24', '192.168.2.0/24', '192.168.3.0/24'])  // false
     * ```
     */
    function isConflict(cidrs) {
        if (!Array.isArray(cidrs) || cidrs.length === 0)
            return false;
        const _cidrs = [];
        for (const cidr of cidrs) {
            const subnet = (0, index_1.parseCIDR)(cidr);
            if (typeof subnet === 'object')
                _cidrs.push({ cidr, networkAddress: subnet.networkAddress });
        }
        for (let i = 0; i < _cidrs.length; i++) {
            for (let j = i + 1; j < _cidrs.length; j++) {
                const R1 = (0, index_1.contains)(_cidrs[j].cidr, _cidrs[i].networkAddress);
                const R2 = (0, index_1.contains)(_cidrs[i].cidr, _cidrs[j].networkAddress);
                if (R1 || R2)
                    return true;
            }
        }
        return false;
    }
    exports.isConflict = isConflict;
});
