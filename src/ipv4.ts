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

export function ip2long(ip: string): number | boolean {
  if (!isValidIP(ip)) return false;

  let long = 0
  const parts = ip.split('.');
  for (const part of parts) long = (long << 8) + +part
  return long >>> 0
}

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

export function long2ip(ip: number): string | false {
  if (ip >= 0 && ip <= 4294967295) {
    const parts: number[] = [];
    for (let i = 3; i >= 0; i--) parts.push((ip >>> (i * 8)) & 255);
    return parts.join('.');
  } else {
    return false;
  }
}

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

export function isValidIP(
  value: string,
  options: isValidIPOptions = { strict: false }
): boolean {
  if (options.strict) {
    const IPV4_REGEX = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;
    return IPV4_REGEX.test(value);
  } else {
    const IPV4_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return IPV4_REGEX.test(value);
  }
}

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

export function isSameSubnet(ip1: string, ip2: string, mask: string) {
  const ip1Long = ip2long(ip1);
  if (typeof ip1Long !== 'number') return false;

  const ip2Long = ip2long(ip2);
  if (typeof ip2Long !== 'number') return false;

  const maskLong = ip2long(mask);
  if (typeof maskLong !== 'number') return false;
  
  return (ip1Long & maskLong) === (ip2Long & maskLong);
}

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

export function toSubnetMask(length: number): string | false {
  if (length < 0 || length > 32) return false;

  const mask = 0xffffffff << 32 - length;
  return length ? long2ip(mask >>> 0) : '0.0.0.0';
}

/**
 * IPv4 地址范围类, 用于表示一个起始和结束IP地址定义的范围
 * 
 * @param start - 起始 IPv4 地址, 有效值为 0 到 4294967295
 * @param end - 结束 IPv4 地址, 有效值为 0 到 4294967295
 */

export class ipRange {

  #start: number;
  #end: number;

  constructor(start: number, end: number) {
    if (+start < 0 || +start > 4294967295 || +end < 0 || +end > 4294967295) {
      throw new Error('Invalid start or end IPv4 address');
    }

    this.#start = start;
    this.#end = end;
  }

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

  static fromLong(start: number, end: number): ipRange {
    if (typeof start !== 'number' || typeof end !== 'number') throw new Error('Invalid start or end IPv4 address');
    if (+end < +start) throw new Error('Invalid range value, end must be greater than or equal to start');
    return new ipRange(start, end);
  }

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

  static fromString(start: string, end: string): ipRange {
    const sLong = ip2long(start);
    const eLong = ip2long(end);
    if (typeof sLong !== 'number' || typeof eLong !== 'number') throw new Error('Invalid start or end IPv4 address');
    if (eLong < sLong) throw new Error('Invalid range value, end must be greater than or equal to start');
    return new ipRange(sLong, eLong);
  }

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

  ip2long(): number[] {
    return [this.#start, this.#end];
  }

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

  long2ip(): string[] {
    return [
      long2ip(this.#start) as string,
      long2ip(this.#end) as string
    ];
  }

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

  getSize(): number {
    return this.#end - this.#start + 1;
  }

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

  hasIp(ip: string): boolean {
    const long = ip2long(ip);
    if (typeof long !== 'number') return false;
    return long >= this.#start && long <= this.#end;
  }
}

