import { IPv4 } from '../../index';

it('toBinHex 将数字 转换为 IP地址 的测试', () => {
  expect(IPv4.toBinHex('192.168.0.257')).toBe(false);
  expect(IPv4.toBinHex('0.0.0.0')).toMatchObject(
    {
      hex: '0x00000000',
      decimal: 0,
      binary: '00000000000000000000000000000000'
    }
  );
  expect(IPv4.toBinHex('192.168.0.1')).toMatchObject(
    {
      hex: '0xc0a80001',
      decimal: 3232235521,
      binary: '11000000101010000000000000000001'
    }
  );
  expect(IPv4.toBinHex('255.255.255.255')).toMatchObject(
    {
      hex: '0xffffffff',
      decimal: 4294967295,
      binary: '11111111111111111111111111111111'
    }
  );
});