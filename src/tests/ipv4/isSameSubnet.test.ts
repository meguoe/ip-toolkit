import { IPv4 } from '../../index';

it('isSameSubnet 判断两个IP地址是否在同一个子网的测试', () => {
  expect(IPv4.isSameSubnet('192.168.1.1', '192.168.0.100', 16)).toBe(true);
  expect(IPv4.isSameSubnet('192.168.1.1', '192.168.1.100', 24)).toBe(true);
  expect(IPv4.isSameSubnet('192.168.1.1', '192.168.1.100', 33)).toBe(false);
  expect(IPv4.isSameSubnet('192.168.1.x', '192.168.0.100', 32)).toBe(false);
  expect(IPv4.isSameSubnet('192.168.1.1', '192.168.0.xxx', 32)).toBe(false);
  expect(IPv4.isSameSubnet('192.168.1.1', '192.168.0.100', '255.255.0.0')).toBe(true);
  expect(IPv4.isSameSubnet('192.168.0.1', '192.168.0.100', '255.255.255.0')).toBe(true);
  expect(IPv4.isSameSubnet('192.168.1.1', '192.168.0.100', '255.255.255.0')).toBe(false);
  expect(IPv4.isSameSubnet('192.168.0.1', '192.168.1.100', '255.255.255.0')).toBe(false);
  expect(IPv4.isSameSubnet('192.168.0.1', '192.168.0.100', '255.255.255.255')).toBe(false);
});