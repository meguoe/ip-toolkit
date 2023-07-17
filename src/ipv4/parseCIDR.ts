import { ip2long, long2ip, isValidIP, isValidMask, toSubnetMask} from './index';

interface SubNet {
  cidrMask: number;
  ipCount: number;
  usableCount: number;
  subnetMask: string;
  firstHost: string,
  lastHost: string,
  networkAddress: string;
  broadcastAddress: string;
}

/**
 * Parse CIDR format address into address range info
 *
 * NetworkAddress and broadcastAddress are valid when mask < 31
 *
 * @param cidr - The CIDR format address string
 * @returns The parsed address range object or false if invalid
 * 
 * @example
 * ```
 * parseCIDR('192.168.0.1/33')    // false
 * parseCIDR('192.168.0.1/24')
 * // {
 * //   ipCount: 256,  
 * //   usableCount: 254,
 * //   cidrMask: 24, 
 * //   subnetMask: '255.255.255.0',
 * //   firstHost: '192.168.0.1', 
 * //   lastHost: '192.168.0.254',
 * //   networkAddress: '192.168.0.0',
 * //   broadcastAddress: '192.168.0.255' 
 * // }
 * ``` 
 */

export function parseCIDR(cidr: string): SubNet | false {
  const [ip, mask] = cidr.split('/');
  console.log(cidr);
  if (!isValidIP(ip) || !isValidMask(+mask)) return false;
  
  const length = 32 - +mask;
  const longIP = ip2long(ip) as number;
  const ipCount = Math.pow(2, length);
  const networkIP = +mask ? ((longIP >> length) << length) >>> 0 : 0;
  const broadcastIP = (networkIP | ipCount - 1) >>> 0;
  
  const cidrInfo = {
    ipCount,
    cidrMask: +mask,
    usableCount: +mask < 31 ? ipCount - 2 : ipCount,
    subnetMask: toSubnetMask(+mask) as string,
    networkAddress: +mask < 31 ? long2ip(networkIP) as string : '',
    broadcastAddress: +mask < 31 ? long2ip(broadcastIP) as string : '',
    firstHost: long2ip(networkIP + (+mask < 31 ? 1 : 0)) as string,
    lastHost: long2ip(broadcastIP - (+mask < 31 ? 1 : 0)) as string,
  };
    
  return cidrInfo;
}