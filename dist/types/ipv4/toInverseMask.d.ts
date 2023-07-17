/**
 * Calculate the inverse mask of a subnet mask
 * @param mask - The subnet mask
 * @returns The inverse mask, or false if invalid
 *
 * @example
 *
 * ```
 * toInverseMask(24);  // '0.0.0.255'
 * toInverseMask(16);  // '0.0.255.255'
 * toInverseMask('255.255.255.0');  // '0.0.0.255'
 * toInverseMask('255.255.0.0');  // '0.0.255.255'
 * ```
 */
export declare function toInverseMask(mask: string | number): string | false;
