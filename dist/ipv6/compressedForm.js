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
    exports.compressedForm = void 0;
    const index_1 = require("./index");
    /**
     * Compresses an expanded IPv6 address into shortened form.
     *
     * @param ip - The IPv6 address string
     * @returns The compressed IPv6 address string or false if invalid
     *
     * @example
     * ```
     * compressedForm('2001:0db8:0000:0000:0000:0000:0000:0001')  // '2001:db8::1'
     * ```
     */
    function compressedForm(ip) {
        if (!(0, index_1.isValidIP)(ip))
            return false;
        if ((0, index_1.ip2long)(ip) === 0n)
            return '::';
        ip = (0, index_1.expandedForm)(ip);
        const sections = ip.split(':');
        const compress = sections.map((section) => {
            const _section = parseInt(section, 16);
            return _section ? _section.toString(16) : 'X';
        }).join(':');
        const regExp = [/(X:X:X:X:X:X:X)/, /(X:X:X:X:X:X)/, /(X:X:X:X:X)/, /(X:X:X:X)/, /(X:X:X)/, /(X:X)/];
        for (let i = 0; i < regExp.length; i++) {
            if (compress.match(regExp[i]))
                return compress.replace(regExp[i], ':').replace(':::', '::').replaceAll('X', '0');
        }
        return compress.replaceAll('X', '0');
    }
    exports.compressedForm = compressedForm;
});
