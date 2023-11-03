/**
 * Convert IPv4 or IPv6 address string to number
 *
 * @param ip - The IPv4 or IPv6 address string
 * @returns The converted IPv4 or IPv6 number or false if invalid
 *
 * @example
 * ```
 * ip2long('192.168.0.1')   // 3232235521
 * ip2long('::ffff:9999')   // 4294941081
 * ```
 */
declare function ip2long$2(ip: string): number | bigint | false;
/**
 * Convert IPv4 or IPv6 number to address string
 *
 * @param ip - The IPv4 or IPv6 number
 * @returns The converted IPv4 or IPv6 address string or false if invalid
 *
 * @example
 * ```
 * ip2long('192.168.0.1')   // 3232235521
 * ip2long('::ffff:9999')   // 4294941081
 * ```
 */
declare function long2ip$2(ip: number | bigint): string | false;
/**
 * Verify if the CIDR address is valid
 *
 * @param cidr - The CIDR address string
 * @returns True if valid, false otherwise
 *
 * @example
 * ```
 * isCIDR('192.168.1.0/24')  // true
 * isCIDR('192.168.1.0/34')  // false
 * isCIDR('287.168.1.0/34')  // false
 * ```
 */
declare function isCIDR$2(cidr: string): boolean;
/**
 * Verify if the IPv4 or IPv6 address is valid
 *
 * @param ip - The IPv4 or IPv6 address string
 * @returns True if valid, false otherwise
 *
 * @example
 * ```
 * isValidIP('192.168.1.99') // true
 * isValidIP('f16c:f7ec:cfa2:e1c5:9a3c:cb08:801f:36b8') // true
 * ```
 */
declare function isValidIP$2(ip: string): boolean;
/**
 * Check for conflicts in a set of CIDR
 *
 * @param cidrs - Array of CIDR format address string
 * @returns True if conflict found, false otherwise
 *
 * @example
 * ```
 * isConflict(['192.168.1.0/24', '192.168.0.0/24'])  // false
 * isConflict(['192.168.1.0/24', '2001:db8::1/122'])  // false
 * isConflict(['2001:db8::1/120', '2001:db8::1/122'])  // true
 * isConflict(['192.168.1.0/24', '192.168.1.0/28', '2001:db8::1/122'])  // true
 * ```
 */
declare function isConflict$2(cidrs: string[]): boolean;
/**
 * Verify if the IPv4 or IPv6 address is within the CIDR range
 *
 * @param cidr - A standard format IPv4 or IPv6 CIDR address
 * @param ip - The IPv4 or IPv6 address to check
 * @returns True if within range, otherwise false
 *
 * @example
 * ```
 * contains('192.168.1.0/24', '192.168.1.5')    // true
 * contains('192.168.1.0/24', '192.168.2.5')    // false
 * contains('2001:db8::1/64', '2001:db8::11')    // true
 * contains('2001:db8::1/128', '2001:db8::11')    // false
 * ```
 */
declare function contains$2(cidr: string, ip: string): boolean;

declare namespace index$2 {
  export {
    contains$2 as contains,
    ip2long$2 as ip2long,
    isCIDR$2 as isCIDR,
    isConflict$2 as isConflict,
    isValidIP$2 as isValidIP,
    long2ip$2 as long2ip,
  };
}

/**
 * Convert IPv4 address string to number
 *
 * @param ip - The IPv4 address string
 * @returns The converted IPv4 number or false if invalid
 *
 * @example
 * ```
 * ip2long('192.168.0.1')   // 3232235521
 * ip2long('192.168.0.257') // false
 * ```
 */
declare function ip2long$1(ip: string): number | false;

/**
 * Convert IPv4 number to address string
 *
 * @param ip - The IPv4 number
 * @returns The converted IPv4 address string or false if invalid
 *
 * @example
 * ```
 * long2ip(3232235521) // '192.168.0.1'
 * long2ip(-1) // false
 * ```
 */
declare function long2ip$1(ip: number): string | false;

/**
 * IPv4 address range class for representing a range defined by a start and end IPv4 address. Valid values are from 0 to 4294967295.
 */
declare class ipRange {
    #private;
    constructor(start: number, end: number);
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
    static fromLong(start: number, end: number): ipRange;
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
    static fromString(start: string, end: string): ipRange;
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
    ip2long(): number[];
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
    long2ip(): string[];
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
    ipCount(): number;
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
    contains(ip: string): boolean;
}

/**
 * Verify if the CIDR address is valid
 *
 * @param cidr - The CIDR address string
 * @returns True if valid, false otherwise
 *
 * @example
 * ```
 * isCIDR('192.168.1.0/24')  // true
 * isCIDR('192.168.1.0/34')  // false
 * isCIDR('287.168.1.0/34')  // false
 * ```
 */
declare function isCIDR$1(cidr: string): boolean;

/**
 * Verify if two IPv4 address are equal
 * @param ip1 The first IPv4 address to compare
 * @param ip2 The second IPv4 address to compare
 * @returns True if equal, false otherwise
 *
 * @example
 * ```
 * isEqual(32322355, 3232235521)  // false
 * isEqual(3232235521, 3232235521)  // true
 * isEqual('192.168.0.1', 3232235521)  // true
 * isEqual('192.168.1.10', '192.168.1.10') // true
 * isEqual('192.168.01.10', '192.168.1.010') // true
 * isEqual('192.168.02.10', '192.168.1.010') // false
 * ```
*/
declare function isEqual$1(ip1: string | number, ip2: string | number): boolean;

/**
 * Verify if the IP address is within the CIDR range
 *
 * @param cidr - A standard format CIDR address
 * @param ip - The IPv4 address to check
 * @returns True if within range, otherwise false
 *
 * @example
 * ```
 * contains('192.168.1.0/24', '192.168.1.5')    // true
 * contains('192.168.1.0/24', '192.168.2.5')    // false
 * ```
 */
declare function contains$1(cidr: string, ip: string): boolean;

/**
 * Verify if an IPv4 address is private
 * @param ip - The IPv4 address string
 * @returns True if private IPv4, false otherwise
 *
 * @example
 * ```
 * isPrivate('192.168.0.1') // returns true
 * isPrivate('114.114.114.114') // returns false
 * ```
 */
declare function isPrivate(ip: string): boolean;

/**
 * Verify if the IPv4 address is valid
 *
 * @param ip - The IPv4 address string
 * @param options - Enable strict mode to disallow leading 0s, false by default
 * @returns True if valid, false otherwise
 *
 * @example
 * ```
 * isValidIP('192.168.1.99') // true
 * isValidIP('192.168.01.99', {strict: true}) // false
 * ```
 */
declare function isValidIP$1(ip: string, options?: {
    strict?: boolean;
}): boolean;

interface SubNet$2 {
    cidrMask: number;
    ipCount: number;
    usableCount: number;
    subnetMask: string;
    firstHost: string;
    lastHost: string;
    networkAddress: string;
    broadcastAddress: string;
}
/**
 * Parse CIDR format address into address range info
 *
 * NetworkAddress and broadcastAddress are valid when mask < 31
 *
 * @param cidr - The CIDR format address string
 * @returns The parsed address range object or false if invalid
 *
 * @example
 * ```
 * parseCIDR('192.168.0.1/33')    // false
 * parseCIDR('192.168.0.1/24')
 * // {
 * //   ipCount: 256,
 * //   usableCount: 254,
 * //   cidrMask: 24,
 * //   subnetMask: '255.255.255.0',
 * //   firstHost: '192.168.0.1',
 * //   lastHost: '192.168.0.254',
 * //   networkAddress: '192.168.0.0',
 * //   broadcastAddress: '192.168.0.255'
 * // }
 * ```
 */
declare function parseCIDR$1(cidr: string): SubNet$2 | false;

/**
 * Check for conflicts in a set of CIDR
 *
 * @param cidrs - Array of CIDR format address string
 * @returns True if conflict found, false otherwise
 *
 * @example
 * ```
 * isConflict(['192.168.1.0/24', '192.168.0.0/16'])  // true
 * isConflict(['192.168.1.0/24', '192.168.2.0/24'])  // false
 * isConflict(['192.168.1.0/24', '192.168.2.0/24', '192.168.3.0/16'])  // true
 * isConflict(['192.168.1.0/24', '192.168.2.0/24', '192.168.3.0/24'])  // false
 * ```
 */
declare function isConflict$1(cidrs: string[]): boolean;

interface SubNet$1 {
    cidrMask: number;
    ipCount: number;
    usableCount: number;
    subnetMask: string;
    firstHost: string;
    lastHost: string;
    networkAddress: string;
    broadcastAddress: string;
}
/**
 * Parse IPv4 address and subnet mask into CIDR info
 *
 * @param ip - The IPv4 address string
 * @param mask - The subnet mask string
 * @returns The parsed CIDR info object or false if invalid
 *
 * @example
 * ```
 * parseSubnet('192.168.0.1', '1.255.255.0')    // false
 * parseSubnet('192.168.0.1', '255.255.255.0')
 * // {
 * //   ipCount: 256,
 * //   usableCount: 254,
 * //   cidrMask: 24,
 * //   subnetMask: '255.255.255.0',
 * //   firstHost: '192.168.0.1',
 * //   lastHost: '192.168.0.254',
 * //   networkAddress: '192.168.0.0',
 * //   broadcastAddress: '192.168.0.255'
 * // }
 * ```
*/
declare function parseSubnet(ip: string, mask: string): SubNet$1 | false;

/**
 * Verify if the subnet mask is valid
 *
 * @param  mask - The subnet mask to valid
 * @returns True if valid, otherwise false
 *
 * @example
 * ```
 * isValidMask(24) // true
 * isValidMask('255.255.255.0') // true
 * isValidMask('255.255.256.0') // false
 * ```
*/
declare function isValidMask(mask: string | number): boolean;

/**
 * Verify if two IPv4 address are on the same subnet
 *
 * @param ip1 - The first IPv4 address to compare
 * @param ip2 - The second IPv4 address to compare
 * @param mask - The subnet mask
 * @returns True if in the same subnet, otherwise false
 *
 * @example
 * ```
 * isSameSubnet('192.168.1.10', '192.168.1.100', 24) // true
 * isSameSubnet('192.168.1.10', '192.168.1.100', 32) // false
 * isSameSubnet('192.168.1.10', '192.168.1.100', '255.255.255.0') // true
 * isSameSubnet('192.168.1.10', '192.168.2.100', '255.255.255.0') // false
 * ```
 */
declare function isSameSubnet(ip1: string, ip2: string, mask: string | number): boolean;

interface BinHex {
    hex: string;
    decimal: number;
    binary: string;
}
/**
 * Convert IPv4 address to binary and hex
 *
 * @param ip - The IPv4 address string
 * @returns Contains binary and hexadecimal objects, false if invalid
 *
 * @example
 * ```
 * const results = toBinHex('192.168.0.1');
 * // results = {
 * //   hex: '0xc0a80001',
 * //   decimal: 3232235521
 * //   binary: '11000000101010000000000000001'
 * // }
 * ```
 */
declare function toBinHex(ip: string): BinHex | false;

interface Result {
    mapped: string;
    expanded: string;
    comperssed: string;
}
/**
 * Converts IPv4 address to IPv6 format
 *
 * @param ip - The IPv4 address string (validation requires strict mode)
 * @returns The IPv6 address object or false if invalid
 *
 * @example
 * ```
 * toIPv6Format('192.168.1.1')
 * // {
 * //   mapped: '::ffff:192.168.1.1',
 * //   comperssed: "::ffff:c0a8:101"
 * //   expanded: '0000:0000:0000:0000:0000:ffff:c0a8:0101',
 * // }
 * ```
 */
declare function toIPv6Format(ip: string): Result | false;

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
declare function toSubnetMask(length: number): string | false;

/**
 * Convert subnet mask string to mask length number
 *
 * @param mask - The subnet mask string
 * @returns The mask length or false if invalid
 *
 * @example
 * ```
 * toMaskLength('255.255.255.0') // 24
 * toMaskLength('255.255.256.0') // false
 * ```
*/
declare function toMaskLength(mask: string): number | false;

/**
 * Calculate the inverse mask of a subnet mask
 * @param mask - The subnet mask
 * @returns The inverse mask, or false if invalid
 *
 * @example
 * ```
 * toInverseMask(24);  // '0.0.0.255'
 * toInverseMask(16);  // '0.0.255.255'
 * toInverseMask('255.255.255.0');  // '0.0.0.255'
 * toInverseMask('255.255.0.0');  // '0.0.255.255'
 * ```
 */
declare function toInverseMask(mask: string | number): string | false;

type index$1_ipRange = ipRange;
declare const index$1_ipRange: typeof ipRange;
declare const index$1_isPrivate: typeof isPrivate;
declare const index$1_isSameSubnet: typeof isSameSubnet;
declare const index$1_isValidMask: typeof isValidMask;
declare const index$1_parseSubnet: typeof parseSubnet;
declare const index$1_toBinHex: typeof toBinHex;
declare const index$1_toIPv6Format: typeof toIPv6Format;
declare const index$1_toInverseMask: typeof toInverseMask;
declare const index$1_toMaskLength: typeof toMaskLength;
declare const index$1_toSubnetMask: typeof toSubnetMask;
declare namespace index$1 {
  export {
    contains$1 as contains,
    ip2long$1 as ip2long,
    index$1_ipRange as ipRange,
    isCIDR$1 as isCIDR,
    isConflict$1 as isConflict,
    isEqual$1 as isEqual,
    index$1_isPrivate as isPrivate,
    index$1_isSameSubnet as isSameSubnet,
    isValidIP$1 as isValidIP,
    index$1_isValidMask as isValidMask,
    long2ip$1 as long2ip,
    parseCIDR$1 as parseCIDR,
    index$1_parseSubnet as parseSubnet,
    index$1_toBinHex as toBinHex,
    index$1_toIPv6Format as toIPv6Format,
    index$1_toInverseMask as toInverseMask,
    index$1_toMaskLength as toMaskLength,
    index$1_toSubnetMask as toSubnetMask,
  };
}

/**
 * Convert IPv6 address string to number
 *
 * @param ip - The IPv6 address string
 * @returns The converted IPv6 number or false if invalid
 *
 * @example
 * ```
 * ip2long('f16c:f7ec:cfa2:e1c5:9a3c:cb08:801f:36b8')   // 320909743562165251276054390739658815160n
 * ```
 */
declare function ip2long(ip: string): bigint | false;

/**
 * Convert IPv4 number to address string
 *
 * @param ip - The IPv4 number
 * @returns The converted IPv4 address string or false if invalid
 *
 * @example
 * ```
 * long2ip(3232235521) // '192.168.0.1'
 * long2ip(-1) // false
 * ```
 */
declare function long2ip(ip: bigint): string | false;

/**
 * Verify if the IPv6 address is within the CIDR range
 *
 * @param cidr - A standard format IPv6 CIDR address
 * @param ip - The IPv6 address to check
 * @returns True if within range, otherwise false
 *
 * @example
 * contains('2001:db8::1/64', '2001:db8::11')    // true
 * contains('2001:db8::1/128', '2001:db8::11')    // false
 */
declare function contains(cidr: string, ip: string): boolean;

/**
 * Verify if the IPv6 CIDR address is valid
 *
 * @param cidr - The CIDR address string
 * @returns True if valid, false otherwise
 *
 * @example
 * ```
 * isCIDR('::9999:ffff/0')  // true
 * isCIDR('::9999:ffff/64')  // true
 * isCIDR('::9999:ffff/128')  // true
 * isCIDR('::9999:ffff/129')  // false
 * isCIDR('::99991:ffff/129')  // false
 * ```
 */
declare function isCIDR(cidr: string): boolean;

/**
 * Verify if two IPv6 address are equal
 * @param ip1 The first IPv6 address to compare
 * @param ip2 The second IPv6 address to compare
 * @returns True if equal, false otherwise
 *
 * @example
 * ```
 * isEqual(65535n, 65535)  // false
 * isEqual(65535n, 65535n)  // true
 * isEqual('::ffff', 65535n) // true
 * isEqual('::ffff', ::ffff)  // true
 * isEqual('::ffff', 0:0:0:0:0:0:0:ffff)  // true
 * isEqual('::ffff', 0000:0000:0000:0000:0000:0000:0000:ffff)  // true
 * ```
*/
declare function isEqual(ip1: string | bigint, ip2: string | bigint): boolean;

/**
 * Verify if the IPv6 address is valid
 *
 * @param ip - The IPv6 address string
 * @returns True if valid, false otherwise
 *
 * @example
 * ```
 * isValidIP('f16c:f7ec:cfa2:e1c5:9a3c:cb08:801f:36b8') // true
 * ```
 */
declare function isValidIP(ip: string): boolean;

/**
 * Check for conflicts in a set of IPv6 CIDR
 *
 * @param cidrs - Array of IPv6 CIDR format address string
 * @returns True if conflict found, false otherwise
 *
 * @example
 * ```
 * isConflict(['2001:db8::1/120', '2001:db8::1/122'])  // true
 * isConflict(['2001:db8::1/120', '3001:db8::1/120'])  // false
 * ```
 */
declare function isConflict(cidrs: string[]): boolean;

interface SubNet {
    ipCount: bigint;
    lastHost: string;
    firstHost: string;
    prefixLength: number;
}
/**
 * Parse CIDR format address into address range info
 *
 * NetworkAddress and broadcastAddress are valid when mask < 31
 *
 * @param cidr - The CIDR format address string
 * @returns The parsed address range object or false if invalid
 *
 * @example
 * ```
 * parseCIDR('::9999:ffff/118')
 * // {
 * //   ipCount: 1024n,
 * //   cidrMask: 118,
 * //   firstHost: '::9999:fc00',
 * //   lastHost: '::9999:ffff',
 * // }
 * ```
 */
declare function parseCIDR(cidr: string): false | SubNet;

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
declare function expandedForm(ip: string): string | false;

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
declare function compressedForm(ip: string): string | false;

declare const index_compressedForm: typeof compressedForm;
declare const index_contains: typeof contains;
declare const index_expandedForm: typeof expandedForm;
declare const index_ip2long: typeof ip2long;
declare const index_isCIDR: typeof isCIDR;
declare const index_isConflict: typeof isConflict;
declare const index_isEqual: typeof isEqual;
declare const index_isValidIP: typeof isValidIP;
declare const index_long2ip: typeof long2ip;
declare const index_parseCIDR: typeof parseCIDR;
declare namespace index {
  export {
    index_compressedForm as compressedForm,
    index_contains as contains,
    index_expandedForm as expandedForm,
    index_ip2long as ip2long,
    index_isCIDR as isCIDR,
    index_isConflict as isConflict,
    index_isEqual as isEqual,
    index_isValidIP as isValidIP,
    index_long2ip as long2ip,
    index_parseCIDR as parseCIDR,
  };
}

export { index$2 as IP, index$1 as IPv4, index as IPv6 };
