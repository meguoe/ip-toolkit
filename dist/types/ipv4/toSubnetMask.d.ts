/**
 * Convert mask length to subnet mask string
 *
 * @param length - The mask length number
 * @returns The subnet mask string or false if invalid
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
