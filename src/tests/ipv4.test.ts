import { IPv4 } from '../index';

const convertFailCases = [
  { ip: 1n, ip2: 21 },
  { ip: -1, ip2: 21 },
  { ip: -1, ip2: 1n },
  { ip: 4294967296, ip2: '172.16.1.1' },
  { ip: '256.1.2.3', ip2: '256.1.2.3' },
  { ip: '-56.1.2.3', ip2: '33.33.33.3' },
  { ip: 'aaa.1.2.3', ip2: 21212121211n },
  { ip: '192.168.1/33', ip2: 212121212 },
  { ip: '192.168.1.1/-1', ip2: 2121212 },
  { ip: '192.168.1.1/33', ip2: 2121212 },
  { ip: '259.168.1.1/30', ip2: 2121212 },
  { ip: '29.68.1.1/30', ip2: 4294967296 }
];

// IP 格式转换测试用例
const ipConvertCases = [
  {
    ip: '0.0.0.0',
    long: 0,
    strict: false,
    binHex: {
      hex: '0x00000000',
      decimal: 0,
      binary: '00000000000000000000000000000000'
    },
    isPrivate: false
  },
  {
    ip: '1.0.0.1',
    long: 16777217,
    strict: false,
    binHex: {
      hex: '0x01000001',
      decimal: 16777217,
      binary: '00000001000000000000000000000001'
    },
    isPrivate: false
  },
  {
    ip: '10.0.0.1',
    long: 167772161,
    strict: true,
    binHex: {
      hex: '0x0a000001',
      decimal: 167772161,
      binary: '00001010000000000000000000000001'
    },
    isPrivate: true
  },
  {
    ip: '11.10.0.1',
    long: 185204737,
    strict: true,
    binHex: {
      hex: '0x0b0a0001',
      decimal: 185204737,
      binary: '00001011000010100000000000000001'
    },
    isPrivate: false
  },
  {
    ip: '127.0.0.1',
    long: 2130706433,
    strict: true,
    binHex: {
      hex: '0x7f000001',
      decimal: 2130706433,
      binary: '01111111000000000000000000000001'
    },
    isPrivate: true
  },
  {
    ip: '128.0.0.1',
    long: 2147483649,
    strict: true,
    binHex: {
      hex: '0x80000001',
      decimal: 2147483649,
      binary: '10000000000000000000000000000001'
    },
    isPrivate: false
  },
  {
    ip: '172.16.0.1',
    long: 2886729729,
    strict: false,
    binHex: {
      hex: '0xac100001',
      decimal: 2886729729,
      binary: '10101100000100000000000000000001'
    },
    isPrivate: true
  },
  {
    ip: '172.32.11.1',
    long: 2887781121,
    strict: true,
    binHex: {
      hex: '0xac200b01',
      decimal: 2887781121,
      binary: '10101100001000000000101100000001'
    },
    isPrivate: false
  },
  {
    ip: '169.254.32.33',
    long: 2852003873,
    strict: true,
    binHex: {
      hex: '0xa9fe2021',
      decimal: 2852003873,
      binary: '10101001111111100010000000100001'
    },
    isPrivate: true
  },
  {
    ip: '169.255.32.33',
    long: 2852069409,
    strict: true,
    binHex: {
      hex: '0xa9ff2021',
      decimal: 2852069409,
      binary: '10101001111111110010000000100001'
    },
    isPrivate: false
  },
  {
    ip: '192.168.0.1',
    long: 3232235521,
    strict: true,
    binHex: {
      hex: '0xc0a80001',
      decimal: 3232235521,
      binary: '11000000101010000000000000000001'
    },
    isPrivate: true
  },
  {
    ip: '193.168.0.1',
    long: 3249012737,
    strict: true,
    binHex: {
      hex: '0xc1a80001',
      decimal: 3249012737,
      binary: '11000001101010000000000000000001'
    },
    isPrivate: false
  },
  {
    ip: '255.255.255.255',
    long: 4294967295,
    strict: false,
    binHex: {
      hex: '0xffffffff',
      decimal: 4294967295,
      binary: '11111111111111111111111111111111'
    },
    isPrivate: false
  }
];

describe('isEqual', () => {
  test.each(ipConvertCases)('判断 $ip 是否等于 $long', ({ ip, long }) => expect(IPv4.isEqual(ip, long)).toBe(true));
  test.each(convertFailCases)('将 $ip 转换为 false', ({ ip, ip2 }) => expect(IPv4.isEqual(ip as any, ip2 as any)).toBe(false));
});

describe('isValidIP', () => {
  test.each(ipConvertCases)('判断 $ip 是否等于 $long', ({ ip, strict }) => expect(IPv4.isValidIP(ip, { strict })).toBe(true));
});

describe('ip2long', () => {
  expect(IPv4.ip2long('1:::1')).toBe(false);
  test.each(ipConvertCases)('将 $ip 转换为 $long', ({ ip, long }) => expect(IPv4.ip2long(ip as any)).toBe(long));
  test.each(convertFailCases)('将 $ip 转换为 false', ({ ip }) => expect(IPv4.ip2long(ip as any)).toBe(false));
});

describe('long2ip', () => {
  test.each(ipConvertCases)('将 $long 转换为 $ip', ({ ip, long }) => expect(IPv4.long2ip(long as any)).toBe(ip));
  test.each(convertFailCases)('将 $ip 转换为 false', ({ ip }) => expect(IPv4.long2ip(ip as any)).toBe(false));
});

describe('toBinHex', () => {
  test.each(ipConvertCases)('判断 $ip 是否等于 $binHex', ({ ip, binHex }) => expect(IPv4.toBinHex(ip)).toMatchObject(binHex));
  test.each(convertFailCases)('将 $ip 转换为 false', ({ ip }) => expect(IPv4.toBinHex(ip as any)).toBe(false));
});

describe('isPrivate', () => {
  test.each(ipConvertCases)('判断 $ip 是否为私有专用地址', ({ ip, isPrivate }) => expect(IPv4.isPrivate(ip)).toBe(isPrivate));
  test.each(convertFailCases)('将 $ip 转换为 false', ({ ip }) => expect(IPv4.isPrivate(ip as any)).toBe(false));
});

// 子网掩码转换操作测试用例
const subnetMaskCases = [
  { mask: '0.0.0.0', length: 0, inverse: '255.255.255.255' },
  { mask: '128.0.0.0', length: 1, inverse: '127.255.255.255' },
  { mask: '192.0.0.0', length: 2, inverse: '63.255.255.255' },
  { mask: '255.0.0.0', length: 8, inverse: '0.255.255.255' },
  { mask: '255.255.0.0', length: 16, inverse: '0.0.255.255' },
  { mask: '255.255.255.0', length: 24, inverse: '0.0.0.255' },
  { mask: '255.255.255.255', length: 32, inverse: '0.0.0.0' },
];

describe('isValidMask', () => {
  test.each(subnetMaskCases)('判断 $mask 是否等于 true', ({ mask }) => expect(IPv4.isValidMask(mask as any)).toBe(true));
  test.each(convertFailCases)('将 $mask 是否等于 result', ({ ip }) => expect(IPv4.isValidMask(ip as any)).toBe(false));
});

describe('toSubnetMask', () => {
  test.each(subnetMaskCases)('判断 $length 是否等于 $mask', ({ mask, length }) => expect(IPv4.toSubnetMask(length as any)).toBe(mask));
  test.each(convertFailCases)('判断 $mask 是否等于 false', ({ ip }) => expect(IPv4.toSubnetMask(ip as any)).toBe(false));
});

describe('toMaskLength', () => {
  test.each(subnetMaskCases)('判断 $mask 是否等于 $length', ({ mask, length }) => expect(IPv4.toMaskLength(mask as any)).toBe(length));
  test.each(convertFailCases)('判断 $mask 是否等于 false', ({ ip }) => expect(IPv4.toMaskLength(ip as any)).toBe(false));
});

describe('toInverseMask', () => {
  test.each(subnetMaskCases)('判断 $mask 是否等于 $inverse', ({ mask, inverse }) => expect(IPv4.toInverseMask(mask as any)).toBe(inverse));
  test.each(subnetMaskCases)('判断 $length 是否等于 $inverse', ({ length, inverse }) => expect(IPv4.toInverseMask(length as any)).toBe(inverse));
  test.each(convertFailCases)('判断 $mask 是否等于 false', ({ ip }) => expect(IPv4.toInverseMask(ip as any)).toBe(false));
});

// IP CIDR 转换测试用例
const cidrConvertCases = [
  {
    ip: '192.168.1.0',
    mask: '0.0.0.0',
    cidr: '192.168.1.0/0',
    contains: '33.33.33.33',
    subnet: {
      cidrMask: 0,
      ipCount: 4294967296,
      usableCount: 4294967294,
      subnetMask: '0.0.0.0',
      firstHost: '0.0.0.1',
      lastHost: '255.255.255.254',
      networkAddress: '0.0.0.0',
      broadcastAddress: '255.255.255.255'
    }
  },
  {
    ip: '192.168.1.0',
    mask: '128.0.0.0',
    cidr: '192.168.1.0/1',
    contains: '128.33.33.33',
    subnet: {
      cidrMask: 1,
      ipCount: 2147483648,
      usableCount: 2147483646,
      subnetMask: '128.0.0.0',
      firstHost: '128.0.0.1',
      lastHost: '255.255.255.254',
      networkAddress: '128.0.0.0',
      broadcastAddress: '255.255.255.255'
    }
  },
  {
    ip: '192.168.1.0',
    mask: '255.255.255.254',
    cidr: '192.168.1.0/31',
    contains: '192.168.1.1',
    subnet: {
      cidrMask: 31,
      ipCount: 2,
      usableCount: 2,
      firstHost: '192.168.1.0',
      lastHost: '192.168.1.1',
      subnetMask: '255.255.255.254',
      networkAddress: '',
      broadcastAddress: ''
    }
  },
  {
    ip: '192.168.1.0',
    mask: '255.255.255.255',
    cidr: '192.168.1.0/32',
    contains: '192.168.1.0',
    subnet: {
      cidrMask: 32,
      ipCount: 1,
      usableCount: 1,
      firstHost: '192.168.1.0',
      lastHost: '192.168.1.0',
      subnetMask: '255.255.255.255',
      networkAddress: '',
      broadcastAddress: ''
    }
  }
];

describe('contains', () => {
  test.each(cidrConvertCases)('判断 $cidr 是否包含 $contains', ({ cidr, contains }) => expect(IPv4.contains(cidr as any, contains as any)).toBe(true));
  test.each(convertFailCases)('判断 $ip、$ip2 异常是否等于 false', ({ ip, ip2 }) => expect(IPv4.contains(ip as any, ip2 as any)).toBe(false));
});

describe('parseCIDR', () => {
  test.each(cidrConvertCases)('判断 $cidr 是否等于 $subnet', ({ cidr, subnet }) => expect(IPv4.parseCIDR(cidr as any)).toMatchObject(subnet));
  test.each(convertFailCases)('判断 $ip 异常是否等于 false', ({ ip }) => expect(IPv4.toInverseMask(ip as any)).toBe(false));
});

describe('parseSubnet', () => {
  test.each(cidrConvertCases)('判断 $ip/$mask 是否等于 $subnet', ({ ip, mask, subnet }) => expect(IPv4.parseSubnet(ip as any, mask as any)).toMatchObject(subnet));
  test.each(convertFailCases)('判断 $ip/$ip2 异常是否等于 false', ({ ip, ip2 }) => expect(IPv4.parseSubnet(ip as any, ip2 as any)).toBe(false));
});

// IP Range 测试用例

const ipRangeCases = [
  {
    result: true,
    mask: 16,
    count: 356,
    contains: '192.168.0.99',
    ip: ['192.168.0.1', '192.168.1.100'],
    long: [3232235521, 3232235876]
  }
  , {
    result: true,
    mask: 24,
    count: 100,
    contains: '192.168.1.76',
    ip: ['192.168.1.1', '192.168.1.100'],
    long: [3232235777, 3232235876]
  }, {
    result: true,
    mask: '255.255.0.0',
    count: 323,
    contains: '192.168.1.76',
    ip: ['192.168.0.67', '192.168.1.133'],
    long: [3232235587, 3232235909]
  }, {
    result: true,
    mask: '255.255.255.0',
    count: 120,
    contains: '192.168.28.76',
    ip: ['192.168.28.1', '192.168.28.120'],
    long: [3232242689, 3232242808]
  }, {
    result: false,
    mask: '255.255.255.255',
    count: 3,
    contains: '192.128.33.2',
    ip: ['192.128.33.1', '192.128.33.3'],
    long: [3229622529, 3229622531]
  }, {
    result: false,
    mask: 16,
    count: 71012,
    contains: '132.168.33.1',
    ip: ['132.168.1.1', '132.169.22.100'],
    long: [2225602817, 2225673828]
  }, {
    result: false,
    mask: 24,
    count: 356,
    contains: '192.168.1.99',
    ip: ['192.168.1.1', '192.168.2.100'],
    long: [3232235777, 3232236132]
  }, {
    result: false,
    mask: '255.255.0.0',
    count: 65636,
    contains: '192.166.99.222',
    ip: ['192.166.22.1', '192.167.22.100'],
    long: [3232110081, 3232175716]
  }, {
    result: false,
    mask: '255.255.255.0',
    count: 3276900,
    contains: '192.168.99.222',
    ip: ['192.168.1.1', '192.218.1.100'],
    long: [3232235777, 3235512676]
  }, {
    result: false,
    mask: 'x.255.255.0',
    count: 100,
    contains: '122.218.1.78',
    ip: ['122.218.1.1', '122.218.1.100'],
    long: [2061107457, 2061107556]
  }
];

describe('isSameSubnet', () => {
  test.each(ipRangeCases)('判断 $ip、$mask 是否等于在同一子网, $result', ({ ip, mask, result }) => {
    expect(IPv4.isSameSubnet(ip[0] as any, ip[1] as any, mask as any)).toBe(result);
  });
});

describe('ipRange', () => {
  test.each(ipRangeCases)('判断 $ip toLong 是否等于 $long ', ({ ip, long }) => {
    const ipRange = IPv4.ipRange.fromString(ip[0] as any, ip[1] as any);
    expect(ipRange.ip2long()).toMatchObject(long);
  });

  test.each(ipRangeCases)('判断 $long toString 是否等于 $ip ', ({ ip, long }) => {
    const ipRange = IPv4.ipRange.fromLong(long[0] as any, long[1] as any);
    expect(ipRange.long2ip()).toMatchObject(ip);
  });

  test.each(ipRangeCases)('判断 IP 数量 是否等于 $count ', ({ long, count }) => {
    const ipRange = IPv4.ipRange.fromLong(long[0] as any, long[1] as any);
    expect(ipRange.ipCount()).toBe(count);
  });

  test.each(ipRangeCases)('判断 $ip 是否包含 $contains ', ({ ip, contains }) => {
    const ipRange = IPv4.ipRange.fromString(ip[0] as any, ip[1] as any);
    expect(ipRange.contains(contains)).toBe(true);
    expect(ipRange.contains('xxxxx')).toBe(false);
  });

  it('ipRange.fromLong 非法传参测试', () => {
    try {
      IPv4.ipRange.fromLong(-111, -110);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
    try {
      IPv4.ipRange.fromLong('aaa' as any, '42949672' as any);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
    try {
      IPv4.ipRange.fromLong(4294967296, 100);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid range value, end must be greater than or equal to start'));
    }
  });

  it('ipRange.fromString 非法传参测试', () => {
    try {
      IPv4.ipRange.fromString('192.168.1.256', '192.168.1.100');
    } catch (error) {
      expect(error).toEqual(new Error('Invalid start or end IPv4 address'));
    }
    try {
      IPv4.ipRange.fromString('192.168.1.254', '192.168.1.100');
    } catch (error) {
      expect(error).toEqual(new Error('Invalid range value, end must be greater than or equal to start'));
    }
  });
});