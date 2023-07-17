/**
 * Verify if the subnet mask is valid
 *
 * @param  mask - The subnet mask to validate
 * @returns true if valid, otherwise false
 *
 * @example
 * isValidMask(24) // true
 * isValidMask('255.255.255.0') // true
 * isValidMask('255.255.256.0') // false
*/
export declare function isValidMask(mask: string | number): boolean;
