/**
 * Validate if the IPv4 address is valid
 *
 * @param ip - The IPv4 address string
 * @param options - Enable strict mode to disallow leading 0s, false by default
 * @returns True if valid, false otherwise
 *
 * @example
 * ```
 * isValidIP('192.168.1.99') // true
 * isValidIP('192.168.01.99', {strict: true}) // false 
 * ```
 */

export function isValidIP(ip: string, options: { strict?: boolean } = { strict: false }): boolean {
  if (options.strict) {
    const IPV4_REGEX = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])(\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)){3}$/;
    return IPV4_REGEX.test(ip);
  } else {
    const IPV4_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
    return IPV4_REGEX.test(ip);
  }
}