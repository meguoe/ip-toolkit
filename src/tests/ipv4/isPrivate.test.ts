import { IPv4 } from '../../index';

it('isPrivate 判断一个IP地址是否为私有专用地址', () => {
  expect(IPv4.isPrivate('10.16.1.1')).toBe(true);
  expect(IPv4.isPrivate('11.16.1.1')).toBe(false);
  expect(IPv4.isPrivate('127.0.1.1')).toBe(true);
  expect(IPv4.isPrivate('128.0.1.1')).toBe(false);
  expect(IPv4.isPrivate('172.16.22.1')).toBe(true);
  expect(IPv4.isPrivate('172.32.11.1')).toBe(false);
  expect(IPv4.isPrivate('169.254.32.33')).toBe(true);
  expect(IPv4.isPrivate('169.255.32.33')).toBe(false);
  expect(IPv4.isPrivate('192.168.12.1')).toBe(true);
  expect(IPv4.isPrivate('193.168.12.1')).toBe(false);
});