import { ip2long, long2ip } from './index';

/**
 * IPv4 address range class for representing a range defined by a start and end IPv4 address. Valid values are from 0 to 4294967295.
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
     * @param start - Start IPv4 integer 
     * @param end - End IPv4 integer
     * @returns The created ipRange instance
     * @throws Error if start or end IPv4 is invalid
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
     * @param startIp - Start IPv4 string
     * @param endIp - End IPv4 string 
     * @returns The created ipRange instance
     * @throws Error if start or end IPv4 is invalid
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
     * Get start and end IPv4 integers of current range
     *
     * @returns Array of start and end IPv4 integers
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
     * Get start and end IPv4 strings of current range 
     *
     * @returns Array of start and end IPv4 strings
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
     * @returns Number of IPv4 addresses
     *
     * @example
     * ```
     * const range = ipRange.fromString('192.168.1.1', '192.168.1.100'); 
     * range.ipCount(); // 100
     * ```
     */
  
  ipCount(): number {
    return this.#end - this.#start + 1;
  }
  
  /**
     * Verify if the IPv4 address is within the current range
     *
     * @param ip - A standard IPv4 address string
     * @returns True if within range, otherwise false
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
  