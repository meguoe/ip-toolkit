import { ip2long } from './index';

/**
 * Verify if two IP address are equal
 * @param ip1 The first IP address to compare
 * @param ip2 The second IP address to compare
 * @returns True if equal, false otherwise
 * 
 * @example
 * ```
 * isEqual(32322355, 3232235521)  // false
 * isEqual(3232235521, 3232235521)  // true
 * isEqual('192.168.0.1', 3232235521)  // true
 * isEqual('192.168.1.10', '192.168.1.10') // true
 * isEqual('192.168.01.10', '192.168.1.010') // true
 * isEqual('192.168.02.10', '192.168.1.010') // false
 * ```
*/

export function isEqual(ip1: string | number, ip2: string | number): boolean {
  if (typeof ip1 === 'number' && (ip1 < 0 || ip1 > 4294967295)) return false;
  if (typeof ip2 === 'number' && (ip2 < 0 || ip2 > 4294967295)) return false;
  if (typeof ip1 === 'string') ip1 = ip2long(ip1) as number;
  if (typeof ip2 === 'string') ip2 = ip2long(ip2) as number;
  if (typeof ip1 !== 'number' || typeof ip2 !== 'number') return false;
  return ip1 === ip2;
}