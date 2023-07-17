import { IPv4 } from '../../index';

it('toMaskLength 将子网掩码转换为子网掩码长度的测试', () => {
  expect(IPv4.toMaskLength('0.0.0.0')).toBe(0);
  expect(IPv4.toMaskLength('128.0.0.0')).toBe(1);
  expect(IPv4.toMaskLength('255.0.0.0')).toBe(8);
  expect(IPv4.toMaskLength('255.255.0.0')).toBe(16);
  expect(IPv4.toMaskLength('255.255.255.0')).toBe(24);
  expect(IPv4.toMaskLength('255.255.255.255')).toBe(32);
  expect(IPv4.toMaskLength('255.255.255.256')).toBe(false);
});