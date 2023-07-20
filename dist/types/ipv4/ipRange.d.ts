/**
 * IPv4 address range class for representing a range defined by a start and end IPv4 address. Valid values are from 0 to 4294967295.
 */
export declare class ipRange {
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
