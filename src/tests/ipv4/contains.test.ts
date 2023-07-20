import { IPv4 } from '../../index';

it('contains 判断一个IP是否在某个CIDR范围内的测试', () => {
  expect(IPv4.contains('192.168.1.0/0', '192.168.2.1')).toBe(true);
  expect(IPv4.contains('192.168.1.0/32', '192.168.1.1')).toBe(false);
  expect(IPv4.contains('192.168.1.0/33', '192.168.1.1')).toBe(false);
  expect(IPv4.contains('192.168.1.0/24', '192.168.1.-1')).toBe(false);
  expect(IPv4.contains('192.168.1.100/28', '192.168.1.100')).toBe(true);
  expect(IPv4.contains('192.168.1.100/28', '192.168.1.200')).toBe(false);
});