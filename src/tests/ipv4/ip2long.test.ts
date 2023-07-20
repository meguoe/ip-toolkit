import { IPv4 } from '../../index';

it('ip2long 将IP地址 转换为数字 的测试', () => {
  expect(IPv4.ip2long('s.0.0.0')).toBe(false);
  expect(IPv4.ip2long('s.0.0.258')).toBe(false);
  expect(IPv4.ip2long('10.0.0.1')).toBe(167772161);
  expect(IPv4.ip2long('127.0.0.1')).toBe(2130706433);
  expect(IPv4.ip2long('172.16.0.1')).toBe(2886729729);
  expect(IPv4.ip2long('172.016.0.01')).toBe(2886729729);
  expect(IPv4.ip2long('192.168.0.1')).toBe(3232235521);
  expect(IPv4.ip2long('192.168.00.01')).toBe(3232235521);
  expect(IPv4.ip2long('001.002.003.004')).toBe(16909060);
  expect(IPv4.ip2long('255.255.255.255')).toBe(4294967295);
});