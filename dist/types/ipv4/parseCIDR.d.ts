interface SubNet {
    cidrMask: number;
    ipCount: number;
    usableCount: number;
    subnetMask: string;
    firstHost: string;
    lastHost: string;
    networkAddress: string;
    broadcastAddress: string;
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
 * parseCIDR('192.168.0.1/33')    // false
 * parseCIDR('192.168.0.1/24')
 * // {
 * //   ipCount: 256,
 * //   usableCount: 254,
 * //   cidrMask: 24,
 * //   subnetMask: '255.255.255.0',
 * //   firstHost: '192.168.0.1',
 * //   lastHost: '192.168.0.254',
 * //   networkAddress: '192.168.0.0',
 * //   broadcastAddress: '192.168.0.255'
 * // }
 * ```
 */
export declare function parseCIDR(cidr: string): SubNet | false;
export {};
