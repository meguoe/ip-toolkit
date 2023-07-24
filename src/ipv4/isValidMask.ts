import { ip2long } from './index';

/**
 * Verify if the subnet mask is valid
 * 
 * @param  mask - The subnet mask to validate
 * @returns True if valid, otherwise false
 * 
 * @example
 * isValidMask(24) // true
 * isValidMask('255.255.255.0') // true 
 * isValidMask('255.255.256.0') // false
*/

export function isValidMask(mask: string | number): boolean {
  if (typeof mask === 'number' && !isNaN(mask)) {
    if (mask < 0 || mask > 32) return false;
    return true;
  } else if (typeof mask === 'string') {
    const longMask = ip2long(mask);
    if (typeof longMask !== 'number') return false;
    return /^1*0*$/.test(longMask.toString(2).padStart(32, '0'));
  } else {
    return false;
  }
}