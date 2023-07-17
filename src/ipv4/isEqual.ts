import { ip2long } from './index';

export function isEqual(ip1: string | number, ip2: string | number): boolean {
  if (typeof ip1 === 'number' && (ip1 < 0 || ip1 > 4294967295)) return false;
  if (typeof ip2 === 'number' && (ip2 < 0 || ip2 > 4294967295)) return false;
  if (typeof ip1 === 'string') ip1 = ip2long(ip1) as number;
  if (typeof ip2 === 'string') ip2 = ip2long(ip2) as number;
  if (typeof ip1 !== 'number' || typeof ip2 !== 'number') return false;
  return ip1 === ip2;
}