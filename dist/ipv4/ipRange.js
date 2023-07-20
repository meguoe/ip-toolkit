var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
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
    var _ipRange_start, _ipRange_end;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ipRange = void 0;
    const index_1 = require("./index");
    /**
     * IPv4 address range class for representing a range defined by a start and end IPv4 address. Valid values are from 0 to 4294967295.
     */
    class ipRange {
        constructor(start, end) {
            _ipRange_start.set(this, void 0);
            _ipRange_end.set(this, void 0);
            if (+start < 0 || +start > 4294967295 || +end < 0 || +end > 4294967295) {
                throw new Error('Invalid start or end IPv4 address');
            }
            __classPrivateFieldSet(this, _ipRange_start, start, "f");
            __classPrivateFieldSet(this, _ipRange_end, end, "f");
        }
        /**
           * Create ipRange instance from start and end IPv4 integers
           *
           * @param start - Start IPv4 integer
           * @param end - End IPv4 integer
           * @returns The created ipRange instance
           * @throws Error if start or end IPv4 is invalid
           *
           * @example
           * ```
           * const range = ipRange.fromLong(3232235777, 3232235876);
           * ```
           */
        static fromLong(start, end) {
            if (typeof start !== 'number' || typeof end !== 'number')
                throw new Error('Invalid start or end IPv4 address');
            if (+end < +start)
                throw new Error('Invalid range value, end must be greater than or equal to start');
            return new ipRange(start, end);
        }
        /**
           * Create ipRange instance from start and end IPv4 strings
           *
           * @param startIp - Start IPv4 string
           * @param endIp - End IPv4 string
           * @returns The created ipRange instance
           * @throws Error if start or end IPv4 is invalid
           *
           * @example
           * ```
           * const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
           * ```
           */
        static fromString(start, end) {
            const sLong = (0, index_1.ip2long)(start);
            const eLong = (0, index_1.ip2long)(end);
            if (typeof sLong !== 'number' || typeof eLong !== 'number')
                throw new Error('Invalid start or end IPv4 address');
            if (eLong < sLong)
                throw new Error('Invalid range value, end must be greater than or equal to start');
            return new ipRange(sLong, eLong);
        }
        /**
           * Get start and end IPv4 integers of current range
           *
           * @returns Array of start and end IPv4 integers
           *
           * @example
           * ```
           * const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
           * range.ip2long(); // [3232235777, 3232235876]
           * ```
           */
        ip2long() {
            return [__classPrivateFieldGet(this, _ipRange_start, "f"), __classPrivateFieldGet(this, _ipRange_end, "f")];
        }
        /**
           * Get start and end IPv4 strings of current range
           *
           * @returns Array of start and end IPv4 strings
           *
           * @example
           * ```
           * const range = ipRange.fromLong(3232235777, 3232235876);
           * range.long2ip(); // ['192.168.1.1', '192.168.1.100']
           * ```
           */
        long2ip() {
            return [
                (0, index_1.long2ip)(__classPrivateFieldGet(this, _ipRange_start, "f")),
                (0, index_1.long2ip)(__classPrivateFieldGet(this, _ipRange_end, "f"))
            ];
        }
        /**
           * Get the number of IPs in current range
           *
           * @returns Number of IPv4 addresses
           *
           * @example
           * ```
           * const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
           * range.ipCount(); // 100
           * ```
           */
        ipCount() {
            return __classPrivateFieldGet(this, _ipRange_end, "f") - __classPrivateFieldGet(this, _ipRange_start, "f") + 1;
        }
        /**
           * Verify if the IPv4 address is within the current range
           *
           * @param ip - A standard IPv4 address string
           * @returns True if within range, otherwise false
           *
           * @example
           * ```
           * const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
           * range.contains('192.168.1.99'); // true
           * range.contains('192.168.0.11'); // false
           * ```
           */
        contains(ip) {
            const long = (0, index_1.ip2long)(ip);
            if (typeof long !== 'number')
                return false;
            return long >= __classPrivateFieldGet(this, _ipRange_start, "f") && long <= __classPrivateFieldGet(this, _ipRange_end, "f");
        }
    }
    exports.ipRange = ipRange;
    _ipRange_start = new WeakMap(), _ipRange_end = new WeakMap();
});
