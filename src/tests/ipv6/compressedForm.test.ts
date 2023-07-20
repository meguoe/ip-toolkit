import { IPv6 } from '../../index';

it('compressedForm 讲一个全长的 IPv6 地址字符串转换成简短的 IPv6 地址字符串', () => {
  expect(IPv6.compressedForm('0000:0000:0000:0000:0000:0000:0000')).toBe(false);
  expect(IPv6.compressedForm('0000:0000:0000:0000:0000:0000:0000:0000')).toBe('::');
  expect(IPv6.compressedForm('0000:0000:0000:0000:0000:0000:0000:0001')).toBe('::1');
  expect(IPv6.compressedForm('0001:0000:0000:0000:0000:0000:0000:0000')).toBe('1::');
  expect(IPv6.compressedForm('0001:0000:0000:0000:0000:0000:0000:0001')).toBe('1::1');
  expect(IPv6.compressedForm('00ff:00ff:0000:0000:0000:0000:0000:00ff')).toBe('ff:ff::ff');
  expect(IPv6.compressedForm('2001:0db8:f29f:0000:0000:0000:0000:2f4e')).toBe('2001:db8:f29f::2f4e');
});