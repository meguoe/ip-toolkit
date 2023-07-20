import { isValidIP } from './index';

/**
 * Compresses an expanded IPv6 address into shortened form.
 * 
 * @param ip - The IPv6 address string 
 * @returns The compressed IPv6 address string or false if invalid
 * 
 * @example
 * ```
 * compressedForm('2001:0db8:0000:0000:0000:0000:0000:0001')  // '2001:db8::1' 
 * ```
 */

export function compressedForm(ip: string): string | false {
  if (!isValidIP(ip)) return false;
  const sections: string[] = ip.split(':');
  
  return sections.map((section: string) => {
    const _section: number = parseInt(section, 16);
    return _section ? _section.toString(16) : '';
  }).join(':').replace(/:{2,}/g, '::');
}
  