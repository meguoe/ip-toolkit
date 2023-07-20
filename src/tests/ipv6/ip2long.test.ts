import { IPv6 } from '../../index';

it('ip2long 将 IP 地址 转换为数字 的测试', () => {
  expect(IPv6.ip2long('::')).toBe(0n);
  expect(IPv6.ip2long('0::')).toBe(0n);
  expect(IPv6.ip2long('::0')).toBe(0n);
  expect(IPv6.ip2long('::1')).toBe(1n);
  expect(IPv6.ip2long('1:::1')).toBe(false);
  expect(IPv6.ip2long('0:0:0:0:0:0:0:0')).toBe(0n);
  expect(IPv6.ip2long('::255.255.255.288')).toBe(false);
  expect(IPv6.ip2long('1::')).toBe(5192296858534827628530496329220096n);
  expect(IPv6.ip2long('1::1')).toBe(5192296858534827628530496329220097n);
  expect(IPv6.ip2long('1::0:1')).toBe(5192296858534827628530496329220097n);
  expect(IPv6.ip2long('0000:0000:0000:0000:0000:0000:0000')).toBe(false);
  expect(IPv6.ip2long('0000:0000:0000:0000:0000:0000:0000:0000')).toBe(0n);
  expect(IPv6.ip2long('f:f:f:f:f:f:f:f')).toBe(77885641318594292392624080437575695n);
  expect(IPv6.ip2long('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toBe(340282366920938463463374607431768211455n);
});