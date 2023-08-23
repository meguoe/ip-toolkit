interface SubNet {
    ipCount: bigint;
    lastHost: string;
    firstHost: string;
    prefixLength: number;
}
/**
 * Parse CIDR format address into address range info
 *
 * NetworkAddress and broadcastAddress are valid when mask < 31
 *
 * @param cidr - The CIDR format address string
 * @returns The parsed address range object or false if invalid
 *
 * @example
 * ```
 * parseCIDR('::9999:ffff/118')
 * // {
 * //   ipCount: 1024n,
 * //   cidrMask: 118,
 * //   firstHost: '::9999:fc00',
 * //   lastHost: '::9999:ffff',
 * // }
 * ```
 */
export declare function parseCIDR(cidr: string): false | SubNet;
export {};
