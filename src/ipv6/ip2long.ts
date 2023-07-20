import { isValidIP, expandedFrom } from './index';

/**
 * Convert IPv6 address string to number 
 * 
 * @param ip - The IPv6 address string
 * @returns The converted IPv6 number or false if invalid
 * 
 * @example
 * ```
 * ip2long('f16c:f7ec:cfa2:e1c5:9a3c:cb08:801f:36b8')   // 320909743562165251276054390739658815160n 
 * ```
 */

export function ip2long(ip: string): bigint | false {
  if (!isValidIP(ip)) return false;
  
  const binary = [];
  ip = expandedFrom(ip) as string;
  const parts = ip.split(':');
  for (let i = 0; i < parts.length; i++) {
    const dec = parseInt(parts[i], 16);
    binary.push(dec.toString(2).padStart(16, '0'));
  }
  return BigInt(`0b${binary.join('')}`);
}