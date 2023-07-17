import { isValidIP } from './index';
/**
 * Convert IP address string to number 
 * 
 * @param ip - The IP address string
 * @returns The converted IP number or false if invalid
 * 
 * @example
 * ```
 * ip2long('192.168.0.1')   // 3232235521 
 * ip2long('192.168.0.257') // false
 * ```
 */

export function ip2long(ip: string): number | false {
  if (!isValidIP(ip)) return false;
  
  let long = 0;
  const parts = ip.split('.');
  for (const part of parts) long = (long << 8) + +part;
  return long >>> 0;
}