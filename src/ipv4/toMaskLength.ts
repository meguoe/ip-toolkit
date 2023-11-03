import { ip2long, isValidMask } from './index';

/**
 * Convert subnet mask string to mask length number
 * 
 * @param mask - The subnet mask string
 * @returns The mask length or false if invalid 
 * 
 * @example
 * ```
 * toMaskLength('255.255.255.0') // 24 
 * toMaskLength('255.255.256.0') // false
 * ```
*/

export function toMaskLength(mask: string): number | false {
  if (typeof mask !== 'string') return false;
  if (!isValidMask(mask)) return false;
  const longMask = ip2long(mask);
  const length = longMask === 0 ? 0 : longMask.toString(2).replaceAll('0', '').length;
  return length;
}