/**
 * Convert subnet mask string to mask length number
 *
 * @param mask - The subnet mask string
 * @returns The mask length or false if invalid
 *
 * @example
 * toMaskLength('255.255.255.0') // 24
 * toMaskLength('255.255.256.0') // false
*/
export declare function toMaskLength(mask: string): number | false;
