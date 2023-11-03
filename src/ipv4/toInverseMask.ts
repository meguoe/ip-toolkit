import { ip2long, isValidMask, long2ip, toSubnetMask } from './index';

/**
 * Calculate the inverse mask of a subnet mask
 * @param mask - The subnet mask 
 * @returns The inverse mask, or false if invalid
 *
 * @example
 * ```
 * toInverseMask(24);  // '0.0.0.255'
 * toInverseMask(16);  // '0.0.255.255'
 * toInverseMask('255.255.255.0');  // '0.0.0.255'
 * toInverseMask('255.255.0.0');  // '0.0.255.255'
 * ```
 */

export function toInverseMask(mask: string | number): string | false {
  if (!isValidMask(mask)) return false;

  if (typeof mask === 'number') mask = toSubnetMask(mask) as string;
  const longMask = ip2long(mask) as number;
  const notMask = ~longMask >>> 0;
  return long2ip(notMask);
}