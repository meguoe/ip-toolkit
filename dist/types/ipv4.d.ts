/**
 * Convert IPv4 address from string to long integer
 *
 * @param ip - A standard IPv4 address string
 * @returns Converted integer number of the IPv4 address, false if invalid
 *
 * @example
 * ```
 * ip2long('192.168.0.1')   // 3232235521
 * ip2long('192.168.0.257') // false
 * ```
 */
export declare function ip2long(ip: string): number | boolean;
/**
 * Convert integer IPv4 address to string
 *
 * @param ip - An integer IPv4 address
 * @returns String IPv4 address, or false on failure
 *
 * @example
 * ```
 * long2ip(3232235521) // '192.168.0.1'
 * long2ip(-1) // false
 * ```
 */
export declare function long2ip(ip: number): string | false;
/**
 * Check if the given string is a valid IPv4 address
 *
 * @param value - The address string to validate
 * @param options - Enable strict mode to disallow leading 0s, false by default
 * @returns true if valid, otherwise false
 *
 * @example
 * ```
 * isValidIP('192.168.1.99') // true
 * isValidIP('192.168.01.99', {strict: true}) // false
 * ```
 */
export declare function isValidIP(value: string, options?: {
    strict?: boolean;
}): boolean;
/**
 * Check if two IPv4 network addresses are in the same subnet
 *
 * @param ip1 - The first IPv4 network address to compare
 * @param ip2 - The second IPv4 network address to compare
 * @param mask - The subnet mask
 * @returns true if in the same subnet, otherwise false
 *
 * @example
 * ```
 * isSameSubnet('192.168.1.10', '192.168.1.100', '255.255.255.0') // true
 * isSameSubnet('192.168.1.10', '192.168.2.100', '255.255.255.0') // false
 * ```
 */
export declare function isSameSubnet(ip1: string, ip2: string, mask: string): boolean;
/**
 * Calculate subnet mask address from prefix length
 *
 * @param length - Subnet mask length, from 0 to 32
 * @returns The subnet mask address, or false if invalid length
 *
 * @example
 * ```
 * toSubnetMask(0)  // '0.0.0.0'
 * toSubnetMask(8)  // '255.0.0.0'
 * toSubnetMask(16) // '255.255.0.0'
 * toSubnetMask(24) // '255.255.255.0'
 * ```
 */
export declare function toSubnetMask(length: number): string | false;
/**
 * Parse IPv4 CIDR address to get address range info
 *
 * networkAddress and broadcastAddress are valid when mask < 31
 *
 * @param ip - A standard format CIDR address
 * @returns The parsed CIDR address info, or false if invalid
 *
 * @example
 * ```
 * parseCIDR('192.168.0.1/24')
 * // {
 * //   ipCount: 256,
 * //   usableCount: 254,
 * //   cidrMask: 24,
 * //   subnetMask: '255.255.255.0',
 * //   firstHost: '192.168.0.1',
 * //   lastHost: '192.168.0.254',
 * //   networkAddress: '192.168.1.0',
 * //   broadcastAddress: '192.168.1.255'
 * // }
 * ```
 */
export declare function parseCIDR(cidr: string): {
    cidrMask: number;
    ipCount: number;
    usableCount: number;
    subnetMask: string;
    firstHost: string;
    lastHost: string;
    networkAddress?: string;
    broadcastAddress?: string;
} | false;
/**
 * IPv4 address range class for representing a range defined by a start and end IP address. Valid values are from 0 to 4294967295.
 */
export declare class ipRange {
    #private;
    constructor(start: number, end: number);
    /**
     * Create ipRange instance from start and end IPv4 integers
     *
     * @param start - Start IP integer
     * @param end - End IP integer
     * @returns The created ipRange instance
     * @throws Error if start or end IP is invalid
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
     * @param startIp - Start IP string
     * @param endIp - End IP string
     * @returns The created ipRange instance
     * @throws Error if start or end IP is invalid
     *
     * @example
     * ```
     * const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
     * ```
     */
    static fromString(start: string, end: string): ipRange;
    /**
     * Get start and end IP integers of current range
     *
     * @returns Array of start and end IP integers
     *
     * @example
     * ```
     * const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
     * range.ip2long(); // [3232235777, 3232235876]
     * ```
     */
    ip2long(): number[];
    /**
     * Get start and end IP strings of current range
     *
     * @returns Array of start and end IP strings
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
     * @returns The IP count
     *
     * @example
     * ```
     * const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
     * range.getSize(); // 100
     * ```
     */
    getSize(): number;
    /**
     * Check if an IPv4 address is within current range
     *
     * @param ip - An IPv4 address string
     * @returns true if within range, otherwise false
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
