import { IP } from '../index';

// IP 格式转换测试用例
const ipConvertCases = [
  {
    result: false,
    ip: '192.168.1.a',
    long: 21212112,
    cidr: '192.168.1.1/a',
    contains: '192.168.1.1/32',
    cidrs: ['192.168.2.1/24', '192.168.1.1/32'],
  },
  {
    result: true,
    ip: '192.168.1.255',
    long: 3232236031,
    cidr: '192.168.1.1/0',
    contains: '192.168.1.1/24',
    cidrs: ['192.168.2.1/24', '192.168.1.1/16'],
  },
  {
    result: true,
    ip: '255.168.1.255',
    long: 4289200639,
    cidr: '192.168.1.1/32',
    contains: '255.168.1.1/24',
    cidrs: ['192.168.2.1/24', '192.168.1.1/8'],
  },
  {
    result: false,
    ip: '192.168.1.256',
    long: 4289200639,
    cidr: '192.168.1.1/33',
    contains: '255.168.1.1/24',
    cidrs: ['112.168.2.1/24', '192.168.1.1/8'],
  },
  {
    result: false,
    ip: 'ff::ffhj',
    long: 21312312,
    cidr: 'ff::ff/a',
    contains: 'ff::ff/a',
    cidrs: ['1ff::ff/128', '2ff::ff/120'],
  },
  {
    result: true,
    ip: 'ff::ff',
    long: 1324035698926381045275276563951124735n,
    cidr: 'ff::ff/0',
    contains: 'ff::ff/64',
    cidrs: ['2ff::ff/128', '2ff::ff/120'],
  },
  {
    result: true,
    ip: 'ffff::aaaa',
    long: 340277174624079928635746076935439035050n,
    cidr: 'ff::ff/128',
    contains: 'ff::ff/0',
    cidrs: ['ff::ff/64', 'ff::ff/120'],
  },
  {
    result: false,
    ip: 'affff::aaaa',
    long: 231212312,
    cidr: 'ff::ff/129',
    contains: 'ff::ff/64',
    cidrs: ['1ff::ff/64', '2ff::ff/120'],
  },
  {
    result: false,
    ip: 231212312,
    long: '231212312',
    cidr: 231212312,
    contains: 1212121,
    cidrs: [],
  },
];

describe('long2ip', () => {
  test.each(ipConvertCases)('判断 $long 是否等于 $ip', ({ ip, long, result }) => expect(IP.long2ip(long as any) === ip).toBe(result));
});

describe('ip2long', () => {
  test.each(ipConvertCases)('判断 $ip 是否等于 $long', ({ ip, long, result }) => expect(IP.ip2long(ip as any) === long).toBe(result));
});

describe('contains', () => {
  test.each(ipConvertCases)('判断 $cidr 是否等于 $result', ({ ip, contains, result }) => expect(IP.contains(contains as any, ip as any)).toBe(result));
});

describe('isCIDR', () => {
  test.each(ipConvertCases)('判断 $cidr 是否等于 $result', ({ cidr, result }) => expect(IP.isCIDR(cidr as any)).toBe(result));
});

describe('isValidIP', () => {
  test.each(ipConvertCases)('判断 $ip 是否等于 $result', ({ ip, result }) => expect(IP.isValidIP(ip as any)).toBe(result));
});

describe('isConflict', () => {
  test.each(ipConvertCases)('判断 $cidrs 是否等于 $result', ({ cidrs, result }) => expect(IP.isConflict(cidrs as any)).toBe(result));
});