/**
 * Verify if two IP address are equal
 * @param ip1 The first IP address to compare
 * @param ip2 The second IP address to compare
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
export declare function isEqual(ip1: string | number, ip2: string | number): boolean;
