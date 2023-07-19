import { ip2long, isValidIP } from './index';

interface BinHex {
    hex: string;
    decimal: number;
    binary: string;
}

/**
 * Convert IPv4 address to binary and hex representations.
 * 
 * @param ip - The IPv4 address string
 * @returns Contains binary and hexadecimal objects, false if invalid
 * 
 * @example
 * ```
 * const results = toBinHex('192.168.0.1');
 * // results = {
 * //   hex: 'c0a80001',
 * //   decimal: 0x3232235521
 * //   binary: '11000000101010000000000000001' 
 * // }
 * ```
 */
export function toBinHex(ip: string): BinHex | false {
  if (!isValidIP(ip)) return false;
  
  const longIP = ip2long(ip) as number;

  return {
    decimal: longIP,
    hex: `0x${ longIP.toString(16).padStart(8, '0')}`,
    binary: longIP.toString(2).padStart(32, '0'),
  };
  
}