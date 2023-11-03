import { contains, parseCIDR } from './index';

/**
 * Check for conflicts in a set of IPv6 CIDR
 * 
 * @param cidrs - Array of IPv6 CIDR format address string
 * @returns True if conflict found, false otherwise
 * 
 * @example
 * ```
 * isConflict(['2001:db8::1/120', '2001:db8::1/122'])  // true
 * isConflict(['2001:db8::1/120', '3001:db8::1/120'])  // false
 * ```
 */
  
export function isConflict(cidrs: string[]): boolean {
  if (!Array.isArray(cidrs) || cidrs.length === 0) return false;

  const _cidrs = [];
  for (const cidr of cidrs) {
    const subnet = parseCIDR(cidr);
    if (typeof subnet === 'object') _cidrs.push({ cidr, firstHost: subnet.firstHost });
  }
  
  for (let i = 0; i < _cidrs.length; i++) {
    for (let j = i + 1; j < _cidrs.length; j++) {
      const R1 = contains(_cidrs[j].cidr, _cidrs[i].firstHost);
      const R2 = contains(_cidrs[i].cidr, _cidrs[j].firstHost);
      if (R1 || R2) return true;
    }
  }
  return false;
}