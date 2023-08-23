var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ip2long", "./long2ip", "./ipRange", "./isEqual", "./contains", "./isPrivate", "./isValidIP", "./parseCIDR", "./isConflict", "./parseSubnet", "./isValidMask", "./isSameSubnet", "./toBinHex", "./toIPv6Format", "./toSubnetMask", "./toMaskLength", "./toInverseMask"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require("./ip2long"), exports);
    __exportStar(require("./long2ip"), exports);
    __exportStar(require("./ipRange"), exports);
    __exportStar(require("./isEqual"), exports);
    __exportStar(require("./contains"), exports);
    __exportStar(require("./isPrivate"), exports);
    __exportStar(require("./isValidIP"), exports);
    __exportStar(require("./parseCIDR"), exports);
    __exportStar(require("./isConflict"), exports);
    __exportStar(require("./parseSubnet"), exports);
    __exportStar(require("./isValidMask"), exports);
    __exportStar(require("./isSameSubnet"), exports);
    __exportStar(require("./toBinHex"), exports);
    __exportStar(require("./toIPv6Format"), exports);
    __exportStar(require("./toSubnetMask"), exports);
    __exportStar(require("./toMaskLength"), exports);
    __exportStar(require("./toInverseMask"), exports);
});
