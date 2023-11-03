import { ipRange } from './ipRange';
import { isValidIP } from './isValidIP';

/**
 * Verify if an IPv4 address is private
 * @param ip - The IPv4 address string
 * @returns True if private IPv4, false otherwise
 *
 * @example
 * ```
 * isPrivate('192.168.0.1') // returns true
 * isPrivate('114.114.114.114') // returns false 
 * ```
 */

export function isPrivate(ip: string): boolean {
  if (!isValidIP(ip)) return false;

  const privateRanges = [
    { start: '10.0.0.0', end: '10.255.255.255' },
    { start: '127.0.0.0', end: '127.255.255.255' },
    { start: '172.16.0.0', end: '172.31.255.255' },
    { start: '169.254.0.0', end: '169.254.255.255' },
    { start: '192.168.0.0', end: '192.168.255.255' }
  ];

  for (const range of privateRanges) {
    if (ipRange.fromString(range.start, range.end).contains(ip)) {
      return true;
    }
  }
  return false;
}