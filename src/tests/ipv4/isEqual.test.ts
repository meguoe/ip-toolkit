import { IPv4 } from '../../index';

it('isEqual 判断两个IP地址是否相同的测试', () => {
  expect(IPv4.isEqual(2886729729, '172.16.0.1')).toBe(true);
  expect(IPv4.isEqual('172.16.0.1', 2886729729)).toBe(true);
  expect(IPv4.isEqual('172.16.0.1', '172.16.0.1')).toBe(true);
  expect(IPv4.isEqual('172.16.0.1', '172.016.0.1')).toBe(true);
  expect(IPv4.isEqual(4294967296, 4294967296)).toBe(false);
  expect(IPv4.isEqual(2886729729, '172.16.0.2')).toBe(false);
  expect(IPv4.isEqual('172.16.0.1', 2886729728)).toBe(false);
  expect(IPv4.isEqual('255.255.255.256', '255.255.255.256')).toBe(false);
});