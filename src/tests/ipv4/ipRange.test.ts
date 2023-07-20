import { IPv4 } from '../../index';

describe('ipRange 类测试', () => {
  it('ipRange.fromLong 通过起始和结束IP数字创建ipRange对象的测试', () => {
    try {
      IPv4.ipRange.fromLong('2112' as any, 42949672);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
    try {
      IPv4.ipRange.fromLong(-1, 42949672);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
    try {
      IPv4.ipRange.fromLong(1, 4294967296);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
    try {
      IPv4.ipRange.fromLong(42949672, 100);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid range value, end must be greater than or equal to start'));
    }
    try {
      IPv4.ipRange.fromLong(4294967296, 100);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid range value, end must be greater than or equal to start'));
    }
  });

  it('ipRange.fromString 通过起始和结束IP地址创建ipRange对象的测试', () => {
    try {
      IPv4.ipRange.fromString('192.168.1.-1', '192.168.1.100');
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
    try {
      IPv4.ipRange.fromString('192.168.1.1', '192.168.1.256');
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
    try {
      IPv4.ipRange.fromString('192.168.1.256', '192.168.1.100');
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
    try {
      IPv4.ipRange.fromString('192.168.1.254', '192.168.1.100');
    } catch (error) {
      expect(error).toEqual(new Error('Invalid range value, end must be greater than or equal to start'));
    }
  });

  it('ipRange.ip2long 获取ipRange的起始和结束长整数的测试', () => {
    const range = IPv4.ipRange.fromString('192.168.1.1', '192.168.1.100');
    expect(range.ip2long()).toStrictEqual([3232235777, 3232235876]);
  });

  it('ipRange.long2ip 获取ipRange的起始和结束IP地址的测试', () => {
    const range = IPv4.ipRange.fromLong(2886729729, 2886729828);
    expect(range.long2ip()).toStrictEqual(['172.16.0.1', '172.16.0.100']);
  });

  it('ipRange.ipCount 计算ipRange的IP地址数测试', () => {
    const range = IPv4.ipRange.fromLong(2886729729, 2886729828);
    expect(range.ipCount()).toBe(100);
  });

  it('ipRange.contains 判断一个IP是否在ipRange内的测试', () => {
    const range = IPv4.ipRange.fromLong(2886729729, 2886729828);
    expect(range.contains('172.16.0.0')).toBe(false);
    expect(range.contains('172.16.0.1')).toBe(true);
    expect(range.contains('172.16.0.50')).toBe(true);
    expect(range.contains('172.16.0.100')).toBe(true);
    expect(range.contains('172.16.0.101')).toBe(false);
    expect(range.contains('172.16.0.1x')).toBe(false);
  });
});
