import { IPv4 } from '../index';
import { isValidIP } from './index';

interface BinHex {
  hex: string;
  decimal: number;
  binary: string;
}

/**
 * Expands an abbreviated IPv6 address string into its full representation.
 * 
 * @param ip - The IPv6 address string
 * @returns The expanded IPv6 address string or false if invalid
 * 
 * @example 
 * ```
 * expandedForm('2001:db8::1') // '2001:0db8:0000:0000:0000:0000:0000:0001'
 * ```
 */

export function expandedForm(ip: string): string | false {
  if (!isValidIP(ip)) return false;
  if (ip === '::') return '0000:'.repeat(8).slice(0, -1);
  
  const sections: string[] = ip.split(':');
  for (let i = 0; i < sections.length; i++) {
    if (sections[i] === '' && sections[i + 1] === '') sections.splice(i, 1);
  }

  const last = sections[sections.length - 1];
  if (IPv4.isValidIP(last)) {
    const hex = (IPv4.toBinHex(last) as BinHex).hex.slice(2);
    sections.pop() && sections.push(hex.slice(0, 4), hex.slice(4));
  }
  
  return sections.map((section) => {
    return section ? section.padStart(4, '0') : '0000:'.repeat(9 - sections.length).slice(0, -1);
  }).join(':');
}