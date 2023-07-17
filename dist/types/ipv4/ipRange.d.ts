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
       * range.ipCount(); // 100
       * ```
       */
    ipCount(): number;
    /**
       * Verify if the IPv4 address is within the current range
       *
       * @param ip - A standard IPv4 address string
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
