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
     * Convert IP address string to number
     *
     * @param ip - The IP address string
     * @returns The converted IP number or false if invalid
     *
     * @example
     * ```
     * ip2long('192.168.0.1')   // 3232235521
     * ip2long('192.168.0.257') // false
     * ```
     */
    function ip2long(ip) {
        if (!(0, index_1.isValidIP)(ip))
            return false;
        let long = 0;
        const parts = ip.split('.');
        for (const part of parts)
            long = (long << 8) + +part;
        return long >>> 0;
    }
    exports.ip2long = ip2long;
});
