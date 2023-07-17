import { IPv4 } from '../../index';

it('isValidIP 判断一个IP地址是否合法的测试', () => {
  expect(IPv4.isValidIP('172.16.0.1')).toBe(true);
  expect(IPv4.isValidIP('192.16.0.1')).toBe(true);
  expect(IPv4.isValidIP('192.16.-0.1')).toBe(false);
  expect(IPv4.isValidIP('192.16.aa.1')).toBe(false);
  expect(IPv4.isValidIP('10.0.0.01')).toBe(true);
  expect(IPv4.isValidIP('172.016.0.1')).toBe(true);
  expect(IPv4.isValidIP('055.255.255.255')).toBe(true);
  expect(IPv4.isValidIP('10.0.0.01', { strict: true })).toBe(false);
  expect(IPv4.isValidIP('172.016.0.1', { strict: true })).toBe(false);
  expect(IPv4.isValidIP('055.255.255.255', { strict: true })).toBe(false);
});