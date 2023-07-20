import { ip2long, isValidIP, isValidMask, toSubnetMask } from './index';

/**
 * Verify if two IPv4 address are on the same subnet
 *
 * @param ip1 - The first IPv4 address to compare
 * @param ip2 - The second IPv4 address to compare
 * @param mask - The subnet mask
 * @returns True if in the same subnet, otherwise false
 *
 * @example 
 * ```
 * isSameSubnet('192.168.1.10', '192.168.1.100', 24) // true
 * isSameSubnet('192.168.1.10', '192.168.1.100', 32) // false
 * isSameSubnet('192.168.1.10', '192.168.1.100', '255.255.255.0') // true
 * isSameSubnet('192.168.1.10', '192.168.2.100', '255.255.255.0') // false
 * ```
 */

export function isSameSubnet(ip1: string, ip2: string, mask: string | number) {
  if (!isValidIP(ip1) || !isValidIP(ip2) || !isValidMask(mask)) return false;

  const ip1Long = ip2long(ip1) as number;
  const ip2Long = ip2long(ip2) as number;
  if (typeof mask === 'number') mask = toSubnetMask(mask) as string;
  const maskLong = ip2long(mask) as number;
  return (ip1Long & maskLong) === (ip2Long & maskLong);
}