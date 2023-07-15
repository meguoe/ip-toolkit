import { IPv4 } from '../index';
const { ip2long, long2ip, ipRange, isValidIP, isSameSubnet, toSubnetMask } = IPv4

describe('IPv4方法策略', () => {
  it('ip2long 函数测试', () => {
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
  it('long2ip 函数测试', () => {
    expect(long2ip(-1)).toBe(false);
    expect(long2ip(4294967296)).toBe(false);
    expect(long2ip(16909060)).toBe('1.2.3.4');
    expect(long2ip(167772161)).toBe('10.0.0.1');
    expect(long2ip(2130706433)).toBe('127.0.0.1');
    expect(long2ip(2886729729)).toBe('172.16.0.1');
    expect(long2ip(3232235521)).toBe('192.168.0.1');
    expect(long2ip(4294967295)).toBe('255.255.255.255');
  });

  it('isValidIP 函数测试', () => {
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

  it('isSameSubnet 函数测试', () => {
    expect(isSameSubnet("192.168.1.1", "192.168.0.100", "255.255.0.0")).toBe(true);
    expect(isSameSubnet("192.168.0.1", "192.168.0.100", "255.255.255.0")).toBe(true);
    expect(isSameSubnet("192.168.1.1", "192.168.0.100", "255.255.255.0")).toBe(false);
    expect(isSameSubnet("192.168.0.1", "192.168.1.100", "255.255.255.0")).toBe(false);
    expect(isSameSubnet("192.168.0.1", "192.168.0.100", "255.255.255.255")).toBe(false);
  });

  it('toSubnetMask 函数测试', () => {
    expect(toSubnetMask(33)).toBe(false);
    expect(toSubnetMask(0)).toBe('0.0.0.0');
    expect(toSubnetMask(1)).toBe('128.0.0.0');
    expect(toSubnetMask(8)).toBe('255.0.0.0');
    expect(toSubnetMask(16)).toBe('255.255.0.0');
    expect(toSubnetMask(24)).toBe('255.255.255.0');
    expect(toSubnetMask(32)).toBe('255.255.255.255');
  });

  describe('ipRange 类测试', () => {
    it('fromLong 函数测试', () => {
      const range = ipRange.fromLong(2886729729, 2886729828);
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

    it('fromString 函数测试', () => {
      const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
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

    it('ip2long 函数测试', () => {
      const range = ipRange.fromString('192.168.1.1', '192.168.1.100');
      expect(range.ip2long()).toStrictEqual([3232235777, 3232235876]);
    });

    it('long2ip 函数测试', () => {
      const range = ipRange.fromLong(2886729729, 2886729828);
      expect(range.long2ip()).toStrictEqual(['172.16.0.1', '172.16.0.100']);
    });

    it('getSize 函数测试', () => {
      const range = ipRange.fromLong(2886729729, 2886729828);
      expect(range.getSize()).toBe(100);
    });

    it('hasIp 函数测试', () => {
      const range = ipRange.fromLong(2886729729, 2886729828);
      expect(range.hasIp('172.16.0.0')).toBe(false);
      expect(range.hasIp('172.16.0.1')).toBe(true);
      expect(range.hasIp('172.16.0.50')).toBe(true);
      expect(range.hasIp('172.16.0.100')).toBe(true);
      expect(range.hasIp('172.16.0.101')).toBe(false);
    });
  });
});


