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
export declare function long2ip(ip: number): string | false;
