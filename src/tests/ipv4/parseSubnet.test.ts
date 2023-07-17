import { IPv4 } from '../../index';

it('parseSubnet 解析子网信息的测试', () => {
  expect(IPv4.parseSubnet('192.168.1.0', '0.0.0.0')).toMatchObject(
    {
      cidrMask: 0,
      ipCount: 4294967296,
      usableCount: 4294967294,
      subnetMask: '0.0.0.0',
      firstHost: '0.0.0.1',
      lastHost: '255.255.255.254',
      networkAddress: '0.0.0.0',
      broadcastAddress: '255.255.255.255',
    }
  );
  expect(IPv4.parseSubnet('192.168.1.0', '128.0.0.0')).toMatchObject(
    {
      cidrMask: 1,
      ipCount: 2147483648,
      usableCount: 2147483646,
      subnetMask: '128.0.0.0',
      firstHost: '128.0.0.1',
      lastHost: '255.255.255.254',
      networkAddress: '128.0.0.0',
      broadcastAddress: '255.255.255.255',
    }
  );
  expect(IPv4.parseSubnet('192.168.1.0', '255.255.255.254')).toMatchObject(
    {
      cidrMask: 31,
      ipCount: 2,
      usableCount: 2,
      subnetMask: '255.255.255.254',
      networkAddress: '',
      broadcastAddress: '',
    }
  );
  expect(IPv4.parseSubnet('192.168.1.0', '255.255.255.255')).toMatchObject(
    {
      cidrMask: 32,
      ipCount: 1,
      usableCount: 1,
      subnetMask: '255.255.255.255',
      networkAddress: '',
      broadcastAddress: '',
    }
  );
  expect(IPv4.parseSubnet('192.168.1.1', '1.255.255.255')).toBe(false);
  expect(IPv4.parseSubnet('192.168.1.256', '1.255.255.255')).toBe(false);
  expect(IPv4.parseSubnet('192.168.1.256', '2ss.255.255.255')).toBe(false);
});