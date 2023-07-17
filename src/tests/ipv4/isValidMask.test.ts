import { IPv4 } from '../../index';

it('isValidMask 判断一个子网掩码是否合法的测试', () => {
  expect(IPv4.isValidMask('0.0.0.0')).toBe(true);
  expect(IPv4.isValidMask('128.0.0.0')).toBe(true);
  expect(IPv4.isValidMask('192.0.0.0')).toBe(true);
  expect(IPv4.isValidMask('255.0.0.0')).toBe(true);
  expect(IPv4.isValidMask('255.255.0.0')).toBe(true);
  expect(IPv4.isValidMask('255.255.255.255')).toBe(true);
  expect(IPv4.isValidMask('128.0.0.1')).toBe(false);
  expect(IPv4.isValidMask('192.0.1.0')).toBe(false);
  expect(IPv4.isValidMask('255.1.0.0')).toBe(false);
  expect(IPv4.isValidMask('111.255.255.256')).toBe(false);
  expect(IPv4.isValidMask('255.255.255.256')).toBe(false);
  expect(IPv4.isValidMask('255.255.255.123')).toBe(false);
});
