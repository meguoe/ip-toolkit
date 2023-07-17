/**
 * Verify if two IPv4 network addresses are on the same subnet
 *
 * @param ip1 - The first IPv4 network address to compare
 * @param ip2 - The second IPv4 network address to compare
 * @param mask - The subnet mask
 * @returns true if in the same subnet, otherwise false
 *
 * @example
 * ```
 * isSameSubnet('192.168.1.10', '192.168.1.100', 24) // true
 * isSameSubnet('192.168.1.10', '192.168.1.100', 32) // false
 * isSameSubnet('192.168.1.10', '192.168.1.100', '255.255.255.0') // true
 * isSameSubnet('192.168.1.10', '192.168.2.100', '255.255.255.0') // false
 * ```
 */
export declare function isSameSubnet(ip1: string, ip2: string, mask: string | number): boolean;
