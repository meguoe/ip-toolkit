/**
 * Convert IP address string to number
 *
 * @param ip - The IP address string
 * @returns The converted IP number or false if invalid
 *
 * @example
 * ```
 * ip2long('192.168.0.1')   // 3232235521
 * ip2long('192.168.0.257') // false
 * ```
 */
export declare function ip2long(ip: string): number | false;
