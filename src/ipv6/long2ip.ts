import { compressedForm } from './compressedForm';

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

export function long2ip(ip: bigint): string | false {
  if (typeof ip !== 'bigint') return false;
  if (ip >= 0n && ip <= 340282366920938463463374607431768211455n) {
    const sections = [];
    const hex = ip.toString(16).padStart(32, '0');
    for (let i = 0; i < 8; i++) sections.push(hex.slice(i * 4, (i + 1) * 4));
    return compressedForm(sections.join(':')) as string;
  } else {
    return false;
  }
}