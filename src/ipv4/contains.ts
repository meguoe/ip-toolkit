import { ipRange, isValidIP, parseCIDR } from './index';

/**
 * Verify if the IP address is within the CIDR range
 * 
 * @param cidr - A standard format CIDR address
 * @param ip - The IPv4 address to check 
 * @returns True if within range, otherwise false
 *
 * @example
 * 
 * contains('192.168.1.0/24', '192.168.1.5')    // true
 * contains('192.168.1.0/24', '192.168.2.5')    // false
 */

export function contains(cidr: string, ip: string): boolean {
  const subnet = parseCIDR(cidr);
  if (typeof subnet !== 'object' || !isValidIP(ip)) return false;
  
  const { cidrMask, firstHost, lastHost, networkAddress, broadcastAddress } = subnet;
  if (cidrMask >= 31) {
    return ipRange.fromString(firstHost, lastHost).contains(ip);
  } else {
    return ipRange.fromString(networkAddress, broadcastAddress).contains(ip);
  }
}