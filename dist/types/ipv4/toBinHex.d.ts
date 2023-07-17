interface BinHex {
    hex: string;
    decimal: number;
    binary: string;
}
/**
 * Convert IP address to binary and hex representations.
 *
 * @param ip - The IP address string
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
export declare function toBinHex(ip: string): BinHex | false;
export {};
