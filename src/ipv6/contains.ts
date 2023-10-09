import { ip2long, isValidIP, parseCIDR } from './index';

/**
 * Verify if the IPv6 address is within the CIDR range
 * 
 * @param cidr - A standard format IPv6 CIDR address
 * @param ip - The IPv6 address to check 
 * @returns True if within range, otherwise false
 *
 * @example
 * 
 * contains('2001:db8::1/64', '2001:db8::11')    // true
 * contains('2001:db8::1/128', '2001:db8::11')    // false
 */

export function contains(cidr: string, ip: string): boolean {
  const subnet = parseCIDR(cidr);
  if (typeof subnet !== 'object' || !isValidIP(ip)) return false;
  
  const { lastHost, firstHost } = subnet;
  const ipLong = ip2long(ip);
  const lastHostLong = ip2long(lastHost);
  const firstHostLong = ip2long(firstHost);
  return ipLong >= firstHostLong && ipLong <= lastHostLong;
}