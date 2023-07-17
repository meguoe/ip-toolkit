import { IPv4 } from '../index';
const {
  ip2long,
  long2ip,
  ipRange,
  contains,
  parseCIDR,
  parseSubnet,
  isValidIP,
  isValidMask,
  isSameSubnet,
  toSubnetMask,
  toMaskLength
} = IPv4

describe('IPv4工具库测试', () => {
  it('ip2long 将 IP地址 转换为数字 的测试', () => {
    expect(ip2long('s.0.0.0')).toBe(false);
    expect(ip2long('s.0.0.258')).toBe(false);
    expect(ip2long('10.0.0.1')).toBe(167772161);
    expect(ip2long('127.0.0.1')).toBe(2130706433);
    expect(ip2long('172.16.0.1')).toBe(2886729729);
    expect(ip2long('172.016.0.01')).toBe(2886729729);
    expect(ip2long('192.168.0.1')).toBe(3232235521);
    expect(ip2long('192.168.00.01')).toBe(3232235521);
    expect(ip2long('001.002.003.004')).toBe(16909060);
    expect(ip2long('255.255.255.255')).toBe(4294967295);
  });

  it('long2ip 将数字 转换为 IP地址 的测试', () => {
    expect(long2ip(-1)).toBe(false);
    expect(long2ip(4294967296)).toBe(false);
    expect(long2ip(16909060)).toBe('1.2.3.4');
    expect(long2ip(167772161)).toBe('10.0.0.1');
    expect(long2ip(2130706433)).toBe('127.0.0.1');
    expect(long2ip(2886729729)).toBe('172.16.0.1');
    expect(long2ip(3232235521)).toBe('192.168.0.1');
    expect(long2ip(4294967295)).toBe('255.255.255.255');
  });

  it('isValidIP 判断一个IP地址是否合法的测试', () => {
    expect(isValidIP('172.16.0.1')).toBe(true);
    expect(isValidIP('192.16.0.1')).toBe(true);
    expect(isValidIP('192.16.-0.1')).toBe(false);
    expect(isValidIP('192.16.aa.1')).toBe(false);
    expect(isValidIP('10.0.0.01')).toBe(true);
    expect(isValidIP('172.016.0.1')).toBe(true);
    expect(isValidIP('055.255.255.255')).toBe(true);
    expect(isValidIP('10.0.0.01', { strict: true })).toBe(false);
    expect(isValidIP('172.016.0.1', { strict: true })).toBe(false);
    expect(isValidIP('055.255.255.255', { strict: true })).toBe(false);
  });

  it('isValidMask 判断一个子网掩码是否合法的测试', () => {
    expect(isValidMask('0.0.0.0')).toBe(true);
    expect(isValidMask('128.0.0.0')).toBe(true);
    expect(isValidMask('192.0.0.0')).toBe(true);
    expect(isValidMask('255.0.0.0')).toBe(true);
    expect(isValidMask('255.255.0.0')).toBe(true);
    expect(isValidMask('255.255.255.255')).toBe(true);
    expect(isValidMask('128.0.0.1')).toBe(false);
    expect(isValidMask('192.0.1.0')).toBe(false);
    expect(isValidMask('255.1.0.0')).toBe(false);
    expect(isValidMask('111.255.255.256')).toBe(false);
    expect(isValidMask('255.255.255.256')).toBe(false);
    expect(isValidMask('255.255.255.123')).toBe(false);
  });

  it('isSameSubnet 判断两个IP地址是否在同一个子网的测试', () => {
    expect(isSameSubnet('192.168.1.1', '192.168.0.100', 16)).toBe(true);
    expect(isSameSubnet('192.168.1.1', '192.168.1.100', 24)).toBe(true);
    expect(isSameSubnet('192.168.1.1', '192.168.1.100', 33)).toBe(false);
    expect(isSameSubnet('192.168.1.1', '192.168.0.100', '255.255.0.0')).toBe(true);
    expect(isSameSubnet('192.168.0.1', '192.168.0.100', '255.255.255.0')).toBe(true);
    expect(isSameSubnet('192.168.1.1', '192.168.0.100', '255.255.255.0')).toBe(false);
    expect(isSameSubnet('192.168.0.1', '192.168.1.100', '255.255.255.0')).toBe(false);
    expect(isSameSubnet('192.168.0.1', '192.168.0.100', '255.255.255.255')).toBe(false);
  });

  it('toSubnetMask 将子网掩码长度转换为子网掩码的测试', () => {
    expect(toSubnetMask(33)).toBe(false);
    expect(toSubnetMask(0)).toBe('0.0.0.0');
    expect(toSubnetMask(1)).toBe('128.0.0.0');
    expect(toSubnetMask(8)).toBe('255.0.0.0');
    expect(toSubnetMask(16)).toBe('255.255.0.0');
    expect(toSubnetMask(24)).toBe('255.255.255.0');
    expect(toSubnetMask(32)).toBe('255.255.255.255');
  });

  it('toMaskLength 将子网掩码转换为子网掩码长度的测试', () => {
    expect(toMaskLength('0.0.0.0')).toBe(0);
    expect(toMaskLength('128.0.0.0')).toBe(1);
    expect(toMaskLength('255.0.0.0')).toBe(8);
    expect(toMaskLength('255.255.0.0')).toBe(16);
    expect(toMaskLength('255.255.255.0')).toBe(24);
    expect(toMaskLength('255.255.255.255')).toBe(32);
    expect(toMaskLength('255.255.255.256')).toBe(false);
  });

  it('parseCIDR 解析CIDR格式的测试', () => {
    expect(parseCIDR('192.168.1.0/0')).toMatchObject(
      {
        cidrMask: 0,
        ipCount: 4294967296,
        usableCount: 4294967294,
        subnetMask: '0.0.0.0',
        firstHost: '0.0.0.1',
        lastHost: '255.255.255.254',
        networkAddress: '0.0.0.0',
        broadcastAddress: '255.255.255.255',
      }
    );
    expect(parseCIDR('192.168.1.0/1')).toMatchObject(
      {
        cidrMask: 1,
        ipCount: 2147483648,
        usableCount: 2147483646,
        subnetMask: '128.0.0.0',
        firstHost: '128.0.0.1',
        lastHost: '255.255.255.254',
        networkAddress: '128.0.0.0',
        broadcastAddress: '255.255.255.255',
      }
    );
    expect(parseCIDR('192.168.1.0/31')).toMatchObject(
      {
        cidrMask: 31,
        ipCount: 2,
        usableCount: 2,
        subnetMask: '255.255.255.254',
        networkAddress: '',
        broadcastAddress: '',
      }
    );
    expect(parseCIDR('192.168.1.0/32')).toMatchObject(
      {
        cidrMask: 32,
        ipCount: 1,
        usableCount: 1,
        subnetMask: '255.255.255.255',
        networkAddress: '',
        broadcastAddress: '',
      }
    );
    expect(parseCIDR('192.168.1/33')).toBe(false);
    expect(parseCIDR('259.168.1.1/33')).toBe(false);
    expect(parseCIDR('192.168.1.0/-1')).toBe(false);
    expect(parseCIDR('192.168.1.0/33')).toBe(false);
    expect(parseCIDR('192.168.1.s/33')).toBe(false);
  });

  it('parseSubnet 解析子网信息的测试', () => {
    expect(parseSubnet('192.168.1.0', '0.0.0.0')).toMatchObject(
      {
        cidrMask: 0,
        ipCount: 4294967296,
        usableCount: 4294967294,
        subnetMask: '0.0.0.0',
        firstHost: '0.0.0.1',
        lastHost: '255.255.255.254',
        networkAddress: '0.0.0.0',
        broadcastAddress: '255.255.255.255',
      }
    );
    expect(parseSubnet('192.168.1.0', '128.0.0.0')).toMatchObject(
      {
        cidrMask: 1,
        ipCount: 2147483648,
        usableCount: 2147483646,
        subnetMask: '128.0.0.0',
        firstHost: '128.0.0.1',
        lastHost: '255.255.255.254',
        networkAddress: '128.0.0.0',
        broadcastAddress: '255.255.255.255',
      }
    );
    expect(parseSubnet('192.168.1.0', '255.255.255.254')).toMatchObject(
      {
        cidrMask: 31,
        ipCount: 2,
        usableCount: 2,
        subnetMask: '255.255.255.254',
        networkAddress: '',
        broadcastAddress: '',
      }
    );
    expect(parseSubnet('192.168.1.0', '255.255.255.255')).toMatchObject(
      {
        cidrMask: 32,
        ipCount: 1,
        usableCount: 1,
        subnetMask: '255.255.255.255',
        networkAddress: '',
        broadcastAddress: '',
      }
    );
    expect(parseSubnet('192.168.1.1', '1.255.255.255')).toBe(false);
    expect(parseSubnet('192.168.1.256', '1.255.255.255')).toBe(false);
    expect(parseSubnet('192.168.1.256', '2ss.255.255.255')).toBe(false);
  });

  it('contains 判断一个IP是否在某个CIDR范围内的测试', () => {
    expect(contains('192.168.1.0/0', '192.168.2.1')).toBe(true);
    expect(contains('192.168.1.0/33', '192.168.1.1')).toBe(false);
    expect(contains('192.168.1.0/24', '192.168.1.-1')).toBe(false);
    expect(contains('192.168.1.100/28', '192.168.1.100')).toBe(true);
    expect(contains('192.168.1.100/28', '192.168.1.200')).toBe(false);
  });

  it('ipRange.fromLong 通过起始和结束IP数字创建ipRange对象的测试', () => {
    expect(() => ipRange.fromLong(2886729729, 2886729828)).not.toThrow();
    try {
      ipRange.fromLong(-1, 42949672)
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
    try {
      ipRange.fromLong(1, 4294967296)
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
    try {
      ipRange.fromLong(4294967296, 100)
    } catch (error) {
      expect(error).toEqual(new Error('Invalid range value, end must be greater than or equal to start'));
    }
  });

  it('ipRange.fromString 通过起始和结束IP地址创建ipRange对象的测试', () => {
    expect(() => ipRange.fromString('192.168.1.1', '192.168.1.100')).not.toThrow();
    try {
      ipRange.fromString('192.168.1.-1', '192.168.1.100');
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
    try {
      ipRange.fromString('192.168.1.1', '192.168.1.256');
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
    try {
      ipRange.fromString('192.168.1.256', '192.168.1.100');
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
  });

  it('ipRange.ip2long 获取ipRange的起始和结束长整数的测试', () => {
    const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
    expect(range.ip2long()).toStrictEqual([3232235777, 3232235876]);
  });

  it('ipRange.long2ip 获取ipRange的起始和结束IP地址的测试', () => {
    const range = ipRange.fromLong(2886729729, 2886729828);
    expect(range.long2ip()).toStrictEqual(['172.16.0.1', '172.16.0.100']);
  });

  it('ipRange.ipCount 计算ipRange的IP地址数测试', () => {
    const range = ipRange.fromLong(2886729729, 2886729828);
    expect(range.ipCount()).toBe(100);
  });

  it('ipRange.contains 判断一个IP是否在ipRange内的测试', () => {
    const range = ipRange.fromLong(2886729729, 2886729828);
    expect(range.contains('172.16.0.0')).toBe(false);
    expect(range.contains('172.16.0.1')).toBe(true);
    expect(range.contains('172.16.0.50')).toBe(true);
    expect(range.contains('172.16.0.100')).toBe(true);
    expect(range.contains('172.16.0.101')).toBe(false);
  });
});
