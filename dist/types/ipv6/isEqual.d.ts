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
export declare function isEqual(ip1: string | bigint, ip2: string | bigint): boolean;
