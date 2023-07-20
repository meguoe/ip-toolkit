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
export declare function ip2long(ip: string): number | false;
