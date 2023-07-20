import { IPv6 } from '../../index';

it('expandedFrom 将一个简短的 IPv6 地址字符串转换成全长的 IPv6 地址字符串', () => {
  expect(IPv6.expandedFrom('::')).toBe('0000:0000:0000:0000:0000:0000:0000:0000');
  expect(IPv6.expandedFrom('1::')).toBe('0001:0000:0000:0000:0000:0000:0000:0000');
  expect(IPv6.expandedFrom('::1')).toBe('0000:0000:0000:0000:0000:0000:0000:0001');
  expect(IPv6.expandedFrom('1::1')).toBe('0001:0000:0000:0000:0000:0000:0000:0001');
  expect(IPv6.expandedFrom('ff:ff::ff')).toBe('00ff:00ff:0000:0000:0000:0000:0000:00ff');
  expect(IPv6.expandedFrom('2001:db8:f29f::2f4e')).toBe('2001:0db8:f29f:0000:0000:0000:0000:2f4e');
});