interface isValidIPOptions {
    strict?: boolean;
}
/**
 * 将 IPv4 的字符串地址转换成长整型数字
 *
 * @param ip - 一个标准格式的 IPv4 地址
 * @returns 返回 IPv4 地址转换后的数字，如果 IP 无效，则为false。
 *
 * @example
 * ```
 * ip2long('192.168.0.1')   // 3232235521
 * ip2long('192.168.0.257') // false
 * ```
 */
export declare function ip2long(ip: string): number | boolean;
/**
 * 将长整型数字转化为 IPv4 的字符串地址
 *
 * @param ip - 一个长整型的 IPv4 地址
 * @returns 返回字符串的 IPv4 地址， 或者在失败时返回 false。
 *
 * @example
 * ```
 * long2ip(3232235521) // 192.168.0.1
 * long2ip(-1) // false
 * ```
 */
export declare function long2ip(ip: number): string | false;
/**
 * 检查指定的字符串是否为有效的 IPv4 地址
 *
 * @param value - 要校验的地址字符串
 * @param options - 支持开启严格校验模式, 禁止多位数中以 0 开头，默认为不开启。
 * @returns 校验通过返回 true, 否则返回 false
 *
 * @example
 * ```
 * isValidIP('192.168.1.99'); // true
 * isValidIP('192.168.01.99', {strict: true}); // false
 * ```
 */
export declare function isValidIP(value: string, options?: isValidIPOptions): boolean;
/**
 * 判断两个 IPv4 网络地址是属于同一个子网
 *
 * @param ip1 - 第一个要比较的 IPv4 网络地址
 * @param ip2 - 第二个要比较的 IPv4 网络地址
 * @param mask - 子网掩码
 * @returns 在同一子网返回 true, 否则返回 false
 *
 * @example
 * ```
 * isSameSubnet('192.168.1.10', '192.168.1.100', '255.255.255.0'); // true
 * isSameSubnet('192.168.1.10', '192.168.2.100', '255.255.255.0'); // true
 * ```
 */
export declare function isSameSubnet(ip1: string, ip2: string, mask: string): boolean;
/**
 * 根据子网掩码长度计算子网掩码地址
 *
 * @param length - 子网掩码长度, 取值范围 0 到 32
 * @returns 返回子网掩码地址, 如果长度无效，则为false
 *
 * @example
 * ```
 * toSubnetMask(0)  // 0.0.0.0
 * toSubnetMask(8)  // 255.0.0.0
 * toSubnetMask(16) // 255.255.0.0
 * toSubnetMask(24) // 255.255.255.0
 * ```
 */
export declare function toSubnetMask(length: number): string | false;
/**
 * IPv4 地址范围类, 用于表示一个起始和结束IP地址定义的范围
 *
 * @param start - 起始 IPv4 地址, 有效值为 0 到 4294967295
 * @param end - 结束 IPv4 地址, 有效值为 0 到 4294967295
 */
export declare class ipRange {
    #private;
    constructor(start: number, end: number);
    /**
     * 通过起止 IPv4 长整数创建 ipRange 实例
     *
     * @param start - 起始IP的整数形式
     * @param end - 结束IP的整数形式
     * @returns 创建的ipRange实例
     * @throws 如果起止 IPv4 地址不合法, 会抛出错误
     *
     * @example
     * ```
     * const range = ipRange.fromLong(3232235777, 3232235876);
     * ```
     */
    static fromLong(start: number, end: number): ipRange;
    /**
     * 通过起止 IPv4 字符串创建 ipRange 实例
     *
     * @param startIp - 一个长整型的 IPv4 开始地址
     * @param endIp - 一个长整型的 IPv4 结束地址
     * @returns ipRange 实例
     * @throws 如果起止 IPv4 地址不合法, 会抛出错误
     *
     * @example
     * ```
     * const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
     * ```
     */
    static fromString(start: string, end: string): ipRange;
    /**
     * 获取当前范围的起始和结束IP(整数形式)
     *
     * @returns 起始IP和结束IP的整数数组
     *
     * @example
     * ```
     * const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
     * range.ip2long(); // [3232235777, 3232235876]
     * ```
     */
    ip2long(): number[];
    /**
     * 获取当前范围的起始和结束IP(字符串形式)
     *
     * @returns 起始IP和结束IP的字符串数组
     *
     * @example
     * ```
     * const range = ipRange.fromLong(3232235777, 3232235876);
     * range.long2ip(); // ['192.168.1.1', '192.168.1.100']
     * ```
     */
    long2ip(): string[];
    /**
     * 获取当前范围的 IPv4 地址数量
     *
     * @returns IPv4 地址数量
     *
     * @example
     * ```
     * const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
     * range.getSize(); // 100
     * ```
     */
    getSize(): number;
    /**
     * 判断一个 IPv4 地址是否在当前范围内
     *
     * @param ip - 一个标准格式的 IPv4 地址
     * @returns 如果在返回true, 否则false
     *
     * @example
     * ```
     * const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
     * range.hasIp('192.168.1.99'); // true
     * range.hasIp('192.168.0.11'); // false
     * ```
     */
    hasIp(ip: string): boolean;
}
export {};
