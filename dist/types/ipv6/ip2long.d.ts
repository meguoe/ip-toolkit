/**
 * Convert IPv6 address string to number
 *
 * @param ip - The IPv6 address string
 * @returns The converted IPv6 number or false if invalid
 *
 * @example
 * ```
 * ip2long('f16c:f7ec:cfa2:e1c5:9a3c:cb08:801f:36b8')   // 320909743562165251276054390739658815160n
 * ```
 */
export declare function ip2long(ip: string): bigint | false;
