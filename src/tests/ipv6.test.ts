import { IPv6 } from '../index';

const convertFailCases = [
  { ip: -1n, ip2: 340282n },
  { ip: 22222, ip2: -122n },
  { ip: 'aa', ip2: '0xffff' },
  { ip: ':1:', ip2: '0xffff' },
  { ip: ':::', ip2: '0xffff' },
  { ip: '1:::', ip2: '0xffff' },
  { ip: '1:::1', ip2: '0xffff' },
  { ip: 'g::s:@', ip2: '0xffff' },
  { ip: '::392.168.1.1', ip2: '0xffff' },
  { ip: 'g001:db8:f29f::2f4e', ip2: '0xffff' },
  { ip: '0000:0000:0000:0000:0000:0000:0000', ip2: '0xffff' },
  { ip: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff', ip2: '0xffff' },
  { ip: '0000:0000:0000:0000:0000:0000:0000:g000', ip2: '0xffff' },
  { ip: 3402823669209384634633746074317682114561n, ip2: '0xffff' },
];

// IP 格式转换测试用例
const ipConvertCases = [
  { compres: '::', long: 0n, expand: '0000:0000:0000:0000:0000:0000:0000:0000' },
  { compres: '::1', long: 1n, expand: '0000:0000:0000:0000:0000:0000:0000:0001' },
  { compres: '::ffff', long: 65535n, expand: '0000:0000:0000:0000:0000:0000:0000:ffff' },
  { compres: '1::', long: 5192296858534827628530496329220096n, expand: '0001:0000:0000:0000:0000:0000:0000:0000' },
  { compres: '1::1', long: 5192296858534827628530496329220097n, expand: '0001:0000:0000:0000:0000:0000:0000:0001' },
  { compres: 'ff:ff::ff', long: 1324055902107822182681362917658460415n, expand: '00ff:00ff:0000:0000:0000:0000:0000:00ff' },
  { compres: 'f:f:f:f:f:f:f:f', long: 77885641318594292392624080437575695n, expand: '000f:000f:000f:000f:000f:000f:000f:000f' },
  { compres: '2001:db8:f29f::2f4e', long: 42540766486370184438988217621829136206n, expand: '2001:0db8:f29f:0000:0000:0000:0000:2f4e' },
  { compres: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', long: 340282366920938463463374607431768211455n, expand: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff' },
];

describe('isEqual', () => {
  test.each(ipConvertCases)('判断 $ip 是否等于 $long', ({ expand, long }) => expect(IPv6.isEqual(expand, long)).toBe(true));
  test.each(convertFailCases)('判断 $ip 是否为 false', ({ ip, ip2 }) => expect(IPv6.isEqual(ip as any, ip2 as any)).toBe(false));
});

describe('ip2long', () => {
  test.each(ipConvertCases)('将 $expand 转换为 $long', ({ long, expand }) => expect(IPv6.ip2long(expand as any)).toBe(long));
  test.each(ipConvertCases)('将 $compres 转换为 $long', ({ long, compres }) => expect(IPv6.ip2long(compres as any)).toBe(long));
  test.each(convertFailCases)('判断 $ip 是否为 false', ({ ip }) => expect(IPv6.ip2long(ip as any)).toBe(false));
});

describe('long2ip', () => {
  test.each(ipConvertCases)('将 $long 转换为 $compres', ({ long, compres }) => expect(IPv6.long2ip(long as any)).toBe(compres));
  test.each(convertFailCases)('判断 $ip 是否为 false', ({ ip }) => expect(IPv6.long2ip(ip as any)).toBe(false));
});

describe('expandedForm', () => {
  test.each(ipConvertCases)('将 $compres 转换为 $expand', ({ compres, expand }) => expect(IPv6.expandedForm(compres as any)).toBe(expand));
  test.each(convertFailCases)('判断 $ip 是否为 false', ({ ip }) => expect(IPv6.expandedForm(ip as any)).toBe(false));
  it('将 1::192.168.1.1 转换为 0001:0000:0000:0000:0000:0000:c0a8:0101 ', () => expect(IPv6.expandedForm('1::192.168.1.1')).toBe('0001:0000:0000:0000:0000:0000:c0a8:0101'));
});

describe('compressedForm', () => {
  test.each(ipConvertCases)('将 $expand 转换为 $compres', ({ expand, compres }) => expect(IPv6.compressedForm(expand as any)).toBe(compres));
  test.each(convertFailCases)('判断 $ip 是否为 false', ({ ip }) => expect(IPv6.compressedForm(ip as any)).toBe(false));
  it('将 1::192.168.1.1 转换为 1::c0a8:101 ', () => expect(IPv6.compressedForm('1::192.168.1.1')).toBe('1::c0a8:101'));
});

// CIDR Range 测试用例
const cidrConvertCases = [
  {
    cidr: 'ff:ff::ff/120',
    subnet: {
      firstHost: 'ff:ff::',
      ipCount: 256n,
      lastHost: 'ff:ff::ff',
      prefixLength: 120,
    }
  },
  {
    cidr: 'ff:ff::ff/64',
    subnet: {
      firstHost: 'ff:ff::',
      ipCount: 18446744073709551616n,
      lastHost: 'ff:ff::ffff:ffff:ffff:ffff',
      prefixLength: 64,
    }
  },
];

const cidrFailCases = [
  {
    cidr: 212121331,
  },
  {
    cidr: 'ff:ff::ff',
  },
  {
    cidr: 'ff:ff::ff/129',
  },
  {
    cidr: 'gf:ff::ff/120',
  },
];

describe('parseCIDR', () => {
  test.each(cidrConvertCases)('判断 $cidr 是否等于 $subnet', ({ cidr, subnet }) => expect(IPv6.parseCIDR(cidr as any)).toMatchObject(subnet));
  test.each(cidrFailCases)('判断 $cidr 是否等于 false', ({ cidr }) => expect(IPv6.parseCIDR(cidr as any)).toBe(false));
});