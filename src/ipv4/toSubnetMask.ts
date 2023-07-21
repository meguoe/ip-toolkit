import { long2ip, isValidMask } from './index';

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

export function toSubnetMask(length: number): string | false {
  if (typeof length !== 'number' || isNaN(length) || !isValidMask(length)) return false;
  
  const mask = 0xffffffff << 32 - length;
  return length ? long2ip(mask >>> 0) : '0.0.0.0';
}