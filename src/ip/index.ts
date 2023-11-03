import { IPv4, IPv6 } from '../index';

/**
 * Convert IPv4 or IPv6 address string to number 
 * 
 * @param ip - The IPv4 or IPv6 address string
 * @returns The converted IPv4 or IPv6 number or false if invalid
 * 
 * @example
 * ```
 * ip2long('192.168.0.1')   // 3232235521 
 * ip2long('::ffff:9999')   // 4294941081 
 * ```
 */

export function ip2long(ip: string): number | bigint | false {
  if (!isValidIP(ip)) return false;
  return IPv4.ip2long(ip) || IPv6.ip2long(ip);
}

/**
 * Convert IPv4 or IPv6 number to address string
 *
 * @param ip - The IPv4 or IPv6 number 
 * @returns The converted IPv4 or IPv6 address string or false if invalid
 * 
 * @example
 * ```
 * ip2long('192.168.0.1')   // 3232235521 
 * ip2long('::ffff:9999')   // 4294941081 
 * ```
 */

export function long2ip(ip: number | bigint): string | false {
  if (typeof ip !== 'number' && typeof ip !== 'bigint') return false;
  return IPv4.long2ip(ip as number) || IPv6.long2ip(ip as bigint);
}

/**
 * Verify if the CIDR address is valid
 * 
 * @param cidr - The CIDR address string
 * @returns True if valid, false otherwise
 * 
 * @example
 * ```
 * isCIDR('192.168.1.0/24')  // true
 * isCIDR('192.168.1.0/34')  // false
 * isCIDR('287.168.1.0/34')  // false
 * ```
 */
  
export function isCIDR(cidr: string): boolean {
  if (typeof cidr !== 'string') return false;
  return IPv4.isCIDR(cidr) || IPv6.isCIDR(cidr);
}

/**
 * Verify if the IPv4 or IPv6 address is valid
 *
 * @param ip - The IPv4 or IPv6 address string
 * @returns True if valid, false otherwise
 *
 * @example
 * ```
 * isValidIP('192.168.1.99') // true
 * isValidIP('f16c:f7ec:cfa2:e1c5:9a3c:cb08:801f:36b8') // true
 * ```
 */

export function isValidIP(ip: string): boolean {
  if (typeof ip !== 'string') return false;
  return IPv4.isValidIP(ip) || IPv6.isValidIP(ip);
}

/**
 * Check for conflicts in a set of CIDR
 * 
 * @param cidrs - Array of CIDR format address string
 * @returns True if conflict found, false otherwise
 * 
 * @example
 * ```
 * isConflict(['192.168.1.0/24', '192.168.0.0/24'])  // false
 * isConflict(['192.168.1.0/24', '2001:db8::1/122'])  // false
 * isConflict(['2001:db8::1/120', '2001:db8::1/122'])  // true
 * isConflict(['192.168.1.0/24', '192.168.1.0/28', '2001:db8::1/122'])  // true
 * ```
 */

export function isConflict(cidrs: string[]): boolean {
  if (!Array.isArray(cidrs) || cidrs.length === 0) return false;
  return IPv4.isConflict(cidrs) || IPv6.isConflict(cidrs);
}

/**
 * Verify if the IPv4 or IPv6 address is within the CIDR range
 * 
 * @param cidr - A standard format IPv4 or IPv6 CIDR address
 * @param ip - The IPv4 or IPv6 address to check 
 * @returns True if within range, otherwise false
 *
 * @example
 * ```
 * contains('192.168.1.0/24', '192.168.1.5')    // true
 * contains('192.168.1.0/24', '192.168.2.5')    // false
 * contains('2001:db8::1/64', '2001:db8::11')    // true
 * contains('2001:db8::1/128', '2001:db8::11')    // false
 * ```
 */

export function contains(cidr: string, ip: string): boolean {
  if (typeof cidr !== 'string' || typeof ip !== 'string') return false;
  return IPv4.contains(cidr, ip) || IPv6.contains(cidr, ip);
}