/**
 * Verify if the IP address is within the CIDR range
 *
 * @param cidr - A standard format CIDR address
 * @param ip - The IPv4 address to check
 * @returns True if within range, otherwise false
 *
 * @example
 *
 * contains('192.168.1.0/24', '192.168.1.5')    // true
 * contains('192.168.1.0/24', '192.168.2.5')    // false
 */
export declare function contains(cidr: string, ip: string): boolean;
