/**
 * Verify if an IP address is private
 * @param ip - The IP address string
 * @returns True if private IP, false otherwise
 *
 * @example
 *
 * ```
 * isPrivate('192.168.0.1') // returns true
 * isPrivate('114.114.114.114') // returns false
 * ```
 */
export declare function isPrivate(ip: string): boolean;
