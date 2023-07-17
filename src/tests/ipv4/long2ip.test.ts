import { IPv4 } from '../../index';

it('long2ip 将数字 转换为 IP地址 的测试', () => {
  expect(IPv4.long2ip(-1)).toBe(false);
  expect(IPv4.long2ip(4294967296)).toBe(false);
  expect(IPv4.long2ip(16909060)).toBe('1.2.3.4');
  expect(IPv4.long2ip(167772161)).toBe('10.0.0.1');
  expect(IPv4.long2ip(2130706433)).toBe('127.0.0.1');
  expect(IPv4.long2ip(2886729729)).toBe('172.16.0.1');
  expect(IPv4.long2ip(3232235521)).toBe('192.168.0.1');
  expect(IPv4.long2ip(4294967295)).toBe('255.255.255.255');
});