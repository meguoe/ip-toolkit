var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// src/ipv4/index.ts
var ipv4_exports = {};
__export(ipv4_exports, {
  contains: () => contains,
  ip2long: () => ip2long,
  ipRange: () => ipRange,
  isConflict: () => isConflict,
  isEqual: () => isEqual,
  isPrivate: () => isPrivate,
  isSameSubnet: () => isSameSubnet,
  isValidIP: () => isValidIP,
  isValidMask: () => isValidMask,
  long2ip: () => long2ip,
  parseCIDR: () => parseCIDR,
  parseSubnet: () => parseSubnet,
  toBinHex: () => toBinHex,
  toIPv6Format: () => toIPv6Format,
  toInverseMask: () => toInverseMask,
  toMaskLength: () => toMaskLength,
  toSubnetMask: () => toSubnetMask
});

// src/ipv4/ip2long.ts
function ip2long(ip) {
  if (!isValidIP(ip))
    return false;
  let long = 0;
  const parts = ip.split(".");
  for (const part of parts)
    long = (long << 8) + +part;
  return long >>> 0;
}

// src/ipv4/long2ip.ts
function long2ip(ip) {
  if (typeof ip !== "number")
    return false;
  if (ip >= 0 && ip <= 4294967295) {
    const parts = [];
    for (let i = 3; i >= 0; i--)
      parts.push(ip >>> i * 8 & 255);
    return parts.join(".");
  } else {
    return false;
  }
}

// src/ipv4/ipRange.ts
var _start, _end;
var _ipRange = class _ipRange {
  constructor(start, end) {
    __privateAdd(this, _start, void 0);
    __privateAdd(this, _end, void 0);
    if (+start < 0 || +start > 4294967295 || +end < 0 || +end > 4294967295) {
      throw new Error("Invalid start or end IPv4 address");
    }
    __privateSet(this, _start, start);
    __privateSet(this, _end, end);
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
    if (typeof start !== "number" || typeof end !== "number")
      throw new Error("Invalid start or end IPv4 address");
    if (+end < +start)
      throw new Error("Invalid range value, end must be greater than or equal to start");
    return new _ipRange(start, end);
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
    const sLong = ip2long(start);
    const eLong = ip2long(end);
    if (typeof sLong !== "number" || typeof eLong !== "number")
      throw new Error("Invalid start or end IPv4 address");
    if (eLong < sLong)
      throw new Error("Invalid range value, end must be greater than or equal to start");
    return new _ipRange(sLong, eLong);
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
    return [__privateGet(this, _start), __privateGet(this, _end)];
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
      long2ip(__privateGet(this, _start)),
      long2ip(__privateGet(this, _end))
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
    return __privateGet(this, _end) - __privateGet(this, _start) + 1;
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
    const long = ip2long(ip);
    if (typeof long !== "number")
      return false;
    return long >= __privateGet(this, _start) && long <= __privateGet(this, _end);
  }
};
_start = new WeakMap();
_end = new WeakMap();
var ipRange = _ipRange;

// src/ipv4/isEqual.ts
function isEqual(ip1, ip2) {
  if (typeof ip1 === "number" && (ip1 < 0 || ip1 > 4294967295))
    return false;
  if (typeof ip2 === "number" && (ip2 < 0 || ip2 > 4294967295))
    return false;
  if (typeof ip1 === "string")
    ip1 = ip2long(ip1);
  if (typeof ip2 === "string")
    ip2 = ip2long(ip2);
  if (typeof ip1 !== "number" || typeof ip2 !== "number")
    return false;
  return ip1 === ip2;
}

// src/ipv4/contains.ts
function contains(cidr, ip) {
  const subnet = parseCIDR(cidr);
  if (typeof subnet !== "object" || !isValidIP(ip))
    return false;
  const { cidrMask, firstHost, lastHost, networkAddress, broadcastAddress } = subnet;
  if (cidrMask >= 31) {
    return ipRange.fromString(firstHost, lastHost).contains(ip);
  } else {
    return ipRange.fromString(networkAddress, broadcastAddress).contains(ip);
  }
}

// src/ipv4/isValidIP.ts
function isValidIP(ip, options = { strict: false }) {
  if (options.strict) {
    const IPV4_REGEX = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])(\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)){3}$/;
    return IPV4_REGEX.test(ip);
  } else {
    const IPV4_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
    return IPV4_REGEX.test(ip);
  }
}

// src/ipv4/isPrivate.ts
function isPrivate(ip) {
  if (!isValidIP(ip))
    return false;
  const privateRanges = [
    { start: "10.0.0.0", end: "10.255.255.255" },
    { start: "127.0.0.0", end: "127.255.255.255" },
    { start: "172.16.0.0", end: "172.31.255.255" },
    { start: "169.254.0.0", end: "169.254.255.255" },
    { start: "192.168.0.0", end: "192.168.255.255" }
  ];
  for (const range of privateRanges) {
    if (ipRange.fromString(range.start, range.end).contains(ip)) {
      return true;
    }
  }
  return false;
}

// src/ipv4/parseCIDR.ts
function parseCIDR(cidr) {
  if (typeof cidr !== "string")
    return false;
  const [ip, mask] = cidr.split("/");
  if (!isValidIP(ip) || !isValidMask(+mask))
    return false;
  const length = 32 - +mask;
  const longIP = ip2long(ip);
  const ipCount = Number(0b1n << BigInt(length));
  const networkIP = +mask ? longIP >> length << length >>> 0 : 0;
  const broadcastIP = (networkIP | ipCount - 1) >>> 0;
  const cidrInfo = {
    ipCount,
    cidrMask: +mask,
    usableCount: +mask < 31 ? ipCount - 2 : ipCount,
    subnetMask: toSubnetMask(+mask),
    networkAddress: +mask < 31 ? long2ip(networkIP) : "",
    broadcastAddress: +mask < 31 ? long2ip(broadcastIP) : "",
    firstHost: long2ip(networkIP + (+mask < 31 ? 1 : 0)),
    lastHost: long2ip(broadcastIP - (+mask < 31 ? 1 : 0))
  };
  return cidrInfo;
}

// src/ipv4/isConflict.ts
function isConflict(cidrs) {
  if (!Array.isArray(cidrs) || cidrs.length === 0)
    return false;
  const _cidrs = [];
  for (const cidr of cidrs) {
    const subnet = parseCIDR(cidr);
    if (typeof subnet === "object")
      _cidrs.push({ cidr, networkAddress: subnet.networkAddress || subnet.firstHost });
  }
  for (let i = 0; i < _cidrs.length; i++) {
    for (let j = i + 1; j < _cidrs.length; j++) {
      const R1 = contains(_cidrs[j].cidr, _cidrs[i].networkAddress);
      const R2 = contains(_cidrs[i].cidr, _cidrs[j].networkAddress);
      if (R1 || R2)
        return true;
    }
  }
  return false;
}

// src/ipv4/parseSubnet.ts
function parseSubnet(ip, mask) {
  if (!isValidIP(ip) || !isValidMask(mask))
    return false;
  const length = toMaskLength(mask);
  const cidrInfo = parseCIDR(`${ip}/${length}`);
  return cidrInfo;
}

// src/ipv4/isValidMask.ts
function isValidMask(mask) {
  if (typeof mask === "number" && !isNaN(mask)) {
    if (mask < 0 || mask > 32)
      return false;
    return true;
  } else if (typeof mask === "string") {
    const longMask = ip2long(mask);
    if (typeof longMask !== "number")
      return false;
    return /^1*0*$/.test(longMask.toString(2).padStart(32, "0"));
  } else {
    return false;
  }
}

// src/ipv4/isSameSubnet.ts
function isSameSubnet(ip1, ip2, mask) {
  if (!isValidIP(ip1) || !isValidIP(ip2) || !isValidMask(mask))
    return false;
  const ip1Long = ip2long(ip1);
  const ip2Long = ip2long(ip2);
  if (typeof mask === "number")
    mask = toSubnetMask(mask);
  const maskLong = ip2long(mask);
  return (ip1Long & maskLong) === (ip2Long & maskLong);
}

// src/ipv4/toBinHex.ts
function toBinHex(ip) {
  if (!isValidIP(ip))
    return false;
  const longIP = ip2long(ip);
  return {
    decimal: longIP,
    hex: `0x${longIP.toString(16).padStart(8, "0")}`,
    binary: longIP.toString(2).padStart(32, "0")
  };
}

// src/ipv6/index.ts
var ipv6_exports = {};
__export(ipv6_exports, {
  compressedForm: () => compressedForm,
  expandedForm: () => expandedForm,
  ip2long: () => ip2long2,
  isEqual: () => isEqual2,
  isValidIP: () => isValidIP2,
  long2ip: () => long2ip2,
  parseCIDR: () => parseCIDR2
});

// src/ipv6/ip2long.ts
function ip2long2(ip) {
  if (!isValidIP2(ip))
    return false;
  const binary = [];
  ip = expandedForm(ip);
  const parts = ip.split(":");
  for (let i = 0; i < parts.length; i++) {
    const dec = parseInt(parts[i], 16);
    binary.push(dec.toString(2).padStart(16, "0"));
  }
  return BigInt(`0b${binary.join("")}`);
}

// src/ipv6/compressedForm.ts
function compressedForm(ip) {
  if (!isValidIP2(ip))
    return false;
  if (ip2long2(ip) === 0n)
    return "::";
  ip = expandedForm(ip);
  const sections = ip.split(":");
  const compress = sections.map((section) => {
    const _section = parseInt(section, 16);
    return _section ? _section.toString(16) : "X";
  }).join(":");
  const regExp = [/(X:X:X:X:X:X:X)/, /(X:X:X:X:X:X)/, /(X:X:X:X:X)/, /(X:X:X:X)/, /(X:X:X)/, /(X:X)/];
  for (let i = 0; i < regExp.length; i++) {
    if (compress.match(regExp[i]))
      return compress.replace(regExp[i], ":").replace(":::", "::").replaceAll("X", "0");
  }
  return compress.replaceAll("X", "0");
}

// src/ipv6/long2ip.ts
function long2ip2(ip) {
  if (typeof ip !== "bigint")
    return false;
  if (ip >= 0n && ip <= 340282366920938463463374607431768211455n) {
    const sections = [];
    const hex = ip.toString(16).padStart(32, "0");
    for (let i = 0; i < 8; i++)
      sections.push(hex.slice(i * 4, (i + 1) * 4));
    return compressedForm(sections.join(":"));
  } else {
    return false;
  }
}

// src/ipv6/isEqual.ts
function isEqual2(ip1, ip2) {
  if (typeof ip1 === "bigint" && (ip1 < 0n || ip1 > 340282366920938463463374607431768211455n))
    return false;
  if (typeof ip2 === "bigint" && (ip2 < 0 || ip2 > 340282366920938463463374607431768211455n))
    return false;
  if (typeof ip1 === "string")
    ip1 = ip2long2(ip1);
  if (typeof ip2 === "string")
    ip2 = ip2long2(ip2);
  if (typeof ip1 !== "bigint" || typeof ip2 !== "bigint")
    return false;
  return ip1 === ip2;
}

// src/ipv6/isValidIP.ts
function isValidIP2(ip) {
  const IPV4_REGEX = /^[\s]*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}))|:)))(%.+)?[\s]*$/;
  return IPV4_REGEX.test(ip);
}

// src/ipv6/parseCIDR.ts
function parseCIDR2(cidr) {
  if (typeof cidr !== "string")
    return false;
  const [ip, mask] = cidr.split("/");
  if (ip === void 0 || mask === void 0)
    return false;
  const prefixLength = +mask;
  if (!isValidIP2(ip) || isNaN(prefixLength) || prefixLength < 0 || prefixLength > 128)
    return false;
  const length = BigInt(128 - prefixLength);
  const longIP = ip2long2(ip);
  const ipCount = BigInt(0b1n << length);
  const networkIP = longIP >> length << length;
  const firstHost = long2ip2(networkIP);
  const lastHost = long2ip2(networkIP | ipCount - 1n);
  const cidrInfo = {
    ipCount,
    firstHost,
    lastHost,
    prefixLength
  };
  return cidrInfo;
}

// src/ipv6/expandedForm.ts
function expandedForm(ip) {
  if (!isValidIP2(ip))
    return false;
  if (ip === "::")
    return "0000:".repeat(8).slice(0, -1);
  const sections = ip.split(":");
  for (let i = 0; i < sections.length; i++) {
    if (sections[i] === "" && sections[i + 1] === "")
      sections.splice(i, 1);
  }
  const last = sections[sections.length - 1];
  if (ipv4_exports.isValidIP(last)) {
    const hex = ipv4_exports.toBinHex(last).hex.slice(2);
    sections.pop() && sections.push(hex.slice(0, 4), hex.slice(4));
  }
  return sections.map((section) => {
    return section ? section.padStart(4, "0") : "0000:".repeat(9 - sections.length).slice(0, -1);
  }).join(":");
}

// src/ipv4/toIPv6Format.ts
function toIPv6Format(ip) {
  if (!isValidIP(ip))
    return false;
  const longIP = ip2long(ip);
  const ipv4 = long2ip(longIP);
  return {
    mapped: `::ffff:${ipv4}`,
    comperssed: compressedForm(`::ffff:${ipv4}`),
    expanded: expandedForm(`::ffff:${ipv4}`)
  };
}

// src/ipv4/toSubnetMask.ts
function toSubnetMask(length) {
  if (typeof length !== "number" || isNaN(length) || !isValidMask(length))
    return false;
  const mask = 4294967295 << 32 - length;
  return length ? long2ip(mask >>> 0) : "0.0.0.0";
}

// src/ipv4/toMaskLength.ts
function toMaskLength(mask) {
  if (typeof mask !== "string")
    return false;
  if (!isValidMask(mask))
    return false;
  const longMask = ip2long(mask);
  const length = longMask === 0 ? 0 : longMask.toString(2).replaceAll("0", "").length;
  return length;
}

// src/ipv4/toInverseMask.ts
function toInverseMask(mask) {
  if (!isValidMask(mask))
    return false;
  if (typeof mask === "number")
    mask = toSubnetMask(mask);
  const longMask = ip2long(mask);
  const notMask = ~longMask >>> 0;
  return long2ip(notMask);
}
export {
  ipv4_exports as IPv4,
  ipv6_exports as IPv6
};
