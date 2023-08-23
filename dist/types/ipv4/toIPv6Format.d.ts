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
export declare function toIPv6Format(ip: string): Result | false;
export {};
