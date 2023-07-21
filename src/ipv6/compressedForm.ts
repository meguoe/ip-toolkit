import { ip2long, expandedForm, isValidIP } from './index';

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
  if (ip2long(ip) === 0n) return '::';
  
  ip = expandedForm(ip) as string;
  const sections: string[] = ip.split(':');
  const compress = sections.map((section: string) => {
    const _section: number = parseInt(section, 16);
    return _section ? _section.toString(16) : 'X';
  }).join(':');

  const regExp = [ /(X:X:X:X:X:X:X)/, /(X:X:X:X:X:X)/, /(X:X:X:X:X)/, /(X:X:X:X)/, /(X:X:X)/, /(X:X)/ ];
  for (let i = 0; i < regExp.length; i++) {
    if (compress.match(regExp[i])) return compress.replace(regExp[i], ':').replace(':::', '::').replaceAll('X', '0');
  }

  return compress.replaceAll('X', '0');
}
