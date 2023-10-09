import { parseCIDR } from './index';

/**
 * Validate if the CIDR address is valid
 * 
 * @param cidr - The CIDR address string
 * @returns True if valid, false otherwise
 * 
 * @example
 * 
 * ```
 * isCIDR('192.168.1.0/24')  // true
 * isCIDR('192.168.1.0/34')  // false
 * isCIDR('287.168.1.0/34')  // false
 * ```
 */
  
export function isCIDR(cidr: string): boolean {
  if (typeof cidr !== 'string') return false;

  const subnet = parseCIDR(cidr);
  return typeof subnet === 'object' ? true : false;
}