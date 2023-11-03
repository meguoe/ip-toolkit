import { contains, parseCIDR } from './index';

/**
 * Check for conflicts in a set of CIDR
 * 
 * @param cidrs - Array of CIDR format address string
 * @returns True if conflict found, false otherwise
 * 
 * @example
 * ```
 * isConflict(['192.168.1.0/24', '192.168.0.0/16'])  // true
 * isConflict(['192.168.1.0/24', '192.168.2.0/24'])  // false
 * isConflict(['192.168.1.0/24', '192.168.2.0/24', '192.168.3.0/16'])  // true
 * isConflict(['192.168.1.0/24', '192.168.2.0/24', '192.168.3.0/24'])  // false
 * ```
 */
  
export function isConflict(cidrs: string[]): boolean {
  if (!Array.isArray(cidrs) || cidrs.length === 0) return false;

  const _cidrs = [];
  for (const cidr of cidrs) {
    const subnet = parseCIDR(cidr);
    if (typeof subnet === 'object') _cidrs.push({ cidr, networkAddress: subnet.networkAddress || subnet.firstHost });
  }
  
  for (let i = 0; i < _cidrs.length; i++) {
    for (let j = i + 1; j < _cidrs.length; j++) {
      const R1 = contains(_cidrs[j].cidr, _cidrs[i].networkAddress);
      const R2 = contains(_cidrs[i].cidr, _cidrs[j].networkAddress);
      if (R1 || R2) return true;
    }
  }
  return false;
}