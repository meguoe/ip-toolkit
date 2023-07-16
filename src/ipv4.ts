
import type { CidrInfo } from './types';

/**
 * Convert IPv4 address from string to long integer 
 * 
 * @param ip - A standard IPv4 address string
 * @returns Converted integer number of the IPv4 address, false if invalid
 * 
 * @example
 * ```
 * ip2long('192.168.0.1')   // 3232235521 
 * ip2long('192.168.0.257') // false
 * ```
 */

export function ip2long(ip: string): number | boolean {
  if (!isValidIP(ip)) return false;

  let long = 0;
  const parts = ip.split('.');
  for (const part of parts) long = (long << 8) + +part;
  return long >>> 0;
}

/**
 * Convert integer IPv4 address to string 
 *
 * @param ip - An integer IPv4 address 
 * @returns String IPv4 address, or false on failure
 * 
 * @example
 * ```
 * long2ip(3232235521) // '192.168.0.1'
 * long2ip(-1) // false
 * ```
 */

export function long2ip(ip: number): string | false {
  if (ip >= 0 && ip <= 4294967295) {
    const parts: number[] = [];
    for (let i = 3; i >= 0; i--) parts.push((ip >>> (i * 8)) & 255);
    return parts.join('.');
  } else {
    return false;
  }
}

/**
 * Check if the given string is a valid IPv4 address
 *
 * @param value - The address string to validate
 * @param options - Enable strict mode to disallow leading 0s, false by default
 * @returns true if valid, otherwise false
 *
 * @example
 * ```
 * isValidIP('192.168.1.99') // true
 * isValidIP('192.168.01.99', {strict: true}) // false 
 * ```
 */

export function isValidIP(
  value: string,
  options: { strict?: boolean } = { strict: false }
): boolean {
  if (options.strict) {
    const IPV4_REGEX = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;
    return IPV4_REGEX.test(value);
  } else {
    const IPV4_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return IPV4_REGEX.test(value);
  }
}

/**
 * Check if two IPv4 network addresses are in the same subnet
 *
 * @param ip1 - The first IPv4 network address to compare
 * @param ip2 - The second IPv4 network address to compare 
 * @param mask - The subnet mask
 * @returns true if in the same subnet, otherwise false
 *
 * @example 
 * ```
 * isSameSubnet('192.168.1.10', '192.168.1.100', '255.255.255.0') // true
 * isSameSubnet('192.168.1.10', '192.168.2.100', '255.255.255.0') // false
 * ```
 */

export function isSameSubnet(ip1: string, ip2: string, mask: string) {
  const ip1Long = ip2long(ip1);
  if (typeof ip1Long !== 'number') return false;

  const ip2Long = ip2long(ip2);
  if (typeof ip2Long !== 'number') return false;

  const maskLong = ip2long(mask);
  if (typeof maskLong !== 'number') return false;

  return (ip1Long & maskLong) === (ip2Long & maskLong);
}

/**
 * Calculate subnet mask address from prefix length 
 *
 * @param length - Subnet mask length, from 0 to 32
 * @returns The subnet mask address, or false if invalid length
 *
 * @example
 * ```
 * toSubnetMask(0)  // '0.0.0.0' 
 * toSubnetMask(8)  // '255.0.0.0'
 * toSubnetMask(16) // '255.255.0.0' 
 * toSubnetMask(24) // '255.255.255.0'
 * ```
 */

export function toSubnetMask(length: number): string | false {
  if (isNaN(length) || length < 0 || length > 32) return false;

  const mask = 0xffffffff << 32 - length;
  return length ? long2ip(mask >>> 0) : '0.0.0.0';
}

/**
 * Parse IPv4 CIDR address to get address range info
 *
 * networkAddress and broadcastAddress are valid when mask < 31
 *
 * @param ip - A standard format CIDR address 
 * @returns The parsed CIDR address info, or false if invalid
 * 
 * @example
 * ```
 * parseCIDR('192.168.0.1/24')
 * // {
 * //   ipCount: 256,  
 * //   usableCount: 254,
 * //   cidrMask: 24, 
 * //   subnetMask: '255.255.255.0',
 * //   firstHost: '192.168.0.1', 
 * //   lastHost: '192.168.0.254',
 * //   networkAddress: '192.168.1.0',
 * //   broadcastAddress: '192.168.1.255' 
 * // }
 * ``` 
 */

export function parseCIDR(cidr: string): CidrInfo | false {
  const [ip, mask] = cidr.split('/');
  if (!isValidIP(ip) || !(+mask >= 0 && +mask <= 32)) return false;

  const length = 32 - +mask;
  const longIP = ip2long(ip) as number;
  const ipCount = Math.pow(2, length);
  const networkIP = +mask ? ((longIP >> length) << length) >>> 0 : 0;
  const broadcastIP = (networkIP | ipCount - 1) >>> 0;

  const cidrInfo: CidrInfo = {
    ipCount,
    cidrMask: +mask,
    usableCount: +mask < 31 ? ipCount - 2 : ipCount,
    subnetMask: toSubnetMask(+mask) as string,
    networkAddress: +mask < 31 ? long2ip(networkIP) as string : '',
    broadcastAddress: +mask < 31 ? long2ip(broadcastIP) as string : '',
    firstHost: long2ip(networkIP + (+mask < 31 ? 1 : 0)) as string,
    lastHost: long2ip(broadcastIP - (+mask < 31 ? 1 : 0)) as string,
  };
  
  return cidrInfo;
}


/**
 * IPv4 address range class for representing a range defined by a start and end IP address. Valid values are from 0 to 4294967295.
 */

export class ipRange {

  #start: number;
  #end: number;

  constructor(start: number, end: number) {
    if (+start < 0 || +start > 4294967295 || +end < 0 || +end > 4294967295) {
      throw new Error('Invalid start or end IPv4 address');
    }

    this.#start = start;
    this.#end = end;
  }

  /**
   * Create ipRange instance from start and end IPv4 integers
   *
   * @param start - Start IP integer 
   * @param end - End IP integer
   * @returns The created ipRange instance
   * @throws Error if start or end IP is invalid
   *
   * @example
   * ```
   * const range = ipRange.fromLong(3232235777, 3232235876);
   * ```
   */

  static fromLong(start: number, end: number): ipRange {
    if (typeof start !== 'number' || typeof end !== 'number') throw new Error('Invalid start or end IPv4 address');
    if (+end < +start) throw new Error('Invalid range value, end must be greater than or equal to start');
    return new ipRange(start, end);
  }

  /**
   * Create ipRange instance from start and end IPv4 strings 
   * 
   * @param startIp - Start IP string
   * @param endIp - End IP string 
   * @returns The created ipRange instance
   * @throws Error if start or end IP is invalid
   *
   * @example
   * ```
   * const range = ipRange.fromString('192.168.1.1', '192.168.1.100'); 
   * ```
   */

  static fromString(start: string, end: string): ipRange {
    const sLong = ip2long(start);
    const eLong = ip2long(end);
    if (typeof sLong !== 'number' || typeof eLong !== 'number') throw new Error('Invalid start or end IPv4 address');
    if (eLong < sLong) throw new Error('Invalid range value, end must be greater than or equal to start');
    return new ipRange(sLong, eLong);
  }

  /**
   * Get start and end IP integers of current range
   *
   * @returns Array of start and end IP integers
   * 
   * @example
   * ```
   * const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
   * range.ip2long(); // [3232235777, 3232235876]
   * ```
   */

  ip2long(): number[] {
    return [this.#start, this.#end];
  }

  /**
   * Get start and end IP strings of current range 
   *
   * @returns Array of start and end IP strings
   *
   * @example
   * ```
   * const range = ipRange.fromLong(3232235777, 3232235876);
   * range.long2ip(); // ['192.168.1.1', '192.168.1.100']
   * ```
   */

  long2ip(): string[] {
    return [
      long2ip(this.#start) as string,
      long2ip(this.#end) as string
    ];
  }

  /**
   * Get the number of IPs in current range
   * 
   * @returns The IP count
   *
   * @example
   * ```
   * const range = ipRange.fromString('192.168.1.1', '192.168.1.100'); 
   * range.getSize(); // 100
   * ```
   */

  getSize(): number {
    return this.#end - this.#start + 1;
  }

  /**
   * Check if an IPv4 address is within current range
   *
   * @param ip - An IPv4 address string 
   * @returns true if within range, otherwise false
   * 
   * @example
   * ```
   * const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
   * range.contains('192.168.1.99'); // true
   * range.contains('192.168.0.11'); // false  
   * ```
   */

  contains(ip: string): boolean {
    const long = ip2long(ip);
    if (typeof long !== 'number') return false;
    return long >= this.#start && long <= this.#end;
  }
}
