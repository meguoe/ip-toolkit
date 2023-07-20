(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../index", "./index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.expandedForm = void 0;
    const index_1 = require("../index");
    const index_2 = require("./index");
    /**
     * Expands an abbreviated IPv6 address string into its full representation.
     *
     * @param ip - The IPv6 address string
     * @returns The expanded IPv6 address string or false if invalid
     *
     * @example
     * ```
     * expandedForm('2001:db8::1') // '2001:0db8:0000:0000:0000:0000:0000:0001'
     * ```
     */
    function expandedForm(ip) {
        if (!(0, index_2.isValidIP)(ip))
            return false;
        if (ip === '::')
            return '0000:'.repeat(8).slice(0, -1);
        const sections = ip.split(':');
        for (let i = 0; i < sections.length; i++) {
            if (sections[i] === '' && sections[i + 1] === '')
                sections.splice(i, 1);
        }
        const last = sections[sections.length - 1];
        if (index_1.IPv4.isValidIP(last)) {
            const hex = index_1.IPv4.toBinHex(last).hex.slice(2);
            sections.pop() && sections.push(hex.slice(0, 4), hex.slice(4));
        }
        return sections.map((section) => {
            return section ? section.padStart(4, '0') : '0000:'.repeat(9 - sections.length).slice(0, -1);
        }).join(':');
    }
    exports.expandedForm = expandedForm;
});
