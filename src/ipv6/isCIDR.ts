import { parseCIDR } from './index';

/**
 * Verify if the IPv6 CIDR address is valid
 * 
 * @param cidr - The CIDR address string
 * @returns True if valid, false otherwise
 * 
 * @example
 * ```
 * isCIDR('::9999:ffff/0')  // true
 * isCIDR('::9999:ffff/64')  // true
 * isCIDR('::9999:ffff/128')  // true
 * isCIDR('::9999:ffff/129')  // false
 * isCIDR('::99991:ffff/129')  // false
 * ```
 */
  
export function isCIDR(cidr: string): boolean {
  if (typeof cidr !== 'string') return false;

  const subnet = parseCIDR(cidr);
  return typeof subnet === 'object' ? true : false;
}