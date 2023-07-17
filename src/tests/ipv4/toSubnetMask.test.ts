import { IPv4 } from '../../index';

it('toSubnetMask 将子网掩码长度转换为子网掩码的测试', () => {
  expect(IPv4.toSubnetMask(33)).toBe(false);
  expect(IPv4.toSubnetMask(0)).toBe('0.0.0.0');
  expect(IPv4.toSubnetMask(1)).toBe('128.0.0.0');
  expect(IPv4.toSubnetMask(8)).toBe('255.0.0.0');
  expect(IPv4.toSubnetMask(16)).toBe('255.255.0.0');
  expect(IPv4.toSubnetMask(24)).toBe('255.255.255.0');
  expect(IPv4.toSubnetMask(32)).toBe('255.255.255.255');
});