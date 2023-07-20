/**
 * Expands an abbreviated IPv6 address string into its full representation.
 *
 * @param ip - The IPv6 address string
 * @returns The expanded IPv6 address string or false if invalid
 *
 * @example
 * ```
 * expandedForm('2001:db8::1') // '2001:0db8:0000:0000:0000:0000:0000:0001'
 * ```
 */
export declare function expandedForm(ip: string): string | false;
