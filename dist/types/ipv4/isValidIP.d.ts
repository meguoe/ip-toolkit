/**
 * Validate if the IP address is valid
 *
 * @param ip - The IP address string
 * @param options - Enable strict mode to disallow leading 0s, false by default
 * @returns True if valid, false otherwise
 *
 * @example
 * ```
 * isValidIP('192.168.1.99') // true
 * isValidIP('192.168.01.99', {strict: true}) // false
 * ```
 */
export declare function isValidIP(ip: string, options?: {
    strict?: boolean;
}): boolean;
