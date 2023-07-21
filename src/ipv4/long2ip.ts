/**
 * Convert IPv4 number to address string
 *
 * @param ip - The IPv4 number 
 * @returns The converted IPv4 address string or false if invalid
 * 
 * @example
 * ```
 * long2ip(3232235521) // '192.168.0.1'
 * long2ip(-1) // false
 * ```
 */

export function long2ip(ip: number): string | false {
  if (typeof ip !== 'number') return false;
  if (ip >= 0 && ip <= 4294967295) {
    const parts: number[] = [];
    for (let i = 3; i >= 0; i--) parts.push((ip >>> (i * 8)) & 255);
    return parts.join('.');
  } else {
    return false;
  }
}