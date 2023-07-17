import { IPv4 } from '../../index';

it('toInverseMask 获取一个子网掩码的反掩码', () => {
  expect(IPv4.toInverseMask(32)).toBe('0.0.0.0');
  expect(IPv4.toInverseMask(24)).toBe('0.0.0.255');
  expect(IPv4.toInverseMask(16)).toBe('0.0.255.255');
  expect(IPv4.toInverseMask(8)).toBe('0.255.255.255');
  expect(IPv4.toInverseMask(0)).toBe('255.255.255.255');
  expect(IPv4.toInverseMask(1)).toBe('127.255.255.255');
  expect(IPv4.toInverseMask(2)).toBe('63.255.255.255');
  expect(IPv4.toInverseMask('255.255.255.255')).toBe('0.0.0.0');
  expect(IPv4.toInverseMask('255.255.255.0')).toBe('0.0.0.255');
  expect(IPv4.toInverseMask('255.255.0.0')).toBe('0.0.255.255');
  expect(IPv4.toInverseMask('255.0.0.0')).toBe('0.255.255.255');
  expect(IPv4.toInverseMask('0.0.0.0')).toBe('255.255.255.255');
  expect(IPv4.toInverseMask('192.168.1.0/33')).toBe(false);
  expect(IPv4.toInverseMask('192.168.1.0/24')).toBe(false);
});