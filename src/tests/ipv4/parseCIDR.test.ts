import { IPv4 } from '../../index';

it('parseCIDR 解析CIDR格式的测试', () => {
  expect(IPv4.parseCIDR('192.168.1.0/0')).toMatchObject(
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
  expect(IPv4.parseCIDR('192.168.1.0/1')).toMatchObject(
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
  expect(IPv4.parseCIDR('192.168.1.0/31')).toMatchObject(
    {
      cidrMask: 31,
      ipCount: 2,
      usableCount: 2,
      subnetMask: '255.255.255.254',
      networkAddress: '',
      broadcastAddress: '',
    }
  );
  expect(IPv4.parseCIDR('192.168.1.0/32')).toMatchObject(
    {
      cidrMask: 32,
      ipCount: 1,
      usableCount: 1,
      subnetMask: '255.255.255.255',
      networkAddress: '',
      broadcastAddress: '',
    }
  );
  expect(IPv4.parseCIDR('192.168.1/33')).toBe(false);
  expect(IPv4.parseCIDR('259.168.1.1/33')).toBe(false);
  expect(IPv4.parseCIDR('192.168.1.0/-1')).toBe(false);
  expect(IPv4.parseCIDR('192.168.1.0/33')).toBe(false);
  expect(IPv4.parseCIDR('192.168.1.s/33')).toBe(false);
});