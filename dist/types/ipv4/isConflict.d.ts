/**
 * Check for conflicts in a set of CIDR
 *
 * @param cidrs - Array of CIDR format address string
 * @returns True if conflict found, false otherwise
 *
 * @example
 *
 * ```
 * isConflict(['192.168.1.0/24', '192.168.0.0/16'])  // true
 * isConflict(['192.168.1.0/24', '192.168.2.0/24'])  // false
 * isConflict(['192.168.1.0/24', '192.168.2.0/24', '192.168.3.0/16'])  // true
 * isConflict(['192.168.1.0/24', '192.168.2.0/24', '192.168.3.0/24'])  // false
 * ```
 */
export declare function isConflict(cidrs: string[]): boolean;
