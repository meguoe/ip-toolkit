import { IPv6 } from '../../index';

it('isValidIP 判断一个IPv6地址是否合法的测试', () => {
  expect(IPv6.isValidIP('::')).toBe(true);
  expect(IPv6.isValidIP('1::')).toBe(true);
  expect(IPv6.isValidIP('0::')).toBe(true);
  expect(IPv6.isValidIP('::1')).toBe(true);
  expect(IPv6.isValidIP('::0')).toBe(true);
  expect(IPv6.isValidIP('1::1')).toBe(true);
  expect(IPv6.isValidIP('1::1')).toBe(true);
  expect(IPv6.isValidIP('1:::1')).toBe(false);
  expect(IPv6.isValidIP('1::0:1')).toBe(true);
  expect(IPv6.isValidIP('::192.168.1.1')).toBe(true);
  expect(IPv6.isValidIP('0:0:0:0:0:0:0:0')).toBe(true);
  expect(IPv6.isValidIP('g001:db8:f29f::2f4e')).toBe(false);
  expect(IPv6.isValidIP('-111:db8:f29f::2f4e')).toBe(false);
  expect(IPv6.isValidIP('0000:0000:0000:0000:0000:0000:0000')).toBe(false);
  expect(IPv6.isValidIP('ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toBe(false);
  expect(IPv6.isValidIP('0000:0000:0000:0000:0000:0000:0000:0000')).toBe(true);
  expect(IPv6.isValidIP('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toBe(true);
});