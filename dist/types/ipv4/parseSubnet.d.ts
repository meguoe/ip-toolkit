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
 * Parse IP address and subnet mask into CIDR info
 *
 * @param ip - The IP address string
 * @param mask - The subnet mask string
 * @returns The parsed CIDR info object or false if invalid
 *
 * @example
 * ```
 * parseSubnet('192.168.0.1', '1.255.255.0')    // false
 * parseSubnet('192.168.0.1', '255.255.255.0')
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
export declare function parseSubnet(ip: string, mask: string): SubNet | false;
export {};
